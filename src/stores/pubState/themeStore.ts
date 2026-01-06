import { defineStore } from "pinia";
import type { StyleValue } from "vue";
import { mergeDeepRight } from "ramda";
import { useDark, useToggle } from "@vueuse/core";
import { useGenerateElementPlusThemeCssVariables } from "vmo-skin";

export declare namespace Theme {
	export type StepColor = `--${string}`;
	export type OverwriteColors = Record<`--${string}`, string | number>;
	export type OverwriteClass = Record<string, StyleValue>;
	export type State = {
		mode: "lighten" | "darken" | "alpha";
		stepColors: StepColor[];
		overwriteColors: OverwriteColors;
		overwriteClass: OverwriteClass;
	};
}
const isDark = useDark();

export const useThemeStore = defineStore("useThemeStore", {
	state: (): Theme.State => ({
		mode: isDark.value ? "darken" : "lighten",
		stepColors: ["--el-color-primary", "--el-color-success", "--el-color-warning", "--el-color-danger", "--el-color-info", "--el-color-error", "--el-color-accent"],
		overwriteColors: {
			"--el-color-primary": "#0062FF",
			"--el-color-warning": "#FFBE42",
			"--el-color-success": "#52C41A",
			"--el-color-error": "#FF0000",
			"--el-color-danger": "#FF0000",
			"--el-color-info": "#8D94AD",
			"--el-color-accent": "#3F455B",
			// '--el-message-close-icon-color': '#FFFFFF',
			"--light-3": 0.3,
			"--light-5": 0.5,
			"--light-7": 0.7,
			"--light-9": 0.9,
			"--dark-2": 0.2,
			"--el-slider-size": "10px",
			"--el-border-color": "#8888884d",
			"--el-bg-color-overlay": "#FFFFFF",
			"--el-text-color-disabled": "#FF00FF",
			"--el-disabled-bg-color": "var(--el-fill-color-light)",
			"--el-disabled-text-color":"#787878",
			"--el-disabled-border-color": "#88888820",
			"--el-componet-border-color-hover": "#BBBBBB",
			"--el-border-color-hover": "var(--el-componet-border-color-hover)",
			"--el-mask-color":"#88888810",
			// "--el-bg-color": "#14141400",
		},
		overwriteClass: {
			".el-message-box": {
				padding: "0px",
				background: "#FFFFFF",
				overflow: "hidden",
			},
			".el-message-box__header": {
				height: "50px",
				padding: "0px 20px 0px 20px !important",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				backgroundColor: "var(--el-color-primary)",
				borderBottom: "1px solid #AAAABB55",
			},
			".el-message-box__title": {
				color: "white",
				fontWeight: "normal",
				padding: "0px",
				display: "flex",
				flexDirection: "row",
				justifyItems: "center",
			},
			".el-message-box__container": {
				margin: "10px 20px 10px 20px",
			},
			".el-message-box__headerbtn": {
				color: "white",
				position: "inherit",
				width: "20px",
				height: "20px",
			},
			".el-message-box__headerbtn:focus .el-message-box__close, .el-message-box__headerbtn:hover .el-message-box__close": {
				color: "var(--el-color-white)",
			},
			".el-message-box__btns": {
				padding: "10px 20px 10px 20px",
				backgroundColor: "#88888811",
			},
			".el-message-box__headerbtn .el-message-box__close": {
				color: "var(--el-color-white)",
			},
			".el-button": {
				borderRadius: "4px",
				transitionDuration: "0.1s",
			},
			".el-button:hover": {
				borderRadius: "10px",
			},
			".el-input-number__decrease": {
				backgroundColor: "var(--el-fill-color-light) /*aaaaa*/",
			},
			".el-input-number__increase": {
				borderLeft: "var(--el-checkbox-input-border__custome)",
				backgroundColor: "var(--el-fill-color-light) /*aaaaa*/",
			},
			".el-message": {
				// backgroundColor:'var(--el-color-white)'
			},
			".el-slider__button": {
				border: "2px solid var(--el-color-primary-light-5)",
				width: "var(--el-slider-size,20px)",
				height: "var(--el-slider-size,20px)",
			},
			".el-popover.el-popper": {
				minWidth: "0px",
			},
			".el-checkbox__inner": {
				border: "var(--el-border-width) var(--el-border-style) var(--el-border-color)",
			},
			".el-checkbox__inner:hover": {
				border: "var(--el-border-width) var(--el-border-style) var(--el-componet-border-color-hover)",
			},
			".el-radio__inner": {
				border: "var(--el-border-width) var(--el-border-style) var(--el-border-color)",
			},
			".el-radio__inner:hover": {
				border: "var(--el-border-width) var(--el-border-style) var(--el-componet-border-color-hover)",
			},
			".el-radio-button__inner": {
				border: "var(--el-border-width) var(--el-border-style) var(--el-border-color)",
				borderLeft: 0,
			},
			".el-radio-button:first-child .el-radio-button__inner": {
				borderLeft: "var(--el-border-width) var(--el-border-style) var(--el-border-color)",
			},
			".el-drawer__header": {
				height: "50px",
				display: "flex",
				flexDirection: "row",
				marginBottom: "0px",
				padding: "10px 20px",
				borderBottom: "1px solid #88888820",
				background: "#88888810",
				color: "#797979",
			},
			".el-dialog": {
				padding: "0px",
				border: "1px solid #88888860",
			},
			".el-dialog__header": {
				height: "50px",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				padding: "10px 20px",
				borderBottom: "1px solid #88888820",
				background: "#88888810",
				color: "#797979",
			},
			".el-dialog__title": {
				flexGrow: 1,
			},
			".el-dialog__headerbtn": {
				height: "inherit",
				width: "inherit",
				position: "inherit",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			},
			".el-dialog__body": {
				padding: "10px 20px",
			},
			".el-dialog__footer": {
				padding: "10px 20px 15px 20px",
			},
			".el-tabs__header":{
				margin:"0px !important"
			},
			".el-tabs--card>.el-tabs__header .el-tabs__item.is-active":{
				background:"#FFFFFF !important"
			}
			// "dark .el-pagination.is-background .btn-next.is-disabled, .el-pagination.is-background .btn-next:disabled, .el-pagination.is-background .btn-prev.is-disabled, .el-pagination.is-background .btn-prev:disabled, .el-pagination.is-background .el-pager li.is-disabled, .el-pagination.is-background .el-pager li:disabled":
			// 	{
			// 		backgroundColor: "#00000020",
			// 		color: "var(--el-text-color-placeholder)",
			// 	},
			// ".el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell":
			// 	{
			// 		backgroundColor: "#88888810",
			// 	},
		},
	}),
	getters: {
		getMode: (state) => state.mode,
		getStepColors: (state) => state.stepColors,
		getOverwriteColors: (state) => state.overwriteColors,
		getOverwriteClass: (state) => state.overwriteClass,
		getThemeCssProperties: (state) => useGenerateElementPlusThemeCssVariables(state.stepColors, state.overwriteColors, state.mode),
	},
	actions: {
		toggleMode() {
			useToggle(isDark)();
			this.mode = isDark.value ? "darken" : "lighten";
		},
		setMode(mode: "lighten" | "alpha" | "darken") {
			isDark.value = mode == "lighten" ? true : false;
			useToggle(isDark)();
			this.mode = mode;
		},
		setStepColors(steps: Theme.StepColor[]) {
			this.stepColors = steps;
		},
		setOverwriteColors(overwriteColors: Theme.OverwriteColors) {
			this.overwriteColors = mergeDeepRight(this.overwriteColors, overwriteColors);
		},
		setOverwriteClass(overwriteClass: Theme.OverwriteClass) {
			this.overwriteClass = mergeDeepRight(this.overwriteClass, overwriteClass) as Theme.OverwriteClass;
		},
	},
});
