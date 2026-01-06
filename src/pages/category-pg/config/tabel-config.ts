import type { VmoTable } from "@src/comps/common/vmo-table/types";
import { h } from "vue";
import D from "dayjs";
import { tagFormatter, birthToAgeFormatter, dateTimeFormatter, oprationFormatter, passdTimeFormatter } from "@src/use.lib/customeFormatter";
import type { BatchButton, OptionButton } from "@src/comps/common/vmo-table/component.vue";
import { ElTag } from "element-plus";
import { method } from "lodash";
import { useUserStore } from "@src/stores";

const userStore = useUserStore()

const options: OptionButton[] = [
	{
		label: "编辑",
		// action: "edit",
		action: (proxy, row) => {
			console.log(proxy.$parent, row, "edit");
			proxy.$parent.currentAction = "edit";
			proxy.$parent.showDrawer = true;
			proxy.$parent.itemData = row;
		},
		size: "small",
		type: "primary",
		class: "mx-[0px] mr-[5px] last:mr-0",
	},
	// { label: "view", action: "view", size: "small", type: "success", class: "mx-[0px] mr-[5px] last:mr-0" },
	{
		label: "删除",
		action: (proxy, row) => {
			proxy
				.$confirm({
					title: "操作提示",
					message: `您确定要删除分类 [ ${row.name} ] 吗`,
				})
				.then(() => {
					proxy.$request(proxy.$apis.contentTypeCategory, { _id: row._id }, { method:"delete" }).then((res: any) => {
						if (res.code == 200) {
							proxy.$parent.query();
							proxy.$message({
								message: res.msg,
								type: "success",
							});
						} else {
							proxy.$message({
								message: res.msg,
								type: "error",
							});
						}
					});
				});
		},
		size: "small",
		type: "danger",
		class: "mx-[0px] mr-[5px] last:mr-0",
	},
];

export function topOptions(proxy:any):BatchButton[]{
	return [
		{ label: "创建分类", action: (selected, proxy)=>{
				console.log(proxy)
				proxy.$parent.itemData = { status: 1, regionalManager: 0 };
				proxy.$parent.currentAction = 'create';
				proxy.$parent.showDrawer = true;
		}, size: "default", type: "primary", class: "mx-[0px] mr-[5px] last:mr-0" },
		{
			label: "批量删除",
			action: (selected, proxy) => {
				const _ids = selected.map((item: Record<string, any>) => item._id);
				proxy
					.$confirm({
						title: "操作警告",
						message: `您确定要删除所选的 [ ${_ids.length} ] 个用户吗`,
					})
					.then(() => {
						proxy.$request(proxy.$apis.contentTypeCategory, { _id: _ids.join(",") },{method:'delete'}).then((res: any) => {
							if (res.code == 200) {
								proxy.$parent.query();
								proxy.$message({
									message: res.msg,
									type: "success",
								});
							} else {
								proxy.$message({
									message: res.msg,
									type: "error",
								});
							}
						});
					});
			},
			size: "default",
			type: "danger",
			class: "mx-[0px] mr-[5px] last:mr-0",
		},
		{
			label: "批量禁用",
			action: (selected, proxy) => {
				const _ids = selected.map((item: Record<string, any>) => item._id);
				proxy
					.$confirm({
						title: "操作警告",
						message: `您确定要禁用所选的 [ ${_ids.length} ] 个分类吗`,
					})
					.then(() => {
						proxy.$request(proxy.$apis.contentTypeCategory, { _ids, status: false }, { method:"put"}).then((res: any) => {
							if (res.code == 200) {
								proxy.$parent.query();
								proxy.$message({
									message: res.msg,
									type: "success",
								});
							} else {
								proxy.$message({
									message: res.msg,
									type: "error",
								});
							}
						});
					});
			},
			size: "default",
			plain: true,
			type: "danger",
			class: "mx-[0px] mr-[5px] last:mr-0",
		},
		{
			label: "批量启用",
			action: (selected, proxy) => {
				const _ids = selected.map((item: Record<string, any>) => item._id);
				proxy
					.$confirm({
						title: "操作警告",
						message: `您确定要启用所选的 [ ${_ids.length} ] 个分类吗`,
					})
					.then(() => {
						proxy.$request(proxy.$apis.contentTypeCategory, { _ids, status: true }, { method:"put"}).then((res: any) => {
							if (res.code == 200) {
								proxy.$parent.query();
								proxy.$message({
									message: res.msg,
									type: "success",
								});
							} else {
								proxy.$message({
									message: res.msg,
									type: "error",
								});
							}
						});
					});
			},
			size: "default",
			plain: true,
			type: "success",
			class: "mx-[0px] mr-[5px] last:mr-0",
		},
	]
}

