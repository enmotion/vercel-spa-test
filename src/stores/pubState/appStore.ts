import { defineStore } from "pinia";
import { mergeDeepRight, omit } from "ramda";
import type { StringKeyObject } from "@typs/public";

export declare namespace APP {
	export type State = {
		subApps?: Record<string, string>;
		info: Info;
		rootInstance: any;
    envMode:'devlopment'|'prodcut';
		screen: Screen;
		device?: StringKeyObject;
		pluginKeys?: StringKeyObject;
		isInMicroAppEnvironment?: boolean;
	};
	export type Screen = {
		breakPoint: number;
		w: number;
		h: number;
	};
	export type Info = {
		icon?: string;
		logo: string;
		name: string;
		version?: string;
		powerd?: string;
		copyright?: string;
	};
}

export const useAppStore = defineStore("AppSate", {
	state: (): APP.State => ({
		rootInstance: null,
    envMode:'devlopment',
		info: {
			icon: "",
			logo: "",
			name:
				import.meta.env.VITE_APP_NAME != "&APP_NAME&"
					? import.meta.env.VITE_APP_NAME
					: "FrameWork",
			version: import.meta.env.VITE_APP_VERSION,
		},
		screen: {
			breakPoint: 800,
			w: 0,
			h: 0,
		},
		device: {},
		pluginKeys: {},
		isInMicroAppEnvironment: false,
		subApps: JSON.parse(import.meta.env.VITE_APP_SUB_APP_LIST),
	}),
	getters: {
    // @ts-ignore
    getIsDevMode:()=>process.env.mode,
		getRootInstance: (state) => state.rootInstance,
		getScreen: (state) =>
			mergeDeepRight(omit(["breakPoint"], state.screen), {
				isWideScreen: state.screen.w >= state.screen.breakPoint,
			}),
		getInfo: (state) => state.info,
		getDevice: (state) => state.device,
		getPluginKeys: (state) => state.pluginKeys,
		getMicroAppEnvironment: (state) => state.isInMicroAppEnvironment == true,
		getSubApps: (state) => state.subApps,
	},
	actions: {
		setRootInstance(instance: any) {
			this.rootInstance = instance;
		},
		setScreen(screen: Partial<APP.Screen>) {
			this.screen = mergeDeepRight(this.screen, screen);
		},
		setInfo(info: APP.Info) {
			this.info = info;
		},
		setDevice(device: StringKeyObject) {
			this.device = device;
		},
		setPluginKeys(pluginKeys: StringKeyObject) {
			this.pluginKeys = pluginKeys;
		},
		setMicroAppEnvironment(isInMicroAppEnvironment: boolean) {
			this.isInMicroAppEnvironment = isInMicroAppEnvironment;
		},
	},
});
