import { type VmoRouteRecordRaw } from "vmo-router";
import type { RouteMeta } from "@src/pages/index";

const router: VmoRouteRecordRaw<RouteMeta> = {
	path: "/erroDev", // 全系统默认抵达页面, 故路由配置为空路径
	name: "erro-Dev", // 该页面属于路由嵌套容器页面，无法直接访问，无需配置名称
	meta: {
		tokenRequire: true,
		powerRequire: [],
		pageName: "设备受限",
		avoidPushToTag: true,
		keepAlive: false,
		unConfigurable: true, // 该路由是否支持动态配置,
	},
	component: () => import("./erroDev.vue"),
};
export default router;
