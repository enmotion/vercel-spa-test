<template>
	<vmo-transition
		name="growy"
		mode="out-in"
		class="flex flex-col h-auto shrink-0 w-full"
	>
		<vmo-scroll
			v-if="visible"
			:class="['flex flex-col grow-1 flex-shrink-0']"
			:style="{ height: height }"
			:scroll-bar-props="{ viewClass: context.attrs.class as string }"
		>
			<slot></slot>
		</vmo-scroll>
	</vmo-transition>
</template>
<script lang="ts">
import {
	defineComponent,
	ref,
	onMounted,
	onActivated,
	onDeactivated,
	onBeforeUnmount,
	type PropType,
} from "vue";
import VmoTransition from "../transition/vmo-transition/component.vue";
import VmoScroll from "../vmo-scroll/component.vue";
export default defineComponent({
	name: "vmo-console",
	components: { VmoTransition, VmoScroll },
	inheritAttrs: false,
	props: {
		height: {
			type: String as PropType<string>,
			default: "200px",
		},
	},
	setup(props, context) {
		const visible = ref(false);
		const activated = ref(false);
		onMounted(() => {
			if (!activated.value) {
				activated.value = true;
				window.addEventListener("keydown", switchContentView);
			}
		});
		onActivated(() => {
			if (!activated.value) {
				activated.value = true;
				window.addEventListener("keydown", switchContentView);
			}
		});
		onDeactivated(() => {
			activated.value = false;
			window.removeEventListener("keydown", switchContentView);
		});
		onBeforeUnmount(() => {
			activated.value = false;
			window.removeEventListener("keydown", switchContentView);
		});
		function switchContentView(event: KeyboardEvent) {
			// @ts-ignore
			if (
				event.code == "KeyA" &&
				event.shiftKey &&
				event.altKey &&
				process.env.NODE_ENV == "development"
			) {
				visible.value = !visible.value;
			}
		}
		return {
			context,
			visible,
		};
	},
});
</script>
