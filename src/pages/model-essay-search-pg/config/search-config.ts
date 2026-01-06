import type { VXF_JSON, VXF_PUB } from "vmo-x-form";
import { request, apis } from "@src/apis";
import { VmoTree } from "vmo-tree";
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
		query: {
			component: "ElInput", // 表单组件
			debounceDelay: 0,
			setter:(value)=>!!value?value:undefined,
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				class: "grow-1 h-[30px]",
				clearable: true,
				placeholder: "请输入您要查找的范文要求",
			},
			/* 组件容器配置 */
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
				layout: "horizontal",
				props: {
					label: {
						html: "",
						class: defaultLabelClass,
					},
					// 尾缀
					// append: {
					//   html: "",
					// },
				},
				grid: {
					col: 8, // 组件所占列数
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
    genre: {
			component: "ElTreeSelect",

      updateSubCompProps:async function(props,data,proxy){
        const res = await request(apis.contentTypeAssociationFind,{categoryId:'genre'},{method:'post'})
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
			props: {
				multiple: true,
				clearable: true,
				placeholder: "范文体裁",
				collapseTags:true,
				maxCollapseTags:1,
				data: [],
			},
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-0",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "范文体裁",
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
    sync: {
			component: "ElTreeSelect",
			getter:(value)=> Array.isArray(value) ? value : [],
			setter:(value)=> Array.isArray(value) && value.length>0 ? value : undefined,
      updateSubCompProps:async function(props,data,proxy){
        const res = await request(apis.contentTypeAssociationFind,{categoryId:'sync'},{method:'post'})
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
			props: {
				multiple: true,
				clearable: true,
				placeholder: "同步标签",
        collapseTags:true,
        collapseTagsTooltip:true,
        maxCollapseTags:1,
				data: [],
			},
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-0",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "同步标签",
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
				placeholder: "范文状态",
				data: [
					{ label: "上架", value: true },
					{ label: "下架", value: false },
				],
			},
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-0",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "范文状态",
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
    writingMethods: {
			component: "ElTreeSelect",
      getter:(value)=> Array.isArray(value) ? value : [],
			setter:(value)=> Array.isArray(value) && value.length>0 ? value : undefined,
      updateSubCompProps:async function(props,data,proxy){
        const res = await request(apis.contentTypeAssociationFind,{categoryId:'writingMethods'},{method:'post'})
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
			props: {
				multiple: true,
				clearable: true,
        showCheckbox:true,
        checkStrictly:false,
        collapseTags:true,
        collapseTagsTooltip:true,
        maxCollapseTags:2,
				placeholder: "写作手法",
				data: [],
			},
			item: {
				type: "Div",
				class: "w-full grow-1 last:mb-0 flex-shrink mb-0",
				layout: "horizontal",
				props: {
					// 标签
					label: {
						html: "写作手法",
						class: defaultLabelClass,
					},
					// 尾缀
					// append: {
					//   html: "",
					// },
				},
				grid: {
					col: 6, // 组件所占列数
					row: 1, // 组件所占行数
				},
			},
		},
	},
};
