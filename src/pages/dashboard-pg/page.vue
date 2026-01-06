<template>
	<div class="grow-1 flex-col">
		<div class="flex-row -mx-5">
			<vmo-card class="w-1/4 p-5" title="Animation Description"></vmo-card>
			<vmo-card class="w-1/4 p-5">
				<template #default="slot">
					<div
						v-if="!slot.fullscreen"
						class="text-xs text-gray-500 w-full rounded"
					>
						{{ slot }}
					</div>
					<div v-if="slot.fullscreen" class="grow-1 flex-col bg-s-1 w-full">
						{{ slot }}
					</div>
				</template>
			</vmo-card>
			<vmo-card class="w-1/4 p-5"></vmo-card>
			<vmo-card class="w-1/4 p-5"></vmo-card>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouterStore } from "vmo-router";
import { useRoute } from "vue-router";
import VmoCard from "@src/comps/common/vmo-card/component.vue";

export default defineComponent({
	name: "dashboard-pg",
	components: { VmoCard },
	setup(props, context) {
		const routerStateStore = useRouterStore();
		const route = useRoute();
		return {
			routerStateStore,
			route,
		};
	},
});
</script>
