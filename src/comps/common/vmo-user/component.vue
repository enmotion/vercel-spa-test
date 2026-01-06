<template>
	<div class="vmo-user">
		<slot name="avatar">
			<div
				:style="{
					width: computedSize.avatarSize + 'px',
					height: computedSize.avatarSize + 'px',
				}"
				class="avatar shrink-0 border border-dark-2 dark:border-light-12"
			>
				<img
					v-if="!showDefaultAvatar"
					:src="computedAvatar.src"
					alt="user avatar"
					class="img"
					@error="showDefaultAvatar = true"
				/>
				<img
					v-if="showDefaultAvatar"
					:src="defaultAvatar"
					alt="user default avatar"
					class="img"
				/>
			</div>
		</slot>
		<slot name="info">
			<div
				:class="[
					'info w-0 grow-1',
					collapsed ? 'flex-col' : 'flex-row items-center',
				]"
			>
				<span class="name text-gray-800 dark:text-white flex-row">
					<span
						class="w-0 grow-1 whitespace-nowrap overflow-hidden text-ellipsis"
					>{{ name }}</span>
				</span>
				<span
					v-if="!!info"
					:class="[
						'text-xs text-dark-28 dark:text-light-24 flex-row',
						collapsed ? '' : 'ml-[5px]',
					]"
				>
					<span
						class="w-0 grow-1 whitespace-nowrap overflow-hidden text-ellipsis"
					>{{ info }}</span>
				</span>
			</div>
		</slot>
		<slot v-if="!!trigger"
			name="trigger"
		>
			<el-popover v-bind="computedPopoverProps">
				<template #reference>
					<div
						:style="{
							width: computedSize.triggerSize + 'px',
							height: computedSize.triggerSize + 'px',
						}"
					>
						<div class="ct-sca sca1x1">
							<div
								:class="[
									'c-sca iconfont vmo-icon-down_small dropTrigger transition-all duration-200',
									'bg-dark-2 hover:bg-dark-4',
									'dark:bg-light-2 dark:hover:bg-light-6',
								]"
							></div>
						</div>
					</div>
				</template>
				<slot name="popover">
					<span @click="router.replace({ name: 'login-pg' })">
						Some content
					</span>
				</slot>
			</el-popover>
		</slot>
	</div>
</template>

<style lang="css">
.vmo-user {
	@apply flex-row items-center;
}
.vmo-user .avatar {
	@apply overflow-hidden rounded-full;
}
.vmo-user .avatar .img {
	@apply scale-[1.4] hover:scale-[1.8] transition-all duration-150;
}
.vmo-user .info {
	@apply mx-[10px] select-none;
}
.vmo-user .info .name {
	@apply text-sm font-bold;
}
.vmo-user .dropTrigger {
	@apply cursor-pointer transition-all duration-100 rounded-full text-base flex-row items-center justify-center;
}
</style>

<script lang="ts">
import { mergeAll } from "ramda";
import { ref, defineComponent, computed, watch, unref } from "vue";
import { ElPopover, ClickOutside } from "element-plus";
import type { PopoverProps } from "element-plus";
import { useRouter } from "vmo-router";
import defaultAvatar from "./assets/default-2.svg";
import type { PropType } from "vue";

export default defineComponent({
	name: "vmo-user",
	components: { ElPopover },
	props: {
		// 用户头像 支持对象形式，可以定义导角程度
		avatar: {
			type: [String, Object] as PropType<
				string | { src: string; rounded: number }
			>,
			default: "",
		},
		// 头像尺寸与 下拉尺寸触发锚点尺寸
		size: {
			type: [Number, Array] as PropType<number | [number, number]>,
			default: 34,
		},
		// 是否折叠，不折叠则平展用户名与信息文字段
		collapsed: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		// 用户名称
		name: {
			type: String as PropType<string>,
			default: "王晓东",
		},
		// 用户信息
		info: {
			type: [String, Number] as PropType<string | number>,
			default: "",
		},
		// 触发锚点配置，false 时可以不显示
		trigger: {
			type: [Boolean, Object] as PropType<boolean | Partial<PopoverProps>>,
			default: true,
		},
	},
	directives: { ClickOutside },
	emits: ["click"],
	setup(props, context) {
		const router = useRouter();
		const showDefaultAvatar = ref(false);
		// 计算的头像
		const computedAvatar = computed(() => {
			return typeof props.avatar == "object"
				? props.avatar
				: {
					src: props.avatar,
					rounded: 100,
				};
		});
		// 计算的尺寸
		const computedSize = computed(() => {
			return Array.isArray(props.size)
				? {
					avatarSize: props.size[0],
					triggerSize: props.size[1],
				}
				: {
					avatarSize: props.size,
					triggerSize: props.size * 0.6,
				};
		});
		// 计算浮窗相关配置
		const computedPopoverProps = computed(() => {
			return typeof props.trigger == "boolean"
				? ({ trigger: "click" } as Partial<PopoverProps>)
				: (mergeAll([
					{ trigger: "click" },
					props.trigger,
				]) as Partial<PopoverProps>);
		});
		watch(
			() => props.avatar,
			(n, o) => {
				showDefaultAvatar.value = false;
			},
			{ immediate: true, deep: true },
		);
		return {
			router,
			defaultAvatar,
			showDefaultAvatar,
			computedSize,
			computedAvatar,
			computedPopoverProps,
		};
	},
});
</script>
