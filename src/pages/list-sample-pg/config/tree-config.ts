import type { VmoDirTreeProps } from "@src/comps/common/vmo-dir-tree/component.vue";

export const treeConfig: Partial<VmoDirTreeProps> = {
	data: async function ksk(): Promise<Record<string, any>[]> {
		return new Promise((resolve, reject) => {
			const data: Record<string, any>[] = [];
			for (let key = 0; key < 10; key++) {
				data.push({ label: "THIE IS NAME:" + key, value: "ID:" + key });
			}
			resolve(data as Record<string, any>[]);
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
