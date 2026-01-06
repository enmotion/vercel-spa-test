import type { VXF_JSON, VXF_PUB } from "vmo-x-form";

// 公共label 样式
const defaultLabelClass = "text-xs text-gray-400 h-[30px] rounded-l";
// 搜索面板配置
export const basicSearchFormProps: Partial<VXF_JSON.CompProp<{}>> = {
	props: {
		/* 容器部分 */
		view: {
			type: "Div",
			class: "-mx-[5px]", // 容器样式
			display: {
				type: "grid", // 布局方式
				reactive: {
					critical: 600, // 宽窄屏幕分割像素值
					narr: {
						col: 2, // 窄屏列数
						row: 1, // 窄屏行数
						gap: 10, // 窄屏间隔
					},
					wide: {
						col: 4, // 宽屏列数
						row: 1, // 宽屏列数
						gap: 10, // 宽屏列数
					},
				},
			},
		},
	},
	/**
	 * 搜索面板表单组件元素配置
	 */
	elements: {
		username: {
			component: "ElInput", // 表单组件
			key: "username",
			debounceDelay: 0,
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				class: "grow-1 h-[30px]",
				clearable: true,
				size: "small",
				placeholder: "please input username...",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "NAME:",
						class: defaultLabelClass,
					},
					// 尾缀
					// append: {
					//   html: "",
					// },
				},
				grid: {
					col: 2, // 组件所占列数
					row: 1, // 组件所占行数
				},
			},
		},
	},
};
