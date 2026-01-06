/*
 * @Author: enmotion
 * @Date: 2023-11-07 11:38:39
 * @Last Modified by: enmotion
 * @Last Modified time: 2023-11-07 15:50:28
 */
import { type VmoRouteRecordRaw } from "vmo-router";
import type { RouteMeta } from "@src/pages/index";

const router: VmoRouteRecordRaw<RouteMeta> = {
	name: "main-pg",
	path: "/",
	redirect: "dashboard-pg",
	meta: {
		keepAlive: true,
		tokenRequire: true,
		powerRequire: [],
	},
	component: () => import("./page.vue"),
};
export default router;
