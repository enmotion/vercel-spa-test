import type { ApiRecord } from "vmo-umi-request";
const api: ApiRecord<string> = {
	userLogin: {
		name: "测试用户登录接口",
		url:"/admin/pub/user/{talentID}/login/{userSpace}/",
		requestConfig:{
			method: "DELETE",
			middle:"/clearEmptyValue"
		}
	},
};
export default api;
