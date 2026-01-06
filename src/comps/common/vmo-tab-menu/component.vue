<template>
	<div class="vmo-tab-menu">
		<div
			class="arrow-cell iconfont vmo-icon-left_line"
			@click="scrollTo(-1)"
		></div>
		<div
			ref="ScrollContainerRef"
			:class="[viewClass, 'grow-1 flex-row w-0 overflow-hidden scroll-smooth']"
		>
			<div v-resize="handerResize"
				class="scroll-container"
			>
				<span class="button-vessel">
					<span
						v-for="(item, index) in data"
						:key="index"
						:class="[
							'button',
							current == item.value.name ? 'actived' : 'normal',
							index > 0 ? 'justify-between' : 'justify-center',
						]"
						:style="{ width: computedTagWidth + 'px' }"
						@click="context.emit('click', item.value)"
					>
						<span class="label">{{ item.label }}</span>
						<span
							v-if="index > 0"
							class="close iconfont vmo-icon-close_line"
							@click.capture.stop="close(index, item.value)"
						></span>
					</span>
				</span>
				<span class="gap grow-1"></span>
			</div>
		</div>
		<!-- </ElScrollbar> -->
		<div
			class="arrow-cell iconfont vmo-icon-right_line"
			@click="scrollTo(1)"
		></div>
	</div>
</template>

<style lang="css">
.vmo-tab-menu {
	@apply flex-row bg-light-1 select-none;
}
.vmo-tab-menu .arrow-cell {
	@apply w-20 flex-row items-center  justify-center border-b cursor-pointer transition-all duration-100 border-dark-4 text-gray-300 hover:text-gray-500 dark:border-light-4 dark:text-light-16 dark:hover:text-white;
}
.vmo-tab-menu .scroll-container {
	@apply !grow-1 flex-row w-auto shrink-0;
}
.vmo-tab-menu .scroll-container > .button-vessel {
	@apply flex-row;
}
.vmo-tab-menu .scroll-container > .button-vessel > .button {
	@apply pl-[15px] pr-[15px] min-w-[50px] max-w-[420px] border-x border-t border-b rounded-t-md cursor-pointer flex-row items-center text-gray-400  border-gray-200 dark:border-gray-800 -mr-[1px];
}
.vmo-tab-menu .scroll-container > .button-vessel > .button.normal {
	@apply bg-gradient-to-t from-[#00000000] to-[#00000000] hover:from-[#3e3b3b10] hover:to-[#AAAAAA10];
}
.vmo-tab-menu .scroll-container > .button-vessel > .button.actived {
	@apply bg-gray-100 border-b-0 text-dark-28 border-dark-2 dark:text-white dark:bg-gray-900 dark:!border-light-6;
}
.vmo-tab-menu .scroll-container > .button-vessel > .button > .label {
	@apply text-xs whitespace-nowrap text-ellipsis overflow-hidden;
}
.vmo-tab-menu .scroll-container > .button-vessel > .button > .close {
	@apply w-[14px] h-[14px] text-xs shrink-0 flex-row items-center justify-center font-bold scale-75 hover:scale-95 hover:bg-d-10 hover:text-white rounded-sm transition-all duration-100 -mr-5;
}

.vmo-tab-menu .scroll-container > .gap {
	@apply w-[0px] border-b border-dark-4 dark:border-light-4;
}
</style>

<script lang="ts">
import { mergeDeepRight, mergeAll, clone } from "ramda";
import { defineComponent, ref, computed } from "vue";
import type { PropType, Ref, StyleValue } from "vue";
import { ElScrollbar } from "element-plus";
import { resize } from "@src/use.lib/publicDirectives";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "vmo-tab-menu",
	components: {},
	directives: { resize },
	props: {
		// tag 标签数据
		data: {
			type: Array as PropType<
				{
					label: string;
					value: Omit<Record<string, any>, "name"> & { name: string };
				}[]
			>,
			default: () => [
				{ label: "MainMenu", value: { name: "fdasf" } },
				{ label: "THEME", value: { name: "accordion" } },
				{ label: "Persional", value: { name: "b" } },
				{ label: "hahah", value: { name: "4" } },
			],
		},
		viewClass: {
			type: String as PropType<string>,
			default: "",
		},
		// 当前路由名称，用于高亮
		current: {
			type: String as PropType<string | symbol>,
			default: "",
		},
		// 标签的宽度
		size: {
			type: Object as PropType<Partial<{ max: number; min: number }>>,
			default: () => ({}),
		},
	},
	emits: ["click", "close"], // v-model 写法
	setup(props, context) {
		const router = useRouter();
		const ScrollContainerRef = ref(null as null | HTMLElement);
		const containerSize = ref(0);
		const computedTagWidth = computed(() => {
			let width = Math.round(containerSize.value / props.data.length);
			const size = mergeAll([{ max: 100, min: 50 }, props.size]);
			width = Math.max(width, size.min);
			width = Math.min(width, size.max);
			return width;
		});
		function close(
			index: number,
			value: Omit<Record<string, any>, "name"> & { name: string },
		) {
			context.emit("close", {
				closed: value,
				next:
					value.name == props.current
						? (props.data[index + 1] ?? props.data[index - 1]).value
						: null,
			});
		}
		function scrollTo(step: number) {
			const distance = step * ScrollContainerRef.value!.clientWidth * 0.5;
			console.log(distance, ScrollContainerRef.value!.scrollLeft);
			ScrollContainerRef.value!.scrollLeft += distance;
		}
		function handerResize(rect: DOMRect) {
			containerSize.value = rect.width;
			// let width = Math.round(rect.width / props.data.length)
			// const size = mergeAll([{ max: 100, min: 50 }, props.size])
			// width = Math.max(width, size.min)
			// width = Math.min(width, size.max)
			// containerSize.value = width
		}
		return {
			context,
			ScrollContainerRef,
			computedTagWidth,
			handerResize,
			scrollTo,
			close,
		};
	},
});
</script>
