<template>
	<div
		:style="{ width: size, height: size }"
		:class="[
			compputedPlacment + '',
			' absolute z-50 flex-row items-center justify-center',
		]"
	>
		<div
			:style="{ height: height, width: width, marginBottom: offset }"
			:class="[
				contentClass,
				'shrink-0 flex-row justify-center items-center cursor-pointer',
			]"
			@click="context.emit('click')"
			v-html="content"
		></div>
	</div>
</template>
<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";

export default defineComponent({
	name: "vmo-corner-sticker",
	inheritAttrs: false,
	props: {
		content: {
			type: String as PropType<string>,
			default: "FWA",
		},
		contentClass: {
			type: String as PropType<string>,
			default: "bg-p-10 font-bold",
		},
		size: {
			type: String as PropType<string>,
			default: "100px",
		},
		placement: {
			type: String as PropType<
				"top-left" | "top-right" | "bottom-left" | "bottom-right"
			>,
			default: "top-right",
		},
		offset: {
			type: String as PropType<string>,
			default: "10px",
		},
		width: {
			type: String as PropType<string>,
			default: "10px",
		},
		height: {
			type: String as PropType<string>,
			default: "20px",
		},
	},
	emits: ["click"],
	setup(props, context) {
		const compputedPlacment = computed(
			() =>
				({
					["top-left"]: "top-0 left-0 -rotate-45",
					["top-right"]: "top-0 right-0 rotate-45",
					["bottom-left"]: "bottom-0 left-0 rotate-45",
					["bottom-right"]: "bottom-0 right-0 -rotate-45",
				})[props.placement],
		);
		return {
			compputedPlacment,
			context,
		};
	},
});
</script>
