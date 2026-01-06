import * as R from "ramda";
import { VmoTree } from "vmo-tree";
import { h } from "vue";
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
		elementsWatcher: async function (state, ui:Record<string,any>, beforeUpdateStateKeyMap) {
			const vm = this as any;
			if(!vm.modelData['processingStatus'] || vm.modelData['processingStatus']<3){
				ui = R.omit(['genre','writingMethods','sync','appreciationGuide','status'],ui)
			}
			if(!vm.modelData['processingStatus'] || vm.modelData['processingStatus']<2){
				ui = R.omit(['debugURL'],ui)
			}
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
						html: "范文标题",
						class: publicLabelClass,
						tooltip: {
							content: "请输范文标题",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入范文标题",
					},
				},
			},
			props: {
				maxlength: 200,
        showWordLimit:true,
				placeholder: "请输范文标题",
			},
		},
    genre:{
			component:"ElTreeSelect",
			observeStateKeys:[],
      updateSubCompProps:async function(props,data,proxy){
        const res = await request(apis.contentTypeAssociationFind,{categoryId:'genre',sort:{order: "DESC"}},{method:'post'})
        if(res.code == 200){
          props.data = VmoTree.map((node,index,arr)=>{
            return {
              label:node.tagInfo[0].name,
              value:node.tagId,
              children:node.children,
            }
          },VmoTree.array2Tree(res.data?.items,"tagId","parentAssociationId",'children',true),'children',true)  
        }
        return props
      },
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 2,
					row: 1,
				},
				props: {
					label: {
						html: "范文体裁",
						class: publicLabelClass,
            
						tooltip: {
							content: "范文体裁",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						message: "请设置范文体裁",
					},
				},
			},
			props:{
				multiple:true,
        data:[]
			}
		},
    writingMethods:{
			component:"ElTreeSelect",
			observeStateKeys:[],
      updateSubCompProps:async function(props,data,proxy){
        const res = await request(apis.contentTypeAssociationFind,{categoryId:'writingMethods',sort:{order: "DESC"}},{method:'post'})
        if(res.code == 200){
          props.data = VmoTree.map((node,index,arr)=>{
            return {
              label:node.tagInfo[0].name,
              value:node.tagId,
              children:node.children,
            }
          },VmoTree.array2Tree(res.data?.items,"tagId","parentAssociationId",'children',true),'children',true)  
        }
        return props
      },
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 2,
					row: 1,
				},
				props: {
					label: {
						html: "写作手法",
						class: publicLabelClass,
            
						tooltip: {
							content: "写作手法",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						message: "请设置写作手法",
					},
				},
			},
			props:{
        multiple:true,
        collapseTags:true,
        collapseTagsTooltip:true,
        maxCollapseTags:1,
				data:[]
			}
		},
    sync:{
			component:"ElTreeSelect",
			observeStateKeys:['d'],
      updateSubCompProps:async function(props,data,proxy){
        const res = await request(apis.contentTypeAssociationFind,{categoryId:'sync',sort:{order: "DESC"}},{method:'post'})
        if(res.code == 200){
          props.data = VmoTree.map((node,index,arr)=>{
            return {
              label:node.tagInfo[0].name,
              value:node.tagId,
              children:node.children,
            }
          },VmoTree.array2Tree(res.data?.items,"tagId","parentAssociationId",'children',true),'children',true)  
        }
        return props
      },
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 2,
					row: 1,
				},
				props: {
					label: {
						html: "同步标签",
						class: publicLabelClass,
            
						tooltip: {
							content: "同步标签",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						message: "请设置同步标签",
					},
				},
			},
			props:{
				multiple:true,
        data:[]
			}
		},
		content: {
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
						html: "范文内容",
						class: publicLabelClass,
						tooltip: {
							content: "请输入范文内容",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入范文内容",
					},
				},
			},
			props: {
				type:"textarea",
				rows:20,
				maxlength: 2000,
				showWordLimit:true,
				placeholder: "请输入范文内容",
			},
		},
    appreciationGuide:{
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
						html: "欣赏指导",
						class: publicLabelClass,
						tooltip: {
							content: "请输入范文的欣赏指导",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						message: "请输入范文的欣赏指导",
					},
				},
			},
			props: {
				type:"textarea",
				rows:10,
				maxlength: 5000,
				showWordLimit:true,
				placeholder: "请输入范文的欣赏指导",
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
						html: "范文状态",
						class: publicLabelClass,
						tooltip: {
							content: "范文状态为失活时，范文将不会被检测",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入范文状态",
					},
				},
			},
			props: {
				// activeValue:1,
				// inactiveValue:0,
			},
		},
		debugURL:{
			component:(data)=>{
				return h('span',{ class:" hover:bg-[#88888820] cursor-pointer px-[10px] border border-[#00000020] dark:border-[#FFFFFF20] rounded h-[32px]", onClick:()=>{
					window.open(data.debugURL)
				}},'查看工作流执行情况')
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
						html: "执行地址",
						class: publicLabelClass,
						tooltip: {
							content: "AI范文评审执行地址,可查看当前评审执行状态",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入范文状态",
					},
				},
			},
			props:{}
		}
	},
}
export default formProps
