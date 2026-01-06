/*
 * @Author: enmotion
 * @Date: 2023-11-07 11:38:39
 * @Last Modified by: enmotion
 * @Last Modified time: 2024-02-18 17:55:54
 */

import { type VmoRouteRecordRaw } from "vmo-router";
import type { RouteMeta } from "@src/pages/index";

const router: VmoRouteRecordRaw<RouteMeta> = {
	name: "tween-pg",
	path: "/tween-pg",
	meta: {
		keepAlive: true,
		tokenRequire: false,
		pageName: "222",
		powerRequire: [],
	},
	component: () => import("./page.vue"),
};
export default router;
