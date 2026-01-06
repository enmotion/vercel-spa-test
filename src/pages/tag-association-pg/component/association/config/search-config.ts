import type { VXF_JSON, VXF_PUB } from "vmo-x-form";
import { request, apis } from "@src/apis";
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
		categoryId: {
			component: "ElTreeSelect", // 表单组件
			debounceDelay: 0,
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
			/* 组件prop 属性配置 */
			props: {
				filterable:true,
				clearable: true,
				placeholder: "请先选择分类，查看具体配置标签",
				data:[]
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
		tagId: {
			component: "ElTreeSelect", // 表单组件
			debounceDelay: 0,
			async	updateSubCompProps(props,data,proxy){
				const res = await request(apis.contentTypeTagFind,{},{method:'post'})
				if(res.code == 200){
					props.data = res.data.items.map((item:Record<string,any>)=>({
						label:item.name,
						value:item.key
					}))
				}
				return props
			},
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				clearable: true,
				placeholder: "标签名称",
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
		parentAssociationId: {
			component: "ElTreeSelect", // 表单组件
			debounceDelay: 0,
			async	updateSubCompProps(props,data,proxy){
				const res = await request(apis.contentTypeTagFind,{},{method:'post'})
				if(res.code == 200){
					props.data = res.data.items.map((item:Record<string,any>)=>({
						label:item.name,
						value:item.key
					}))
				}
				return props
			},
			// propagateUpEvents: "change", //提交事件
			/* 组件prop 属性配置 */
			props: {
				clearable: true,
				placeholder: "父级标签",
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
	},
};
