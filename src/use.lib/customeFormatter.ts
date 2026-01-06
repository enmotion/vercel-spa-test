/*
 * @Author: enmotion
 * @Date: 2025-02-20 15:20:40
 * @Last Modified by: enmotion
 * @Last Modified time: 2025-02-20 15:57:29
 */

// 从 Vue 库中导入 h 函数，h 函数用于创建虚拟节点（VNode）
import { h } from "vue";
// 导入 dayjs 库并将其重命名为 D，dayjs 用于处理日期和时间
import D from "dayjs";
// 从 ramda 库中导入 omit、mergeAll 和 clone 函数
// omit 用于从对象中移除指定的属性
// mergeAll 用于合并多个对象
// clone 用于克隆对象
import { omit, mergeAll, clone } from "ramda";
// 从 element-plus 库中导入 ElTag 和 ElButton 组件
import { ElTag, ElButton } from "element-plus";
// 从 element-plus 库中导入 ButtonProps 和 TagProps 类型，用于定义按钮和标签的属性
import type { ButtonProps, TagProps } from "element-plus";
// 从 Vue 库中导入 VNode 和 StyleValue 类型
// VNode 表示虚拟节点
// StyleValue 表示样式值
import type { VNode, StyleValue } from "vue";
// 从 element-plus 库的类型工具模块中导入 Mutable 类型，用于将只读类型转换为可变类型
import type { Mutable } from "element-plus/es/utils/typescript.mjs";

/**
 * RowCondition 类型定义表单行信息
 * 在 ELTableColumn 组件的配置中，可使用 formatter 函数进行更灵活的值转换或虚拟节点渲染
 * @property {Record<string, any>} row - 当前行的数据对象
 * @property {Record<string, any>} column - 当前列的数据对象
 * @property {any} value - 当前单元格的值
 * @property {number} index - 当前行的索引
 */
export type RowCondition = {
	row: Record<string, any>;
	column: Record<string, any>;
	value: any;
	index: number;
};

/**
 * TagItem 类型定义虚拟节点标签
 * 依据该类型可以渲染出需要的转义标签
 * @property {Partial<TagProps>} - 部分标签属性
 * @property {string} label - 标签显示的文本
 */
export type TagItem = Partial<TagProps> & { label: string };

/**
 * OptionButton 类型定义操作按钮
 * 依据此类型，可以创建虚拟节点的操作按钮，如 编辑，查看，删除等
 * @property {Partial<Mutable<ButtonProps>>} - 部分可变的按钮属性
 * @property {string} label - 按钮显示的文本
 * @property {string | function} action - 按钮的行为
 *                                   - 当为字符串时，通过事件传递相关信息到外部组件
 *                                   - 当为函数时，直接执行该函数
 * @property {string} [emitEvent] - 可指定通过什么事件，在 action 为字符串时，将事件传递到外部组件
 * @property {string} [class] - 指定按钮的 CSS 类名
 * @property {StyleValue} [style] - 指定按钮的样式
 */
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

/**
 * Formatter 类型定义格式化函数
 * 该函数接受行数据、列数据、单元格值和行索引作为参数，返回字符串或虚拟节点
 * @param {Record<string, any>} row - 当前行的数据对象
 * @param {Record<string, any>} column - 当前列的数据对象
 * @param {any} value - 当前单元格的值
 * @param {number} index - 当前行的索引
 * @returns {string | VNode} - 格式化后的结果，可以是字符串或虚拟节点
 */
export type Formatter = (row: Record<string, any>, column: Record<string, any>, value: any, index: number) => string | VNode;

/**
 * 标签格式化方法
 * @param {Record<string | number, TagItem>} tagMapping - 标签映射数组，键为值，值为 TagItem 对象
 * @returns {Formatter} - 返回一个格式化函数，根据映射结果渲染标签
 */
export function tagFormatter(tagMapping: Record<string | number, TagItem>): Formatter {
	return (row, column, value, index) => {
		// 根据当前单元格的值从标签映射中获取对应的标签配置
		const tag = tagMapping[value] ?? null;
		// 使用 h 函数创建 ElTag 虚拟节点，并设置标签类型和显示文本
		return !!tag ? h(ElTag, { type: tag.type }, () => tag.label ?? "未知:" + value) : "-";
	};
}

/**
 * 按钮生成转换器
 * @param {function} generator - 接受当前行参数，生成一个按钮数组的函数
 * @param {any} [proxy] - 在按钮的行为中，指定它的上下文对象
 * @returns {Formatter} - 返回一个格式化函数，用于渲染操作按钮
 */
