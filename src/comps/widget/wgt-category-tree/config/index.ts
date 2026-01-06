import type { VmoDirTreeProps } from "@src/comps/common/vmo-dir-tree/component.vue";
import type { VXF_JSON, VXF_PUB } from "vmo-x-form";
import * as R from "ramda";
import { getConvertAutoKey, isValidateKeyValue, isValidateNameValue } from "@src/use.lib/public-tools";
import { request, apis } from "@src/apis";

const publicLabelClass = "w-[110px] mr-[15px] flex-row items-center justify-end";
export const treeConfig: Partial<VmoDirTreeProps> = {
	// data: async function (): Promise<Record<string, any>[]> {
	// 	console.log("a");
	// 	return new Promise((resolve, reject) => {
	// 		request(apis.mapiTagList, {}).then((res) => {
	// 			console.log(res);
	// 			if (res.code == 200) {
	// 				resolve([
	// 					{ label: "aaaaa", value: "a" },
	// 					{ label: "abbbb", value: "b" },
	// 					{ label: "acccc", value: "c" },
	// 					{ label: "adddd", value: "d" },
	// 				]);
	// 			} else {
	// 				resolve([
	// 					{ label: "aaaaa", value: "a" },
	// 					{ label: "abbbb", value: "b" },
	// 					{ label: "acccc", value: "c" },
	// 					{ label: "adddd", value: "d" },
	// 				]);
	// 			}
	// 		});
	// 	});
	// },
	headerHeight: 97,
	disabled: true,
	listTreeProps: {
		nodeHeight: 32,
		showCheckbox: true,
		multiple: false,
		renderAfterExpand: true,
		expandOnClickNode: false,
		checkStrictly: true,
		defaultExpandAll: true,
	},
	searchInputProps: {
		clearable: true,
		placeholder: "请输入过滤条件",
	},

	nodeOptionButtons: function getOptionButtons(data: Record<string, any>) {
		return data.createdType == "system"
			? [
				{
					label: "VIEW",
					disabled: true,
					size: "small",
					text: true,
					action: function (data: Record<string, any>) {
						console.log(this, data);
					},
				},
			]
			: import.meta.env.MODE == "development"
				? [
					{
						label: "添加子级",
						size: "small",
						type: "primary",
						text: true,
						plain: true,
						action: function (data: Record<string, any>) {
							const THIS: any = this;
							THIS.showDialog = true;
							THIS.nodeData = {
								parent: data.id,
								createdType: "user",
							};
						},
					},
					{
						label: "编辑当前",
						size: "small",
						type: "primary",
						text: true,
						plain: true,
						action: function (data: Record<string, any>) {
							const THIS: any = this;
							THIS.showDialog = true;
							THIS.nodeData = data;
							THIS.nodeData.label = data.label.split("/")[0].replace(/\s/g, "");
						},
					},
					{
						label: "删除当前",
						size: "small",
						type: "danger",
						text: true,
						plain: true,
						action: function (data: Record<string, any>) {
							const THIS: any = this;
							console.log(THIS);
							THIS.$confirm({
								title: "操作警告",
								message: `您确定要删除<span class="mx-5 text-d-10 font-bold">[${data.label}]</span>吗?`,
								dangerouslyUseHTMLString: true,
							}).then(() => {
								THIS.$request(THIS.$apis.mapiTagDel, { ids: [data.id] }).then((res: any) => {
									// console.log()
									if (res.code == 200) {
										THIS.$message({
											message: res.msg,
											type: "success",
										});
										THIS.getCategorytreeDatas();
									} else {
										THIS.$message({
											message: res.msg,
											type: "error",
										});
									}
								});
							});
						},
					},
				]
				: [
					{
						label: "添加子级",
						size: "small",
						type: "primary",
						text: true,
						plain: true,
						action: function (data: Record<string, any>) {
							const THIS: any = this;
							THIS.showDialog = true;
							THIS.nodeData = {
								parent: data.id,
								createdType: "user",
							};
						},
					},
					{
						label: "编辑当前",
						size: "small",
						type: "primary",
						text: true,
						plain: true,
						action: function (data: Record<string, any>) {
							const THIS: any = this;
							THIS.showDialog = true;
							THIS.nodeData = data;
							THIS.nodeData.label = data.label.split("/")[0].replace(/\s/g, "");
						},
					},
					// {
					// 	label: "删除当前",
					// 	size: "small",
					// 	type: "danger",
					// 	text: true,
					// 	plain: true,
					// 	action: function (data: Record<string, any>) {
					// 		const THIS: any = this;
					// 		console.log(THIS);
					// 		THIS.$confirm({
					// 			title: "操作警告",
					// 			message: `您确定要删除<span class="mx-5 text-d-10 font-bold">[${data.label}]</span>吗?`,
					// 			dangerouslyUseHTMLString: true,
					// 		}).then(() => {
					// 			THIS.$request(THIS.$apis.mapiTagDel, { ids: [data.id] }).then((res: any) => {
					//         // console.log()
					// 				if (res.code == 200) {
					// 					THIS.$message({
					// 						message: res.msg,
					// 						type: "success",
					// 					});
					// 					THIS.getCategorytreeDatas();
					// 				} else {
					// 					THIS.$message({
					// 						message: res.msg,
					// 						type: "error",
					// 					});
					// 				}
					// 			});
					// 		});
					// 	},
					// },
				];
	},
};
export function generatorNodeForm(labelName: string, id?: string | number): VXF_JSON.CompProp<{}> {
	return {
		component: "VmoXForm",
		props: {
			stateKeysUpdate(n, o, state) {
				if (R.keys(n).includes("label")) {
					state["key"] = getConvertAutoKey(n["label"], state["key"]);
				}
				return state;
			},
			disabled: false,
			wrap: {
				type: "Div",
				class: "flex-col -mx-5",
			},
			view: {
				type: "ElForm",
				display: {
					type: "grid",
					reactive: {
						critical: 800,
						wide: { col: 4, minHeight: 32, gap: 15 },
						narr: { col: 2, minHeight: 32, gap: 15 },
					},
				},
				props: {
					labelPosition: "right",
					showMessage: false,
					inlineMessage: true,
				},
			},
			bidiBinding: true,
			isUpdatePending: false,
			steadyElementsSource: false,
		},
		elements: {
			label: {
				component: "ElInput",
				propagateUpEvents: "change",
				item: {
					type: "ElFormItem",
					class: "mb-0",
					grid: {
						col: 4,
						row: 1,
					},
					props: {
						label: {
							html: `${labelName}`,
							class: publicLabelClass,
						},
						rules: {
							trigger: ["change", "blur"],
							required: true,
							validator: (rule, value, cb) => {
								if (!!value && isValidateNameValue(value, 2, 24)) {
									cb();
								} else {
									cb(`缺少${labelName}名称,仅仅支持中文数字‘-' 3~24位`);
								}
							},
						},
					},
				},
				props: {
					maxlength: 20,
					clearable: true,
					placeholder: `请输入${labelName}名称 3~24位`,
				},
			},
			key: {
				component: "ElInput",
				item: {
					type: "ElFormItem",
					class: "mb-0",
					grid: {
						col: 4,
						row: 1,
					},
					props: {
						label: {
							html: `系统键名`,
							class: publicLabelClass,
						},
						rules: {
							trigger: ["change", "blur"],
							required: true,
							// message: `缺少系统键名`,
							validator: (rule, value, cb) => {
								if (!!value && isValidateKeyValue(value, 3, 24)) {
									cb();
								} else {
									cb(new Error('请输入正确的键名,长度4～24位,仅允许字母、数字、"-"'));
								}
							},
						},
					},
				},
				props: {
					// disabled:!!id,
					maxlength: 24,
					clearable: true,
					placeholder: `请输入${labelName}系统键名`,
				},
			},
			order: {
				component: "ElInputNumber",
				item: {
					type: "ElFormItem",
					class: "mb-0",
					grid: {
						col: 4,
						row: 1,
					},
					props: {
						label: {
							html: `排序权重`,
							class: publicLabelClass,
						},
						rules: {
							trigger: ["change", "blur"],
							type: "number",
							required: true,
							message: `缺少系统键名`,
						},
					},
				},
				props: {
					placeholder: `设置排序权重`,
				},
			},
			description: {
				component: "ElInput",
				item: {
					type: "ElFormItem",
					class: "mb-0 flex-row !items-start",
					style: {
						"--alignItems": "start",
					},
					grid: {
						col: 4,
						row: 2,
					},
					props: {
						label: {
							html: `描述信息`,
							class: publicLabelClass,
						},
						rules: {
							trigger: ["change", "blur"],
							required: true,
							message: `缺少描述信息`,
						},
					},
				},
				props: {
					rows: 5,
					type: "textarea",
					maxlength: 120,
					showWordLimit: true,
					placeholder: `输入描述信息`,
				},
			},
		},
	};
}
