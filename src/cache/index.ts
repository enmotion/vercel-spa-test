/*
 * @Author: enmotion
 * @Date: 2023-11-13 10:03:47
 * @Last Modified by: enmotion
 * @Last Modified time: 2024-12-23 14:12:25
 */
// 更换了更好的缓存器
import { VmoStore } from "vmo-store";
import type Theme from "@src/comps/common/vmo-layout/types";
import type { VmoRouteToRaw } from "vmo-router";
import type { RouteLocationNormalizedGeneric } from "vue-router";
import type { RouteMeta } from "@src/pages";

/**
 * 系统持久化缓存数据配置
 */
const cache = new VmoStore<{
	userToken: Record<string, any>;
	userInfo: Record<string, any>;
	theme: {
		colors: Partial<Theme.Colors>;
		steps: Partial<Theme.Steps>;
	};
	cachedRoutes: VmoRouteToRaw<RouteMeta>[];
	keepAlives: Record<string, any>[];
	userMenu: any[];
}>({
	namespace: `${import.meta.env.VITE_APP_NAME}`,
	version: `${import.meta.env.VITE_APP_VERSION ?? 1}`,
	cryptoKey: import.meta.env.MODE == 'development' ? undefined : import.meta.env.VITE_APP_CATCH_ENCRYPT_KEY ,
	dataProps: {
		userToken: {
			type: Object,
			default: () => ({}),
			storge: `${import.meta.env.VITE_APP_CATCH_SHARETAB ? "localStorage" : "sessionStorage"}`,
		},
		userInfo: {
			type: Object,
			default: () => ({}),
			storge: `${import.meta.env.VITE_APP_CATCH_SHARETAB ? "localStorage" : "sessionStorage"}`,
		},
		// 动态路由加载缓存配置
		cachedRoutes: {
			type: Array,
			storge: `${import.meta.env.VITE_APP_CATCH_SHARETAB ? "localStorage" : "sessionStorage"}`,
			default: () => [],
		},
		// 动态路由加载缓存配置
		keepAlives: {
			type: Array,
			storge: `${import.meta.env.VITE_APP_CATCH_SHARETAB ? "localStorage" : "sessionStorage"}`,
			default: () => [],
		},
		// 动态路由加载缓存配置
		userMenu: {
			type: Array,
			storge: `${import.meta.env.VITE_APP_CATCH_SHARETAB ? "localStorage" : "sessionStorage"}`,
			default: () => [],
		},
		// 主题缓存配置
		theme: {
			type: Object,
			storge: `${import.meta.env.VITE_APP_CATCH_SHARETAB ? "localStorage" : "sessionStorage"}`,
			default: () => ({
				colors: {
					primary: import.meta.env.VITE_APP_THEME_PRIMARY || "#409EFF",
					danger: import.meta.env.VITE_APP_THEME_DANGER || "#F56C6C",
					error: import.meta.env.VITE_APP_THEME_ERROR || "#F56C6C",
					success: import.meta.env.VITE_APP_THEME_SUCCESS || "#67C23A",
					warning: import.meta.env.VITE_APP_THEME_WARNING || "#E6A23C",
					info: import.meta.env.VITE_APP_THEME_INFO || "#909399",
					accent: import.meta.env.VITE_APP_THEME_ACCENT || "#409EFF",
				},
				steps: {
					"-dark-2": 8,
					"-light-3": 0.9,
					"-light-5": 0.7,
					"-light-7": 0.5,
					"-light-8": 0.3,
					"-light-9": 0.1,
				},
			}),
		},
	},
});
export default cache;
