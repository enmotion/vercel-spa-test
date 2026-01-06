<template>
	<div class="vmo-dir-tree grow-1">
		<div
			class="header"
			:style="{ height: headerHeight + 'px' }"
		>
			<slot
				v-if="title || context.slots.title"
				name="title"
			>
				<span class="title">
					<span class="!w-[6px] bg-s-10 h-[18px] mr-10 rounded"></span>
					<span>{{ title }}</span>
				</span>
			</slot>
			<slot name="search">
				<span class="search mt-[5px]">
					<el-input
						v-model="searchContent"
						class="w-0 grow-1"
						v-bind="computedSearchInputProps"
						@input="ElTreeRef.filter($event)"
					>
						<template #prefix>
							<slot name="searchPrefix">
								<span class="icon iconfont vmo-icon-search_line"></span>
							</slot>
						</template>
						<template #suffix>
							<slot name="searchAppend"></slot>
						</template>
					</el-input>
					<span
						v-if="!disabled"
						class="button iconfont vmo-icon-add_line"
						@click="context.emit('create')"
					></span>
				</span>
			</slot>
		</div>
		<el-scrollbar
			class="flex-col grow-1 h-0 p-10"
			wrap-class="flex-col grow-1 h-0"
			view-class="flex-col grow-1 h-0"
		>
			<div
				class="h-auto flex-col grow-1"
				@click="context.emit('node-click', null)"
			>
				<component
					v-loading="isLoading"
					:is="type"
					ref="ElTreeRef"
					class="grow-1 shrink-0 flex-col"
					:style="{
						'--el-tree-node-content-height': computedListTreeProps.nodeHeight + 'px',
					}"
					:default-checked-keys="modelValue"
					:data="computedInnerData"
					:filter-node-method="filterMethod"
					v-bind="computedListTreeProps"
					@node-click="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-click', ...params)
					}"
					@node-contextmenu="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-contextmenu', ...params)
					}"
					@check-change="(...params:any[])=>{
						// console.error(params,'check-change');
						context.emit('check-change', ...params)
					}"
					@check="(...params:any[])=>{
						// console.error(params,'check');
						context.emit('check', ...params)
						context.emit('update:modelValue', params[1].checkedKeys)
					}"
					@current-change="(...params:any[])=>{
						// console.error(params,'current-change');
						context.emit('current-change', ...params)
					}"
					@node-expand="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-expand', ...params)
					}"
					@node-collapse="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-collapse', ...params)
					}"
					@node-drag-start="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-drag-start', ...params)
					}"
					@node-drag-enter="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-drag-enter', ...params)
					}"
					@node-drag-leave="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-drag-leave', ...params)
					}"
					@node-drag-over="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-drag-over', ...params)
					}"
					@node-drag-end="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-drag-end', ...params)
					}"
					@node-drop="(...params:any[])=>{
						// console.error(params,'node-click');
						context.emit('node-drop', ...params)
					}"
				>
					<template #default="{ data, node }">
						<div class="flex-row w-full items-center">
							<slot
								name="nodeDefault"
								v-bind="{ node, data }"
							>
								<span class="grow-1 w-0 overflow-hidden text-ellipsis"> {{ data.label }}</span>
							</slot>
							<el-popover
								v-if="data.option.length > 0 && !disabled"
								placement="right"
								popper-class="p-5"
								trigger="hover"
								:width="60"
								:popper-style="{ minWidth: '50px' }"
							>
								<template #reference>
									<span class="w-[30px] h-[30px] flex-row items-center justify-center iconfont vmo-icon-more_vertical_line"></span>
								</template>
								<div class="flex-col">
									<el-button
										v-for="item in data.option"
										:key="item.label"
										class="mx-0 mb-5 last:mb-0"
										v-bind="omit(['label', 'action'], item)"
										@click.capture.stop="item.action.call(proxy.$parent?.$parent?.$parent, clone(data))"
									>
										{{ item.label }}
									</el-button>
								</div>
							</el-popover>
						</div>
					</template>
				</component>
			</div>
		</el-scrollbar>
	</div>
</template>

