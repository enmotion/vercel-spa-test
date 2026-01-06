import type { VmoTable } from "@src/comps/common/vmo-table/types";
import { h } from "vue";
import D from "dayjs";
import { tagFormatter, birthToAgeFormatter, dateTimeFormatter, oprationFormatter, passdTimeFormatter } from "@src/use.lib/customeFormatter";
import type { OptionButton } from "@src/use.lib/customeFormatter";
import type { BatchButton } from "@src/comps/common/vmo-table/component.vue";
import { useUserStore } from "@src/stores";
import { ElTag } from "element-plus";
const userStore = useUserStore();
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
	{
		label: "查看",
		// action: "edit",
		action: (proxy, row) => {
			console.log(proxy.$parent, row, "view");
			proxy.$parent.currentAction = "view";
			proxy.$parent.showDrawer = true;
			proxy.$parent.itemData = row;
		},
		size: "small",
		type: "primary",
		plain: true,
		class: "mx-[0px] mr-[5px] last:mr-0",
	},
	{
		label: "删除",
		action: (proxy, row) => {
			proxy
				.$confirm({
					title: "操作提示",
					message: `您确定要删除用户 [ ${row.username} ] 吗`,
				})
				.then(() => {
					proxy.$request(proxy.$apis.userDelete, { uid: row.uid }).then((res: any) => {
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
		{ label: "创建用户", action: (seleted,proxy)=>{
			console.log(proxy)
			proxy.$parent.itemData = { status: true, super:0 };
			proxy.$parent.currentAction = 'create';
			proxy.$parent.showDrawer = true;
		}, disabled:proxy.selection.length!=0, size: "default", type: "primary", class: "mx-[0px] mr-[5px] last:mr-0" },
		{
			label: "批量删除",
			disabled:proxy.selection.length==0,			
			action: (selected, proxy) => {
				console.log(selected,proxy,'111113')
				const selectedUid = selected.map((item: Record<string, any>) => item.uid);
				proxy
					.$confirm({
						title: "操作警告",
						message: `您确定要删除所选的 [ ${selectedUid.length} ] 个用户吗`,
					})
					.then(() => {
						proxy.$request(proxy.$apis.userDelete, { uid: selectedUid.join(",") }).then((res: any) => {
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
			type: proxy.selection.length==0?"default":"danger",
			class: "mx-[0px] mr-[5px] last:mr-0",
		},
		{
			label: "批量禁用",
			disabled:proxy.selection.length==0,
			action: (selected, proxy) => {
				console.log(selected,proxy,'111113')
				const selectedUid = selected.map((item: Record<string, any>) => item.uid);
				proxy
					.$confirm({
						title: "操作警告",
						message: `您确定要禁用所选的 [ ${selectedUid.length} ] 个用户吗`,
					})
					.then(() => {
						proxy.$request(proxy.$apis.usersUpdateMany, { uid: selectedUid, status: false }).then((res: any) => {
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
			type: proxy.selection.length==0?"default":"danger",
			class: "mx-[0px] mr-[5px] last:mr-0",
		},
		{
			label: "批量启用",
			disabled:proxy.selection.length==0,
			action: (selected, proxy) => {
				const selectedUid = selected.map((item: Record<string, any>) => item.uid);
				proxy
					.$confirm({
						title: "操作警告",
						message: `您确定要启用所选的 [ ${selectedUid.length} ] 个用户吗`,
					})
					.then(() => {
						proxy.$request(proxy.$apis.usersUpdateMany, { uid: selectedUid, status: true }).then((res: any) => {
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
			type: proxy.selection.length==0?"default":"success",
			class: "mx-[0px] mr-[5px] last:mr-0",
		},
	]
}
// export const topOptions: BatchButton[] = [
// 	{ label: "创建用户", action: "create", size: "default", type: "primary", class: "mx-[0px] mr-[5px] last:mr-0" },
// 	{
// 		label: "批量删除",
// 		action: (selected, proxy) => {
// 			console.log(selected,proxy,'111113')
// 			const selectedUid = selected.map((item: Record<string, any>) => item.uid);
// 			proxy
// 				.$confirm({
// 					title: "操作警告",
// 					message: `您确定要删除所选的 [ ${selectedUid.length} ] 个用户吗`,
// 				})
// 				.then(() => {
// 					proxy.$request(proxy.$apis.userDelete, { uid: selectedUid.join(",") }).then((res: any) => {
// 						if (res.code == 200) {
// 							proxy.$parent.query();
// 							proxy.$message({
// 								message: res.msg,
// 								type: "success",
// 							});
// 						} else {
// 							proxy.$message({
// 								message: res.msg,
// 								type: "error",
// 							});
// 						}
// 					});
// 				});
// 		},
// 		size: "default",
// 		type: "danger",
// 		class: "mx-[0px] mr-[5px] last:mr-0",
// 	},
// 	{
// 		label: "批量禁用",
// 		action: (selected, proxy) => {
// 			console.log(selected,proxy,'111113')
// 			const selectedUid = selected.map((item: Record<string, any>) => item.uid);
// 			proxy
// 				.$confirm({
// 					title: "操作警告",
// 					message: `您确定要禁用所选的 [ ${selectedUid.length} ] 个用户吗`,
// 				})
// 				.then(() => {
// 					proxy.$request(proxy.$apis.usersUpdateMany, { uid: selectedUid, status: false }).then((res: any) => {
// 						if (res.code == 200) {
// 							proxy.$parent.query();
// 							proxy.$message({
// 								message: res.msg,
// 								type: "success",
// 							});
// 						} else {
// 							proxy.$message({
// 								message: res.msg,
// 								type: "error",
// 							});
// 						}
// 					});
// 				});
// 		},
// 		size: "default",
// 		plain: true,
// 		type: "danger",
// 		class: "mx-[0px] mr-[5px] last:mr-0",
// 	},
// 	{
// 		label: "批量启用",
// 		action: (selected, proxy) => {
// 			const selectedUid = selected.map((item: Record<string, any>) => item.uid);
// 			proxy
// 				.$confirm({
// 					title: "操作警告",
// 					message: `您确定要启用所选的 [ ${selectedUid.length} ] 个用户吗`,
// 				})
// 				.then(() => {
// 					proxy.$request(proxy.$apis.usersUpdateMany, { uid: selectedUid, status: true }).then((res: any) => {
// 						if (res.code == 200) {
// 							proxy.$parent.query();
// 							proxy.$message({
// 								message: res.msg,
// 								type: "success",
// 							});
// 						} else {
// 							proxy.$message({
// 								message: res.msg,
// 								type: "error",
// 							});
// 						}
// 					});
// 				});
// 		},
// 		size: "default",
// 		plain: true,
// 		type: "success",
// 		class: "mx-[0px] mr-[5px] last:mr-0",
// 	},
// ];

export const tableConfig: {
	props: VmoTable.Table;
	columns: VmoTable.Column;
} = {
	props: (proxy) => {
		return {
			size:"large",
			emptyText: "暂无数据",
			stripe: true,
			rowKey: "uid",
			cellClassName: ({ row, rowIndex }) => {
				return rowIndex % 2 == 1 ? "dark:bg-[#1d2534] bg-white" : "dark:bg-[#2b2e3c] bg-gray-100";
			},
			headerCellClassName: "dark:bg-[#1d2534] bg-white h-[60px] !font-bold text-md font-normal text-gray-600 dark:text-gray-400",
		};
	},
	columns: (proxy) => [
		{
			type: "selection",
			label: "选择",
			selectable:(row, index) => {
				return userStore.getInfo.super > row.super;
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
			label: "昵称",
			prop: "nickname",
			fixed: "left",
			minWidth: "100px",
			formatter: (row, column, value, index) => {
				return value ?? "-";
			},
		},
		{
			label: "账号",
			prop: "username",
			minWidth: "140px",
			sortable: "custome",
			tooltipFormatter: (data) => {
				return data.row.nickname;
			},
			formatter: (row, column, value, index) => {
				return `${row.username}`;
			},
		},
		{
			label: "年龄",
			prop: "birth",
			minWidth: "100px",
			sortable: "custome",
			formatter: birthToAgeFormatter(),
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
		{ label: "登录次数", prop: "loginCount", minWidth: "120px", align: "center", sortable: "custome" },
		// { label: "最后登录", prop: "lastime", minWidth: "120px", showOverflowTooltip: { placement: "left" }, sortable: "custome" },
		// { label: "创建时间", prop: "createTime" },
		// // { label: "更改时间", prop: "modifyTime" },
		// { label: "操作", prop: "opration", minWidth: "100px" },
		{
			label: "创建类型",
			prop: "createdType",
			minWidth: "150px",
			align: "center",
			formatter: tagFormatter({
				register: { label: "注册", type: "warning" },
				admin: { label: "创建", type: "success" },
			}),
		},
		{
			label: "创建用户",
			prop: "createdUserInfo",
			minWidth: "120px",
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
			minWidth: "120px",
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
			minWidth: "130px",
			fixed: "right",
			align: "center",
			showOverflowTooltip: false,
			formatter: oprationFormatter((row, column, value, inxe) => {
				return userStore.getInfo.super > row.super && row.uid!=userStore.getInfo.uid ? options.filter(item=>item.label !== "查看") : 
				row.uid == userStore.getInfo.uid ?
				options.filter((item) => ['编辑'].includes(item.label)) : options.filter((item) => ['查看'].includes(item.label))
			}, proxy),
		},
	],
};
