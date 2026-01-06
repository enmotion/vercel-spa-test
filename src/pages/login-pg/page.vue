<template>
	<div class="flex-col grow-1">
		<div v-if="appStore.getMicroAppEnvironment"
			class="grow-1 flex-col justify-center items-center text-white"
		>
			<span class="h-30 w-1/2 rounded items-center justify-center flex-row italic">
				<span class="h-0 border-t border-light-5 grow-1"></span>
				<span class="mx-15">Logging in…</span>
				<span class="h-0 border-t border-light-5 grow-1"></span>
			</span>
		</div>
		<div v-if="!appStore.getMicroAppEnvironment"
			:class="[
				appStore.getScreen.isWideScreen ? 'p-20' : '',
				'flex-col items-center bg-texture-light dark:bg-texture-dark justify-center grow-1',
			]"
		>
			<div :class="[
				appStore.getScreen.isWideScreen
					? 'max-w-[1000px] w-[90%]'
					: 'grow-1 w-full',
				'flex-row rounded',
			]"
			>
				<span v-if="appStore.getScreen.isWideScreen"
					class="grow-1 flex-col w-0 h-500 backdrop-blur-sm p-30 text-sm bg-p-10 text-light-28 border border-light-4 mr-5 rounded shadow-md relative overflow-hidden"
				>
					<!-- <vmo-corner-sticker
            content="Do the Best" 
            size="50px" 
            height="50px" 
            width="300px" 
            offset="80px"
            placement="bottom-left"
            content-class="bg-dark-4 text-xl font-medium text-white italic"
            @click="dynamicRouter?.push({name:'theme'})">
          </vmo-corner-sticker> -->
					<span class="text-4xl font-bold text-white italic bg-dark-4 -mx-30 px-30 h-80 flex-row items-center">{{
							appStore.getInfo.name }}
						<span class="text-base uppercase font-light ml-20">
							v {{ appStore.getInfo.version }}</span></span>
					<span class="font-normal text-light-42 text-lg mt-10 italic">
						Vue3 frame work</span>
					<span class="font-thin text-xl italic">
						-- More than meets the eyes</span>
				</span>
				<span :class="[
					appStore.getScreen.isWideScreen
						? 'w-340 h-500 rounded border border-dark-4 dark:border-dark-24 shadow-md'
						: 'w-full h-full',
					'bg-white shrink-0 flex-col overflow-hidden relative',
				]"
				>
					<vmo-corner-sticker content="THEME"
						size="50px"
						height="20px"
						width="200px"
						offset="10px"
						content-class="bg-s-10 text-xs font-bold text-white"
						@click="router?.push({ name: 'theme' })"
					/>
					<div :class="[
						appStore.getScreen.isWideScreen ? 'h-100' : 'justify-center',
						'flex-col grow-1 px-30 pt-50 pb-30',
					]"
					>
						<span :class="[
							appStore.getScreen.isWideScreen
								? 'text-4xl italic'
								: 'text-4xl text-center uppercase',
							' text-dark-38 font-semibold break-all select-none italic',
						]"
						>
							{{ appStore.getInfo.name }}
						</span>
						<span :class="[
							appStore.getScreen.isWideScreen
								? 'text-lg italic'
								: 'text-lg text-center uppercase mt-10',
							' text-dark-24 font-light select-none italic',
						]"
						>Free fontend development</span>
					</div>
					<!-- <div class="text-black px-30 flex-row items-center">
            <span class=" bg-gradient-to-r from-d-8 to-d-10 rounded-sm mr-5 px-5 h-10" :style="{width:Math.round(numberValue)+'px'}"></span>
            {{numberValue.toFixed(2) }} {{ debounceValue }}
          </div> -->
					<vmo-transition :name="animationType"
						mode="out-in"
						:duration="{ enter: 200, leave: 150 }"
						:timing="{ enter: 'ease-out', leave: 'ease-in' }"
						class="flex-col grow-1"
					>
						<component :key="formComponent"
							:is="formComponent"
							class="grow-1 flex-col"
							@submit="submit"
						>
							<template #footer>
								<span v-if="formComponent == 'PasswordLogin'"
									class="flex-row justify-between"
								>
									<el-link size="small"
										class="text-xs font-normal"
										type="info"
										:underline="false"
										@click="formComponent = 'UserRegister'"
									>注册账号</el-link>
									<el-link size="small"
										class="text-xs font-normal"
										type="info"
										:underline="false"
										@click="formComponent = 'ResetPassword'"
									>忘记密码</el-link>
								</span>
								<span v-if="formComponent != 'PasswordLogin'"
									class="flex-row justify-center"
								>
									<el-link size="small"
										class="text-xs font-normal"
										type="info"
										:underline="false"
										@click="formComponent = 'PasswordLogin'"
									>返回登录</el-link>
								</span>
							</template>
						</component>
					</vmo-transition>
					<div v-if="!appStore.getScreen.isWideScreen"
						class="h-[40%] bg-gray-50"
					></div>
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
// import { ax, apis } from '@src/apis'
import { omit } from "ramda";
import {
	defineComponent,
	ref,
	getCurrentInstance,
	watch,
	type PropType,
} from "vue";
import { ElButton, ElLink } from "element-plus";
// import { usePreventBrowserBehavior } from "@src/use.lib"; // 禁用浏览器默认行为
import { useAppStore, useUserStore } from "@src/stores";
import PasswordLogin from "./componet/password-login.vue";
import UserRegister from "./componet/user-register.vue";
import ResetPassword from "./componet/reset-password.vue";
import { userMenuSampleData } from "./config/dynamic-router-list";
import { VmoTree } from "vmo-tree";
import emitter, { PermissionEvents } from "@src/use.lib/emitter";
// import { tweenNumberRef, debounceRef } from '@src/use.lib/publicUseLib';
import { useRouter, useRouterStore } from "vmo-router";

