import * as R from "ramda";
import type { DrawerFormProps } from "@typs/app-public";
import type { VXF_JSON } from "vmo-x-form";
import { request, apis } from "@src/apis";
import { put } from "@vercel/blob/client";
import { useUserStore } from "@src/stores";
const userStore = useUserStore();
const publicLabelClass = "w-[90px] flex-row items-center justify-end !mr-[10px]";
export default {
	component: "VmoXForm",
	debounceDelay: 0,
	props: {
		disabled: false,
		stateKeysUpdate: async function (n, o, state) {
			return state;
		},
		elementsWatcher: async function (state, ui:Record<string,any>, beforeUpdateStateKeyMap) {
			const vm = this as any
			if(userStore.getInfo._id == vm.computedLevelData?._id ){
				ui['status'].disabled = true
			}
			ui['super'].props.max = userStore.getInfo.super??0;
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
					critical: 300,
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
		avatar: {
			component: "VmoImgUploader",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 2,
					row: 3,
				},
				props: {
					rules: {
						required: false,
						trigger: ["change", "blur"],
						message: "请输入用户昵称",
					},
				},
			},
			props: {
				triggerClass: "!bg-dark-2 border-dark-3 dark:!bg-dark-12 dark:!border-light-3 rounded-lg",
				gap: "0px",
				lineRows: 1,
				placeholder: "",
				autoCompression: true,
				sizeLimit: 20 * 1024,
				keepFileTypeAfterAutoCompression: true,
				prefix:"",
				uploadProps: {
					multiple: false,
					limit: 1,
					httpRequest: async (options) => {
						try {
							// 1. 获取上传凭证 (自动携带 Auth Token)
							const tokenRes = await request(apis.uploadToken, {
								pathname: options.file.name
							}, {});
							if (tokenRes.code !== 200 || !tokenRes.data?.clientToken) {
								throw new Error(tokenRes.msg || 'Failed to get upload token');
							}
							// 2. 使用凭证直传 Vercel Blob
							const newBlob = await put(options.file.name, options.file, {
								access: 'public',
								token: tokenRes.data.clientToken, // 使用获取到的客户端 Token
							});
							console.log('Vercel Blob Upload Success:', newBlob.url);
							// 兼容部分 Upload 组件需要手动调用 onSuccess
							if (options.onSuccess) {
								options.onSuccess(newBlob.url);
							}
							return Promise.resolve(newBlob.url);
						} catch (error) {
							console.error('Upload failed:', error);
							return Promise.reject(error);
						}
					},
				},
			},
		},
		nickname: {
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 10,
					row: 1,
				},
				props: {
					label: {
						html: "用户昵称",
						class: publicLabelClass,
						tooltip: {
							content: "请输用户昵称",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["blur"],
						validator:function(rule,value,cb){
							if(!!value){
								request(apis.usersUniq,{nickname:value,_id:this.$formData._id},{}).then(res=>{
									if(res?.data?.total==0){
										cb()
									}else{
										cb("该昵称已经被占用")
									}
								})
							}else{
								cb("请输入用户昵称")
							}
						}
					},
				},
			},
			props: {
				maxlength: 24,
				placeholder: "请输用户昵称",
			},
		},
		username: {
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 10,
					row: 1,
				},
				props: {
					label: {
						html: "账号名称",
						class: publicLabelClass,
						tooltip: {
							content: "请输入账号名称",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						validator:function(rule,value,cb){
							if(!!value){
								request(apis.usersUniq,{username:value,_id:this.$formData._id},{}).then(res=>{
									if(res?.data?.total==0){
										cb()
									}else{
										cb("该账号已经被占用")
									}
								})
							}else{
								cb("请输入用户账号")
							}
						}
					},
				},
			},
			props: {
				maxlength: 24,
				placeholder: "请输入账号名称",
			},
		},
		password: {
			component: "ElInput",
			item: {
				type: "ElFormItem",
				layout: "horizontal",
				class: "my-0",
				grid: {
					col: 10,
					row: 1,
				},
				props: {
					label: {
						html: "登录密码",
						class: publicLabelClass,
						tooltip: {
							content: "可重置该用户登录密码",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						validator(rule, value, callback) {
							const regexp = /^.{6,18}$/;
							if (regexp.test(value)) {
								callback();
							} else {
								callback(new Error("密码长度6-18位"));
							}
						},
						message: "请输入用户登录密码",
					},
				},
			},
			props: {
				type: "password",
				autocomplete: "off",
				showPassword: true,
				placeholder: "请输入登录密码",
			},
		},
		phone: {
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
						html: "用户手机",
						class: publicLabelClass,
						tooltip: {
							content: "请输入用户手机号码",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						// validator(rule, value, callback) {
						// 	const regexp = /^1[3-9]\d{9}$/;
						// 	if (!value || regexp.test(value)) {
						// 	if(!!value){
						// 			request(apis.usersUniq,{phone:value,_id:this.$formData._id},{}).then(res=>{
						// 				console.warn(res)
						// 				if(res?.data?.total==0){
						// 					callback()
						// 				}else{
						// 					callback("该手机号码已经被占用")
						// 				}
						// 			})
						// 		}else{
						// 			callback("请输入手机号码")
						// 		}
						// 	} else {
						// 		callback(new Error("请输入正确手机号"));
						// 	}
						// },
						message: "请输入用户手机",
					},
				},
			},
			props: {
				placeholder: "请输入用户手机",
			},
		},
		email: {
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
						html: "用户邮箱",
						class: publicLabelClass,
						tooltip: {
							content: "请输入用户邮箱",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						// validator(rule, value, callback) {
						// 	const regexp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
						// 	if (!value || regexp.test(value)) {
						// 		request(apis.usersUniq,{email:value,_id:this.$formData._id},{}).then(res=>{
						// 			if(res?.data?.total==0){
						// 				callback()
						// 			}else{
						// 				callback("该邮箱已经被占用")
						// 			}
						// 		})
						// 	} else {
						// 		callback(new Error("请输入正确用户邮箱"));
						// 	}
						// },
						message: "请输入用户邮箱",
					},
				},
			},
			props: {
				placeholder: "请输入用户邮箱",
			},
		},
		birth: {
			component: "ElDatePicker",
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
						html: "用户生日",
						class: publicLabelClass,
						tooltip: {
							content: "请输入用户生日",
							placement: "left",
						},
					},
					rules: {
						required: false,
						trigger: ["change", "blur"],
						message: "请输入用户生日",
					},
				},
			},
			props: {
				placeholder: "请输入用户生日",
				controls: false,
			},
		},
		super: {
			component: "ElInputNumber",
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
						html: "安全等级",
						class: publicLabelClass,
						tooltip: {
							content: "用户安全等级，超级管理员为最高安全等级",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入安全等级",
					},
				},
			},
			props: {
				min:0,
				step:1,
			},
		},
		status: {
			component: "ElSwitch",
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
						html: "用户状态",
						class: publicLabelClass,
						tooltip: {
							content: "用户状态禁用时，用户不可登录",
							placement: "left",
						},
					},
					rules: {
						required: true,
						trigger: ["change", "blur"],
						message: "请输入用户状态",
					},
				},
			},
			props: {},
		},
	},
} as VXF_JSON.CompProp<{}>;
