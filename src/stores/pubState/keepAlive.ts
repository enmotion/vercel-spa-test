import { defineStore } from "pinia";
import cache from "@src/cache";
import type { RouteLocationNormalizedGeneric } from "vue-router";
import type { RouteMeta } from "@src/pages";

export declare namespace KeepAlive {
	export type item = {
		name: string;
		path: string;
		query: any;
		params: Record<string, any>;
		meta: RouteMeta;
	};
	export type State = {
		keeps: Partial<item>[];
	};
}

export const useKeepAliveStore = defineStore("KeepAlive", {
	state: (): KeepAlive.State => ({
		keeps: cache.$store.keepAlives as KeepAlive.item[],
	}),
	getters: {
		get: (state) => state.keeps,
		getNames: (state) => state.keeps.map((item) => item.name) as string[],
	},
	actions: {
		clear() {
			cache.$store.keepAlives = this.keeps = [];
		},
		set(content: Partial<KeepAlive.item> | Partial<KeepAlive.item>[]) {
			cache.$store.keepAlives = this.keeps = Array.isArray(content)
				? content
				: [content];
		},
		insert(content: Partial<KeepAlive.item> | Partial<KeepAlive.item>[]) {
			const list = Array.isArray(content) ? content : [content];
			const names = this.keeps.map((item) => item.name);
			list.forEach((item) => {
				!names.includes(item.name) && this.keeps.push(item);
			});
			cache.$store.keepAlives = this.keeps;
		},
		remove(content: Partial<KeepAlive.item> | Partial<KeepAlive.item>[]) {
			const list = Array.isArray(content) ? content : [content];
			const names = list.map((item) => item.name);
			cache.$store.keepAlives = this.keeps = this.keeps.filter(
				(item) => !names.includes(item.name),
			);
		},
	},
});