<script lang="ts">
import { mergeDeepRight, omit,clone } from "ramda";
import { ref, defineComponent, computed, onMounted, getCurrentInstance, watch, type Component } from "vue";
import { ElInput, ElPopover, ElTree, ElTreeV2, ElScrollbar } from "element-plus";

import { VmoTree } from "vmo-tree";
import type { VXF_PUB } from "vmo-x-form";
import type { InputProps, ButtonProps } from "element-plus";
import type { PropType } from "vue";
import { isArray } from "lodash";

export type TreeV2Props = {
	emptyText: string;
	disabled:boolean
	props: Partial<{
		value: string | number;
		label: string;
		children: string;
		disabled: string;
		class: string | Function;
	}>;
	highlightCurrent: boolean;
	expandOnClickNode: boolean;
	checkOnClickNode: boolean;
	defaultExpandedKeys: (string | number)[];
	showCheckbox: boolean;
	checkStrictly: boolean;
	defaultCheckedKeys: (string | number)[];
	currentNodeKey: string | number;
	indent: number;
	icon: string | Component;
	itemSize: number;
};
export type TreeProps = {
	emptyText: string;
	nodeKey: string; //
	nodeHeight: number;
	disabled:boolean
	multiple:boolean,
	props: Partial<{
		value: string | number;
		label: string;
		children: string;
		disabled: string;
		class: string | Function;
	}>;
	renderAfterExpand: boolean; //
	// load:Function //
	// renderContent:Function //

	highlightCurrent: boolean;
	defaultExpandAll: boolean; //
	expandOnClickNode: boolean;
	checkOnClickNode: boolean;
	autoExpandParent: boolean;
	defaultExpandedKeys: (string | number)[];
	showCheckbox: boolean;
	checkStrictly: boolean;
	defaultCheckedKeys: (string | number)[];
	currentNodeKey: string | number;
	accordion: boolean;
	indent: number;
	icon: string | Component;
	lazy: boolean;
	draggable: boolean;
	allowDrag: VXF_PUB.AsyncFunctionJson | VXF_PUB.SyncFunctionJson | ((node: Record<string, any>) => boolean);
	allowDrop: VXF_PUB.AsyncFunctionJson | VXF_PUB.SyncFunctionJson | ((draggingNode: Record<string, any>, node: Record<string, any>, type: "prev" | "inner" | "next") => boolean);
	itemSize: number;
};

export type VmoDirTreeProps = {
	title: string;
	disabled:boolean,
	type: "ElTree" | "ElTreeV2";
	searchInputProps: Partial<InputProps>;
	data: Record<string, any>[] | (() => Promise<Record<string, any>[]>);
	nodeOptionButtons:
		| (Partial<ButtonProps> & { action: (data: Record<string, any>) => void }[])
		| ((data: Record<string, any>) => Partial<ButtonProps> & { action: (data: Record<string, any>) => void }[]);
	listTreeProps: Partial<TreeV2Props | TreeProps>;
	labelKeys:string[], // 作为 label 的属性，允许拼装
	headerHeight: number;
};

