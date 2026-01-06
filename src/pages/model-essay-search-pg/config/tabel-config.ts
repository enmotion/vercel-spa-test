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
		plain:true,
		class: "mx-[0px] mr-[5px] last:mr-0",
	},
	// { label: "view", action: "view", size: "small", type: "success", class: "mx-[0px] mr-[5px] last:mr-0" },
	{
		label: "删除",
		action: (proxy, row) => {
			proxy
				.$confirm({
					title: "操作提示",
					message: `您确定要删除标签 [ ${row.name} ] 吗`,
				})
				.then(() => {
					proxy.$request(proxy.$apis.modelEssayDelete, { _id: row._id }, { method:"delete" }).then((res: any) => {
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
		{ label: "创建范文存档", action: (selected, proxy)=>{
				console.log(proxy)
				proxy.$parent.itemData = { status: true, difficultyLevel: 1, gradeLevel:1 };
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
						proxy.$request(proxy.$apis.modelEssayDelete, { _id: _ids.join(",") },{method:'delete'}).then((res: any) => {
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
			label: "批量下架",
			action: (selected, proxy) => {
				const _ids = selected.map((item: Record<string, any>) => item._id);
				proxy
					.$confirm({
						title: "操作警告",
						message: `您确定要下架所选的 [ ${_ids.length} ] 个范文吗`,
					})
					.then(() => {
						proxy.$request(proxy.$apis.modelEssayUpdateMany, { _ids, status: false }, { method:"put"}).then((res: any) => {
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
			label: "批量上架",
			action: (selected, proxy) => {
				const _ids = selected.map((item: Record<string, any>) => item._id);
				proxy
					.$confirm({
						title: "操作警告",
						message: `您确定要上架所选的 [ ${_ids.length} ] 个范文吗`,
					})
					.then(() => {
						proxy.$request(proxy.$apis.modelEssayUpdateMany, { _ids, status: true }, { method:"put"}).then((res: any) => {
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
      width: "40px",
			selectable:(row,index)=>{
				return row.super <= userStore.getInfo.super
			}
		},
		{
			label: "范文标题",
			prop: "payload.title",
			fixed: "left",
			minWidth: "140px",
			formatter: (row, column, value, index) => {
				return value ?? "-";
			},
		},
    {
			label: "内容",
			prop: "payload.content",
			align: "left",
			minWidth: "600px",
			formatter(row, column, value, index) {
				return value;
			},
		},
		{
			label: "状态",
			prop: "payload.status",
			align: "center",
			minWidth: "100px",
			formatter(row, column, value, index) {
				const text = value ? "上架" : "下架";
				return value ? h(ElTag, { type: "success" }, () => text) : h(ElTag, { type: "info" }, () => text);
			},
		},
		// {
		// 	label: "范文体裁",
		// 	prop: "payload.genre",
		// 	align: "center",
		// 	minWidth: "100px",
		// 	formatter(row, column, value, index) {
		// 		return !!value ? h(ElTag, { type: 'warning' }, () => value): "-";
		// 	},
		// },
		// {
		// 	label: "写作手法",
		// 	prop: "payload.writingMethods",
		// 	align: "left",
		// 	minWidth: "300px",
		// 	formatter(row, column, value, index) {
		// 		return !!value ? value.map((item: string) => h(ElTag,{type:'warning',class:"mr-[2px] last:mr-0"},()=>item)) : '-';
		// 	},
		// },

    // {
		// 	label: "同步标签",
		// 	prop: "payload.syncInfo",
		// 	align: "left",
		// 	minWidth: "300px",
		// 	formatter(row, column, value, index) {
		// 		return !!value ? value.map((item: Record<string, any>) => h(ElTag,{type:'warning',class:"mr-[2px] last:mr-0"},()=>item.name)) : '-';
		// 	},
		// },
		
		{
			label: "创建用户",
			prop: "createdUserInfo",
			minWidth: "220px",
      invisible:true,
			formatter(row, column, value, index) {
				return !!value ? (value.nickname ?? value.username) : "-";
			},
		},		
		{
			label: "操作",
			prop: "opration",
			width: "120px",
			fixed: "right",
			align: "center",
      
			showOverflowTooltip: false,
			formatter: oprationFormatter((row, column, value, inxe) => {
				return row.super <= userStore.getInfo.super ? options.filter(item=>!['查看'].includes(item.label)) : options.filter(item=>['查看'].includes(item.label))
			}, proxy),
		},
	],
};
