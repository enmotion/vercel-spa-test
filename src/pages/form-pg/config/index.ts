import type { VXF_JSON, VXF_PUB } from "vmo-x-form";
import * as R from "ramda";
import { ElMessage } from "element-plus";

function generateInputItem(num: number = 100) {
	const list: VXF_JSON.CompRecord<{}> = {};
	for (let i = 0; i < num; i++) {
		list["users.name" + i] = {
			component: "ElInput",
			key: "users.name" + i,
			props: {
				size: "default",
				placeholder: "users.name" + i,
			},
			// debounceDelay:1000,
			propagateUpEvents: "change",
			// getter:{
			//   parameters:['value'],
			//   functionBody:`
			//     // console.log('getter',value);
			//     return value.toString().replace(/123/g,'mod')`
			// },
			// setter:(value)=>{
			//   // console.log('setter',value)
			//   return parseInt((value as string).replace(/mod/g,'123'))
			// },
			item: {
				type: "ElFormItem",
				class: "w-full grow-1 flex-shrink mb-[10px]",
				layout: "rabbit",
				props: {
					// required:false,
					label: {
						html: "users.name" + i,
						class: "ml-[0px]",
						tooltip: {
							content: "users.name" + i + "的说明文字",
						},
					},
					append: {
						html: "PX",
						class: "mr-[0px] -mb-[5px] text-xs text-red-600 font-normal text-gray-500",
					},
					// rules:{
					//   trigger:'blur',
					//   type:'number'
					// },
				},
				grid: {
					col: 1,
					row: 1,
				},
			},
		};
	}
	return list as VXF_JSON.CompRows<{}>;
}
const staticRows: VXF_JSON.CompRows<{
	TextLabel: {
		component: "TextLabel";
		props?: {
			label: string;
		};
	};
}> = {
	// name2: {
	//   component: 'TextLabel',
	//   key: 'a',
	//   invisible: false,
	//   disabled: false,
	//   license: 2,
	//   readonly: false,
	//   props: {
	//     label: '12312312'
	//   },
	//   getter: {
	//     parameters: ['value'],
	//     functionBody: `return value.replace(/123/g,'mod')`
	//   },
	//   setter: (value) => {
	//     return (value as string).replace(/mod/g, '123')
	//   },
	//   item: {
	//     type: 'ElFormItem',
	//     class: 'w-full mb-[0px]',
	//     layout: 'horizontal',
	//     props: {
	//       // label:{
	//       //   html:'AER',
	//       //   style:{width:'60px', justifyContent:'start', alignItems:'center'},
	//       //   tooltip:{
	//       //     content:'aade'
	//       //   }
	//       // },
	//       // append:{
	//       //   html:'px',
	//       //   tooltip:{
	//       //     placement:'top-end',
	//       //     content:'设置单位'
	//       //   }
	//       // },
	//     },
	//     grid: {
	//       col: 4,
	//       row: 1
	//     }
	//   }
	// },
	sss: {
		key: "user.name21",
		component: "ElTreeSelect",
		readonly: false,
		item: {
			type: "ElFormItem",
			class: "!my-[0px]",
			props: {
				label: {
					html: "name",
					tooltip: {
						content: "user.namefdsaf",
						showAfter: 1000,
						trigger: "contextmenu",
					},
					style: { justifyContent: "end" },
				},
				append: {
					html: 'aaa<span class="text-red-500 mx-[5px]">dfdf</span>111',
					tooltip: {
						content: "afdaf",
					},
					class: "!mx-0 w-full pl-[58px] text-gray-400 !font-normal",
				},
			},
			grid: {
				col: 4,
				row: 1,
			},
		},
		props: {
			class: "grow-1 shrink-1",
			multiple: true,
			collapseTags: true,
			checkStrictly: true,
			showCheckbox: true,
			collapseTagsTooltip: true,
			maxCollapseTags: 1,
			data: [
				{
					label: "a",
					value: "a",
					children: [
						{ label: "a1", value: "a1" },
						{ label: "a2", value: "a2" },
						{ label: "a3", value: "a3" },
						{ label: "a4", value: "a4" },
						{ label: "a5", value: "a5" },
					],
				},
				{ label: "b", value: "b", children: [{ label: "b1", value: "b1" }] },
			],
		},
	},
	sss2: {
		key: "user.name22",
		component: "ElTreeSelect",
		readonly: false,
		disabled: true,
		item: {
			type: "ElFormItem",
			class: "!my-[0px]",
			props: {
				label: {
					html: "name",
					tooltip: {
						content: "user.namefdsaf",
						showAfter: 1000,
						trigger: "contextmenu",
					},
					style: { justifyContent: "end" },
				},
			},
			grid: {
				col: 4,
				row: 1,
			},
		},
		props: {
			class: "grow-1 shrink-1",
			multiple: true,
			collapseTags: true,
			checkStrictly: true,
			showCheckbox: true,
			collapseTagsTooltip: true,
			maxCollapseTags: 1,
			data: [
				{
					label: "a",
					value: "a",
					children: [
						{ label: "a1", value: "a1" },
						{ label: "a2", value: "a2" },
						{ label: "a3", value: "a3" },
						{ label: "a4", value: "a4" },
						{ label: "a5", value: "a5" },
					],
				},
				{ label: "b", value: "b", children: [{ label: "b1", value: "b1" }] },
			],
		},
	},
	name: {
		component: "ElSwitch",
		key: "name",
		invisible: false,
		disabled: false,
		license: 2,
		readonly: false,
		debounceDelay: 0,
		getter: (value) => (value.constructor == Object ? true : false),
		setter: (value) => (value ? {} : false),
		props: {
			class: "!grow-0 !w-[40px]",
			activeValue: true,
			inactiveValue: false,
		},
		// getter:{
		//   parameters:['value'],
		//   functionBody:`return value.replace(/123/g,'mod')`
		// },
		// setter:(value)=>{
		//   return (value as string).replace(/mod/g,'123')
		// },
		item: {
			type: "ElFormItem",
			class: "w-full mb-[0px]",
			style: {
				"--justifyContent": "bettwen",
			},
			layout: "horizontal",
			props: {
				label: {
					html: "ENN",
					style: {
						width: "60px",
						justifyContent: "start",
						alignItems: "center",
					},
					tooltip: {
						content: "aade",
					},
				},

				// append:{
				//   html:'px',
				//   tooltip:{
				//     placement:'top-end',
				//     content:'设置单位'
				//   }
				// },
			},
			grid: {
				col: 4,
				row: 1,
			},
		},
	},
	age: {
		component: "ElInputNumber",
		key: "age",
		debounceDelay: 0,
		props: {
			class: "grow-1",
			controls: true,
			valueOnClear: -1,
		},

		item: {
			type: "ElFormItem",
			class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
			props: {
				rules: {
					required: false,
				},
			},
			grid: {
				col: 4,
				row: 1,
			},
		},
	},
	"datas[1].a": {
		component: "ElInput",
		debounceDelay: 0,
		props: {
			class: "grow-1",
		},

		item: {
			type: "ElFormItem",
			class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
			props: {
				rules: {
					required: false,
				},
			},
			grid: {
				col: 4,
				row: 1,
			},
		},
	},
	datas: {
		component: "VmoXList",
		key: "datas",
		debounceDelay: 0,
		elements: {
			"[a,b,c]": {
				component: "ElInput",
				getter: (value) => ((value?.filter?.((item: string) => !R.isNil(item)) as any[]) ?? []).join("."),
				setter: (value) => value.split("."),
				debounceDelay: 0,
				propagateUpEvents: "change",
				item: {
					type: "ElFormItem",
					grid: {
						col: 4,
						row: 1,
					},
					props: {
						label: {
							html: "fullName",
							tooltip: {
								content: "sss",
							},
						},
						required: true,
					},
				},
				props: {
					placeholder: "please input user fullName",
				},
			},
			// '[c,b,a]':{
			//   component:'ElInput',
			//   getter:(value)=>((value?.filter?.((item:string)=>!R.isNil(item)) as any[])??[]).join("."),
			//   setter:(value)=>value.split("."),
			//   debounceDelay:0,
			//   updateTriggerEvent:'change',
			//   item:{
			//     type:'ElFormItem',

			//     grid:{
			//       col:2,
			//       row:1
			//     },
			//     props:{

			//       label:{
			//         html:'good',
			//         tooltip:{
			//           content:'sss'
			//         }
			//       },
			//       required:true,
			//     },
			//   },
			//   props:{
			//     placeholder:'ssss'
			//   }
			// },
			// 'a':{
			//   component:'ElInput',
			//   key:'b',
			//   item:{
			//     type:'ElFormItem',
			//     grid:{
			//       col:2,
			//       row:1
			//     },
			//     props:{
			//       label:{
			//         html:'a',
			//         tooltip:{
			//           content:'sss'
			//         }
			//       },
			//       required:true,
			//     },
			//   },
			//   props:{
			//     placeholder:'ssss'
			//   }
			// },
			// 'good[1]':{
			//   component:'ElInput',
			//   item:{
			//     type:'ElFormItem',
			//     grid:{
			//       col:2,
			//       row:1
			//     },
			//     props:{
			//       label:{
			//         html:'b',
			//         tooltip:{
			//           content:'sss'
			//         }
			//       },
			//       required:true,
			//     },
			//   },
			//   props:{
			//     placeholder:'ssss'
			//   }
			// },
			// 'good[2]':{
			//   component:'ElInput',
			//   item:{
			//     type:'ElFormItem',
			//     grid:{
			//       col:2,
			//       row:1
			//     },
			//     props:{
			//       label:{
			//         html:'c',
			//         tooltip:{
			//           content:'sss'
			//         }
			//       },
			//       required:true,
			//     },
			//   },
			//   props:{
			//     placeholder:'ssss'
			//   }
			// },
			// 'g':{
			//   component:'ElInput',
			//   item:{
			//     type:'ElFormItem',
			//     grid:{
			//       col:2,
			//       row:1
			//     },
			//     props:{
			//       label:{
			//         html:'f',
			//         tooltip:{
			//           content:'sss'
			//         }
			//       },
			//       required:true,
			//     },
			//   },
			//   props:{
			//     placeholder:'ssss'
			//   }
			// },
			// 'h':{
			//   component:'ElInput',
			//   item:{
			//     type:'ElFormItem',
			//     grid:{
			//       col:2,
			//       row:1
			//     },
			//     props:{
			//       label:{
			//         html:'g',
			//         tooltip:{
			//           content:'sss'
			//         }
			//       },
			//       required:true,
			//     },
			//   },
			//   props:{
			//     placeholder:'ssss'
			//   }
			// },
		},
		props: {
			dragAndDropSorting: true,
			enableAsyncHookConsistency: true,
			emptyText: {
				html: "- Empty Contents -",
				class: "bg-gray-50 dark:bg-dark-5 dark:border-light-6 border-gray-200 !h-[100px]",
			},
			class: "!p-[0px] mt-[10px]",
			placeholder: "扩展一些用户的信息吧",
			defaultValue: {
				// a:'aaader'
			},
			hooks: {
				onBeforInsert: (value, ary, index) => {
					console.log(value, ary, index);
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							// value.data.a = ary.length.toString()
							resolve(value);
						}, 200);
					});
				},
				onAllowInsert: (value, ary, index) => {
					console.log(value, ary, index);
					if (ary.length > 1000) {
						throw new Error("添加上限超过1000");
					} else {
						return true;
					}
				},
				onAfterInsert: (value, ary, index) => {
					console.log(value, ary, index);
					const list = ary.map((item) => {
						// item.data.b = value.data.a;
						return item;
					});
					return ary;
				},
				onBeforUpdate: (value, ary, index) => {
					console.log(value, ary, index);
					return value;
				},
				onAllowUpdate: (value, ary, index) => {
					const keys = ary.filter((item, idx) => idx != index).map((item) => item.data.a);
					console.log(keys, value.data.a, ary);
					// return false;
					// return value.data.e != 'aa';
					// if(value.data.e == 'aa')
					if (keys.includes(value.data.a)) {
						console.log("sss");
						// throw new Error('ssss');
						// throw new Error('sssss')
						// reject(new Error('b 不可设置为 aa'));
						return Promise.reject(new Error("a不可重复"));
					} else {
						return true;
					}
					// return new Promise((resolve,reject)=>{
					//   setTimeout(function(){
					//     if(value.data.a=='aa'){
					//       console.log('sss')
					//       // throw new Error('ssss');
					//       reject(new Error('sssss'))
					//       // reject(new Error('b 不可设置为 aa'));
					//       // Promise.reject(new Error('b 不可设置为 aa'))
					//     }else{
					//       resolve(true);
					//     }
					//   },2000)
					// })
				},
				// onAfterUpdate:function(value,ary,index){
				//   console.log(this, (this as any)?.tempData)
				//   !(this as any)?.tempData && ((this as any).tempData = JSON.parse(JSON.stringify(ary)))
				//   if(value.data.b != ary[index||0].data.b){
				//     return ary.map(item=>{
				//       item.data.a = value.data.a
				//       return item;
				//     });
				//   }else{
				//     return ary;
				//   }

				//   // return new Promise((resolve,reject)=>{
				//   //   setTimeout(()=>{
				//   //     console.log(value,ary,index);
				//   //     ary.map(item=>{
				//   //       item.data.e = value.data.e
				//   //       return item;
				//   //     })
				//   //     resolve(ary)
				//   //   },2000);
				//   // })
				// }
			},
			// listHeader: {
			// 	class: "mb-[10px]",
			// 	insertButton: {
			// 		buttonText: "+",
			// 		type: "primary",
			// 		class: "!rounded !w-[40px] text-xl font-bold pb-[7px] !ml-[0px] mr-[5px] last:mr-[0px] hover:bg-green-500",
			// 		size: "small",
			// 	},
			// },
			// listOperator: {
			// 	removeButton: {
			// 		html: "-",
			// 		tooltip: {
			// 			content: "移除操作",
			// 		},
			// 		class:
			// 			"!w-[20px] !text-xl pb-[3px] bg-red-100 border-red-200 text-red-500 !h-[20px] mt-[2px] flex-row flex items-center justify-center border !rounded-full hover:bg-red-400 hover:border-red-600 hover:text-white hover:scale-75 !hover:border-4",
			// 	},
			// 	copyButton: {
			// 		html: "=",
			// 		tooltip: {
			// 			content: "复制操作",
			// 		},
			// 		class:
			// 			"!w-[20px] !text-xl pb-[3px] bg-green-100 border-green-200 text-green-500 !h-[20px] mt-[2px] flex-row flex items-center justify-center border !rounded-full hover:bg-green-400 hover:border-green-600 hover:text-white hover:scale-75 !hover:border-4",
			// 	},
			// },
			formProps: {
				bidiBinding: true,
				wrap: {
					type: "Div",
					class: "p-[10px] border rounded grow-1 bg-white",
					props: {
						title: "测试数据",
					},
					// anchor:{
					//   html:'sse',
					//   tooltip:{
					//     content:'aaaa',
					//     trigger:'hover'
					//   }
					// },
				},
				view: {
					type: "ElForm",
					class: "p-[10px]",
					props: {
						showMessage: true,
						inlineMessage: false,
					},
					display: {
						type: "grid",
						reactive: {
							critical: 300,
							narr: { col: 2, row: 1, minHeight: 32, gap: 5 },
							wide: { col: 4, row: 1, minHeight: 32, gap: 5 },
						},
					},
				},
			},
		},
		item: {
			type: "ElFormItem",
			class: "w-full grow-1 last:mb-0 flex-shrink mb-[0px]",
			props: {
				rules: {
					required: false,
				},
			},
			grid: {
				col: 4,
				row: 1,
			},
		},
	},

	level1Form: {
		component: "VmoXForm",
		key: "aaerre",
		invisible: false,
		disabled: false,
		debounceDelay: 0,
		// getter:(value)=>{
		//   // console.log(value,'getter');
		//   value['user.name'] = value['user.name'] ? value['user.name'] : 'mod';
		//   value['name'] = {'F':'假','T':'真'}[value['name'] as string]||'F';
		//   return value;
		// },
		// setter:(value)=>{
		//   // console.log(value,'setter');
		//   value['name'] = {'真':'T','假':'F'}[value['name'] as string]||'F';
		//   return value;
		// },
		item: {
			type: "Div",
			class: "w-full h-auto grow-1 rounded my-[20px]",
			grid: {
				col: 4,
				row: 1,
			},
		},
		props: {
			bidiBinding: true,
			wrap: {
				type: "Div",
				class: "h-auto h-full border dark:border-light-6 p-[20px] rounded shadow-md",
				props: {
					title: "AAAA",
				},
				// anchor:{
				//   html:'<div class="flex flex-row w-full justify-between items-center text-sm"><span>事件原因:</span><span class=" text-gray-500 text-xs">点击查看</span></div>',
				//   class: 'border p-[10px] last:mb-0 grow-1 rounded hover:bg-blue-50 hover:border-blue-100',
				//   tooltip: {
				//     // content: '这是一个好玩的提示',
				//     placement: 'bottom-start'
				//   },
				// },
				// props:{
				//   destroyOnClose:true,
				//   title:'这是抽屉输入',
				//   modalClass:'bg-[#000000DD]',
				//   size:'80%'
				// },
			},
			view: {
				type: "ElForm",
				// class:'w-full h-auto content-start',
				display: {
					type: "flex",
				},
				props: {
					labelPosition: "right",
					showMessage: false,
					inlineMessage: true,
				},
			},
			needConfirm: false,

			// formFooter:{

			// }
		},
		elements: {
			nameA: {
				component: "ElInput",
				item: {
					type: "ElFormItem",
					class: "w-2/5 grow-1 mr-[5px] mb-[5px]",
					props: {
						rules: {
							type: "string",
							required: true,
							message: "这个时错误",
						},
						label: {
							html: "使劲",
							tooltip: {
								content: "ssere",
								placement: "top",
							},
						},
					},
				},
				props: {
					size: "default",
					placeholder: "请输入2111",
				},
			},
			nameB: {
				component: "ElInput",
				item: {
					type: "ElFormItem",
					class: "w-2/5 grow-1 mb-[5px]",
					props: {
						label: {
							html: "sss",
							tooltip: {
								content: "s",
							},
						},
						required: true,
					},
				},
				props: {
					placeholder: "请输入",
				},
			},
			nothing: {
				component: "VmoXForm",
				disabled: false,
				item: {
					type: "Div",
					class: "h-auto w-2/5 grow-1",
				},
				props: {
					wrap: {
						type: "ElDialog",
						props: {
							title: "智慧看的",
							alignCenter: true,
							appendToBody: true,
							destroyOnClose: true,
						},
						anchor: {
							html: "<span>AA</span><span>BB</span>",
							style: { display: "flex", flexDirection: "row" },
							class: "h-[32px] hover:bg-d-1 hover:border-red-200 dark:border-light-6 flex border rounded items-center justify-between py-[20px] px-[10px]",
						},
					},
					// wrap:{
					//   type:'ElDrawer',
					//   anchor:{
					//     html:'<span>AA</span><span>BB</span>',
					//     style:{display:'flex',flexDirection:'row'},
					//     class:'h-[32px] hover:bg-red-100 hover:border-red-200 flex border rounded items-center justify-between py-[20px] px-[10px]'
					//   },
					//   props:{
					//     closeOnClickModal:true,
					//     destroyOnClose:false,
					//     title:'AAA',
					//     size:'80%',
					//     direction:'btt'
					//   }
					// },
					view: {
						type: "ElForm",
						class: "grow-1 flex flex-col h-full",
						display: {
							type: "grid",
							// gridAssist: true,
							reactive: {
								critical: 800,
								wide: { col: 2, row: 10, minHeight: 32, gap: 0 },
								narr: { col: 1, row: 1, minHeight: 10, gap: 0 },
							},
						},
					},
					needConfirm: true,
				},
				elements: {
					"user.child.name": {
						component: "ElInput",
						debounceDelay: 10,
						item: {
							class: "mb-[0px]",
							type: "ElFormItem",
							props: {
								label: {
									html: "aaaa",
									tooltip: {
										content: "s",
									},
								},
								append: {
									html: "$",
									class: "text-gray-400 ml-[5px]",
									// tooltip:{
									//   content:'美元'
									// },
								},
								rules: {
									required: true,
								},
							},

							grid: {
								col: 1,
								row: 1,
							},
						},
						props: {
							placeholder: "childname",
						},
					},
					"user.child.name2": {
						component: "ElInput",
						debounceDelay: 10,
						item: {
							class: "mb-[0px]",
							type: "ElFormItem",
							grid: {
								col: 1,
								row: 1,
							},
						},
						props: {
							placeholder: "childname",
						},
					},
				},
			},
		},
	},
	"user.name1": {
		component: "ElInput",
		key: "user.name1",
		debounceDelay: 0,
		props: {
			size: "default",
		},
		getter: {
			parameters: ["value"],
			functionBody: `return value.replace(/123/g,'mod')`,
		},
		// setter:(value:any) => parseFloat(value),
		item: {
			type: "ElFormItem",
			layout: "horizontal",
			class: "p-[10px] w-1/2 rounded border mb-[10px] bg-gray-50 dark:bg-dark-12 dark:border-light-6",
			props: {
				label: {
					html: "NAME",
				},
				// append:'aaaa',
				rules: {
					required: true,
					type: ["string", "number"],
					trigger: "blur",
					// validator:{
					//   parameters:['rule','value','cb'],
					//   functionBody:`
					//     // console.error(rule,value);
					//     if(value != rule.data.users.name1){
					//       cb(new Error('两次输入结果不一致!!!!'))
					//     }
					//     cb();`
					// }
					validator: function (rule, value, cb, source, options) {
						const T: VXF_PUB.ItemRule = this as VXF_PUB.ItemRule;
						console.log(this);
						console.log(this, value, rule, cb, source, options);
						setTimeout(() => {
							if (value != T.$formData.value?.user?.name2) {
								cb(new Error("两次输入值不一致"));
							} else {
								cb();
							}
						}, 0);
					},
				},
			},
			grid: {
				col: 4,
				row: 1,
			},
		},
	},
	"user.name2": {
		component: "ElInput",
		key: "user.name2",
		debounceDelay: 0,
		props: {
			size: "default",
		},
		getter: {
			parameters: ["value"],
			functionBody: `return value.replace(/123/g,'mod')`,
		},
		// setter:(value:any) => parseFloat(value),
		item: {
			type: "ElFormItem",
			layout: "horizontal",
			class: "p-[10px] w-1/2 rounded border mb-[10px] bg-gray-50  dark:bg-dark-12 dark:border-light-6",
			props: {
				label: {
					html: "NAME",
				},
				// append:'aaaa',
				rules: {
					required: true,
					type: ["string", "number"],
					trigger: "blur",
					// validator:{
					//   parameters:['rule','value','cb'],
					//   functionBody:`
					//     // console.error(rule,value);
					//     if(value != rule.data.users.name1){
					//       cb(new Error('两次输入结果不一致!!!!'))
					//     }
					//     cb();`
					// }
					validator: function (rule, value, cb, source, options) {
						const T: VXF_PUB.ItemRule = this as VXF_PUB.ItemRule;
						// console.log('this',this)
						// console.log('value',value)
						// console.log('rule',rule)
						// console.log('cb',cb)
						// console.log('source',source)
						// console.log('options',options)
						// console.error(T.$formData.value?.user?.name21?.length, T.$formData.value?.user?.name21, value?.length, value );
						if (!value || value != T.$formData.value?.user?.name1 || value?.length != T.$formData?.value?.user?.name21?.length) {
							setTimeout(() => {
								cb(new Error("两次输入值不一致,或者值为空"));
							}, 0);
						} else {
							cb();
						}
					},
				},
			},
			grid: {
				col: 4,
				row: 1,
			},
		},
	},
};
export const formJsonDiv2: VXF_JSON.CompProp<{}> = {
	component: "VmoXForm",
	props: {
		wrap: {
			type: "ElDrawer",
			anchor: {
				html: "aaaa",
			},
			props: {
				title: "测试弹窗",
			},
		},

		view: {
			type: "ElForm",
		},
	},
	elements: [
		{
			key: "a.b.c[0]",
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "rabbit",
				props: {
					label: {
						html: "afda",
						tooltip: {
							content: "fdasfa",
						},
					},
					append: {
						html: "px",
						tooltip: {
							content: "fdasfa",
						},
					},
					rules: [{ required: true, message: "empty" }],
				},
			},
			props: {},
		},
		{
			key: "a.b.c[1]",
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "rabbit",
				props: {
					label: {
						html: "afda",
						tooltip: {
							content: "fdasfa",
						},
					},
					append: {
						html: "px",
						tooltip: {
							content: "fdasfa",
						},
					},
					rules: [{ required: true, message: "empty" }],
				},
			},
			props: {},
		},
	],
};
export const formJsonDiv: VXF_JSON.CompProp<{}> = {
	component: "VmoXForm",
	debounceDelay: 0,
	props: {
		disabled: false,
		// stateKeysUpdate:async function(n,o,state){
		//   const vm:any = this;
		//   if(n['users.name0']=='enmotion'){
		//     state['users.name0']=o['users.name0'];
		//     ElMessage({
		//       message:'aaaa 不可设置为 enmotion',
		//       grouping:true,
		//       type:'error'
		//     });
		//     // vm.$message({
		//     //   message:'不可设置为 enmotion',
		//     //   type:'error'
		//     // })
		//   }
		//   // return R.mergeAll([state,o]);
		//   // if( n['name'] == 'F'){
		//   //   state['users.name0'] = '真变假';
		//   // }
		//   // if( n['name'] == 'T'){
		//   //   state['users.name0'] = '假变真';
		//   // }
		//   // if( !vm.R.isNil(n['age']) && !vm.R.isNil(o['age'])){
		//   //   state['user.name'] = `O:${o['age']} N:${n['age']}`;
		//   //   state['users.name1'] = `O:${o['age']} N:${n['age']}`;
		//   // }
		//   // return vm.R.pick(['age','user.name','users.name0','users.name1',...vm.R.keys(n)],state);
		//   return state;
		// },
		// elementsWatcher:{
		//   type:'sync',
		//   parameters:['state','ui','beforeUpdateStateKeyMap'],
		//   functionBody:'console.log(ui,"hahaha");return ui'
		// },
		elementsWatcher: async function (state, UI, beforeUpdateStateKeyMap) {
			// console.error(beforeUpdateStateKeyMap)
			function sample() {
				const result = !state["age"] || state["age"] >= 0;
				// console.log('dderer')
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve(result);
					}, 0);
				});
				// return result
			}
			const vm: any = this;
			let ui = UI as VXF_JSON.CompRecord<{}>;
			// console.log(state,beforeUpdateStateKeyMap,'beforeUpdateStateKeyMap')
			if (state["user.name21"]?.length && state["user.name21"]?.length != 0) {
				console.log(ui);
				ui = R.pick(["sss"], ui);
			} else {
				// console.log(vm);
				// console.log((ui as VXF_JSON.CompRecord<{}>)['user.name1']?.item?.props);
				// if((ui as VXF_JSON.CompRecord<{}>)['user.name1']?.item?.props?.label?.html || beforeUpdateStateKeyMap?.['user.name2']){
				(ui as any)["user.name1"].item.props.label.html = state["user.name2"] || "NAME1";
				(ui as any)["user.name1"].props.disabled = state["user.name2"] == "disabled";
				// }
				// if((ui as VXF_JSON.CompRecord<{}>)['user.name2']?.item?.props?.label?.html || beforeUpdateStateKeyMap?.['user.name1']){
				(ui as any)["user.name2"].item.props.label.html = state["user.name1"] || "NAME2";
				(ui as any)["user.name2"].props.disabled = state["user.name1"] == "disabled";
				(ui as any)["level1Form"].disabled = state["user.name1"] == "disabled";
				vm?.R?.keys?.(ui)
					.filter((key: string) => {
						return key.includes("user");
					})
					.map((key2: string) => {
						(ui as any)[key2].disabled = state["user.name1"] == "disabled";
					});

				// // // clearTimeout(vm.timeout??null);
				// // // vm.timeout = setTimeout(async () => {
				// // //   const result =  await sample();
				// // //   vm.elementsNodes['sss'].props.disabled =result
				// // // }, 0);
				//if(R.keys(beforeUpdateStateKeyMap!).length==0 || R.keys(beforeUpdateStateKeyMap!).includes('age')){
				(ui as any)["sss"].props.disabled = await sample();
				//}
			}

			// console.log(ui)
			// callback?.(ui)
			// setTimeout(async ()=>{
			//   const result =await sample();
			//   vm.elementsNodes['sss'].props.disabled =result
			// },0);
			// }
			// console.log(beforeUpdateStateKeyMap);
			// if(state['age']>12){
			//   ui = vm.R.pick(['name','age','level1Form','user.name','users.name1'],ui);
			// };
			// if((beforeUpdateStateKeyMap?.['users.name1']||beforeUpdateStateKeyMap?.['age']||beforeUpdateStateKeyMap?.['name']) && state['name']=='T'){
			//   (ui as VXF_JSON.CompRecord<{}>)['users.name1'] = vm.R.assocPath(['item','props','append','html'],state['users.name1']+(state['age']>12 ? `:: ${state['age']}`:''),(ui as VXF_JSON.CompRecord<{}>)['users.name1']);
			// };
			// if(state['name']=='F' && beforeUpdateStateKeyMap?.['name']=='T'){
			//   (ui as VXF_JSON.CompRecord<{}>)['users.name1'] = vm.R.assocPath(['item','props','append','html'],'PK',(ui as VXF_JSON.CompRecord<{}>)['users.name1']);
			// }
			// const index = R.findIndex(R.propEq('users.name1','key'))(ui as VXF_JSON.CompArray<{}>);
			// (ui as VXF_JSON.CompArray<{}>)[index] = R.assocPath(['item','props','append','html'],state['users.name1'],(ui as VXF_JSON.CompArray<{}>)[index]);
			// (ui as any[])[index as numbe].item.props.append.html = state['users.name1']+'aaa'
			return ui;
		},

		wrap: {
			type: "Div",
			class: "p-[20px] rounded-b-lg shadow bg-white rounded dark:bg-light-2",
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
			props: {
				title: "时间机器2",
				// destroyOnClose:true,
				// closeOnClickModal:true,
				//   class:"vmo-x-form h-[800px] flex-col flex",
				//   size:'90%',
				//   direction:'ttb',
				//   modalClass:'bg-[#000000CC]',
				//   alignCenter:true,
				//   showClose:false,
				//   draggable:true,
				// title:'搜索配置',
			},
		},
		view: {
			type: "ElForm",
			display: {
				type: "grid",
				reactive: {
					critical: 800,
					wide: { col: 4, minHeight: 32, gap: 5 },
					narr: { col: 2, minHeight: 32, gap: 5 },
				},
			},
			props: {
				labelPosition: "right",
				showMessage: true,
				inlineMessage: true,
			},
		},
		bidiBinding: true,
		isUpdatePending: false,
		needConfirm: true,
		steadyElementsSource: false,
		formFooter: {
			triggerDelay: 1000,
			confirmButton: {
				buttonText: "sere",
				type: "success",
				class: "m-0",
			},
			cancelButton: "skere",
		},
	},
	elements: R.mergeAll([staticRows, generateInputItem(200)]) as VXF_JSON.CompRows<{}>,
};

