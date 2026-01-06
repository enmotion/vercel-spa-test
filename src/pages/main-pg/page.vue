<template>
	<div class="flex-row grow-1">
		<div v-show="appStore.getScreen.isWideScreen"
			class="w-[180px] flex-col shrink-0 text-white bg-a-10"
		>
			<div class="h-[50px] px-20 flex-col justify-center text-lg font-semibold bg-dark-4 italic text-white">
				<div class="flex-row">
					<span class="w-0 grow-1 overflow-hidden text-ellipsis">
						{{ appStore.getInfo.name }}
					</span>
				</div>
			</div>
			<vmo-scroll class="grow-1 flex-col">
				<vmo-tree-menu :data="userStore.getMenu"
					:accordion="false"
					:transition="{
						name: 'growy',
						duration: { enter: 200, leave: 100 },
					}"
					:indent="10"
					:props="{ label: 'label', value: 'name', icon: 'icons' }"
					:use-default-icon="true"
					:recursive-level-class-and-style="{
						container: {
							class: 'border-[#88888810]',
						},
						cell: {
							class:
								'h-[50px] pl-[20px] pr-[10px] hover:bg-p-10 !transition-all !duration-300',
						},
					}"
					:isShrink="false"
					:value="route.name?.toString()"
					@update:value="router?.push($event.option.to)"
				/>
			</vmo-scroll>
		</div>
		<div class="flex-col flex-grow-1 bg-gray-50 dark:bg-gray-900">
			<div v-show="appStore.getScreen.isWideScreen"
				class="h-[50px] flex-row bg-gray-50 dark:bg-gray-900"
			>
				<vmo-tab-menu class="h-[50px] grow-1 pt-[5px]"
					view-class="pt-[10px]"
					:current="route.name"
					:data="computedTagMenus"
					@click="router.push($event)"
					@close="
						($event) => {
							keepAliveStore.remove($event.closed);
							$event.next && router.push($event.next);
						}
					"
				/>
				<div
					class="flex-row items-center justify-end px-[10px] border-b bg-light-1 border-dark-4 dark:border-light-4"
				>
					<vmo-icon-button :class="[
							'text-gray-500 dark:text-white text-base bg-light-12 dark:bg-dark-4 rounded border border-dark-4 dark:border-light-2',
							isDark ? 'vmo-icon-sun' : 'vmo-icon-moon',
						]"
						:size="25"
						@click="themeStore.toggleMode()"
					/>
				</div>
				<vmo-user class="w-[230px] bg-light-32 dark:bg-dark-4 px-[20px] border-b border-dark-4 dark:border-light-4"
					:avatar="'/api' + userStore.getInfo.avatar"
					:name="userStore?.getInfo?.nickname ?? userStore?.getInfo?.username"
					:info="userStore.getInfo?.username"
					:collapsed="true"
					:size="[32, 20]"
					:trigger="{
						trigger: 'click',
						popperClass: isDark
							? 'p-0 el-keep-dark overflow-hidden'
							: 'p-0 el-keep-light overflow-hidden',
						width: 100,
						teleported: false,
						persistent: false,
					}"
				>
					<template #popover>
						<div class="w-full flex-col dark:text-light-24 text-dark-28">
							<div v-for="m in accountMenus"
								:key="m.value.name"
								class="h-30 pl-[10px] pr-[5px] dark:hover:bg-d-10 hover:bg-p-10 hover:text-white cursor-pointer transition-all duration-150 text-xs flex-row items-center justify-between border-b border-dark-5 dark:border-light-3 last:border-none"
								@click="router.replace(m.value)"
							>
								<span>{{ m.label }}</span>
								<span :class="[
									'iconfont flex-row items-center justify-center',
									m.icon,
								]"
								></span>
							</div>
						</div>
					</template>
				</vmo-user>
			</div>
			<div v-show="!appStore.getScreen.isWideScreen"
				class="h-[50px] flex-row items-center justify-between px-[20px] border-light-3 border-b bg-gray-50 dark:bg-gray-900"
			>
				<span class="italic text-lg">{{ appStore.info.name }}</span>
				<span class="flex-row items-center">
					<vmo-icon-button :class="[
							'text-gray-500 dark:text-gray-400 text-base rounded mr-10 last:mr-0 vmo-icon-list',
						]"
						:size="25"
						@click="showDrawer = true"
					/>
				</span>
				<el-drawer v-model="showDrawer"
					size="80%"
					direction="ltr"
					header-class="hidden"
					footer-class="hidden"
					body-class="pt-[20px] pb-[0px] px-[0px] flex-col border-r dark:bg-gray-800 dark:border-r-gray-800 "
					:destroy-on-close="true"
				>
					<div class="flex-row px-20 items-center justify-between">
						<vmo-user class="grow-1"
							avatar="ahttps://ts1.cn.mm.bing.net/th/id/R-C.f925b6671e1dd7c2171b71aa7a868162?rik=Jvz1OIt29KCaNA&riu=http%3a%2f%2fimages.shejidaren.com%2fwp-content%2fuploads%2f2019%2f09%2f31475-6.jpg&ehk=2ojlLH21omrJd%2bECRhCtsH7vxk5K%2fVV26%2fJoUEcDmFw%3d&risl=&pid=ImgRaw&r=0"
							name="IRON MAN"
							info="the leader of superhero"
							:collapsed="true"
							:size="[35, 20]"
							:trigger="{
								trigger: 'click',
								popperClass: isDark
									? 'p-0 el-keep-dark overflow-hidden'
									: 'p-0 el-keep-light overflow-hidden',
								width: 90,
								teleported: false,
								persistent: false,
							}"
						>
							<template #popover>
								<div class="w-full flex-col dark:text-light-24 text-dark-28">
									<div v-for="m in accountMenus"
										:key="m.value.name"
										class="h-30 pl-[10px] pr-[5px] dark:hover:bg-d-10 hover:bg-p-10 hover:text-white cursor-pointer transition-all duration-150 text-xs flex-row items-center justify-between border-b border-dark-5 dark:border-light-3 last:border-none"
										@click="router.replace(m.value)"
									>
										<span>{{ m.label }}</span>
										<span :class="[
											'iconfont flex-row items-center justify-center',
											m.icon,
										]"
										></span>
									</div>
								</div>
							</template>
						</vmo-user>
						<span class="flex-row items-center ml-20">
							<vmo-icon-button :class="[
									'text-gray-500 dark:text-gray-400 text-base rounded mr-10 last:mr-0',
									isDark ? 'vmo-icon-sun' : 'vmo-icon-moon',
								]"
								:size="25"
								@click="themeStore.toggleMode()"
							/>
						</span>
					</div>
					<vmo-scroll class="mt-20 grow-1">
						<vmo-tree-menu :data="userStore.getMenu"
							:accordion="false"
							:transition="{
								name: 'growy',
								duration: { enter: 150, leave: 120 },
							}"
							:indent="10"
							:recursive-level-class-and-style="{
								container: {
									class: 'border-light-2',
								},
								cell: {
									class: 'h-[40px] pl-[28px] pr-[23px] border-none',
								},
							}"
							:props="{ label: 'label', value: 'name', icon: 'icons' }"
							:use-default-icon="true"
							:isShrink="false"
							:value="route.name?.toString()"
							@update:value="router?.push($event.option.to)"
						/>
					</vmo-scroll>
				</el-drawer>
			</div>
			<router-view class="grow-1"
				v-slot="{ Component }"
			>
				<vmo-transition name="falling"
					mode="out-in"
					class="grow-1 flex-col overflow-hidden"
					:duration="{ enter: 200, leave: 200 }"
					:timing="{ enter: 'ease-out', leave: 'ease-out' }"
					:disabled="appStore.getMicroAppEnvironment"
				>
					<keep-alive :include="keepAliveStore.getNames">
						<component :is="Component"
							:key="route.path"
							class="w-full h-full p-20 bg-gray-100 dark:bg-gray-900"
						/>
					</keep-alive>
				</vmo-transition>
			</router-view>
		</div>
	</div>
