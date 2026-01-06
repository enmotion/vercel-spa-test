<template>
	<div
		:class="['vmo-icon-button iconfont']"
		:style="{ width: size + 'px', height: size + 'px' }"
		@click="context.emit('click')"
	></div>
</template>

<style lang="css">
.vmo-icon-button {
	@apply flex-row items-center justify-center cursor-pointer;
}
</style>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import defaultAvatar from "./assets/default-2.svg";
import type { PropType } from "vue";

export default defineComponent({
	name: "vmo-icon",
	props: {
		size: {
			type: Number as PropType<number>,
			default: 30,
		},
	},
	emits: ["click"],
	setup(props, context) {
		return {
			context,
		};
	},
});
</script>
