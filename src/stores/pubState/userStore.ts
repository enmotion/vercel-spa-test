import { defineStore } from "pinia";
import { mergeDeepRight, clone } from "ramda";
import type { VmoRouteMenuItemRaw } from "vmo-router";
import type { RouteMeta } from "@src/pages/index";
import cache from "@src/cache"; // 本地持久缓存器

export declare namespace USER {
	export type State = {
		token: Record<string, string>;
		info: Record<string, any>;
		menu: VmoRouteMenuItemRaw<{ label: string; icon: string; key: string }, RouteMeta>[];
	};
}
export const useUserStore = defineStore("UserState", {
	state: (): USER.State => ({
		token: cache.getData("userToken"),
		info: cache.getData("userInfo"),
		menu: cache.getData("userMenu"),
	}),
	getters: {
		getToken: (state) => state.token,
		getInfo: (state) => state.info,
		getData: (state) => mergeDeepRight(state.info, state.token),
		getMenu: (state) => {
			return state.menu;
		},
	},
	actions: {
		logout() {
			this.token = cache.$store.userToken = {};
			this.info = cache.$store.userInfo = {};
			this.menu = cache.$store.userMenu = [];
		},
		setToken(token: Record<string, string>) {
			this.token = cache.$store.userToken = mergeDeepRight(cache.$store.userToken, token);
		},
		setInfo(info: Record<string, any>) {
			this.info = cache.$store.userInfo = mergeDeepRight(cache.$store.userToken, info);
		},
		setMenu(menu: VmoRouteMenuItemRaw<{ label: string; icon: string; key: string }, RouteMeta>[]) {
			// console.log(menu);
			this.menu = clone(menu);
			cache.setData("userMenu", menu);
		},
	},
});
