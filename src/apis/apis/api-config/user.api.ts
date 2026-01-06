import type { RestfullApiConfig } from "@typs/restful";
import type { ApiRecord } from "vmo-umi-request";
const api: ApiRecord<string> = {
	usersPubRegister: {
		name: "用户注册",
		url: "/users/pub/register",
		// axios 配置
		requestConfig: {
			method: "POST",
			middle:"/pub/"
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
		// 中间件所需 配置
	},
	usersPubLogin: {
		name: "管理员登录",
		url: "/users/pub/login",
		// axios 配置
		requestConfig: {
			middle: "/pub/",
			method: "POST",
			retry:{
				count:2,
				delay:1000
			}
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	// -------------------------------------------------
	usersFind: {
		name: "获取用户列表",
		url: "/users/find",
		// axios 配置
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	// -------------------------------------------------
	usersUniq: {
		name: "字段重名检查",
		url: "/users/uniq",
		// axios 配置
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	usersCreate: {
		name: "添加用户",
		url: "/users/create",
		// axios 配置
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	userCreateOrUpdate: {
		name: "添加或更新用户",
		url: "/users/createOrUpdate",
		// axios 配置
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},

	userDelete: {
		name: "删除用户",
		url: "/users/delete",
		// axios 配置
		requestConfig: {
			method: "DELETE",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},

	usersUpdateMany: {
		name: "批量用户更新",
		// axios 配置
		url: "/users/updateMany",
		requestConfig: {
			
			method: "PUT",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},

	usersUpdate: {
		name: "单个用户更新",
		// axios 配置
		url: "/users/update",
		requestConfig: {
			
			method: "PUT",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},

	mapiMuserGroup: {
		name: "获取用户分组",
		url: "/mapi/muser/group",
		// axios 配置
		requestConfig: {
			
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	mapiMuserGroupDel: {
		name: "删除管理员分组",
		url: "/mapi/muser/groupDel",
		// axios 配置
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	mapiMuserGroupAdd: {
		name: "新增管理员分组",
		// axios 配置
		url: "/mapi/muser/groupAdd",
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	mapiMuserGroupMod: {
		name: "修改管理员分组",
		// axios 配置
		
		url: "/mapi/muser/groupMod",
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},

	mapiMuserChangeStatus: {
		name: "禁用或启用管理员",
		// axios 配置
		url: "/mapi/muser/changeStatus",
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},

	mapiMuserMod: {
		name: "修改用户",
		// axios 配置
		url: "/mapi/muser/mod",
		requestConfig: {
			
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	mapiMuserDetail: {
		name: "获取用户详情",
		// axios 配置
		url: "/mapi/muser/detail",
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
};
export default api;
