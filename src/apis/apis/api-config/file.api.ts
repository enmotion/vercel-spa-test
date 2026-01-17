import type { ApiRecord } from "vmo-umi-request";

const api: ApiRecord<string> = {
	uploadToken: {
		name: "获取上传凭证",
		url: "/api/files/upload/token/pub",
		requestConfig: {
			method: "POST",
		},
	},
};
export default api;