</template>

<script lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import {
	defineComponent,
	onMounted,
	onActivated,
	onDeactivated,
	ref,
	KeepAlive,
	computed,
	watch,
} from "vue";
import VmoTreeMenu from "@src/comps/common/vmo-tree-menu/component.vue";
import VmoTabMenu from "@src/comps/common/vmo-tab-menu/component.vue";
import VmoUser from "@src/comps/common/vmo-user/component.vue";
import VmoIconButton from "@src/comps/common/vmo-icon/component.vue";
import VmoScroll from "@src/comps/common/vmo-scroll/component.vue";
import { useThemeStore } from "@src/stores/pubState/themeStore";
import type { VmoRouteToRaw } from "vmo-router";
import { useKeepAliveStore } from "@src/stores/pubState/keepAlive";
import { useRouterStore, useRouter, useRoute } from "vmo-router";
import { useAppStore, useUserStore } from "@src/stores";
import {
	ElTable,
	ElTableColumn,
	ElInput,
	ElDrawer,
	valueEquals,
} from "element-plus";

export default defineComponent({
	name: "main-pg",
	components: {
		VmoUser,
		VmoIconButton,
		VmoTreeMenu,
		ElTable,
		ElTableColumn,
		ElInput,
		VmoScroll,
		ElDrawer,
		VmoTabMenu,
	},
	setup(props, context) {
		const showDrawer = ref(false);
		const isDark = useDark();
		const themeStore = useThemeStore();
		const keepAliveStore = useKeepAliveStore();
		const routerStateStore = useRouterStore();
		const userStore = useUserStore();
		const appStore = useAppStore();
		const route = useRoute();
		const router = useRouter();
		const accountMenus = ref([
			{
				label: "个人中心",
				value: { name: "person-center-pg" },
				icon: "vmo-icon-user_circle_line",
			},
			// { label: '皮肤管理', value: { name: 'login-pg' }, icon: 'vmo-icon-paint_brush_line' },
			{
				label: "退出登录",
				value: { name: "login-pg" },
				icon: "vmo-icon-exit_line",
			},
		] as {
			label: string;
			value: VmoRouteToRaw<Record<string, any>>;
			icon: string;
		}[]);
		// 标签菜单数据
		const computedTagMenus = computed(() =>
			// 必须包含 pageName 与未设置 avoidPushToTag 的缓存页面，才能作为标签菜单的数据
			keepAliveStore.get
				.filter((item) => !!item.meta?.pageName && !item.meta?.avoidPushToTag)
				.map((item) => {
					return {
						label: (item.meta?.pageName ?? item.name!) as string,
						value: item as Omit<Record<string, any>, "name"> & { name: string },
					};
				}),
		);

		onMounted(() => {
			console.log("main-pg onMounted");
		});
		onActivated(() => {
			console.log("main-pg onActivated");
		});
		onDeactivated(() => {
			showDrawer.value = false;
			console.log("main onDeactivated");
		});

		// onBeforeUnmount(hookFunction('onBeforeUnmount'));;
		// onUnmounted(hookFunction('onUnmounted'));

		return {
			showDrawer,
			computedTagMenus,
			keepAliveStore,
			routerStateStore,
			route,
			router,
			userStore,
			appStore,
			isDark,
			accountMenus,
			themeStore,
		};
	},
});
</script>