export function oprationFormatter(generator: (row: Record<string, any>, column: Record<string, any>, value: any, index: number) => OptionButton[], proxy?: any): Formatter {
	return (row, column, value, index) => {
		// 调用 generator 函数生成按钮数组
		const buttons = generator(row, column, value, index);
		// 使用 h 函数创建一个 div 虚拟节点，用于包裹所有按钮
		const node = h(
			"div",
			{ class: " flex-row items-center justify-center" },
			// 遍历按钮数组，为每个按钮创建 ElButton 虚拟节点
			buttons.map((b) =>
				h(
					ElButton,
					// 合并按钮属性，移除不需要的属性，并添加点击事件处理函数
					mergeAll([
						omit(["label", "action", "visible"], b),
						{
							onClick: () => {
								if (typeof b.action === "string") {
									// 如果 action 是字符串，通过事件传递相关信息到外部组件
									proxy.context.emit(b.emitEvent ?? "node:click", { action: b.action, row, column, value, index });
								} else {
									// 如果 action 是函数，直接执行该函数
									b.action(proxy, row, column, value, index);
								}
							},
						},
					]),
					// 设置按钮显示的文本
					() => b.label,
				),
			),
		);
		// 返回生成的虚拟节点
		return node;
	};
}

/**
 * 日期时间转换方法
 * @param {string} [format="YYYY-MM-DD  HH:mm:ss"] - 转换后的日期格式
 * @param {number} [transform=1000] - 转换系数，日期值乘以该系数，如果日期值非数值类型，则不会采用转化系数
 * @returns {Formatter} - 返回一个格式化函数，用于将日期值转换为指定格式的字符串
 */
export function dateTimeFormatter(format: string = "YYYY-MM-DD  HH:mm:ss", transform: number = 1000): Formatter {
	return (row, column, value, index) =>
		// 如果日期值不为 0，则进行日期格式化
		value != 0 && value != undefined
			? D(typeof value === "number" ? value * transform : value).format(format)
			: // 如果日期值为 0，则显示为 -
				"-";
}

/**
 * 过去时间格式化转化用法 暂时启用 未来扩展
 * @param {string} [format="YYYY-MM-DD HH:mm:ss"] - 转换后的日期格式，这里暂时用不到
 * @param {number} [transform=1000] - 转换系数，输入日期值乘以该系数在进行计算，避免时间戳取位不一致
 * @returns {Formatter} - 返回一个格式化函数，用于将日期值转换为指定格式的字符串
 */
export function passdTimeFormatter(format: string = "YYYY-MM-DD HH:mm:ss", transform: number = 1000): Formatter {
	return (row, column, value, index) => {
		if (value === 0) {
			return "-";
		}
		const currentTime = Date.now();
		const targetTime = D(typeof value == "string" ? value : value * transform);
		const seconds = D(currentTime).diff(D(targetTime), "second");
		const minutes = D(currentTime).diff(D(targetTime), "minute");
		const hours = D(currentTime).diff(D(targetTime), "hour");
		const days = D(currentTime).diff(D(targetTime), "day");
		const type = seconds < 0 ? "后" : "前";
		if (Math.abs(seconds) < 60) {
			return `${Math.abs(seconds)}秒钟${type}`;
		} else if (Math.abs(minutes) < 60) {
			return `${Math.abs(minutes)}分钟${type}`;
		} else if (Math.abs(hours) < 24) {
			return `${Math.abs(hours)}小时${type}`;
		} else if (Math.abs(days) < 7) {
			return `${Math.abs(days)}天${type}`;
		} else {
			return D(targetTime).format(format);
		}
	};
}

/**
 * 过去时间格式化转化用法 暂时启用 未来扩展
 * @param {string} [format="YYYY-MM-DD HH:mm:ss"] - 转换后的日期格式，这里暂时用不到
 * @param {number} [transform=1000] - 转换系数，输入日期值乘以该系数在进行计算，避免时间戳取位不一致
 * @returns {Formatter} - 返回一个格式化函数，用于将日期值转换为指定格式的字符串
 */
export function birthToAgeFormatter(): Formatter {
	return (row, column, value, index) => {
		return value ? D(Date.now()).diff(value, "years").toString() : "-";
	};
}

// console.error(passdTimeFormatter("YYYY-MM-DD", 1000)({}, {}, "2025-02-20 15:56:12", 1));
