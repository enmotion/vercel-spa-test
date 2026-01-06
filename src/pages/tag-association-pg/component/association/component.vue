<template>
	<div class="flex-row !w-0">
		<div class="grow-1 flex-col rounded border dark:bg-light-3 dark:border-light-4 bg-white border-dark-2">
			<vmo-search 
				class="p-[25px] rounded-none border-none !bg-[#00000000]"
				:is-wide-screen="true"
				:query="injectData"
				:need-confirm="false"
				:basic="computedSearchConfig.basicSearchFormProps"
				:expand="computedSearchConfig.expandSearchFormProps"
				@search="search($event)"
			>
				<template #title>
					<div class="flex-row items-center justify-between">
						<span class="title">
							<span class="!w-[6px] bg-p-10 h-[18px] mr-10 rounded"></span>
							<span>分类标签组合</span>
						</span>
						<el-radio-group 
							v-model="currentDisplayMode"
							size="small"
						>
							<el-radio-button v-for="(item,index) in displayModes"
								:key="item.value"
								:value="item.value"
							>
								{{ item.label }}
							</el-radio-button>
						</el-radio-group>		
					</div>
				</template>
			</vmo-search>
			<div
				v-show="!!searchData.categoryId"
				class="flex-col grow-1 !bg-[#00000000] border-t border-dark-6 dark:border-light-6"
			>	
				<div
					v-if="currentDisplayMode == 'table'" 
					class="flex-col grow-1 p-[25px]"
				>
					<vmo-table
						ref="tableRef"
						:key="tableRenderKey"
						class="flex-row grow-1 mb-[10px] border-t border-dark-3 dark:border-light-3"
						:data="listData.items"
						:batch-options="topOptions"
						v-bind="tableConfig"
						@select="($event) => {
							console.log($event)
							selected = $event
						}"
						@sort-change="sortChange"
						@node:click="tableNodeClick"
					/>
					<el-pagination					
						v-model:current-page="injectData.page.current"
						v-model:page-size="injectData.page.size"
						:page-sizes="[2, 10, 20, 50]"
						:total="listData.total"
						size="small"
						background
						layout="total,prev, next,jumper"
						@change="pageChange"
					/>
				</div>
				<vmo-dir-tree 
					v-if="currentDisplayMode == 'tree'"
					:data="computedListDataItems"
					:node-option-buttons="treeNodeOptions"
					:list-tree-props="{
						draggable:true,
						defaultExpandAll:true,
					}"
					@node-drop="nodeDrop"
					@node-click="($event)=>{
						console.log($event)
					}"
					@create="topClick('create')"
				/>
			</div>
			<div
				v-show="!searchData.categoryId"
				class="flex-col items-center justify-center text-sm p-[25px] grow-1 !bg-[#00000000] border-t border-dark-6 dark:border-light-6"
			>
				请先选择一个分类
			</div>
		</div>
		

		<el-drawer 
			v-model="showDrawer"
			v-if="!!computedCurrentDrawerFormProps"
			v-bind="computedCurrentDrawerFormProps.drawer"
		>
			<!-- {{itemData}} -->
			<div class="flex-col grow-1">
				<vmo-x-form ref="formRef"
					v-model="itemData"
					class="grow-1 flex-col"
					v-bind="computedCurrentDrawerFormProps.form.props"
					:elements="computedCurrentDrawerFormProps.form.elements"
					:components="{}"
				/>
				<div class="flex-row items-center justify-end">
					<el-button @click="showDrawer = false">
						取消
					</el-button>
					<el-button type="primary"
						@click="save"
					>
						确定
					</el-button>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script lang="ts">
import * as R from "ramda";
import D from "dayjs";
import { pick, mergeDeepRight, clone } from "ramda";
import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount, onActivated, onDeactivated, getCurrentInstance } from "vue";
import { useRouterStore } from "vmo-router";
import { useRoute } from "vue-router";

import { useAppStore } from "@src/stores";
import { VmoTree } from "vmo-tree";
import WgtCategoryTree from "@src/comps/widget/wgt-category-tree/component.vue";
import VmoSearch from "@src/comps/common/vmo-search/component.vue";
import VmoTable from "@src/comps/common/vmo-table/component.vue";
import { ElPagination, ElTag, ElDrawer, ElRadioGroup, ElRadioButton } from "element-plus";
import VmoDirTree from "@src/comps/common/vmo-dir-tree/component.vue";
import { treeConfig } from "./config/tree-config";
import { basicSearchFormProps, expandSearchFormProps } from "./config/search-config";
import { tableConfig, topOptions } from "./config/tabel-config";
import { drawerFormProps } from "./config/from-props";

