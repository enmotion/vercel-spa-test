<template>
	<div class="vmo-tree-menu">
		<!-- rows -->
		<div
			v-for="(item, index) in data"
			:key="item[computedProps.nodeKey]"
			:style="computedRecursiveLevelClassAndStyle.container.style"
			:class="[
				'menu-container',
				computedRecursiveLevelClassAndStyle.container.class,
				index < data.length - 1 ? 'border-b' : '',
			]"
		>
			<!-- {{ Object.keys(context.slots) }} -->
			<div
				:style="computedRecursiveLevelClassAndStyle.cell.style"
				:class="[
					'cell',
					computedRecursiveLevelClassAndStyle.cell.class,
				] /* 层级样式 menu-cell */"
				@click="menuButtonOnClick(item, index)"
			>
				<slot
					v-if="!!context.slots.default"
					v-bind="{
						$data: item as any,
						$index: index,
						$level: level,
						$expandedMenuIndexes: expandedMenuIndexes,
						expandRows,
					}"
				>
				</slot>
				<div
					class="wrap"
					v-if="!context.slots.default"
					:style="
						mergeAll([
							{ paddingLeft: level * indent + 'px' },
							computedRecursiveLevelClassAndStyle.wrap.style,
						])
					"
					:class="computedRecursiveLevelClassAndStyle.wrap.class"
				>
					<slot
						name="prefix"
						v-bind="{
							$data: item as any,
							$index: index,
							$level: level,
							$expandedMenuIndexes: expandedMenuIndexes,
							expandRows,
						}"
					>
						<span
							v-if="!!item[computedProps.icon] || !!defaultIcon"
							:style="computedRecursiveLevelClassAndStyle.prefix.style"
							:class="[
								'icon',
								item[computedProps.icon] ?? defaultIcon,
								computedRecursiveLevelClassAndStyle.prefix.class,
							]"
						></span>
					</slot>
					<slot
						name="label"
						v-bind="{
							$data: item as any,
							$index: index,
							$level: level,
							$expandedMenuIndexes: expandedMenuIndexes,
							expandRows,
						}"
					>
						<span
							v-if="!isShrink"
							:style="computedRecursiveLevelClassAndStyle.label.style"
							:class="[
								'label',
								computedRecursiveLevelClassAndStyle.label.class,
							]"
						>
							{{ item.label }}
						</span>
					</slot>
					<slot
						name="append"
						v-bind="{
							$data: item as any,
							$index: index,
							$level: level,
							$expandedMenuIndexes: expandedMenuIndexes,
							expandRows,
						}"
					>
						<span
							v-if="!!item.children && item.children.length > 0"
							:style="
								mergeAll([
									{ width: '20px', height: '20px' },
									computedRecursiveLevelClassAndStyle.append.style,
								])
							"
							:class="[
								'iconfont vmo-icon-left_small_line flex-row items-center justify-center rounded-full text-base hover:bg-dark-4 transition-all duration-150',
								expandedMenuIndexes.includes(index)
									? '-rotate-90'
									: '-rotate-180',
								computedRecursiveLevelClassAndStyle.append.class,
							]"
							@click.capture.stop="expandRows(index)"
						></span>
					</slot>
				</div>
			</div>
			<vmo-transition class="transition"
				v-bind="computedTransition"
			>
				<div
					v-if="
						!!item.children &&
							item.children.length > 0 &&
							expandedMenuIndexes.includes(index)
					"
					class="flex-col"
				>
					<vmo-tree-menu
						:data="item.children"
						:props="props"
						:indent="indent"
						:accordion="accordion"
						:transition="computedTransition"
						:defaultIcon="defaultIcon"
						:level="level + 1"
						:recursiveLevelClassAndStyle="recursiveLevelClassAndStyle"
						@update:value="context.emit('update:value', $event)"
					>
						<template
							v-for="key in Object.keys(context?.slots)"
							v-slot:[key]="scope: any"
						>
							<slot :name="key"
								v-bind="scope"
							></slot>
						</template>
					</vmo-tree-menu>
				</div>
			</vmo-transition>
		</div>
	</div>
