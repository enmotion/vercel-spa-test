<template>
	<div
		:class="[context.attrs?.class, 'theme-color']"
		:style="computedThemeStyle"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import type { PropType } from "vue";
import type THEME from "./types";
import { useLayout } from "./uselib";

export default defineComponent({
	name: "vmo-layout",
	props: {
		mode: {
			type: String as PropType<THEME.Mode>,
			default: "light",
		},
		provideColors: {
			type: Object as PropType<Partial<THEME.Colors>>,
			default: () => ({}),
		},
		provideSteps: {
			type: Object as PropType<Partial<THEME.Steps>>,
			default: () => ({}),
		},
	},
	setup(props, context) {
		const { colors, steps, computedSteps, computedThemeStyle } = useLayout(); // 引入
		watch(
			() => props.provideColors,
			(n) => {
				colors.value = n;
			},
			{ immediate: true },
		);

		watch(
			() => props.provideSteps,
			(n) => {
				steps.value = n;
			},
			{ immediate: true },
		);

		return {
			context,
			computedSteps,
			computedThemeStyle,
		};
	},
});
</script>

<style scoped lang="css">
.theme-color {
	/* --primary-color:155, 0, 0; */
	--el-color-primary: rgb(var(--primary-color));
	--el-color-primary-light-3: rgba(
		var(--primary-color),
		v-bind(computedSteps[ "-light-3"])
	);
	--el-color-primary-light-5: rgba(
		var(--primary-color),
		v-bind(computedSteps[ "-light-5"])
	);
	--el-color-primary-light-7: rgba(
		var(--primary-color),
		v-bind(computedSteps[ "-light-7"])
	);
	--el-color-primary-light-8: rgba(
		var(--primary-color),
		v-bind(computedSteps[ "-light-8"])
	);
	--el-color-primary-light-9: rgba(
		var(--primary-color),
		v-bind(computedSteps[ "-light-9"])
	);

	/* --success-color:65, 184, 131; */
	--el-color-success: rgb(var(--success-color));
	--el-color-success-light-3: rgba(
		var(--success-color),
		v-bind(computedSteps[ "-light-3"])
	);
	--el-color-success-light-5: rgba(
		var(--success-color),
		v-bind(computedSteps[ "-light-5"])
	);
	--el-color-success-light-7: rgba(
		var(--success-color),
		v-bind(computedSteps[ "-light-7"])
	);
	--el-color-success-light-8: rgba(
		var(--success-color),
		v-bind(computedSteps[ "-light-8"])
	);
	--el-color-success-light-9: rgba(
		var(--success-color),
		v-bind(computedSteps[ "-light-9"])
	);

	/* --warning-color:206, 178, 19; */
	--el-color-warning: rgb(var(--warning-color));
	--el-color-warning-light-3: rgba(
		var(--warning-color),
		v-bind(computedSteps[ "-light-3"])
	);
	--el-color-warning-light-5: rgba(
		var(--warning-color),
		v-bind(computedSteps[ "-light-5"])
	);
	--el-color-warning-light-7: rgba(
		var(--warning-color),
		v-bind(computedSteps[ "-light-7"])
	);
	--el-color-warning-light-8: rgba(
		var(--warning-color),
		v-bind(computedSteps[ "-light-8"])
	);
	--el-color-warning-light-9: rgba(
		var(--warning-color),
		v-bind(computedSteps[ "-light-9"])
	);

	/* --danger-color:255, 0, 0; */
	--el-color-danger: rgb(var(--danger-color));
	--el-color-danger-light-3: rgba(
		var(--danger-color),
		v-bind(computedSteps[ "-light-3"])
	);
	--el-color-danger-light-5: rgba(
		var(--danger-color),
		v-bind(computedSteps[ "-light-5"])
	);
	--el-color-danger-light-7: rgba(
		var(--danger-color),
		v-bind(computedSteps[ "-light-7"])
	);
	--el-color-danger-light-8: rgba(
		var(--danger-color),
		v-bind(computedSteps[ "-light-8"])
	);
	--el-color-danger-light-9: rgba(
		var(--danger-color),
		v-bind(computedSteps[ "-light-9"])
	);

	/* --info-color:100,100,100; */
	--el-color-info: rgb(var(--info-color));
	--el-color-info-light-3: rgba(
		var(--info-color),
		v-bind(computedSteps[ "-light-3"])
	);
	--el-color-info-light-5: rgba(
		var(--info-color),
		v-bind(computedSteps[ "-light-5"])
	);
	--el-color-info-light-7: rgba(
		var(--info-color),
		v-bind(computedSteps[ "-light-7"])
	);
	--el-color-info-light-8: rgba(
		var(--info-color),
		v-bind(computedSteps[ "-light-8"])
	);
	--el-color-info-light-9: rgba(
		var(--info-color),
		v-bind(computedSteps[ "-light-9"])
	);

	--error-color: 100, 100, 100;
	--el-color-error: rgb(var(--error-color)) !important;
	--el-color-error-light-3: rgba(
		var(--error-color),
		v-bind(computedSteps[ "-light-3"])
	) !important;
	--el-color-error-light-5: rgba(
		var(--error-color),
		v-bind(computedSteps[ "-light-5"])
	) !important;
	--el-color-error-light-7: rgba(
		var(--error-color),
		v-bind(computedSteps[ "-light-5"])
	) !important;
	--el-color-error-light-8: rgba(
		var(--error-color),
		v-bind(computedSteps[ "-light-7"])
	) !important;
	--el-color-error-light-9: rgba(
		var(--error-color),
		v-bind(computedSteps[ "-light-9"])
	) !important;

	/* --accent-color:155, 0, 0; */
	--el-color-accent: rgb(var(--accent-color));
	--el-color-accent-light-3: rgba(
		var(--accent-color),
		v-bind(computedSteps[ "-light-3"])
	);
	--el-color-accent-light-5: rgba(
		var(--accent-color),
		v-bind(computedSteps[ "-light-5"])
	);
	--el-color-accent-light-7: rgba(
		var(--accent-color),
		v-bind(computedSteps[ "-light-7"])
	);
	--el-color-accent-light-8: rgba(
		var(--accent-color),
		v-bind(computedSteps[ "-light-8"])
	);
	--el-color-accent-light-9: rgba(
		var(--accent-color),
		v-bind(computedSteps[ "-light-9"])
	);
}
html.dark .theme-color :deep(.el-message) {
	background-color: #111;
}
html:not(.dark) .theme-color :deep(.el-message) {
	background-color: #fff !important;
}
</style>
