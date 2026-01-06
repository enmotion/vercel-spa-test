import type { RestfullApiConfig } from "@typs/restful";
import type { ApiRecord } from "vmo-umi-request";
const api: ApiRecord<string> = {
	clientsPubRegister: {
		name: "用户注册",
		url: "/clients/pub/register",
		// axios 配置
		requestConfig: {
			method: "POST",
			middle:"/pub/"
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
		// 中间件所需 配置
	},
	clientsPubLogin: {
		name: "管理员登录",
		url: "/clients/pub/login",
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
	clientsFind: {
		name: "获取用户列表",
		url: "/clients/find",
		// axios 配置
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	// -------------------------------------------------
	clientsUniq: {
		name: "字段重名检查",
		url: "/clients/uniq",
		// axios 配置
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	clientsCreate: {
		name: "添加用户",
		url: "/clients/create",
		// axios 配置
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
	clientsCreateOrUpdate: {
		name: "添加或更新用户",
		url: "/clients/createOrUpdate",
		// axios 配置
		requestConfig: {
			method: "POST",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},

	clientsDelete: {
		name: "删除用户",
		url: "/clients/delete",
		// axios 配置
		requestConfig: {
			method: "DELETE",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},

	clientsUpdateMany: {
		name: "批量用户更新",
		// axios 配置
		url: "/clients/updateMany",
		requestConfig: {
			
			method: "PUT",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},

	clientsUpdate: {
		name: "单个用户更新",
		// axios 配置
		url: "/clients/update",
		requestConfig: {
			
			method: "PUT",
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		},
	},
};
export default api;
