import type { App } from "vue";
import { VmoUmiRequest } from "vmo-umi-request";
import apis from "./apis";
import packToken from "./pipes/packToken"; // 引入TOKEN打包 中间件
// 相关服务地址地址声明
// const dev_host = import.meta.env.VITE_APP_API_BASE_URL; // 开发环境地址 开启代理模式后，请依照代理模式配置
// const pud_host = import.meta.env.VITE_APP_API_BASE_URL;
const host = import.meta.env.VITE_APP_API_BASE_URL; // 打包时自动切换地址
const wsst = "wss://www.xxxxxxx.cn:81"; //socket地址
console.log(1111111)
const VUR = new VmoUmiRequest({
	prefix: host,
	method: "POST",
	headers: {
		Authorization: "Basic c3dvcmQ6c3dvcmRfc2VjcmV0",
		"Tenant-Id": "*",
	}, //请求头
	timeout: 10000, //超时时间
})

VUR.instance.use(packToken()); // 引入token中间件

export function useRequestPlugin(app: App<Element>) {
	app.config.globalProperties.$apis = apis;
	// app.provide('$apis', apis)
	app.config.globalProperties.$request = VUR.request;
	app.config.globalProperties.$host = host;
	// app.provide('$host', host)
	app.config.globalProperties.$wsst = wsst;
	// app.provide('$wsst', wsst)
}
const request = VUR.request
export { 
	request, 
	apis, 
	host, 
	wsst 
};
