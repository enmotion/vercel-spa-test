import * as R from "ramda";
import type { DrawerFormProps } from "@typs/app-public";
import type { VXF_JSON } from "vmo-x-form";
import { request, apis } from "@src/apis";
import type { useDebounce } from "@vueuse/core";


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
					wide: { col: 1, minHeight: 32, gap: 20 },
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
		categoryId: {
			component: "ElTreeSelect",
			async	updateSubCompProps(props,data,proxy){
				const res = await request(apis.contentTypeCategoryFind,{},{method:'post'})
				if(res.code == 200){
					props.data = res.data.items.map((item:Record<string,any>)=>({
						label:item.name,
						value:item.key
					}))
				}
				return props
			},
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
						html: "所属分类",
						class: publicLabelClass,
						tooltip: {
							content: "请输所属分类",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入所属分类",
					},
				},
			},
			props: {
				disabled:true,
				placeholder: "请输所属分类",
			},
		},
    avoidUsedKeys: {
			component: "ElTreeSelect",
      mute:true,
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
						html: "排除已用",
						class: publicLabelClass,
						tooltip: {
							content: "开启后，已有组合中已配置标签，将不会出现在下拉列表中",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						message: "请输入所属分类",
					},
				},
			},
			props: {
				disabled:false,
        data:[
          {label:'禁止跨分类标签',value:true},
          {label:'允许跨分类标签',value:false}
        ]
			},
		},
		tagId: {
			component: "ElTreeSelect",
      observeStateKeys: ["avoidUsedKeys"],
			async	updateSubCompProps(props,data,proxy){
        console.log(data,this)
				props.disabled = !!data._id;
				const res = await request(apis.contentTypeTagFind,{status:true},{method:'post'})
        const res2 = await request(apis.contentTypeAssociationFind,data['avoidUsedKeys']?{}:{categoryId:data.categoryId},{method:'post'})
        const usedKeys = res2.data.items.map((item:Record<string,any>)=>item.tagId)
				if(res.code == 200){
					props.data = res.data.items.map((item:Record<string,any>)=>({
						label:item.name,
						value:item.key
					})).filter((item:Record<string,any>)=>{
            return !usedKeys.includes(item.value)
          })
				}
				return props
			},
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
						html: "关连标签",
						class: publicLabelClass,
						tooltip: {
							content: "请输入关连标签",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入关连标签",
					},
				},
			},
			props: {
        multiple:true,
				filterable:true,
				placeholder: "请输入关连标签",
			},
		},
		parentAssociationId:{
			component: "ElTreeSelect",
			getter:(value)=>value??'',
			setter:(value)=>value??'',
			async	updateSubCompProps(props,data,proxy){
				const res = await request(apis.contentTypeAssociationFind,{categoryId:data.categoryId},{method:'post'})
				console.log("sssss",res)
				if(res.code == 200){
					props.data = res.data.items.map((item:Record<string,any>)=>({
						label:item.tagInfo?.[0]?.name,
						value:item.tagInfo?.[0]?.key
					}))
				}
				return props
			},
			// disabled:true,
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
						html: "父级标签",
						class: publicLabelClass,
						tooltip: {
							content: "请选择父级标签",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						message: "请输入父级标签",
					},
				},
			},
			props:{
				filterable:true,
				clearable:true,
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
	},
}
export default formProps
