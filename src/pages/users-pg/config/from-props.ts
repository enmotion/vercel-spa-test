import * as R from "ramda";
import type { DrawerFormProps } from "@typs/app-public";
import type { VXF_JSON } from "vmo-x-form";

export const drawerFormProps: DrawerFormProps<{}> = {
	create: {
		drawer: {
			title: "创建用户",
			size: "40%",
			class: "rounded-l",
			bodyClass: "flex-col grow-1",
			destroyOnClose: true,
		},
		form: {
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
					class: "rounded-b-lg grow-1 rounded",
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
						// title: "时间机器2",
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
						showMessage: false,
						inlineMessage: true,
					},
				},
				bidiBinding: true,
				isUpdatePending: true,
				steadyElementsSource: false,
				// needConfirm: true,
				// formFooter: {
				// 	triggerDelay: 1000,
				// 	confirmButton: {
				// 		buttonText: "sere",
				// 		type: "success",
				// 		class: "m-0",
				// 	},
				// 	cancelButton: "skere",
				// },
			},
			elements: {
				username: {
					component: "ElInput",
					key: "username",
					item: {
						type: "ElFormItem",
						layout: "horizontal",
						class: "my-0",
						grid: {
							col: 4,
							row: 1,
						},
						props: {
							label: {
								html: "用户名称",
								class: "text-gray-500 dark:text-gray-200 text-sm",
								tooltip: {
									content: "请输入用户姓名",
									placement: "left",
								},
							},
							rules: {
								required: true,
								trigger: "change",
								message: "请输入用户名称",
							},
						},
					},
					props: {
						placeholder: "请输入用户名称",
					},
				},
				roles: {
					component: "ElTreeSelect",
					key: "roles",
					item: {
						type: "ElFormItem",
						layout: "horizontal",
						class: "my-0",
						grid: {
							col: 4,
							row: 1,
						},
						props: {
							label: {
								html: "用户角色",
								class: "text-gray-500 dark:text-gray-200 text-sm",
								tooltip: {
									content: "请输入用户姓名",
									placement: "left",
								},
							},
							rules: {
								required: true,
								trigger: "change",
								message: "请输入用户角色",
							},
						},
					},
					props: {
						placeholder: "请输入用户角色",
						data: [
							{ label: "管理", value: "mar" },
							{ label: "测试", value: "dd" },
						],
					},
				},
				password: {
					component: "ElInput",
					key: "password",
					item: {
						type: "ElFormItem",
						layout: "horizontal",
						grid: {
							col: 4,
							row: 1,
						},
						props: {
							label: {
								html: "登录密码",
								class: "text-gray-500 dark:text-gray-200 text-sm",
								tooltip: {
									content: "请输入登录密码",
									placement: "left",
								},
							},
							rules: {
								required: true,
								trigger: "change",
								message: "请输入登录密码",
							},
						},
					},
					props: {
						type: "password",
						placeholder: "请输入登录密码",
					},
				},
			},
		},
	},
	edit: {
		drawer: {
			title: "编辑用户",
			size: "40%",
			class: "rounded-l",
			bodyClass: "flex-col grow-1",
			destroyOnClose: true,
		},
		form: {
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
					class: "rounded-b-lg grow-1 rounded",
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
						// title: "时间机器2",
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
						showMessage: false,
						inlineMessage: true,
					},
				},
				bidiBinding: true,
				isUpdatePending: true,
				steadyElementsSource: false,
				// needConfirm: true,
				// formFooter: {
				// 	triggerDelay: 1000,
				// 	confirmButton: {
				// 		buttonText: "sere",
				// 		type: "success",
				// 		class: "m-0",
				// 	},
				// 	cancelButton: "skere",
				// },
			},
			elements: {
				username: {
					component: "ElInput",
					key: "username",
					item: {
						type: "ElFormItem",
						layout: "horizontal",
						class: "my-0",
						grid: {
							col: 4,
							row: 1,
						},
						props: {
							label: {
								html: "用户名称",
								class: "text-gray-500 dark:text-gray-200 text-sm",
								tooltip: {
									content: "请输入用户姓名",
									placement: "left",
								},
							},
							rules: {
								required: true,
								trigger: "change",
								message: "请输入用户名称",
							},
						},
					},
					props: {
						placeholder: "请输入用户名称",
					},
				},
				roles: {
					component: "ElTreeSelect",
					key: "roles",
					item: {
						type: "ElFormItem",
						layout: "horizontal",
						class: "my-0",
						grid: {
							col: 4,
							row: 1,
						},
						props: {
							label: {
								html: "用户角色",
								class: "text-gray-500 dark:text-gray-200 text-sm",
								tooltip: {
									content: "请输入用户姓名",
									placement: "left",
								},
							},
							rules: {
								required: true,
								trigger: "change",
								message: "请输入用户角色",
							},
						},
					},
					props: {
						placeholder: "请输入用户角色",
						data: [
							{ label: "管理", value: "mar" },
							{ label: "测试", value: "dd" },
						],
					},
				},
				password: {
					component: "ElInput",
					key: "password",
					item: {
						type: "ElFormItem",
						layout: "horizontal",
						grid: {
							col: 4,
							row: 1,
						},
						props: {
							label: {
								html: "登录密码",
								class: "text-gray-500 dark:text-gray-200 text-sm",
								tooltip: {
									content: "请输入登录密码",
									placement: "left",
								},
							},
							rules: {
								required: true,
								trigger: "change",
								message: "请输入登录密码",
							},
						},
					},
					props: {
						type: "password",
						placeholder: "请输入登录密码",
					},
				},
			},
		},
	},
};
