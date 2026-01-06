import type { ApiRecord } from "vmo-umi-request";
const api: ApiRecord<string> = {
	upload: {
		name: "文件上传",
		url: "/system/upload",
		requestConfig: {
			method: "POST",
		},		
	},
};
export default api;