import type { ResponseListData } from "@typs/restful";

import { VmoXForm } from "vmo-x-form";
import "vmo-x-form/dist/style.css";
import { method } from "lodash";

export default defineComponent({
	name: "table-list-sample-pg",
	components: { VmoSearch, VmoTable, VmoXForm, ElPagination, ElDrawer, VmoDirTree, ElRadioGroup, ElRadioButton },
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		const displayModes = [
			{label:'列表展示',value:'table'},
			{label:'树形展示',value:'tree'}
		]
		const currentDisplayMode = ref("table" as "table"|'tree');

		const formRef = ref(null as any);
		const tableRef = ref(null as any);
		const tableRenderKey = ref(0);
		const selected = ref([] as any[])
		const appStore = useAppStore();
		// 路由实例
		const route = useRoute();
		// 路由状态
		const routerStateStore = useRouterStore();
		// 当前操作行为
		const currentAction = ref("" as string);
		// 防止 onMounted,onActivated 时重复查询 旗标
		const didQeury = ref(false);
		// 防止 onMounted,onActivated 时重复查询 旗标
		const showDrawer = ref(false);

		// 获取树配置
		const computedTreeConfig = computed(() => {
			return treeConfig;
		});
		// 获取搜索面板配置
		const computedSearchConfig = computed(() => {
			return {
				basicSearchFormProps,
				expandSearchFormProps
			};
		});

		const computedCurrentDrawerFormProps = computed(() => drawerFormProps[currentAction.value]);

		const computedListDataItems = computed(()=>{
			const datas = listData.value.items.map((item:Record<string,any>)=>{
				return {
					_id:item?._id,
					label:`${item?.tagInfo?.[0]?.name} : ${item?.tagId} `,
					value:item?.tagId,
					order:item?.order,
					parent:item?.parentAssociationId
				}
			})
			return VmoTree.array2Tree(datas,"value","parent",'children',true) as Record<string,any>[]
		})
		// 请求注入数据,不受查询面板提交影响
		const injectData = ref({
			sort:{order:"DESC"},
			page: {
				current: 1,
				size: 10,
			},
		} as Record<string, any>);
		// 搜索请求数据,来自查询面板
		const searchData = ref({} as Record<string, any>);
		// 表单编辑的数据
		const itemData = ref({} as Record<string, any>);
		// 列表返回的数据
		const listData = ref({
			items: [],
			total: 100,
		} as ResponseListData<{}>);

		watch(()=>currentDisplayMode.value,(n,o)=>{
			console.log(n);
			// 切换展示模式时，重置表格加载状态
			query()
		},{immediate:true,deep:true})
		// 处理日期格式
		onMounted(() => {
			console.log("onMounted");
			didQeury.value = true;
			query();
		});
		onActivated(() => {
			console.log("onActivated");
			!didQeury.value && query();
		});
		onBeforeUnmount(() => {
			didQeury.value = false;
		});
		onDeactivated(() => {
			didQeury.value = false;
		});
		const treeNodeOptions=(data:Record<string,any>):any=>{
			return [
				{
					label:'新增',
					action:(data:Record<string,any>)=>{
						console.log(data,searchData.value);
						// 清空表单数据
						itemData.value = {
							categoryId: searchData.value.categoryId,
							avoidUsedKeys: true,
							parentAssociationId: data.value,
							order:1
						};
						// 设置当前操作行为为 "create"
						currentAction.value = 'create';
						showDrawer.value = true;
					}
				},
				{
					label:'删除',
					action:(data:Record<string,any>)=>{
						proxy
							.$confirm({
								title: "操作提示",
								message: `您确定要删除标签 [ ${data.label} ] 吗`,
							})
							.then(() => {
								proxy.$request(proxy.$apis.contentAssociationTag, { _id: data._id }, { method:"delete" }).then((res: any) => {
									if (res.code == 200) {
										proxy.query();
										proxy.$message({
											message: res.msg,
											type: "success",
										});
									} else {
										proxy.$message({
											message: res.msg,
											type: "error",
										});
									}
								});
							});
					}
				}
			]
		}
		function topClick(action: string) {
			switch (action) {
				case "create":
					// 清空表单数据
					itemData.value = {
						categoryId: searchData.value.categoryId,
						avoidUsedKeys: true,
						order:1
					};
					// 设置当前操作行为为 "create"
					currentAction.value = action;
					// 显示抽屉
					showDrawer.value = true;
					break;
				default:
					break;
			}
		}
		/**
     * 此处采用的是传统方式
     * @param data
     */
		function tableNodeClick(data: { row: Record<string, any>; action: string }) {
			itemData.value = data.row;
			itemData.value.avoidUsedKeys = true;
			currentAction.value = data.action;
			showDrawer.value = true;
			console.log("tableNodeClick", data.row, data.action);
		}
		// 树点击操作
		function treeChange(data: Record<string, any>) {
			injectData.value.org = data ? data : [];
			injectData.value.page.current = 1;
			query();
		}
		// 分页点击操作
		function pageChange(current: number, size: number) {
			injectData.value.page = {
				current,
				size,
			};
			query();
		}
		// 排序分页操作
		function sortChange(data: Record<string, any>) {
			injectData.value.page.current = 1;
			const orderKey: Record<string, string> = { ascending: "ASC", descending: "DESC" };
			console.log(data)
			injectData.value.sort = orderKey[data.order as string]
				? {
					[data.prop]: orderKey[data.order as string],
				}
				: undefined;
			console.log(injectData.value.sort)
			query();
		}
		// 搜索点击操作
		function search(data: Record<string, any>) {
			searchData.value = data;
			injectData.value.page.current = 1;
			console.log("search",1)
			query();
		}
		// 查询接口
		function query() {
			if(!searchData.value.categoryId){
				return
			}
			currentDisplayMode.value == 'table' && (tableRef.value.isLoading = true)
			const finalInjectData = clone(mergeDeepRight(searchData.value, injectData.value))
			currentDisplayMode.value == 'tree' && (delete finalInjectData.page)
			proxy.$request(proxy.$apis.contentTypeAssociationFind,finalInjectData,{method:"POST"}).then((res: any) => {
				if (res.code == 200) {
					listData.value = res.data;
				} else {
					proxy.$message({
						message: res.msg,
						type: "warning",
					});
					listData.value = res.data;
					tableRenderKey.value++;
				}
				currentDisplayMode.value == 'table' && (tableRef.value.isLoading = false)
			});
		}
		// 保存用户编辑
		function save() {
			formRef.value.validate().then((res: any) => {
				proxy.$request(proxy.$apis.contentAssociationTag, itemData.value, {method:"POST"}).then((res: any) => {
					if (res.code == 200) {
						proxy.$message({
							message: res.msg,
							type: "success",
						});
						showDrawer.value = false;
						query();
					} else {
						proxy.$message({
							message: res.msg,
							type: "error",
						});
					}
				});
			});
		}
		function nodeDrop(...args:any[]){
			const type = args[2];
			const dragNodeData:Record<string,any> = args[0]?.data??{};
			const targetNodeData:Record<string,any> = args[1]?.data??{};
			// console.log(targetNodeData,type)
			dragNodeData.type = type;
			switch(type){
				case 'inner':{
					dragNodeData.parentAssociationId = targetNodeData.value;
					// const items = targetNodeData?.children?.filter?.((item:Record<string,any>)=>item!==dragNodeData)
					// const orders = items.map?.((item:Record<string,any>)=>item.order)
					// const order = orders.length>0 ? Math.min(...orders) : 1;
					// dragNodeData.order = order
					break
				}
				case 'before':
					dragNodeData.parentAssociationId = args?.[1]?.parent?.data?.value ?? ''
					dragNodeData.order = targetNodeData.order
					// dragNodeData.order = args?.[1]?.data?.order+1
					break
				case 'after':
					dragNodeData.parentAssociationId = args?.[1]?.parent?.data?.value ?? ''
					dragNodeData.order = targetNodeData.order
					break
				default:
					// dragNodeData.order = args?.[1]?.data?.order-1
					break
			}
			console.log(R.pick(['_id','parentAssociationId','order','type'],dragNodeData))
			proxy.$request(proxy.$apis.contentAssociationTagDrop,R.pick(['_id','parentAssociationId','order','type'],dragNodeData)).then((res: any) => {
				if (res.code == 200) {
					proxy.$message({
						message: res.msg,
						type: "success",
					});
					showDrawer.value = false;
					query();
				} else {
					proxy.$message({
						message: res.msg,
						type: "error",
					});
				}
			});
		}
		return {
			formRef,
			tableRef,
			appStore,
			selected,
			tableRenderKey,
			tableConfig,
			injectData,
			itemData,
			showDrawer,
			routerStateStore,
			route,
			computedSearchConfig,
			computedTreeConfig,
			computedCurrentDrawerFormProps,
			searchData,
			listData,
			computedListDataItems,
			displayModes,
			currentDisplayMode,
			topOptions,
			topClick,
			currentAction,
			D,
						
			pick,
			nodeDrop,
			mergeDeepRight,
			treeChange,
			search,
			sortChange,
			pageChange,
			tableNodeClick,
			treeNodeOptions,
			query,
			save,
		};
	},
});
</script>
