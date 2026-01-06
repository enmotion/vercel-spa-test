<template>
	<Teleport :disabled="computedDisableTeleport"
		:to="to"
	>
		<div
			:class="[
				'vmo-card',
				!computedDisableTeleport
					? 'z-100 fixed w-full h-full'
					: context.attrs.class,
			]"
		>
			<div
				:class="[
					'box',
					!computedDisableTeleport ? 'dark:bg-gray-800 !p-[25px]' : '',
				]"
			>
				<slot v-if="!!context.slots.content"
					name="content"
				></slot>
				<div
					v-if="!context.slots.content"
					class="flex-row items-center justify-between"
				>
					<slot name="title">
						<div
							:class="[
								computedDisableTeleport ? 'text-sm' : 'text-lg',
								' text-gray-600 dark:text-gray-200',
							]"
						>
							{{ title }}
						</div>
					</slot>
					<slot name="extra">
						<span class="flex-row items-center -mr-5">
							<vmo-icon
								v-if="more"
								:size="20"
								class="text-gray-300 dark:text-gray-500 iconfont vmo-icon-more_horizontal_line"
							/>
							<vmo-icon
								v-if="zoomin"
								:size="20"
								:class="[
									'text-gray-300 dark:text-gray-500 iconfont',
									disabled && zoomin
										? 'vmo-icon-fullscreen'
										: 'vmo-icon-fullscreen-exit',
								]"
								@click="disabled = !disabled"
							/>
						</span>
					</slot>
				</div>
				<div
					v-if="!context.slots.content"
					:class="[
						'flex-col grow-1',
						computedDisableTeleport ? 'mt-[5px]' : 'mt-[15px]',
					]"
				>
					<slot v-bind="{ fullscreen: !computedDisableTeleport }">
					</slot>
				</div>
			</div>
		</div>
	</Teleport>
</template>
<style lang="css">
.vmo-card {
	@apply flex-col;
}
.vmo-card > .box {
	@apply flex-col grow-1 p-10 bg-white border border-dark-4 dark:bg-light-3 dark:border-light-2 rounded;
}
</style>
<script lang="ts">
import { defineComponent, ref, Teleport, computed, type PropType } from "vue";
import VmoTransition from "../transition/vmo-transition/component.vue";
import VmoScroll from "../vmo-scroll/component.vue";
import VmoIcon from "@src/comps/common/vmo-icon/component.vue";

export default defineComponent({
	name: "vmo-card",
	components: { VmoTransition, VmoScroll, VmoIcon },
	inheritAttrs: false,
	props: {
		title: {
			type: String as PropType<string>,
			default: "Card Title",
		},
		to: {
			type: String as PropType<string>,
			default: "body",
		},
		zoomin: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		more: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
	},
	setup(props, context) {
		const disabled = ref(true);
		const computedDisableTeleport = computed(() => {
			return disabled.value && props.zoomin;
		});
		return {
			context,
			computedDisableTeleport,
			disabled,
		};
	},
});
</script>
