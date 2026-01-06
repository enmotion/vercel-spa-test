<template>
	<div class="flex-row">
		<div class="w-[280px] bg-white border border-dark-4 dark:bg-light-3 dark:border-light-2 rounded mr-10 flex-col">
			<vmo-dir-tree title="Classify"
				v-bind="treeConfig"
				@node-click="treeChange"
			/>
		</div>
		<div class="grow-1 flex-col">
			<vmo-search title="Search"
				:query="injectData"
				:basic="basicSearchFormProps"
				@search="search($event)"
			/>
			<div
				class="flex-col p-[15px] h-80 grow-1 bg-white border border-dark-4 dark:bg-light-3 dark:border-light-2 rounded mt-10"
			>
				<div class="flex-row mb-10">
					<el-button v-for="item in topOptions"
						:key="item.action"
						v-bind="item"
						@click="topClick(item.action as string)"
					>
						{{ item.label }}
					</el-button>
				</div>
				{{ listData.items[0] }}
				<div class="flex-row grow-1">
					<vmo-table class="w-0 grow-1 border-t border-dark-3 dark:border-light-3"
						:data="listData.items"
						v-bind="tableConfig"
						@sort-change="sortChange"
						@node:click="tableNodeClick"
					/>
				</div>
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
			<div class="flex-col grow-1">
				<vmo-x-form ref="formRef"
					v-model="itemData"
					class="grow-1 flex-col"
					v-bind="computedCurrentDrawerFormProps.form.props"
					:elements="computedCurrentDrawerFormProps.form.elements"
				/>
				<div class="flex-row items-center justify-end">
					<el-button>取消</el-button>
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
import D from "dayjs";
import { pick, mergeDeepRight } from "ramda";
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, onActivated, onDeactivated, getCurrentInstance } from "vue";
import { useRouterStore } from "vmo-router";
import { useRoute } from "vue-router";

import { useAppStore } from "@src/stores";
import VmoDirTree from "@src/comps/common/vmo-dir-tree/component.vue";
import VmoSearch from "@src/comps/common/vmo-search/component.vue";
import VmoTable from "@src/comps/common/vmo-table/component.vue";
import { ElPagination, ElTag, ElDrawer } from "element-plus";

import { treeConfig } from "./config/tree-config";
import { basicSearchFormProps } from "./config/search-config";
import { tableConfig, topOptions } from "./config/tabel-config";
import { drawerFormProps } from "./config/from-props";

import type { ResponseListData } from "@typs/restful";

import { VmoXForm } from "vmo-x-form";
import "vmo-x-form/dist/style.css";

