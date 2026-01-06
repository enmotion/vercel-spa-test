/*
 * @Author: enmotion
 * @Date: 2023-11-09 09:49:58
 * @Last Modified by: enmotion
 * @Last Modified time: 2023-11-09 10:11:06
 */

import { mergeAll, mergeDeepRight } from "ramda";
import { defineStore } from "pinia";
import cache from "@src/cache";
import type THEME from "../types";

/**
 * 类型约束
 */
export namespace Layout {
	export interface State {
		theme: Theme;
	}
	export interface Theme {
		colors: Partial<THEME.Colors>;
		steps: Partial<THEME.Steps>;
	}
}

/**
 * store配置
 */
export const useLayoutStore = defineStore("layout", {
	state: (): Layout.State => ({
		theme: mergeAll([cache.$store.theme, {}]),
	}),
	getters: {
		getTheme: (state) => state.theme,
	},
	actions: {
		updateTheme(theme: Partial<Layout.Theme>) {
			this.theme = cache.$store.theme = mergeDeepRight(this.theme, theme);
		},
	},
});
