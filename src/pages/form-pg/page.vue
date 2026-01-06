<template>
	<div class="flex-col grow-1">
		{{ data }}
		<el-scrollbar class="h-0 grow-1">
			<vmo-x-form
				ref="TestVmoXFormRef"
				v-model="data"
				v-bind="formJsonDiv.props"
				:debounce-delay="formJsonDiv.debounceDelay"
				:disabled="false"
				:elements="formJsonDiv.elements"
				:components="{}"
			/>
		</el-scrollbar>
	</div>
</template>

<script lang="ts">
import { formJsonDiv } from "./config";
import { ref, defineComponent, watch, getCurrentInstance, nextTick } from "vue";
import { ElScrollbar } from "element-plus";
import { useCounterStore } from "@src/stores/pubState/counter";
import { VmoXForm } from "vmo-x-form";
import "vmo-x-form/dist/style.css";

export default defineComponent({
	name: "form-pg",
	components: {
		VmoXForm,
		ElScrollbar,
	},
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		const data = ref({} as Record<string, any>);
		return {
			proxy,
			data,
			formJsonDiv,
		};
	},
});
</script>

<style>
@media (min-width: 1024px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
}
</style>