export default defineComponent({
	name: "vmo-dir-tree",
	components: { ElInput, ElTree, ElTreeV2, ElPopover, ElScrollbar },
	props: {
		modelValue: {
			type: [Array] as PropType<(string | number)[]>,
			default: () => [],
		},
		// 暂未实现，实现后，将可以选择普通书，或者虚拟节点树，来提升性能
		type: {
			type: String as PropType<"ElTree" | "ElTreeV2">,
			default: "ElTree",
		},
		// 树型过滤器标题，支持直接用 title 作为插槽
		title: {
			type: String as PropType<string>,
			default: "",
		},
		// 搜索框的输入配置
		searchInputProps: {
			type: Object as PropType<Partial<InputProps>>,
			default: () => ({}),
		},
		// 树状数据获取方法，支持异步函数
		data: {
			type: [Array, Function] as PropType<Record<string, any>[] | (() => Promise<Record<string, any>[]>)>,
			default: () => [],
		},
		// 节点操作按钮配置，支持数组或者返回数组的函数，函数接受该节点为入参
		nodeOptionButtons: {
			type: [Array, Function] as PropType<
				| (Partial<ButtonProps> & { action: (data: Record<string, any>) => void }[])
				| ((data: Record<string, any>) => Partial<ButtonProps> & { action: (data: Record<string, any>) => void }[])
			>,
			default: () => [
				{
					label: "新增",
					action: (data: any) => {
						console.log(data);
					},
				},
			],
		},
		disabled:{
			type:Boolean as PropType<boolean>,
			default:false,
		},
		// 下拉树的配置
		listTreeProps: {
			type: Object as PropType<Partial<TreeV2Props | TreeProps>>,
			default: () => ({}),
		},
		// 搜索面板高度
		headerHeight: {
			type: Number as PropType<number>,
			default: 75,
		},
	},
	emits: [
		"node-click",
		"node-contextmenu", 
		"check-change", 
		"check", 
		"current-change",
		"node-expand",
		"node-collapse",
		"node-drag-start",
		"node-drag-enter",
		"node-drag-leave",
		"node-drag-over",
		"node-drag-end",
		"node-drop",
		"update:modelValue", 
		"create"],
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		const isLoading= ref(false);
		const searchContent = ref("");
		const ElTreeRef = ref(null as any);
		const innerData = ref([] as Record<string, any>[]);
		const computedSearchInputProps = computed(
			() =>
				mergeDeepRight(
					{
						placeholder: "请输入",
						size: "default",
					} as Partial<InputProps>,
					props.searchInputProps,
				) as Partial<InputProps>,
		);
		const computedListTreeProps = computed(
			() =>
				mergeDeepRight(
					{
						itemSize: 40,
						nodeHeight: 36,
						draggable: true,
						nodeKey: "value",
						props: {
							value: "value",
							label: "label",
						},
						allowDrag: function (node) {
							return node.data.label != "a1";
						},
						allowDrop: function (draggingNode, dropNode, type) {
							return true;
						},
					} as Partial<TreeProps>,
					props.listTreeProps,
				) as Record<string, any>,
		);
		const computedInnerData = computed(() => {
			return VmoTree.map(
				(node) => {
					node.option = Array.isArray(props.nodeOptionButtons) ? props.nodeOptionButtons : (props.nodeOptionButtons as Function)(node);
					return node;
				},
				innerData.value,
				"children",
			);
		});
		onMounted(async () => {
			queryTreeData();
		});
		watch(
			() => props.data,
			async (n, o) => {
				innerData.value = isArray(props.data) ? props.data : await props.data();
			},
			{ deep: true, immediate: true },
		);
		async function queryTreeData() {
			innerData.value = isArray(props.data) ? props.data : await props.data();
		}
		function filterMethod(value: string, data: Record<string, any>, node: Record<string, any>) {
			// console.log(value, data);
			return (data[computedListTreeProps.value.props.label] as string).toUpperCase().includes(value.toUpperCase());
		}
		function check(...args: any[]) {
			console.log(...args)
			context.emit("check", ...args);
			context.emit("update:modelValue", args[1].checkedKeys);
		}
		return {
			proxy,
			ElTreeRef,
			context,
			searchContent,
			computedInnerData,
			computedSearchInputProps,
			computedListTreeProps,
			isLoading,
			clone,
			omit,
			filterMethod,
			queryTreeData,
		};
	},
});
</script>

<style lang="css">
.vmo-dir-tree {
	@apply flex-col;
}

.vmo-dir-tree .title {
	@apply flex-row items-center text-base text-dark-32 dark:text-light-32 mb-[6px];
}

.vmo-dir-tree .search {
	@apply flex-row;
}

.vmo-dir-tree .search .icon {
	@apply w-[20px] h-[20px] flex-row items-center justify-center;
}

.vmo-dir-tree .search .button {
	@apply flex-row items-center justify-center ml-[5px] w-[30px] h-[30px] shrink-0 rounded font-bold text-base text-white bg-p-10 border border-p-10 cursor-pointer hover:bg-p-6 transition-all duration-150;
}

.vmo-dir-tree .el-input__wrapper {
	padding: 1px 8px !important;
}

.vmo-dir-tree .el-tree {
	--el-tree-node-content-height: computedListTreeProps.value.nodeHeight + "px";
}

.vmo-dir-tree .header {
	@apply p-[15px] flex-col justify-center border-b bg-dark-1 border-dark-3 dark:bg-light-1 dark:border-light-3;
}
</style>
