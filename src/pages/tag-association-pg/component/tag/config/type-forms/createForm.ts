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
					wide: { col: 12, minHeight: 32, gap: 20 },
					narr: { col: 2, minHeight: 32, gap: 20 },
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
		name: {
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
						html: "标签名称",
						class: publicLabelClass,
						tooltip: {
							content: "请输标签名称",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入标签名称",
					},
				},
			},
			props: {
				maxlength: 24,
				placeholder: "请输标签名称",
			},
		},
		key: {
			component: "ElInput",
			// updateSubCompProps:function(props,data,proxy){
			// 	return R.mergeAll([props,{ disabled:!!data._id}])
			// },
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
						html: "标签编码",
						class: publicLabelClass,
						tooltip: {
							content: "请输入标签编码",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入标签编码",
					},
				},
			},
			props: {
				maxlength: 64,
				placeholder: "请输入标签编码",
			},
		},
		description:{
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
						html: "标签描述",
						class: publicLabelClass,
						tooltip: {
							content: "请输入标签描述",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入标签描述",
					},
				},
			},
			props:{
				type:"textarea",
				rows:5
			}
		},
		super:{
			component:"ElTreeSelect",
			updateSubCompProps:function(props,data,proxy){
				return R.mergeAll([props,{ disabled:!!data._id && data.super == 1}])
			},
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
						html: "数据等级",
						class: publicLabelClass,
						tooltip: {
							content: "数据等级，分为系统级与自定义层级",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请设置排序权重",
					},
				},
			},
			props:{
				data:[
					{label:'系统',value:1},
					{label:'自设',value:0}
				]
			}
		},
		order:{
			component:"ElInputNumber",
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
						html: "排序权重",
						class: publicLabelClass,
            
						tooltip: {
							content: "标签排序权重",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请设置排序权重",
					},
				},
			},
			props:{
				step:1
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
						html: "标签状态",
						class: publicLabelClass,
						tooltip: {
							content: "标签状态禁用时，标签不可登录",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入标签状态",
					},
				},
			},
			props: {},
		},
	},
}
export default formProps
