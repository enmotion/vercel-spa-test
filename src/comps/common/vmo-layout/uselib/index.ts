import { mergeDeepRight, keys, mergeAll } from "ramda";
import { ref, computed, useAttrs } from "vue";
import type THEME from "../types";
import type { StyleValue, ComputedRef } from "vue";
import * as convert from "color-convert";

const defaultColor: THEME.Colors = {
	primary: "#409EFF",
	danger: "#F56C6C",
	error: "#F56C6C",
	success: "#67C23A",
	warning: "#E6A23C",
	info: "#909399",
	accent: "#409EFF",
}; // 默认主题颜色配置

const defaultSteps: THEME.Steps = {
	"-dark-2": 8,
	"-light-3": 0.9,
	"-light-5": 0.7,
	"-light-7": 0.5,
	"-light-8": 0.3,
	"-light-9": 0.1,
}; // 默认颜色渐近步骤值

function useGenerateThemColors<K extends keyof THEME.Colors>(
	key: K,
	hexValue: `#${string}`,
	stepsValue: Partial<THEME.Steps>,
) {
	const style: StyleValue = {};
	const hexToRGB = convert.hex.rgb(hexValue).join(",");
	const hexToHSL = convert.hex.hsl(hexValue);
	const expandColors: THEME.Steps = mergeAll([stepsValue, defaultSteps]);
	style[`--${key}-color`] = hexToRGB;
	style[`--el-color-${key}`] = hexValue;
	keys(expandColors).map((stepkey: THEME.StepsNames) => {
		if (stepkey.includes("dark")) {
			style[`--el-color-${key}${stepkey}`] =
				`hsl(${hexToHSL[0]}, ${hexToHSL[1]}%, ${hexToHSL[2] - (expandColors[stepkey] || 10)}%)`;
		}
		// if (stepkey.includes('light')) {
		//   style[`--el-color-${key}${stepkey}`] = `rgba(var(--${key}-color), ${expandColors[stepkey]})`
		// }
	});
	return style;
}

export function useLayout() {
	const attrs = useAttrs(); // 使用属性;
	const colors = ref({} as Partial<THEME.Colors>); // 动态主题颜色配置值;
	const steps = ref({} as Partial<THEME.Steps>);

	const computedColors: ComputedRef<THEME.Colors> = computed(() =>
		mergeDeepRight(defaultColor, colors.value),
	); // 计算颜色融合
	const computedSteps: ComputedRef<THEME.Steps> = computed(() =>
		mergeDeepRight(defaultSteps, steps.value),
	); // 计算颜色融合

	const computedThemeStyle = computed((): StyleValue => {
		let style: StyleValue = {};
		keys(computedColors.value).map((key: THEME.ColorNames) => {
			style = mergeAll([
				style,
				useGenerateThemColors(
					key,
					computedColors.value[key],
					computedSteps.value,
				),
			]);
		});
		return mergeDeepRight(attrs?.style as { [key: string]: any }, style);
	});
	return { colors, steps, computedColors, computedSteps, computedThemeStyle };
}
