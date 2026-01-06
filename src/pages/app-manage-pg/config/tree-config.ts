import type { VmoDirTreeProps } from "@src/comps/common/vmo-dir-tree/component.vue";
import { request, apis } from "@src/apis";

export const treeConfig: Partial<VmoDirTreeProps> = {
	data: async function ksk(): Promise<Record<string, any>[]> {
		console.log("aaa");
		return new Promise((resolve, reject) => {
			request(apis.mapiTagList, {},{}).then((res:any) => {
				if (res.code == 200) {
					resolve(res.data.list);
				}
			});
		});
	},
	headerHeight: 97,
	listTreeProps: {
		nodeHeight: 32,
		showCheckbox: true,
		renderAfterExpand: true,
		expandOnClickNode: false,
		checkStrictly: false,
	},
	searchInputProps: {
		clearable: true,
	},
	nodeOptionButtons: function getOptionButtons(data: Record<string, any>) {
		return data.label == "a1"
			? [
					{
						label: "CESHI",
						disabled: true,
						size: "small",
						text: true,
						action: function (data: Record<string, any>) {
							console.log(this, data);
						},
					},
				]
			: [
					{
						label: "编辑",
						size: "small",
						type: "primary",
						text: true,
						plain: true,
						action: function (data: Record<string, any>) {
							console.log(this, data);
						},
					},
					{
						label: "删除",
						size: "small",
						type: "danger",
						text: true,
						plain: true,
						action: function (data: Record<string, any>) {
							console.log(this, data);
						},
					},
				];
	},
};