export const formJsonSample: VXF_JSON.CompProp<{}> = {
	component: "VmoXForm",
	debounceDelay: 0,

	props: {
		needConfirm: true,
		wrap: {
			type: "Div",

			// anchor:{
			//   html:'fdaf',
			//   tooltip:{
			//     content:'fdffdsaf',
			//   }
			// }
		},
		view: {
			type: "ElForm",
			display: {
				type: "grid",
				reactive: {
					critical: 600,
					wide: {
						minHeight: 32,
						col: 2,
						row: 1,
						gap: 20,
					},
					narr: {
						minHeight: 32,
						col: 1,
						row: 1,
						gap: 12,
					},
				},
			},
		},
	},
	elements: {
		"[s,e]": {
			component: "ElInput",
			propagateUpEvents: "change",
			getter: (value) => {
				return value.filter((item: string) => !!item).length > 1 ? value.join(".") : "";
			},
			setter: (value) => {
				return value.split(".");
			},

			item: {
				layout: "horizontal",
				type: "ElFormItem",
				props: {
					label: "LABEL:",
					append: "$",
					rules: {
						validator: (rule, value, callback) => {
							console.log(value);
							if (Array.isArray(value) && value.filter((item) => !!item).length >= 2) {
								callback();
							} else {
								callback("缺少名称");
							}
						},
					},
				},
			},
			props: {
				placeholder: "fdsaffa",
				maxlength: 120,
				clearable: true,
			},
		},
		s: {
			component: "ElDatePicker",
			key: "[s,e]",
			item: {
				layout: "horizontal",
				type: "ElFormItem",
				class: "flex-wrap",
				props: {
					label: "DATE:",
					append: {
						html: "天天思考就是没有意义是",
						class: "!w-[300px] border !ml-0 !mr-[140px] flex !grow-0 text-xs mt-[5px] text-gray-500",
						tooltip: {
							content: "fdsaad",
							placement: "right",
							effect: "light",
						},
					},
				},
			},
			props: {
				type: "datetimerange",
				format: "YYYY-MM-DD",
				valueFormat: "YYYY-MM-DD",
				placeholder: "fdsaffa",
				clearable: true,
			},
		},
		ks: {
			component: "VmoXForm",
			debounceDelay: 100,
			props: {
				needConfirm: true,
				formFooter: {
					cancelButton: {
						buttonText: "aaaa",
					},
				},
				view: {
					type: "ElForm",
					display: {
						type: "grid",
						reactive: {
							critical: 100,
							wide: {
								minHeight: 32,
								col: 2,
								row: 1,
								gap: 10,
							},
							narr: {
								minHeight: 32,
								col: 1,
								row: 1,
								gap: 30,
							},
						},
					},
				},
				wrap: {
					type: "ElDrawer",
					anchor: {
						html: "sdfds",
					},
					props: {
						direction: "btt",
						size: "80%",
					},
				},
			},
			elements: {
				"name[1]": {
					component: "ElInput",
					item: {
						layout: "rabbit",
						type: "ElFormItem",
						props: {
							label: "label:",
							append: {
								html: "end",
							},
						},
					},
					props: {
						placeholder: "fdsaffa",
						clearable: true,
					},
				},
				"[s,e]": {
					component: "ElDatePicker",
					item: {
						layout: "rabbit",
						type: "ElFormItem",
						props: {
							label: "label:",
							append: {
								html: "end",
							},
						},
					},
					props: {
						type: "datetimerange",
						format: "YYYY-MM-DD",
						valueFormat: "YYYY-MM-DD",
						placeholder: "fdsaffa",
						clearable: true,
					},
				},
			},
		},
	},
};
