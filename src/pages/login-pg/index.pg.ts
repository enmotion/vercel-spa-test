/*
 * @Author: enmotion
 * @Date: 2023-11-07 11:38:39
 * @Last Modified by: enmotion
 * @Last Modified time: 2023-11-07 15:50:28
 */

import { type VmoRouteRecordRaw } from "vmo-router";
import type { RouteMeta } from "@src/pages/index";
import { useKeepAliveStore } from "@src/stores/pubState/keepAlive";
import { useRouter, useRouterStore } from "vmo-router";
import { useUserStore } from "@src/stores";

const router: VmoRouteRecordRaw<RouteMeta> = {
	name: "login-pg",
	path: "/login-pg",
	meta: {
		keepAlive: false,
		tokenRequire: false,
		pageName: "serre",
		powerRequire: [],
	},
	props: true,
	component: () => import("./page.vue"),
	beforeEnter: () => {
		setTimeout(() => {
			// const routeStore = useRouterStore();
			const userStore = useUserStore();
			const keepAliveStore = useKeepAliveStore();
			keepAliveStore.set({ name: "main-pg" });
			userStore.logout(); // 用户退登操作行为；
			// const router = useRouter();
			// router?.clearRoutes();
		}, 500);
	},
};
export default router;
