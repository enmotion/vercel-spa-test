<template>
	<div class="flex-row model-essay-search">
		<!-- <div v-if="appStore.getScreen.isWideScreen"
      class="w-auto bg-white border-dark-4 dark:bg-light-3 dark:border-light-2 rounded mr-15 flex-col">
      <wgt-category-tree title="组织架构" type="ORGS" @update:model-value="treeChange">
      </wgt-category-tree>
    </div> -->
		<div class="grow-1 flex-col">
			<vmo-search 
				title="范文搜索"
				class="p-[25px]"
				:loading="isLoading"
				:query="injectData"
				:basic="computedSearchConfig.basicSearchFormProps"
				:expand="computedSearchConfig.expandSearchFormProps"
				@search="search($event)"
			/>
			<div class="bg-white border grow-1 flex-col p-[25px] border-dark-4 dark:bg-light-3 dark:border-light-2 rounded mt-10">
				<span class="flex-row items-center text-base mb-[10px]">
					<span class='text-xs text-gray-500 flex-row items-center p-[5px]'>共计召回：</span>
					{{ listData.total }}
				</span>
				<el-scrollbar 
					class="grow-1 h-0 flex-col " 
					view-class="flex-col"
				>
					<div 
						v-for="(item,index) in listData?.items" 
						:key="item.id" 
						class="flex-col w-full mb-[20px] last:mb-0"
					>
						<div class="p-[25px] border border-[#88888820] rounded flex-col bg-[#00000010]">
							<h1 class="text-lg flex-row items-center justify-between">
								<div class="flex-row items-center">
									<span class="mr-[20px]">{{ item.title }}</span>									
								</div>
								<span class="text-xs">
									<span class="mr-[10px] text-s-10">向量相似度:</span>
									<span class="mr-[10px] text-sm font-normal"> {{ item.score }}</span>
								</span>
							</h1>
							<div class="flex-row items-center justify-between mt-[10px] text-sm">
								<span v-if="item.genreInfo?.length>0">
									体裁：
									<el-tag v-for="(it,index) in item.genreInfo"
										:key="it.id"
										class="mr-[5px] last:mr-0"
										type="success"
									>
										{{ it.name }}
									</el-tag>
								</span>
								<span v-if="item.syncInfo?.length>0">
									同步：
									<el-tag v-for="(it,index) in item.syncInfo"
										:key="it.id"
										class="mr-[5px] last:mr-0"
										type="warning"
									>
										{{ it.name }}
									</el-tag>
								</span>
							</div>
							<vmo-textarea 
								:model-value="item.content"
								class="text-sm leading-7 my-[20px] text-gray-500"
							/>
							<div class="text-xs flex-row items-center justify-between font-bold  mb-[10px] last:mb-0">
								<div class="flex-col">
									<span class="mr-[10px] mb-[5px]">写作手法:</span>
									<div class="flex-row items-center flex-wrap">
										<el-tag v-for="(it,index) in item.writingMethodsInfo"
											:key="it.id"
											class="mr-[5px] last:mr-0 mb-[5px]"
											type="warning"
										>
											{{ it.name }}
										</el-tag>
									</div>
								</div>
							</div>							 
						</div>
					</div>
				</el-scrollbar>
			</div>
		</div>

		<el-drawer v-model="showDrawer"
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
<style>
.model-essay-search p{
	text-indent: 2em;
}
</style>
<script lang="ts">
import D from "dayjs";
import { pick, mergeDeepRight } from "ramda";
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, onActivated, onDeactivated, getCurrentInstance } from "vue";
import { useRouterStore } from "vmo-router";
import { useRoute } from "vue-router";

import { useAppStore } from "@src/stores";
import WgtCategoryTree from "@src/comps/widget/wgt-category-tree/component.vue";
import VmoSearch from "@src/comps/common/vmo-search/component.vue";
import VmoTable from "@src/comps/common/vmo-table/component.vue";
import VmoTextarea from "@src/comps/common/vmo-textarea/index.cp";
import { ElPagination, ElTag, ElDrawer, ElScrollbar } from "element-plus";

import { treeConfig } from "./config/tree-config";
import { basicSearchFormProps, expandSearchFormProps } from "./config/search-config";
import { tableConfig, topOptions } from "./config/tabel-config";
import { drawerFormProps } from "./config/from-props";

import type { ResponseListData } from "@typs/restful";

import { VmoXForm } from "vmo-x-form";
import "vmo-x-form/dist/style.css";
import { method } from "lodash";

export default defineComponent({
	name: "model-essay-search-pg",
	components: { VmoSearch, VmoTable, VmoXForm, ElPagination, ElDrawer, ElScrollbar, ElTag, VmoTextarea },
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		const formRef = ref(null as any);
		const tableRef = ref(null as any);
		const tableRenderKey = ref(0);
		const selected = ref([] as any[])
		const appStore = useAppStore();
		const isLoading= ref(false);
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
			// page: {
			// 	current: 1,
			// 	size: 10,
			// },
		} as Record<string, any>);
		// 搜索请求数据,来自查询面板
		const searchData = ref({} as Record<string, any>);
		// 表单编辑的数据
		const itemData = ref({} as Record<string, any>);
		// 列表返回的数据
		const listData = ref({
			items: [],
			total: 0,
		} as ResponseListData<Record<string,any>>);

		onMounted(() => {
			console.log("onMounted");
			didQeury.value = true;
			// query();
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
			query();
		}
		// 查询接口
		function query() {
			isLoading.value = true
			proxy.$request(proxy.$apis.modelEssayVectorSearch, mergeDeepRight(searchData.value, injectData.value),{method:"POST"}).then((res: any) => {
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
				isLoading.value = false
			});
		}
		// 保存用户编辑
		function save() {
			formRef.value.validate().then((res: any) => {
				proxy.$request(proxy.$apis.modelEssaySave, itemData.value, {method:"POST"}).then((res: any) => {
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
			isLoading,
			topOptions,
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
