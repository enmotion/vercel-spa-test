// import type { MicroApp } from "@micro-zoe/micro-app";
export type StringKeyObject = { [key: string]: any };
declare global {
	// micro-app 微前端框架下的window对象
	interface Window {
		microApp: any;
		mount: () => any;
		unmount: () => any;
		microApp: any;
		__MICRO_APP_ENVIRONMENT__?: boolean; // 判断应用是否在微前端环境中
		__MICRO_APP_NAME__?: string; // 应用名称 在子应用中通过 window.__MICRO_APP_NAME__ 获取应用的name值，即<micro-app>标签的name值。
		__MICRO_APP_PUBLIC_PATH__?: string; // 子应用的静态资源前缀
		__MICRO_APP_BASE_ROUTE__?: string; // 子应用的基础路由
		__MICRO_APP_BASE_APPLICATION__?: boolean; // 判断应用是否是主应用
	}
}
