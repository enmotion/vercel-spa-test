<template>
	<div class="flex-row">
		<!-- <div v-if="appStore.getScreen.isWideScreen"
      class="w-auto bg-white border-dark-4 dark:bg-light-3 dark:border-light-2 rounded mr-15 flex-col">
      <wgt-category-tree title="组织架构" type="ORGS" @update:model-value="treeChange">
      </wgt-category-tree>
    </div> -->
		<div class="grow-1 flex-col">
			<vmo-search 
				title="范文上架"
				class="p-[25px]"
				:query="injectData"
				:basic="computedSearchConfig.basicSearchFormProps"
				:expand="computedSearchConfig.expandSearchFormProps"
				@search="search($event)"
			/>
			<div
				class="flex-col p-[25px] grow-1 bg-white border border-dark-4 dark:bg-light-3 dark:border-light-2 rounded mt-10"
			>				
				<vmo-table ref="tableRef"
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
				<!-- inject:{{ injectData }}<br />
        search:{{ searchData }} -->
				<el-pagination v-model:current-page="injectData.page.current"
					v-model:page-size="injectData.page.size"
					:page-sizes="[2, 10, 20, 50]"
					:total="listData.total"
					size="small"
					background
					:layout="appStore.getScreen.isWideScreen ? 'total, sizes, prev, pager, next, jumper' : 'total,prev, next,jumper'"
					@change="pageChange"
				/>
			</div>
		</div>

		<el-drawer v-model="showDrawer"
			v-if="!!computedCurrentDrawerFormProps"
			v-bind="computedCurrentDrawerFormProps.drawer"
		>
			<!-- {{itemData}} -->
			<div class="flex-col grow-1">
				<!-- {{ itemData.llmResult.writingMethods}} -->
				<div class="flex-col pl-[20px] mb-[10px]">
					<el-radio-group
						v-model="activeName"
						type="card"
						class="demo-tabs"
					>
						<el-radio-button 
							v-for="(item,index) in tabs" 
							:key="item.value" 
							:label="item.label" 
							:value="item.value"
						/>					
					</el-radio-group>
				</div>
				<div 
					v-if="activeName=='composition'"
					class="flex-col grow-1"
				>
					<vmo-x-form 
						ref="formRef"
						v-if="activeName=='composition'"
						v-model="itemData"
						class="grow-1 flex-col"
						v-bind="computedCurrentDrawerFormProps.form.props"
						:elements="computedCurrentDrawerFormProps.form.elements"
						:components="{}"
					/>
				</div>
				<el-scrollbar 
					v-if="activeName=='llmResult'"
					class="flex-col h-0 ml-[20px] grow-1 border rounded border-[#88888820] mb-[20px]"
					view-class="p-[20px]"
				>
					<div class="flex-col">
						<div v-if="itemData.llmResult.genre.length>0"
							class="flex-col mb-[20px]"
						>
							<div class="text-base mb-[10px]">
								体裁标签
							</div>
							<div 
								v-for="(item,index) in  itemData.llmResult.genre"
								:key="item.key"
								class="flex-col mb-[10px] border border-[#88888820] rounded p-[10px]"
							>
								<p class="text-sm text-gray-500 leading-[25px]">
									<span class="text-sm text-white mr-[5px]">{{ item.name }}</span>{{ item.reason }}
								</p>							
							</div>
						</div>
						<div
							v-if="itemData.llmResult.sync.length>0"	
							class="flex-col mb-[20px]"
						>
							<div class="text-base mb-[10px]">
								同步标签
							</div>
							<div 
								v-for="(item,index) in  itemData.llmResult.sync"
								:key="item.key"
								class="flex-col mb-[10px] border border-[#88888820] rounded p-[10px]"
							>
								<p class="text-sm text-gray-500 leading-[25px]">
									<span class="text-sm text-white mr-[5px]">{{ item.name }}</span>{{ item.reason }}
								</p>							
							</div>
						</div>
						<div 
							v-if="itemData.llmResult.writingMethods.length>0"	
							class="flex-col mb-[20px]"
						>
							<div class="text-base mb-[10px]">
								写作手法
							</div>
							<div 
								v-for="(item,index) in  itemData.llmResult.writingMethods"
								:key="item.key"
								class="flex-col mb-[10px] border border-[#88888820] rounded p-[10px]"
							>
								<p class="text-sm text-gray-500 leading-[25px]">
									<span class="text-sm text-white mr-[5px]">{{ item.name }}</span>{{ item.reason }}
								</p>							
							</div>
						</div>
					</div>
				</el-scrollbar>
				<div class="flex-row items-center justify-end">
					<el-button @click="showDrawer = false">
						取消
					</el-button>

					<el-button
						v-if="!itemData.status"
						type="danger"
						@click="save({processingStatus:0,status:false})"
					>
						驳回重审
					</el-button>
					<el-button
						v-if="!itemData.status"
						type="primary"
						@click="save({processingStatus:4,status:true})"
					>
						保存更改并审核上架
					</el-button>

					<el-button
						v-if="itemData.status"
						type="danger"
						@click="save({status:false})"
					>
						下架
					</el-button>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script lang="ts">