export default defineComponent({
	name: "login-pg",
	components: { ElButton, ElLink, PasswordLogin, UserRegister, ResetPassword },
	props: {
		appName: {
			type: String as PropType<string>,
			default: "",
		},
	},
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		// const numberValue = tweenNumberRef(12,300);
		// const debounceValue = debounceRef('a',300);
		const routerStore = useRouterStore();
		const inputValue = ref("");
		const router = useRouter();
		router?.clearRoutes();
		const appStore = useAppStore();
		const userStore = useUserStore();
		// const { isPrevent } =  usePreventBrowserBehavior('您当前的数据未能保存，是否继续跳转？');
		const formComponent = ref("PasswordLogin");
		const animationType = ref("scrollleft" as "scrollleft" | "scrollright");
		const pageStatus = ["UserRegister", "PasswordLogin", "ResetPassword"];

		emitter.on(PermissionEvents.TOKEN_EXPIRED, (e) => {
			// proxy.$message({
			// 	message: e.userId + "guoqi",
			// 	type: "error",
			// });
		});

		watch(
			() => formComponent.value,
			(n, o) => {
				animationType.value =
					pageStatus.indexOf(n) > pageStatus.indexOf(o)
						? "scrollleft"
						: "scrollright";
			},
		);
		async function submit(data: {
			type: "UserRegister" | "PasswordLogin" | "ResetPassword";
			payload: { [key: string]: any };
		}) {
			switch (data.type) {
				case "UserRegister":
					proxy.$request(proxy.$apis.usersPubRegister, data.payload).then((res: any) => {
						console.log(res)
						if (res.code == 200) {
							formComponent.value = "PasswordLogin"
							proxy.$message({
								message: res.msg,
								type: "success",
							});
						} else {
							proxy.$message({
								message: res.msg,
								type: "error",
							});
						}
					});
					break;
				case "PasswordLogin":
					proxy.$request(proxy.$apis.usersPubLogin, data.payload).then((res: any) => {
						if (res.code == 200) {
							userStore.setToken({
								access_token: res.data.token,
								// refresh_token: 'refresh:kfdakllqwer1322lsaf'
							});
							userStore.setInfo(omit(["token"], res.data));
							userStore.setMenu(userMenuSampleData);
							proxy.$message({
								message: res.msg,
								type: "success",
							});
							router?.push({
								name: "main-pg",
							});
						} else {
							proxy.$message({
								message: res.msg,
								type: "error",
							});
						}
					});
					break;
				case "ResetPassword":
					break;
			}

			// userStore.setToken({
			//   access_token: data.payload.username,
			//   refresh_token: 'refresh:kfdakllqwer1322lsaf'
			// })
			// router?.push({
			//   name: 'main-pg'
			// })
			// userStore.setMenu(userMenuSampleData)

			// console.log(
			//   VmoTree.flatten2Array(userMenuSampleData, 'key', 'parentKey', 'children').map(
			//     (item) => item.to
			//   )
			// )
			// router.reloadRoutes(
			//   VmoTree.flatten2Array(userMenuSampleData, 'key', 'parentKey', 'children').map(
			//     (item) => item.to
			//   )
			// )
			// // dynamicRouter?.cleaRoutes();
			// // await dynamicRouter?.generateRousteByTreeData(userMenuSampleData);
			// console.log(router.getRoutes())
		}
		function showDialog() {
			proxy.$message({
				message: "sserr",
				type: "success",
			});
		}

		return {
			animationType,
			formComponent,
			appStore,
			router,
			proxy,
			inputValue,
			// numberValue,
			// debounceValue,
			submit,
			showDialog,
		};
	},
});
</script>
