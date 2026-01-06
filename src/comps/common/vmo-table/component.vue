<template>
	<!-- 定义一个 Element Plus 的表格组件 -->
	<div class="vmo-table">
		<div class="header-row">
			<div class="cell">
				<el-button 
					v-for="(item,index) in computedBatchOptions" 
					:key="item.label"
					v-bind="item"
					@click="batchOptionsOnClick(item)"
				>
					{{ item.label }}
				</el-button>
			</div>
			<div class="cell">
				<div v-if="useDisplayModeSwitch"
					:class="[displayAnchorClass,'reference']"
					@click="swtichDisplayMode()"
				></div>
				<el-popover
					v-if="currentDisplayMode == 'table'"
					placement="left"
					:width="200"
					trigger="click"
				>
					<template #reference>
						<div
							:class="[fieldsAnchorClass,'reference']"
						>
						</div>
					</template>
					<div class="fields-title">
						表格列显示管理
					</div>
					<div v-for="(item, index) in tableColumns"
						:key="index"
						class="fields-button"
						@click.capture.stop ="item.invisible=!item.invisible"
					>
						<el-checkbox :model-value="!item.invisible"
							class="mr-[10px] pointer-events-none"
							:disabled="!!item.fixed"
							@change="item.invisible = !$event"
						/>
						<span>{{ item.label }}</span>
					</div>
				</el-popover>
			</div>
		</div>
		<div v-resize="(rec: DOMRect) => {
				vesselHeight = rec.height
			}"
			class="flex-row grow-1 h-0"
		>
			<slot v-if="currentDisplayMode == 'custome'"
				name="display"
				v-bind="{tableData}"
			></slot>
			<el-table
				v-if="currentDisplayMode == 'table'"
				ref="ElTableRef"
				:data="tableData"
				v-bind="computedProps"
				v-loading="isLoading"
				class="table-instance"
				:row-key="computedProps.rowKey ?? 'id'"
				@select="(...params: any[]) => context.emit('select', ...params)"
				@select-all="(...params: any[]) => context.emit('select', ...params)"
				@selection-change="selectionChange"
				@cell-mouse-enter="(...params: any[]) => context.emit('cell-mouse-enter', ...params)"
				@cell-mouse-leave="(...params: any[]) => context.emit('cell-mouse-leave', ...params)"
				@cell-click="(...params: any[]) => context.emit('cell-click', ...params)"
				@cell-dblclick="(...params: any[]) => context.emit('cell-dblclick', ...params)"
				@cell-contextmenu="(...params: any[]) => context.emit('cell-contextmenu', ...params)"
				@row-click="(...params: any[]) => context.emit('row-click', ...params)"
				@row-contextmenu="(...params: any[]) => context.emit('row-contextmenu', ...params)"
				@row-dblclick="(...params: any[]) => context.emit('row-dblclick', ...params)"
				@header-click="(...params: any[]) => context.emit('header-click', ...params)"
				@header-contextmenu="(...params: any[]) => context.emit('header-contextmenu', ...params)"
				@sort-change="(...params: any[]) => context.emit('sort-change', ...params)"
				@filter-change="(...params: any[]) => context.emit('filter-change', ...params)"
				@current-change="(...params: any[]) => context.emit('current-change', ...params)"
				@header-dragend="(...params: any[]) => context.emit('header-dragend', ...params)"
				@expand-change="(...params: any[]) => context.emit('expand-change', ...params)"
				@scroll="(...params: any[]) => context.emit('scroll', ...params)"
				@node:click="context.emit('node:click', $event)"
			>
				<el-table-column v-for="(item, index) in computedColumns"
					:key="(item.prop as string) + (item.type as string) + index"
					:column-key="(item.prop as string) + (item.type as string) + index"
					:prop="item.prop"
					:label="item.label ?? item.prop" 
					v-bind="item"
				>
					<template 
						v-if="context.slots[((item.slot ?? item.prop) as string) + '_header']"
					>
						<slot 
							:name="(item.slot ?? item.prop) + '_header'"
						>
						</slot>
					</template>
					<template v-if="!['selection', 'index'].includes(item?.type as string) && !item.formatter"
						#default="scope"
					>
						<slot v-if="context.slots[(item.slot ?? item.prop) as string]"
							:name="item.slot ?? item.prop"
							v-bind="scope"
						>
						</slot>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style lang="css">
.vmo-table{
	@apply !flex-col grow-1 shrink-1 border-none
}
.vmo-table .header-row{
	@apply flex-row items-center justify-between mb-[15px]
}
.vmo-table .header-row .cell{
	@apply flex-row items-center flex-nowrap
}
.vmo-table .header-row .reference{
	@apply h-[30px] w-[30px] flex-row items-center justify-center text-lg font-normal rounded border border-gray-300 hover:bg-p-10 hover:text-white hover:border-p-10 dark:border-light-3 dark:text-light-32 cursor-pointer mr-[5px] last:mr-[0px] transition-all duration-150
}
.fields-title{
	@apply h-[20px] text-sm mb-[10px] flex-row
}
.fields-button{
	@apply h-[30px] flex-row items-center px-[10px] mb-[3px] border rounded text-xs cursor-pointer !border-y border-dark-3 text-dark-32 hover:bg-dark-2	dark:border-light-3 dark:text-light-32 dark:hover:bg-dark-4	transition-all duration-150
}
.vmo-table .table-instance{
	@apply w-0 grow-1 border-t border-dark-3 dark:border-light-3
}
</style>

