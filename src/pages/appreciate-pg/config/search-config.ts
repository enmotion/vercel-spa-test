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
		title: {
			component: "ElInput", // 表单组件
			debounceDelay: 0,
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				class: "grow-1 h-[30px]",
				clearable: true,
				placeholder: "亮点名称",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					label: {
						html: "亮点名称",
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
		gradeLevel: {
			component: "ElTreeSelect",
			props: {
				multiple: false,
				clearable: true,
				placeholder: "学龄等级",
				data: [
					{ label: "初级", value: 1 },
					{ label: "中级", value: 2 },
					{ label: "高级", value: 3 },
				],
			},
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-0",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "学龄等级",
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
		// definition: {
		// 	component: "ElInput", // 表单组件
		// 	debounceDelay: 0,
		// 	// propagateUpEvents: "change", //提交事件
		// 	/* 组件prop 属性配置 */
		// 	props: {
		// 		class: "grow-1 h-[30px]",
		// 		clearable: true,
		// 		placeholder: "亮点定义",
		// 	},
		// 	/* 组件容器配置 */
		// 	item: {
		// 		type: "Div",
		// 		class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
		// 		layout: "horizontal",
		// 		props: {
		// 			// 标签
		// 			label: {
		// 				html: "亮点定义",
		// 				class: defaultLabelClass,
		// 			},
		// 			// 尾缀
		// 			// append: {
		// 			//   html: "",
		// 			// },
		// 		},
		// 		grid: {
		// 			col: 2, // 组件所占列数
		// 			row: 1, // 组件所占行数
		// 		},
		// 	},
		// },
		difficultyLevel: {
			component: "ElTreeSelect",
			props: {
				multiple: false,
				clearable: true,
				placeholder: "难度等级",
				data: [
					{ label: "等级1", value: 1 },
					{ label: "等级2", value: 2 },
					{ label: "等级3", value: 3 },
					{ label: "等级4", value: 4 },
					{ label: "等级5", value: 5 },
				],
			},
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-0",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "难度等级",
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
		
		status: {
			component: "ElTreeSelect",
			props: {
				multiple: false,
				clearable: true,
				placeholder: "亮点状态",
				data: [
					{ label: "激活", value: true },
					{ label: "失活", value: false },
				],
			},
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-0",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "亮点状态",
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
						col: 2, // 窄屏列数
						row: 1, // 窄屏行数
						gap: 10, // 窄屏间隔
					},
					wide: {
						col: 6, // 宽屏列数
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
		createdAt: {
			component: "ElDatePicker", // 表单组件
			debounceDelay: 0,
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				class: "grow-1 h-[30px]",
				clearable: true,
				startPlaceholder: "开始时间",
				endPlaceholder: "结束时间",
				type: "datetimerange",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "创建时间",
						class: defaultLabelClass,
					},
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
				startPlaceholder: "开始时间",
				endPlaceholder: "结束时间",
				type: "datetimerange",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "更新时间",
						class: defaultLabelClass,
					},
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