import D from "dayjs";
import * as R from "ramda";
import { pick, mergeDeepRight } from "ramda";
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, onActivated, onDeactivated, getCurrentInstance } from "vue";
import { useRouterStore } from "vmo-router";
import { useRoute } from "vue-router";

import { useAppStore } from "@src/stores";
import WgtCategoryTree from "@src/comps/widget/wgt-category-tree/component.vue";
import VmoSearch from "@src/comps/common/vmo-search/component.vue";
import VmoTable from "@src/comps/common/vmo-table/component.vue";
import { ElPagination, ElTag, ElDrawer, ElRadioGroup, ElRadioButton, ElScrollbar } from "element-plus";

import { treeConfig } from "./config/tree-config";
import { basicSearchFormProps, expandSearchFormProps } from "./config/search-config";
import { tableConfig, topOptions } from "./config/tabel-config";
import { drawerFormProps } from "./config/from-props";

import type { ResponseListData } from "@typs/restful";

import { VmoXForm } from "vmo-x-form";
import "vmo-x-form/dist/style.css";
import { method } from "lodash";

export default defineComponent({
	name: "model-essay-pg",
	components: { VmoSearch, VmoTable, VmoXForm, ElPagination, ElDrawer, ElRadioGroup, ElRadioButton, ElScrollbar },
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		const isLoading = ref(false);
		const formRef = ref(null as any);
		const tableRef = ref(null as any);
		const tableRenderKey = ref(0);
		const selected = ref([] as any[])
		const appStore = useAppStore();
		const activeName = ref('composition' as string);
		const tabs = [
			{label:'原文数据',value:'composition'},
			{label:'评审详情',value:'llmResult'}
		]
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
		// 请求注入数据,不受查询面板提交影响
		const injectData = ref({
			processingStatus:{$gte:3},
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
		function handleClick(event:any){
			console.log(event)
		}
		/**
     * 此处采用的是传统方式
     * @param data
     */
		function tableNodeClick(data: { row: Record<string, any>; action: string }) {
			itemData.value = data.row;
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
			query();
		}
		// 查询接口
		function query() {
			tableRef.value.isLoading = true
			proxy.$request(proxy.$apis.modelEssayFind, mergeDeepRight(searchData.value, injectData.value),{method:"POST"}).then((res: any) => {
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
				tableRef.value.isLoading = false
			});
		}
		// 保存用户编辑
		function save(data:Record<string,any>={}) {
			formRef.value.validate().then((res: any) => {
				isLoading.value = true;
				proxy.$request(proxy.$apis.modelEssaySave, R.mergeDeepRight(itemData.value,data), {method:"POST"}).then((res: any) => {
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
				}).finally(()=>{
					isLoading.value = false;
				});
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
			activeName,
			tabs,
			topOptions,
			handleClick,
			currentAction,
			D,
						
			pick,
			mergeDeepRight,
			treeChange,
			search,
			sortChange,
			pageChange,
			tableNodeClick,
			query,
			save,
		};
	},
});
</script>
