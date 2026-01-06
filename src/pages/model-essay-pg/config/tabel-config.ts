import type { VmoTable } from "@src/comps/common/vmo-table/types";
import { h } from "vue";
import D from "dayjs";
import { tagFormatter, birthToAgeFormatter, dateTimeFormatter, oprationFormatter, passdTimeFormatter } from "@src/use.lib/customeFormatter";
import type { BatchButton, OptionButton } from "@src/comps/common/vmo-table/component.vue";
import { ElTag } from "element-plus";
import type { TagProps } from "element-plus";
import { request, apis } from "@src/apis";

import { useUserStore } from "@src/stores";

const userStore = useUserStore()

const options: OptionButton[] = [
	{
		label: "编辑",
		// action: "edit",
		action: (proxy, row) => {
			console.log(proxy.$parent, row, "edit");
			request(apis.modelEssayfindOne,{uuid:row.uuid},{}).then(res=>{
				if(res.code==200){
					proxy.$parent.currentAction = "edit";
					proxy.$parent.showDrawer = true;
					proxy.$parent.itemData = res.data;
				}
			})
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
			request(apis.modelEssayfindOne,{uuid:row.uuid},{}).then(res=>{
				if(res.code==200){
					proxy.$parent.currentAction = "view";
					proxy.$parent.showDrawer = true;
					proxy.$parent.itemData = res.data;
				}
			})
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
					proxy.$request(proxy.$apis.modelEssayDelete, { uuids: row.uuid }, { method:"delete" }).then((res: any) => {
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
				proxy.$parent.itemData = { status: false, difficultyLevel: 1, gradeLevel:1 };
				proxy.$parent.currentAction = 'create';
				proxy.$parent.showDrawer = true;
		}, size: "default", type: "primary", class: "mx-[0px] mr-[5px] last:mr-0" },
		{
			label: "批量删除",
			action: (selected, proxy) => {
				const uuids = selected.map((item: Record<string, any>) => item.uuid);
				proxy
					.$confirm({
						title: "操作警告",
						message: `您确定要删除所选的 [ ${uuids.length} ] 个用户吗`,
					})
					.then(() => {
						proxy.$request(proxy.$apis.modelEssayDelete, { uuids: uuids.join(",") },{method:'delete'}).then((res: any) => {
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
			rowKey: "uuid",
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
				console.log(row.processingStatus)
				return row.super <= userStore.getInfo.super && ![1,2].includes(row.processingStatus)
			}
		},
		{
			label: "范文标题",
			prop: "title",
			fixed: "left",
			minWidth: "140px",
			formatter: (row, column, value, index) => {
				return value ?? "-";
			},
		},
    {
			label: "展示状态",
			prop: "status",
			align: "center",
			minWidth: "100px",
			formatter(row, column, value, index) {
				const text = value ? "上架" : "下架";
				return value ? h(ElTag, { type: "success" }, () => text) : h(ElTag, { type: "info" }, () => text);
			},
		},
		{
			label: "流程状态",
			prop: "processingStatus",
			align: "center",
			minWidth: "100px",
			formatter(row, column, value, index) {
				//  0:原文 1:提交评审 2:AI评审中 3:待复核 4:已复核
				const process:Partial<TagProps&{class:string,label:string}>[]=[
					{
						type:'success',
						label:'原文待审'
					},
					{
						type:'info',
						label:'提交评审'
					},
					{
						type:'info',
						label:'AI评审中'
					},
					{
						type:'warning',
						label:'待复核'
					},
					{
						type:'info',
						label:'已复核'
					},
				]
				return h(ElTag,process[value],()=>process[value].label)
			},
		},
		{
			label: "范文体裁",
			prop: "generInfo",
			align: "center",
			minWidth: "100px",
			formatter(row, column, value, index) {
				return !!value && value.length>0 ? value.map((item: Record<string, any>) => h(ElTag,{type:'warning',class:"mr-[2px] last:mr-0"},()=>item.name)) : '-';
			},
		},
		{
			label: "写作手法",
			prop: "writingMethodsInfo",
			align: "left",
			minWidth: "300px",
			formatter(row, column, value, index) {
				return !!value && value.length>0 ? value.map((item: Record<string, any>) => h(ElTag,{type:'warning',class:"mr-[2px] last:mr-0"},()=>item.name)) : '-';
			},
		},

    {
			label: "同步标签",
			prop: "syncInfo",
			align: "left",
			minWidth: "300px",
			formatter(row, column, value, index) {
				return !!value && value.length>0 ? value.map((item: Record<string, any>) => h(ElTag,{type:'warning',class:"mr-[2px] last:mr-0"},()=>item.name)) : '-';
			},
		},
		
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
			label: "创建时间",
			prop: "createdAt",
			minWidth: "220px",
			sortable: "custome",
      invisible:true,
			// formatter: passdTimeFormatter("YYYY-MM-DD HH:mm:ss"),
			formatter: dateTimeFormatter(),
		},
		{
			label: "更新用户",
			prop: "updatedUserInfo",
			minWidth: "220px",
      invisible:true,
			formatter(row, column, value, index) {
				return !!value ? (value.nickname ?? value.username) : "-";
			},
		},
		{
			label: "更新时间",
			prop: "updatedAt",
			minWidth: "220px",
			sortable: "custome",
      invisible:true,
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
				return row.super <= userStore.getInfo.super && ![1,2,4].includes(row.processingStatus) ? options.filter(item=>!['查看'].includes(item.label)) : options.filter(item=>['查看'].includes(item.label))
			}, proxy),
		},
	],
};
