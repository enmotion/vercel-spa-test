import * as R from "ramda";
import type { DrawerFormProps } from "@typs/app-public";
import type { VXF_JSON } from "vmo-x-form";
import { request, apis } from "@src/apis";


export interface ICategory {
  key: string;
  name: string;
  description?: string;
  status: boolean;
  order: number;
  createdUser?: string;
  createdAt: Date;
  updatedUser?: string;
  updatedAt: Date;
}

const publicLabelClass = "w-[90px] flex-row items-center justify-end !mr-[10px]";
const formProps:VXF_JSON.CompProp<{}>={
	component: "VmoXForm",
	debounceDelay: 0,
	props: {
		disabled: false,
		stateKeysUpdate: async function (n, o, state) {
			return state;
		},
		elementsWatcher: async function (state, ui, beforeUpdateStateKeyMap) {
			return ui;
		},
		wrap: {
			type: "Div",
			class: "rounded-b-lg grow-1 rounded -mx-[7px]",
			props: {},
		},
		view: {
			type: "ElForm",
			display: {
				type: "grid",
				reactive: {
					critical: 800,
					wide: { col: 2, minHeight: 32, gap: 20 },
					narr: { col: 1, minHeight: 32, gap: 20 },
				},
			},
			props: {
				labelPosition: "right",
				showMessage: false,
				inlineMessage: true,
			},
		},
		bidiBinding: true,
		isUpdatePending: true,
		steadyElementsSource: false,
	},
	elements: {
		title: {
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 12,
					row: 1,
				},
				props: {
					label: {
						html: "亮点名称",
						class: publicLabelClass,
						tooltip: {
							content: "请输亮点名称",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入亮点名称",
					},
				},
			},
			props: {
				maxlength: 200,
				placeholder: "请输亮点名称",
			},
		},
    key: {
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 12,
					row: 1,
				},
				props: {
					label: {
						html: "优化主键",
						class: publicLabelClass,
						tooltip: {
							content: "主键用于关联用户掌握程度数据统计，必须唯一",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入优化主键",
					},
				},
			},
			props: {
				maxlength: 200,
				placeholder: "请输优化主键",
			},
		},
		definition: {
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				style:{
					"--alignItems":"start"
				},
				grid: {
					col: 12,
					row: 1,
				},
				props: {
					label: {
						html: "亮点定义",
						class: publicLabelClass,
						tooltip: {
							content: "请输入亮点定义",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入亮点定义",
					},
				},
			},
			props: {
				type:"textarea",
				rows:5,
				minlength:10,
				maxlength: 2000,
				showWordLimit:true,
				placeholder: "请输入亮点定义",
			},
		},
		example: {
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				style:{
					"--alignItems":"start"
				},
				class: "my-0",
				grid: {
					col: 12,
					row: 1,
				},
				props: {
					label: {
						html: "亮点范例",
						class: publicLabelClass,
						tooltip: {
							content: "请输入亮点范例",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入亮点范例",
					},
				},
			},
			props: {
				type:"textarea",
				rows:5,
				minlength:10,
				maxlength: 5000,
				showWordLimit:true,
				placeholder: "请输入亮点范例",
			},
		},
		trick: {
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				style:{
					"--alignItems":"start"
				},
				class: "my-0",
				grid: {
					col: 12,
					row: 1,
				},
				props: {
					label: {
						html: "亮点妙招",
						class: publicLabelClass,
						tooltip: {
							content: "请输入亮点妙招",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入亮点妙招",
					},
				},
			},
			props: {
				type:"textarea",
				rows:5,
				minlength:10,
				maxlength: 5000,
				showWordLimit:true,
				placeholder: "请输入亮点妙招提示，欣赏时如何更好的利用此妙招写好评论",
			},
		},
		difficultyLevel:{
			component:"ElTreeSelect",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 1,
					row: 1,
				},
				props: {
					label: {
						html: "难度等级",
						class: publicLabelClass,
            
						tooltip: {
							content: "难度等级",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请设置难度等级",
					},
				},
			},
			props:{
				data:[
         { label: "等级1", value: 1 },
					{ label: "等级2", value: 2 },
					{ label: "等级3", value: 3 },
					{ label: "等级4", value: 4 },
					{ label: "等级5", value: 5 },
        ]
			}
		},
		gradeLevel:{
			component:"ElTreeSelect",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 1,
					row: 1,
				},
				props: {
					label: {
						html: "学龄等级",
						class: publicLabelClass,
            
						tooltip: {
							content: "学龄等级",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请设置学龄等级",
					},
				},
			},
			props:{
				data: [
					{ label: "低级", value: 1 },
					{ label: "中级", value: 2 },
					{ label: "高级", value: 3 },
				],
			}
		},
		status: {
			component: "ElSwitch",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 6,
					row: 1,
				},
				props: {
					label: {
						html: "亮点状态",
						class: publicLabelClass,
						tooltip: {
							content: "亮点状态为失活时，亮点将不会被检测",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入亮点状态",
					},
				},
			},
			props: {},
		},
	},
}
export default formProps
