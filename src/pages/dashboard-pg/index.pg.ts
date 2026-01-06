/*
 * @Author: enmotion
 * @Date: 2023-11-07 11:38:39
 * @Last Modified by: enmotion
 * @Last Modified time: 2023-11-23 11:20:09
 */

import { type VmoRouteRecordRaw } from "vmo-router";
import type { RouteMeta } from "@src/pages/index";

const router: VmoRouteRecordRaw<RouteMeta> = {
	name: "dashboard-pg",
	path: "dashboard-pg",
	meta: {
		keepAlive: true,
		tokenRequire: true,
		pageName: "系统首页",
		powerRequire: [],
	},
	component: () => import("./page.vue"),
};
export default router;
