<template>
	<div class="flex flex-col">
		<div
			v-if="!disabled"
			ref="ScrollContainerDom"
			class="relative h-full w-full overflow-hidden"
		>
			<div class="absolute h-full w-full flex flex-col">
				<el-scrollbar
					v-bind="computedScrollBarProps"
					class="flex flex-col"
					:wrap-class="[
						'flex flex-col flex-grow-1',
						computedScrollBarProps.wrapClass,
					]"
					:view-class="[
						'flex flex-col flex-grow-1',
						computedScrollBarProps.viewClass,
					]"
					:height="ScrollContainerDomSize.h + 'px'"
					@scroll="scroll"
				>
					<div
						ref="SlotContainerDom"
						class="flex flex-col flex-grow-1 flex-shrink-0"
					>
						<slot></slot>
					</div>
				</el-scrollbar>
			</div>
		</div>
		<div
			v-if="disabled"
			class="flex flex-col h-auto flex-grow-1 flex-shrink-0"
			:class="[computedScrollBarProps.viewClass]"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import * as R from "ramda";
import {
	defineComponent,
	ref,
	reactive,
	computed,
	onMounted,
	onBeforeUnmount,
	type PropType,
} from "vue";
import { ElScrollbar } from "element-plus";

export default defineComponent({
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		scrollBarProps: {
			type: Object as PropType<{
				height?: string | number;
				maxHeight?: string | number;
				native?: boolean;
				wrapStyle?: string;
				wrapClass?: string;
				viewStyle?: string;
				viewClass?: string;
				noresize?: boolean;
				tag?: string;
				always?: boolean;
				minSize?: number;
			}>,
			default: () => ({}),
		},
	},
	components: { ElScrollbar },
	emits: ["onScrollToTop", "onScrollToBottom"],
	setup(props, context) {
		const ScrollContainerDom = ref(null as any);
		const SlotContainerDom = ref(null as any);
		const ScrollContainerDomSize = reactive({ w: 0, h: 0 });
		const isAlreadyTrigged = reactive({
			top: false,
			bottom: false,
		});
		let ScrollContainerDomResizeObserver: ResizeObserver | null = null; // bpmnDesignDom 容器监听器
		const computedScrollBarProps = computed(() =>
			R.mergeAll([{ noresize: true }, props.scrollBarProps]),
		);
		onMounted(() => {
			// 计算属性面板所需宽度
			ScrollContainerDomResizeObserver = new ResizeObserver(() => {
				if (!props.disabled) {
					//禁用模式下，不启用高度侦测
					ScrollContainerDomSize.w = ScrollContainerDom.value.clientWidth;
					ScrollContainerDomSize.h = ScrollContainerDom.value.clientHeight;
				}
			});
			ScrollContainerDom.value &&
				ScrollContainerDomResizeObserver.observe(ScrollContainerDom.value); // 添加侦听
		});
		onBeforeUnmount(() => {
			ScrollContainerDomResizeObserver &&
				ScrollContainerDomResizeObserver.disconnect(); // 关闭侦听
		});
		function scroll(data: any) {
			if (!props.disabled) {
				//禁用模式下，不启用高度侦测
				if (data.scrollTop <= 0) {
					if (!isAlreadyTrigged.top) {
						isAlreadyTrigged.top = true;
						context.emit("onScrollToTop", "top");
					}
				} else {
					isAlreadyTrigged.top = false;
				}
				if (
					data.scrollTop >=
					SlotContainerDom.value.clientHeight - ScrollContainerDomSize.h
				) {
					if (!isAlreadyTrigged.bottom) {
						isAlreadyTrigged.bottom = true;
						context.emit("onScrollToBottom", "bottom");
					}
				} else {
					isAlreadyTrigged.bottom = false;
				}
			}
		}
		return {
			computedScrollBarProps,
			ScrollContainerDom,
			SlotContainerDom,
			ScrollContainerDomResizeObserver,
			ScrollContainerDomSize,
			isAlreadyTrigged,
			scroll,
		};
	},
});
</script>