</template>

<style lang="css">
.vmo-tree-menu {
	@apply flex-col;
}
.vmo-tree-menu .menu-container {
	@apply flex-col first:border-t;
}

.vmo-tree-menu .menu-container .cell {
	@apply flex-col transition-all duration-100 cursor-pointer;
}
.vmo-tree-menu .menu-container .cell .wrap {
	@apply flex-row items-center grow-1;
}
.vmo-tree-menu .menu-container .cell .wrap .icon {
	@apply text-lg flex-row items-center justify-center mr-[10px];
}
.vmo-tree-menu .menu-container .cell .wrap .label {
	@apply grow-1 w-0 overflow-hidden text-ellipsis whitespace-nowrap;
}

.vmo-tree-menu .menu-container .transition {
	@apply grow-1 flex-col overflow-hidden;
}
</style>

<script lang="ts">
import { mergeDeepRight, mergeAll, clone } from "ramda";
import type { VmoRouteMenuItemRaw } from "vmo-router";
import { defineComponent, ref, computed } from "vue";
import type { PropType, Ref, StyleValue } from "vue";
import type Transtion from "@src/comps/common/transition/types/transtion";
import { ElTooltip, ElPopover } from "element-plus";
// type scopeType = {
//   $data: VmoRouteMenuItemRaw<Record<string, any>, Record<string, any>>
//   $index: number
//   $level: number
//   expandRows?: (index: number) => void
// }
export type StyleAndClass = {
	class: string;
	style: StyleValue;
};
export type RecursiveStyleAndClass = {
	container: Partial<StyleAndClass>;
	cell: Partial<StyleAndClass>;
	wrap: Partial<StyleAndClass>;
	prefix: Partial<StyleAndClass>;
	label: Partial<StyleAndClass>;
	append: Partial<StyleAndClass>;
};
const defaultRecursiveStyleAndClass: RecursiveStyleAndClass = {
	container: {
		class: "border-[#DDCCFF20]",
	},
	cell: {
		class: "h-[45px] pl-[20px] pr-[10px] hover:bg-d-10",
	},
	wrap: {},
	prefix: {},
	label: {
		class: "text-sm",
	},
	append: {},
};
export default defineComponent({
	name: "vmo-tree-menu",
	components: { ElTooltip, ElPopover },
	props: {
		// 菜单当前值
		value: {
			type: String as PropType<string>,
			default: "",
		},
		// 菜单数据
		data: {
			type: Array as PropType<
				VmoRouteMenuItemRaw<Record<string, any>, Record<string, any>>[]
			>,
			default: () => [],
		},
		// 菜单递归层级样式
		recursiveLevelClassAndStyle: {
			type: [Object, Function] as PropType<
				| Partial<RecursiveStyleAndClass>
				| ((
					level: number,
					styleAndClass: RecursiveStyleAndClass,
				) => Partial<RecursiveStyleAndClass>)
			>,
			default: () => ({}),
		},
		// 菜单显示模式 shrink:收缩 expandedMenuIndexes:展开
		model: {
			type: String as PropType<"shrink" | "expandedMenuIndexes">,
			default: "expandedMenuIndexes",
		},
		// 配置选项
		props: {
			type: Object as PropType<
				Partial<{
					label: string;
					value: string;
					nodeKey: string;
					icon: string;
					children: string;
				}>
			>,
			default: () => ({}),
		},
		// 菜单路径
		valuePath: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		// 高亮样式
		heightLightClass: {
			type: String as PropType<string>,
			default: "",
		},
		// 相邻级节点间的水平缩进，单位为像素
		indent: {
			type: Number as PropType<number>,
			default: 15,
		},
		// 是否每次只打开一个同级树节点展开
		accordion: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		// 菜单折叠动画过渡效果配置
		transition: {
			type: Object as PropType<Partial<Transtion.Props>>,
			default: () => ({}),
		},
		// 允许使用默认图标
		defaultIcon: {
			type: [String] as PropType<string>,
			default: "iconfont vmo-icon-notebook_line",
		},
		// 菜单层级数据
		level: {
			type: Number as PropType<number>,
			default: 0,
		},
		// 是否收缩
		isShrink: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
	},
	emits: ["update:value"], // v-model 写法
	setup(props, context) {
		const expandedMenuIndexes = ref([] as number[]);
		const currentIndex: Ref<(string | number)[]> = ref([]);
		const buttonRef = ref();
		const computedTransition = computed(() => {
			return mergeDeepRight(
				{
					name: "growy",
					mode: "out-in",
					duration: { enter: 200, leave: 200 },
					timing: { enter: "ease-out", leave: "ease-out" },
				},
				props.transition,
			) as Partial<Transtion.Props>;
		});
		const computedRecursiveLevelClassAndStyle = computed(() => {
			return typeof props.recursiveLevelClassAndStyle == "function"
				? (mergeDeepRight(
					defaultRecursiveStyleAndClass,
					props.recursiveLevelClassAndStyle(
						props.level,
						clone(defaultRecursiveStyleAndClass),
					),
				) as RecursiveStyleAndClass)
				: (mergeDeepRight(
					defaultRecursiveStyleAndClass,
					props.recursiveLevelClassAndStyle,
				) as RecursiveStyleAndClass);
		});
		// const computedCellClassAndStyle = computed(() => {
		//   return mergeDeepRight({ class: '', style: {} }, props.defaultIconClassAndStyle)
		// })
		// const computedWrapClassAndStyle = computed(() => {
		//   return mergeDeepRight({ class: '', style: {} }, props.defaultWrapClassAndStyle)
		// })
		// const computedIconClassAndStyle = computed(() => {
		//   return mergeDeepRight(
		//     { class: '', style: { width: '20px', height: '20px' } },
		//     props.defaultIconClassAndStyle
		//   )
		// })
		/**
		 *  计算后的属性映射声明, 便于不同的菜单数据与 vmo-tree-menu 的结构兼容
		 */
		const computedProps = computed(() => {
			return mergeAll([
				{
					label: "label",
					value: "value",
					icon: "icon",
					nodeKey: "nodeKey",
					children: "children",
				},
				props.props,
			]);
		});
		/**
		 * 菜单按钮点击事件方法
		 * 1. 判断是否存在路由名称
		 * 2. 存在则跳转相关的路由
		 * 3. 不存在则会尝试展开当前页面
		 * @param item
		 * @param index
		 */
		function menuButtonOnClick(
			item: VmoRouteMenuItemRaw<Record<string, any>, Record<string, any>>,
			index: number,
		) {
			if (item.to?.name) {
				context.emit("update:value", { option: item });
			} else {
				expandRows(index);
			}
		}
		function getStepClass() {
			return typeof props.recursiveLevelClassAndStyle == "function"
				? props.recursiveLevelClassAndStyle(
					props.level,
					defaultRecursiveStyleAndClass,
				)
				: props.recursiveLevelClassAndStyle;
		}
		function expandRows(index: number) {
			if (expandedMenuIndexes.value.includes(index)) {
				expandedMenuIndexes.value = expandedMenuIndexes.value.filter(
					(item) => item != index,
				);
			} else {
				!props.accordion
					? expandedMenuIndexes.value.push(index)
					: (expandedMenuIndexes.value = [index]);
			}
		}
		return {
			context,
			expandedMenuIndexes,
			currentIndex,
			computedTransition,
			computedRecursiveLevelClassAndStyle,
			computedProps,
			buttonRef,
			menuButtonOnClick,
			mergeAll,
			getStepClass,
			expandRows,
		};
	},
});
</script>