<script lang="ts">
import * as R from "ramda";
import { defineComponent, computed, ref, watch, getCurrentInstance } from "vue";
import type { PropType, StyleValue } from "vue";
import { ElTable, ElTableColumn, ElPopover, ElCheckbox } from "element-plus";
import type { VmoTable } from "@src/comps/common/vmo-table/types";
import { resize } from "@src/use.lib/publicDirectives";

import type { ButtonProps, TagProps } from "element-plus";
import type { Mutable } from "element-plus/es/utils/typescript";

export type BatchButton = Partial<Mutable<ButtonProps>> & {
	// 按钮标签
	label: string;
	// 按钮行为 proxy 就是当前表格组件的实例 proxy 它可以访问到更上层的实例
	action: string | ((selects:any[],proxy:Record<string,any>)=>any);
	// 可指定通过什么事件，在 action 为字符串时，通过 { action: b.action, row, column, value, index } 将事件传递到外部组件
	emitEvent?: string;
	// 指定按钮的 CSS 类名
	class?: string;
	// 指定按钮的样式
	style?: StyleValue;
};
export type OptionButton = Partial<Mutable<ButtonProps>> & {
	// 按钮标签
	label: string;
	// 按钮行为 proxy 就是当前表格组件的实例 proxy 它可以访问到更上层的实例
	action: string | ((proxy: any, row: Record<string, any>, column: Record<string, any>, value: any, index: number) => any);
	// 可指定通过什么事件，在 action 为字符串时，通过 { action: b.action, row, column, value, index } 将事件传递到外部组件
	emitEvent?: string;
	// 指定按钮的 CSS 类名
	class?: string;
	// 指定按钮的样式
	style?: StyleValue;
};
export default defineComponent({
	// 组件名称
	name: "vmo-table",
	// 引入 Element Plus 的表格和表格列组件
	components: { ElTable, ElTableColumn, ElPopover, ElCheckbox },
	// 组件接收的属性
	props: {
		/**
			 * 表格的渲染数据
			 * 支持传入数组或异步函数：
			 * - 数组：直接作为表格数据
			 * - 异步函数：用于获取表格数据，可实现接口形式，方便配置
			 */
		data: {
			type: [Array, Function] as PropType<Record<string, any>[] | ((...args: any[]) => Promise<Record<string, any>[]> | void)>,
			default: () => [],
		},
		/**
			 * 表格是否支持多选
			 * 默认都是多选的情况
			 */
		multiple: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		/**
			 * multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
			 */
		multipleLimit: {
			type: Number as PropType<number>,
			default: 0
		},
		/**
			 * 表格是否禁用相关操作
			 * true: 禁用；false: 启用
			 */
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		/**
		 * 字段控制锚点样式
		 */
		fieldsAnchorClass:{
			type: String as PropType<string>,
			default:"iconfont vmo-icon-table_header"
		},
		useDisplayModeSwitch:{
			type:Boolean as PropType<boolean>,
			default:false,
		},
		defaultDisplayMode:{
			type: String as PropType<'table'|'custome'>,
			default:'table',
		},
		/**
		 * 显示控制锚点样式
		 */
		displayAnchorClass:{
			type: String as PropType<string>,
			default:"iconfont vmo-icon-grid_line"
		},
		batchOptions:{
			type:[Array,Function] as PropType<BatchButton[] | ((proxy:any)=>BatchButton[])>,
			default:()=>[]
		},
		/**
			 * 指定 table 交互控制的上下文
			 * 若不指定，则使用当前实例的 proxy 注入到外部方法
			 */
		proxy: {
			type: [Object, null] as PropType<VmoTable.Table>,
			default: null,
		},
		/**
			 * 表格属性的配置
			 * 支持传入对象或函数：
			 * - 对象：直接作为表格属性配置
			 * - 函数：可根据当前实例的上下文 proxy 生成配置
			 */
		props: {
			type: [Object, Function] as PropType<VmoTable.Table>,
			default: () => ({}),
		},
		/**
			 * 表格列的配置
			 * 支持传入数组或函数：
			 * - 数组：直接作为表格列配置
			 * - 函数：可根据当前实例的上下文 proxy 生成配置
			 */
		columns: {
			type: [Array, Function] as PropType<VmoTable.Column>,
			default: () => [],
		},
	},
	directives: { resize },
	// 组件触发的事件
	emits: [
		"select",
		"select-all",
		"selection-change",
		"cell-mouse-enter",
		"cell-mouse-leave",
		"cell-click",
		"cell-dblclick",
		"cell-contextmenu",
		"row-click",
		"row-contextmenu",
		"row-dblclick",
		"header-click",
		"header-contextmenu",
		"sort-change",
		"filter-change",
		"current-change",
		"header-dragend",
		"expand-change",
		"scroll",
		"node:click",
		"update:select",
		"batch:click"
	],
	setup(props, context) {
		// 获取当前实例的 proxy，用于传递到外部
		const { proxy } = getCurrentInstance() as { proxy: any };
		const currentDisplayMode = ref(props.defaultDisplayMode)
		const selection = ref([] as Record<string,any>[])
		const vesselHeight = ref(0);
		// 操作防抖
		const debounceTimer = ref(null as any);
		// 是否是加载状态
		const isLoading = ref(false);
		// 定义表格实例的引用
		const ElTableRef = ref(null as any);
		// 定义表格内部的数据
		const tableData = ref([] as Record<string, any>[]);

		const computedBatchOptions = computed(()=>{
			(selection.value)
			return Array.isArray(props.batchOptions) ? props.batchOptions : props.batchOptions(proxy)
		})
		// 计算表格的属性，实现默认值配置
		const computedProps = computed(() => {
			// 如果 props 是对象，则直接使用；否则调用函数生成配置
			const p = typeof props.props === "object" ? props.props : props.props(props.proxy ?? proxy);
			// 合并默认值和用户配置
			return R.mergeDeepRight(
				{
					height: Math.max(vesselHeight.value, 10),
					multiple: true,
					multipleLimit: 0
				},
				p
			);
		});
		const tableColumns = ref([] as VmoTable.ColumnRaw[])

		watch(() => props.columns, (n, o) => {
			tableColumns.value = Array.isArray(props.columns) ? props.columns : props.columns(props.proxy ?? proxy);
		}, { immediate: true, deep: true })

		// 计算表格列的属性，实现默认值配置
		const computedColumns = computed(() => {
			// 如果 columns 是数组，则直接使用；否则调用函数生成配置
			const ps = (tableColumns.value as VmoTable.ColumnRaw[]).filter(item => !item.invisible)
			// 为每一列设置默认的最小宽度和溢出提示
			return ps.map((item) => {
				// 如果没有指定最小宽度，则根据列标题或字段名的长度计算
				item.minWidth = [String, Number].includes(item.minWidth?.constructor as any) ? item.minWidth : (item.label ?? (item.prop as string)).length * 16 + 40;
				// 如果没有指定溢出提示，则默认开启
				item.showOverflowTooltip = item.showOverflowTooltip ?? true;
				return item;
			});
		});

		/**
			 * 监测外部传入的数据对象是否发生变化
			 * 如果发生变化，则调用 getTableData 方法更新内部的 tableData
			 */
		watch(
			() => props.data,
			(n, o) => {
				// 如果新数据存在，则更新表格数据
				if (n) {
					getTableData();
				}
			},
			{ immediate: true, deep: true },
		);

		/// 更新表格内的数据
		async function getTableData() {
			try {
				if (Array.isArray(props.data)) {
					// 如果传入的是数组，直接赋值给 tableData
					tableData.value = props.data;
				} else {
					isLoading.value = true;
					// 如果传入的是函数，调用函数并将结果赋值给 tableData
					tableData.value = (await props.data(props.proxy, proxy)) ?? [];
					isLoading.value = false;
				}
			} catch (err) {
				console.error(err);
				isLoading.value = false
			}
		}
		function batchOptionsOnClick(item:BatchButton){
			if(typeof item.action=='string'){
				context.emit("batch:click",item.action)
			}else{
				item.action(selection.value, proxy)
			}
		}
		// 表格选择时触发函数
		function selectionChange(newSelection: any[]): void {
			selection.value = newSelection
			// 如果多选未能开启
			if (!computedProps.value.multiple) {
				selection.value = newSelection.at(-1);
				newSelection.slice(0, -1)?.forEach?.(row => {
					ElTableRef.value.toggleRowSelection(row, false)
				})
			}
			// 如果多选开启，但是存在数量限制
			if (computedProps.value.multipleLimit != 0 && newSelection.length > computedProps.value.multipleLimit) {
				newSelection.slice(computedProps.value.multipleLimit)?.forEach?.(row => {
					ElTableRef.value.toggleRowSelection(row, false)
				});
				proxy.$message({
					message: `选项不可超过上限[${computedProps.value.multipleLimit}],重复点击选框,可减少选项!`,
					type: 'error'
				});
				selection.value = newSelection.slice(0, props.multipleLimit);
			}
			// 以防抖的方式返回以上内容
			clearTimeout(debounceTimer.value)
			debounceTimer.value = setTimeout(() => {
				context.emit('selection-change', selection.value);
			}, 0)
		}

		function swtichDisplayMode(){
			currentDisplayMode.value = currentDisplayMode.value == 'table'? 'custome':'table';
		}
		return {
			proxy,
			debounceTimer,
			context,
			tableData,
			ElTableRef,
			computedProps,
			computedBatchOptions,
			tableColumns,
			computedColumns,
			isLoading,
			vesselHeight,
			selection,
			currentDisplayMode,
			swtichDisplayMode,
			batchOptionsOnClick,
			selectionChange,
			getTableData,
		};
	},
});
</script>
