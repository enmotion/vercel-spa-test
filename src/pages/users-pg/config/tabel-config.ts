import type { VmoTable } from "@src/comps/common/vmo-table/types";
import { h } from "vue";
import D from "dayjs";
import { tagFormatter, dateTimeFormatter, oprationFormatter } from "@src/use.lib/customeFormatter";
import type { OptionButton } from "@src/use.lib/customeFormatter";

const options: OptionButton[] = [
	{
		label: "edit",
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
	// { label: "delete", action: "delete", size: "small", type: "danger", class: "mx-[0px] mr-[5px] last:mr-0" },
];

export const topOptions: OptionButton[] = [{ label: "create", action: "create", size: "default", type: "primary", class: "mx-[0px] mr-[5px] last:mr-0" }];

export const tableConfig: {
	props: VmoTable.Table;
	columns: VmoTable.Column;
} = {
	props: (proxy) => {
		return {
			emptyText: "暂无数据",
			stripe: true,
			cellClassName: ({ row, rowIndex }) => {
				return rowIndex % 2 == 1 ? "dark:bg-[#1d2534] bg-white" : "dark:bg-[#2b2e3c] bg-gray-100";
			},
			headerCellClassName: "dark:bg-[#1d2534] bg-white h-[50px] text-sm font-normal text-gray-600 dark:text-gray-400",
		};
	},
	columns: (proxy) => [
		{
			label: "UID",
			prop: "uid",
			fixed: "left",
			minWidth: "120px",
			sortable: "custome",
			formatter: (row, column, value, index) => {
				return (value as string).toUpperCase();
			},
		},
		{
			label: "USER NAME",
			prop: "username",
			fixed: "left",
			minWidth: "140px",
			sortable: "custome",
		},
		{
			label: "AGE",
			prop: "age",
			width: "100px",
			formatter: (row, column, value, index) => {
				return value ?? "-";
			},
		},
		// { label: "状态", prop: "status", align: "center" },
		// { label: "登录次数", prop: "logincount", minWidth: "120px", align: "center", sortable: "custome" },
		// { label: "最后登录", prop: "lastime", minWidth: "120px", showOverflowTooltip: { placement: "left" }, sortable: "custome" },
		// { label: "创建时间", prop: "createTime" },
		// // { label: "更改时间", prop: "modifyTime" },
		// { label: "操作", prop: "opration", minWidth: "100px" },

		{ label: "CREATE TYPE", prop: "createdType", minWidth: "150px" },
		{
			label: "CREATE AT",
			prop: "createdAt",
			minWidth: "220px",
			formatter(row, column, value, index) {
				return D(value).format("YYYY-MM-DD HH:mm:ss");
			},
		},
		// {
		// 	label: "status",
		// 	prop: "status",
		// 	align: "center",
		// 	formatter: tagFormatter([
		// 		{ label: "禁用", type: "info" },
		// 		{ label: "启用", type: "success" },
		// 	] as Record<number, any>),
		// },
		// { label: "count", prop: "logincount", minWidth: "120px", align: "center", sortable: "custome" },
		// {
		// 	label: "updateTime",
		// 	prop: "lastime",
		// 	minWidth: "220px",
		// 	formatter: dateTimeFormatter("YYYY-MM-DD HH:mm", 1000),
		// },
		{
			label: "OPRATION",
			prop: "opration",
			width: "100px",
			fixed: "right",
			align: "center",
			showOverflowTooltip: false,
			formatter: oprationFormatter((row, column, value, inxe) => options, proxy),
		},
	],
};
