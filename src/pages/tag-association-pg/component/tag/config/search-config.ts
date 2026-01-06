import type { VXF_JSON, VXF_PUB } from "vmo-x-form";

// 公共label 样式
const defaultLabelClass = "text-sm text-gray-600 h-[30px] rounded-l";
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
						col: 8, // 宽屏列数
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
		name: {
			component: "ElInput", // 表单组件
			debounceDelay: 0,
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				class: "grow-1 h-[30px]",
				clearable: true,
				placeholder: "标签名称",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					// label: {
					// 	html: "标签名称",
					// 	class: defaultLabelClass,
					// },
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
export const expandSearchFormProps: Partial<VXF_JSON.CompProp<{}>> = {
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
						col: 1, // 窄屏列数
						row: 1, // 窄屏行数
						gap: 10, // 窄屏间隔
					},
					wide: {
						col: 1, // 宽屏列数
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
		key: {
			component: "ElInput", // 表单组件
			debounceDelay: 0,
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				class: "grow-1 h-[30px]",
				clearable: true,
				placeholder: "标签编码",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					// 标签
					// label: {
					// 	html: "标签编码",
					// 	class: defaultLabelClass,
					// },
					// 尾缀
					// append: {
					//   html: "",
					// },
				},
				grid: {
					col: 1, // 组件所占列数
					row: 1, // 组件所占行数
				},
			},
		},
		description: {
			component: "ElInput", // 表单组件
			debounceDelay: 0,
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				class: "grow-1 h-[30px]",
				clearable: true,
				placeholder: "标签描述",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					// 标签
					// label: {
					// 	html: "标签描述",
					// 	class: defaultLabelClass,
					// },
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
		status: {
			component: "ElTreeSelect",
			props: {
				multiple: false,
				clearable: true,
				placeholder: "标签状态",
				data: [
					{ label: "正常", value: true },
					{ label: "禁用", value: false },
				],
			},
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-0",
				layout: "horizontal",
				props: {
					// 标签
					// label: {
					// 	html: "标签状态",
					// 	class: defaultLabelClass,
					// },
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
		createdAt: {
			component: "ElDatePicker", // 表单组件
			debounceDelay: 0,
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				class: "grow-1 h-[30px]",
				clearable: true,
				startPlaceholder: "创建开始时间",
				endPlaceholder: "创建结束时间",
				type: "datetimerange",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					// 标签
					// label: {
					// 	html: "创建时间",
					// 	class: defaultLabelClass,
					// },
					// 尾缀
					// append: {
					//   html: "",
					// },
				},
				grid: {
					col: 3, // 组件所占列数
					row: 1, // 组件所占行数
				},
			},
		},
		updatedAt: {
			component: "ElDatePicker", // 表单组件
			debounceDelay: 0,
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				class: "grow-1 h-[30px]",
				clearable: true,
				startPlaceholder: "变更开始时间",
				endPlaceholder: "变更结束时间",
				type: "datetimerange",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					// 标签
					// label: {
					// 	html: "更新时间",
					// 	class: defaultLabelClass,
					// },
					// 尾缀
					// append: {
					//   html: "",
					// },
				},
				grid: {
					col: 3, // 组件所占列数
					row: 1, // 组件所占行数
				},
			},
		},
	},
};
