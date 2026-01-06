import * as R from "ramda";
import type { DrawerFormProps } from "@typs/app-public";
import type { VXF_JSON } from "vmo-x-form";
import { request, apis } from "@src/apis";


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
		appName: {
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
						html: "应用名称",
						class: publicLabelClass,
						tooltip: {
							content: "请输应用名称",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入应用名称",
					},
				},
			},
			props: {
				maxlength: 24,
				placeholder: "请输应用名称",
			},
		},
		apiKey: {
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
						html: "应用定义",
						class: publicLabelClass,
						tooltip: {
							content: "请输入应用定义",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入应用定义",
					},
				},
			},
			props: {
				maxlength: 32,
				showWordLimit:true,
				placeholder: "请输入应用定义",
			},
		},
		description: {
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
						html: "应用描述",
						class: publicLabelClass,
						tooltip: {
							content: "请输入应用描述",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						message: "请输入应用描述",
					},
				},
			},
			props: {
				type:'textarea',
				maxlength: 120,
				rows:5,
				showWordLimit:true,
				placeholder: "请输入应用定义",
			},
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
						html: "应用状态",
						class: publicLabelClass,
						tooltip: {
							content: "应用状态为失活时，应用将不会被检测",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入应用状态",
					},
				},
			},
			props: {},
		},
	},
}
export default formProps
