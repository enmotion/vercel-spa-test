/*
 * @Author: enmotion
 * @Date: 2025-02-18 09:56:59
 * @Last Modified by: enmotion
 * @Last Modified time: 2025-02-20 12:19:22
 */

import type { VNode, RendererNode, RendererElement } from "vue";
import type { TableProps, ElTooltipProps } from "element-plus";

/**
 * vmo-table 组件所的类型命名空间
 */
export declare namespace VmoTable {
	export type TableRaw = Partial<
		TableProps<Record<string, any>> & {
			// 表格的选择结果，将通过 vmo-tabel @selection-change 事件中抛出
			multiple:boolean, // 是否开启表格的多选, 开启后将会返回一个数组 不开启，选择时，只会返回当前的选项
			multipleLimit:number // 多选限制，超过限制时，会有提示
		}
	>;
	export type ColumnRaw = Partial<{
		type: "default" | "selection" | "index" | "expand";
		index: number | ((index: number) => number);
		invisible?:boolean,
		label: string;
		columnKey: string;
		prop: string;
		width: string | number;
		minWidth: number | string;
		fixed?: boolean | "left" | "right";
		renderHeader: (data: { column: any; $index: number }) => VNode<RendererNode, RendererElement, { [key: string]: any }>;
		sortable: boolean | string;
		sortMethod: <T = any>(a: T, b: T) => number;
		sortBy: ((row: any, index: number) => string) | string | string[];
		sortOrders: ("ascending" | "descending" | null)[];
		resizable: boolean;
		formatter: (row: any, column: any, cellValue: any, index: number) => VNode | string;
		showOverflowTooltip: boolean | Partial<ElTooltipProps>;
		align: "left" | "center" | "right";
		headerAlign: "left" | "center" | "right";
		className: string;
		labelClassName: string;
		selectable: (row: Record<string, any>, index: number) => boolean;
		reserveSelection: boolean;
		filters: { text: string; value: string }[];
		filterPlacement: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
		filterClassName: string;
		filterMultiple: boolean;
		filterMethod: (value: any, row: any, column: any) => void;
		filteredValue: string[];
		tooltipFormatter: (data: { row: any; column: any; cellValue: any }) => VNode | string;
		slot?: string;
	}>;
	export type Table = TableRaw | ((proxy: any) => Partial<TableRaw>);
	export type Column = ColumnRaw[] | ((proxy: any) => ColumnRaw[]);
}