export default defineComponent({
	name: "table-list-sample-pg",
	components: { VmoDirTree, VmoSearch, VmoTable, VmoXForm, ElPagination, ElDrawer },
	setup(props, context) {
		// 获取 Vue 实例的 proxy，用于调用外部方法和属性
		const { proxy } = getCurrentInstance() as { proxy: any };
		// 表单组件的引用
		const formRef = ref(null as any);
		// 是否已经完成查询行为
		const didQeury = ref(false);
		// 应用状态的 store
		const appStore = useAppStore();
		// 路由实例
		const route = useRoute();
		// 路由状态的 store
		const routerStateStore = useRouterStore();
		// 当前操作行为
		const currentAction = ref("" as string);
		// 防止在 onMounted 和 onActivated 时重复查询的标志
		const didQuery = ref(false);
		// 是否显示抽屉
		const showDrawer = ref(false);

		// 根据当前操作行为计算抽屉表单的配置
		const computedCurrentDrawerFormProps = computed(() => drawerFormProps[currentAction.value]);

		// 请求注入的数据（不受查询面板提交影响）
		const injectData = ref({
			page: {
				current: 1,
				size: 10,
			},
		} as Record<string, any>);

		// 搜索请求的数据（来自查询面板）
		const searchData = ref({} as Record<string, any>);

		// 表单编辑的数据
		const itemData = ref({} as Record<string, any>);

		// 列表返回的数据
		const listData = ref({
			items: [],
			total: 100,
		} as ResponseListData<{}>);

		// 组件挂载后执行的初始化查询
		onMounted(() => {
			console.log("onMounted");
			didQuery.value = true;
			query();
		});

		// 组件被激活时执行的初始化查询（例如从 keep-alive 中激活）
		onActivated(() => {
			console.log("onActivated");
			if (didQuery.value) {
				didQeury.value = true;
				query();
			}
		});

		// 组件卸载前重置查询标志
		onBeforeUnmount(() => {
			didQuery.value = false;
		});

		// 组件被停用前重置查询标志（例如进入 keep-alive 状态）
		onDeactivated(() => {
			didQuery.value = false;
		});

		/**
		 * 顶部按钮点击事件处理
		 * @param action - 按钮的操作行为，例如 "create"
		 */
		function topClick(action: string) {
			switch (action) {
				case "create":
					// 清空表单数据
					itemData.value = {};
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
		 * 表格虚拟节点点击事件处理
		 * @param data - 包含行数据和操作行为的对象
		 */
		function tableNodeClick(data: { row: Record<string, any>; action: string }) {
			// 设置表单数据为当前行数据
			itemData.value = data.row;
			// 设置当前操作行为
			currentAction.value = data.action;
			// 显示抽屉
			showDrawer.value = true;
		}

		/**
		 * 树点击事件处理
		 * @param data - 获取到的节点数据
		 */
		function treeChange(data: Record<string, any>) {
			// 设置 injectData 的 orgs 属性
			injectData.value.orgs = data?.value ? [data.value] : [];
			// 重置当前页为第一页
			injectData.value.page.current = 1;
			// 执行查询
			query();
		}

		/**
		 * 分页数据变化时的处理
		 * @param current - 当前页码
		 * @param size - 每页显示的数量
		 */
		function pageChange(current: number, size: number) {
			// 更新 injectData 的 page 相关属性
			injectData.value.page = {
				current,
				size,
			};
			// 执行查询
			query();
		}

		/**
		 * 排序变化时的处理
		 * @param data - 包含排序字段和排序方式的对象
		 */
		function sortChange(data: Record<string, any>) {
			// 重置当前页为第一页
			injectData.value.page.current = 1;
			// 设置排序键和排序类型
			const orderKey: Record<string, string> = { ascending: "ASC", descending: "DESC" };
			injectData.value.sort = orderKey[data.order as string]
				? {
					key: data.prop,
					type: orderKey[data.order as string],
				}
				: undefined;
			// 执行查询
			query();
		}

		/**
		 * 搜索事件处理
		 * @param data - 搜索面板提交的数据
		 */
		function search(data: Record<string, any>) {
			// 更新 searchData
			searchData.value = data;
			// 重置当前页为第一页
			injectData.value.page.current = 1;
			// 执行查询
			query();
		}

		/**
		 * 执行数据查询
		 */
		function query() {
			// 合并搜索数据和请求数据
			const requestData = mergeDeepRight(searchData.value, injectData.value);
			// 调用请求方法
			proxy.$request(proxy.$apis.usersFind, requestData).then((res: any) => {
				if (res.code == 200) {
					// 更新列表数据
					listData.value = {
						items: res.data.items,
						total: res.data.total
					};
				} else {
					// 显示警告消息
					proxy.$message({
						message: res.msg,
						type: "warning",
					});
					// 更新列表数据
					listData.value = res.data;
				}
			});
		}

		/**
		 * 保存表单数据
		 */
		function save() {
			// 验证表单数据
			formRef.value.validate().then((res: any) => {
				// 调用保存请求方法
				proxy.$request(proxy.$apis.mapiMuserSave, itemData.value).then((res: any) => {
					if (res.code == 200) {
						// 显示成功消息
						proxy.$message({
							message: res.msg,
							type: "success",
						});
						// 关闭抽屉
						showDrawer.value = false;
						// 执行查询以更新表格数据
						query();
					} else {
						// 显示错误消息
						proxy.$message({
							message: res.msg,
							type: "error",
						});
					}
				});
			});
		}

		// 返回暴露给模板的数据和方法
		return {
			proxy,
			formRef,
			appStore,
			tableConfig,
			injectData,
			itemData,
			showDrawer,
			routerStateStore,
			route,
			basicSearchFormProps,
			treeConfig,
			currentAction,
			computedCurrentDrawerFormProps,
			searchData,
			listData,
			topOptions,
			D,
			pick,
			mergeDeepRight,
			treeChange,
			search,
			sortChange,
			pageChange,
			topClick,
			tableNodeClick,
			save,
		};
	},
});
</script>