export const tableConfig: {
	props: VmoTable.Table;
	columns: VmoTable.Column;
} = {
	props: (proxy) => {
		return {
			emptyText: "暂无数据",
			stripe: true,
			rowKey: "_id",
			cellClassName: ({ row, rowIndex }) => {
				return rowIndex % 2 == 1 ? "dark:bg-[#1d2534] bg-white" : "dark:bg-[#2b2e3c] bg-gray-100";
			},
			headerCellClassName: "dark:bg-[#1d2534] bg-white h-[50px] text-sm font-normal text-gray-600 dark:text-gray-400",
		};
	},
	columns: (proxy) => [
		{
			type: "selection",
			label: "选择",
			selectable:(row,index)=>{
				return row.super <= userStore.getInfo.super
			}
		},
		// {
		// 	label: "UID",
		// 	prop: "uid",
		// 	fixed: "left",
		// 	minWidth: "120px",
		// 	formatter: (row, column, value, index) => {
		// 		return !!value ? (value as string).toUpperCase() : "-";
		// 	},
		// },
		{
			label: "分类名称",
			prop: "name",
			fixed: "left",
			minWidth: "140px",
			formatter: (row, column, value, index) => {
				return value ?? "-";
			},
		},
		{
			label: "分类编码",
			prop: "key",
			minWidth: "140px",
			formatter: (row, column, value, index) => {
				return value ?? "-";
			},
		},
		{
			label: "分类描述",
			prop: "description",
			minWidth: "120px",
			formatter: (row, column, value, index) => {
				return value ?? "-";
			},
		},
		{
			label: "排序权重",
			prop: "order",
			align: "center",
			minWidth: "120px",
			sortable:"custome",
			formatter(row, column, value, index) {
				return value
			},
		},
		{
			label: "状态",
			prop: "status",
			align: "center",
			minWidth: "100px",
			formatter(row, column, value, index) {
				const text = value ? "正常" : "禁用";
				return value ? h(ElTag, { type: "success" }, () => text) : h(ElTag, { type: "info" }, () => text);
			},
		},
		{
			label: "创建用户",
			prop: "createdUserInfo",
			minWidth: "220px",
			formatter(row, column, value, index) {
				return !!value ? (value.nickname ?? value.username) : "-";
			},
		},
		{
			label: "创建时间",
			prop: "createdAt",
			minWidth: "220px",
			sortable: "custome",
			// formatter: passdTimeFormatter("YYYY-MM-DD HH:mm:ss"),
			formatter: dateTimeFormatter(),
		},
		{
			label: "更新用户",
			prop: "updatedUserInfo",
			minWidth: "220px",
			formatter(row, column, value, index) {
				return !!value ? (value.nickname ?? value.username) : "-";
			},
		},
		{
			label: "更新时间",
			prop: "updatedAt",
			minWidth: "220px",
			sortable: "custome",
			// formatter: passdTimeFormatter("YYYY-MM-DD HH:mm:ss"),
			formatter: dateTimeFormatter(),
		},
		{
			label: "操作",
			prop: "opration",
			width: "120px",
			fixed: "right",
			align: "center",
			showOverflowTooltip: false,
			formatter: oprationFormatter((row, column, value, inxe) => {
				return row.super <= userStore.getInfo.super ? options : options.filter(item=>['编辑'].includes(item.label))
			}, proxy),
		},
	],
};
