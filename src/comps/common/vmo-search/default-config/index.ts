import type { VXF_JSON, VXF_PUB } from "vmo-x-form";

export const defaultFormJson: VXF_JSON.CompProp<{}> = {
	component: "VmoXForm",
	debounceDelay: 0,
	props: {
		disabled: false, // 是否禁用整个表单
		bidiBinding: true, // 是否开启双向绑定
		isUpdatePending: false, //是否二次相应，允许在 stateKeysUpdate 方法中，禁止某值的更改
		needConfirm: false, // 是否显示确认提交按钮
		steadyElementsSource: false, // 是否单向控制 element 响应流
		wrap: {
			type: "Div",
			class: "grow-1",
			// anchor:{
			//   html:`
			//     <div class="flex-row flex text-sm justify-between">
			//       <span class="text-s-10">打开搜索面板12</span>
			//       <span>搜索</span>
			//     </div>`,
			//   class: 'border p-[10px] rounded-md shadow bg-white',
			//   tooltip:{
			//     content:'这是一个好玩的提示',
			//     placement:'bottom-start'
			//   },
			// },
			// class:'bg-white p-[30px] rounded-l-2xl el-keep-dark',
		},
		view: {
			type: "Div",
			display: {
				type: "grid",
				reactive: {
					critical: 800,
					wide: { col: 4, minHeight: 32, gap: 5 },
					narr: { col: 4, minHeight: 32, gap: 5 },
				},
			},
		},
	},
	elements: {},
};
