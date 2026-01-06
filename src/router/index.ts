import { mergeAll, isEmpty, pick } from "ramda";
import { createRouter, createWebHashHistory, useRouterStore } from "vmo-router";
import { useUserStore } from "@src/stores";
import type { VmoRouteToRaw } from "vmo-router";
import PGS from "@src/pages/index";
import { ElMessageBox } from "element-plus";
import cache from "@src/cache";
import { useKeepAliveStore, type KeepAlive } from "@src/stores/pubState/keepAlive";
import type { RouteMeta } from "@src/pages/index";

// 一定要将内容通过函数包裹起来，避免 useRouterStore 在 pinia 未能注入前调用
export function initRouter() {
	const routeStore = useRouterStore<VmoRouteToRaw<RouteMeta>>();
	const userStore = useUserStore();
	const keepStore = useKeepAliveStore();
	keepStore.insert({ name: "main-pg" });
	// 给全局状态管理器添加缓存处理模式
	routeStore.setCacheMethods({
		setter: (routes) => cache.setData("cachedRoutes", routes),
		getter: () => cache.getData("cachedRoutes"),
	});
	// 配置路由跳转时，如果遇到需要阻断的情况，阻断行为的具体逻辑
	routeStore.setConfirmToLeaveMethod((meta) => {
		return new Promise((resolve, reject) => {
			ElMessageBox({
				title: "操作提示",
				message: "当前页面未能保存",
			})
				.then(() => resolve(true))
				.catch(() => reject(false));
		});
	});
	// 创建路由
	const router = createRouter<RouteMeta>(
		{
			history: createWebHashHistory(), // 同 vue-router
			routes: [mergeAll([PGS.MainPg, { children: [PGS.DashboardPg, PGS.ThemePg] }]), PGS.LoginPg, PGS.Erro403Pg, PGS.Erro404Pg],
		},
		PGS, // 模板池 基于 loadPageTemplateByImport 方法创建
		routeStore, // 路由全局状态管理器
	);
	// store.setMutipleCatch(false) // 路由表缓存 是否开启多项，默认多项，如果开启单项，则只会缓存当前路由配置持久化，对本地缓存更为友好，但是对某种场景下，通过地址直接跳转带来不便。
	router.beforeEach(async (to, from) => {
		// console.log(to);
		// 如果页面需要登录权限, 且当前用户的登录 token 信息为空 则会跳转到登录页面
		if (to.meta.tokenRequire && isEmpty(userStore.getToken)) {
			return { name: "login-pg" };
		}
		// 如果页面需要缓存，则在缓存表中插入当前页面名称
		if (to.meta.keepAlive) {
			const data: any = to;
			keepStore.insert(pick(["name", "path", "meta", "query", "params"], data) as KeepAlive.item);
			// routeStore.insertKeepAliveName(to.name as string) // 将路由名 塞入 keepAlive 名单
		}
		// 如果当前页面没有任何匹配页面，则视为 404 跳转
		if (to.matched.length == 0) {
			return { name: "error-404" };
		}
		return true;
	});
	return router;
}
