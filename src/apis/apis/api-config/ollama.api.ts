import type { ApiRecord } from "vmo-umi-request"
const api: ApiRecord<string> = {
  generate: {
    name: "测试用户登录接口",
    url:"/generate",
    // axios 配置
    requestConfig: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    },
  },
};
export default api;