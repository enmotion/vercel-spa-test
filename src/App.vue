<script setup lang="ts">
import { getCurrentInstance, computed } from "vue"; //
import { type RouterView } from "vue-router"; //
import { useKeepAliveStore } from "@src/stores/pubState/keepAlive";
import { useRouter, useRouterStore, usePreventBrowserBeforeunloadBehavior } from "vmo-router";
import { useLayoutStore } from "@src/comps/common/vmo-layout/state"; // 引入布局外观
import { useAppStore } from "@src/stores/index"; // 公共缓存数据
import { useUserStore } from "@src/stores/index";
import { useThemeStore } from "@src/stores/pubState/themeStore";
import { ElDescriptions, ElDescriptionsItem, ElConfigProvider } from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { VmoSkin, useGenerateElementPlusThemeCssVariables } from "vmo-skin";
import emitter from "@src/use.lib/emitter";
import type { PermissionEvents } from "@typs/AppEvent";
import "vmo-skin/dist/style.css";
const themeState = useLayoutStore();
const { proxy } = getCurrentInstance() as { proxy: any };
const routerStore = useRouterStore();
const userStore = useUserStore();
const keepAliveStore = useKeepAliveStore();
const appStore = useAppStore();
const router = useRouter()
const themeStore = useThemeStore();
usePreventBrowserBeforeunloadBehavior(false); // 设置当前应用不可随意刷新，关闭，会弹出提示，用户确认后方可继续浏览器默认行为
appStore.setRootInstance(proxy); // 将根目录下的实例，保存到全局状态 方便部分非页面模块可以调用 根实例 弹窗 消息提示 方法
emitter.on('user:token-expired' as PermissionEvents.TOKEN_EXPIRED, (data) => {
	router.replace({ name: 'login-pg' })
})
// const overwriteClass = {
//   '.el-message-box': {
//     padding: '0px',
//     background: '#FFFFFF',
//     overflow: 'hidden'
//   },
//   '.el-message-box__header': {
//     height: '50px',
//     padding: '0px 20px 0px 20px !important',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: 'var(--el-color-primary)',
//     borderBottom: '1px solid #AAAABB55'
//   },
//   '.el-message-box__title': {
//     color: 'white',
//     fontWeight: 'normal',
//     padding: '0px',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyItems: 'center'
//   },
//   '.el-message-box__container': {
//     margin: '10px 20px 10px 20px'
//   },
//   '.el-message-box__headerbtn': {
//     color: 'white',
//     position: 'inherit',
//     width: '20px',
//     height: '20px'
//   },
//   '.el-message-box__headerbtn:focus .el-message-box__close, .el-message-box__headerbtn:hover .el-message-box__close':
//     {
//       color: 'var(--el-color-white)'
//     },
//   '.el-message-box__btns': {
//     padding: '10px 20px 10px 20px',
//     backgroundColor: '#88888811'
//   },
//   '.el-message-box__headerbtn .el-message-box__close': {
//     color: 'var(--el-color-white)'
//   },
//   '.el-button': {
//     borderRadius: '4px',
//     transitionDuration: '0.1s'
//   },
//   '.el-button:hover': {
//     borderRadius: '20px'
//   },
//   '.el-input-number__decrease': {
//     backgroundColor: 'var(--el-fill-color-light) /*aaaaa*/'
//   },
//   '.el-input-number__increase': {
//     backgroundColor: 'var(--el-fill-color-light) /*aaaaa*/'
//   },
//   '.el-message': {
//     // backgroundColor:'var(--el-color-white)'
//   },
//   '.el-slider__button': {
//     border: '2px solid var(--el-color-primary-light-5)',
//     width: 'var(--el-slider-size,20px)',
//     height: 'var(--el-slider-size,20px)'
//   },
//   '.el-popover.el-popper': {
//     minWidth: '0px'
//   }
// }
// const computedCssVariables = computed(() => {
//   return {
//     pickedStepColors: [
//       '--el-color-primary',
//       '--el-color-success',
//       '--el-color-warning',
//       '--el-color-danger',
//       '--el-color-info',
//       '--el-color-error',
//       '--el-color-accent'
//     ],
//     overwriteColors: {
//       '--el-color-primary': '#5279FF',
//       '--el-color-warning': '#FFBE42',
//       '--el-color-success': '#52C41A',
//       '--el-color-error': '#FF0000',
//       '--el-color-danger': '#FF0000',
//       // '--el-color-info':'#FF0000',
//       '--el-color-accent': '#5279FF',

//       '--el-message-close-icon-color': '#FFFFFF',

//       '--light-3': 0.3,
//       '--light-5': 0.5,
//       '--light-7': 0.7,
//       '--light-9': 0.9,
//       '--dark-2': 0.2,

//       '--el-slider-size': '14px',

//       '--el-border-color': '#E4E4E4',
//       // '--el-fill-color-light': '#e9e9f3',
//       '--el-bg-color-overlay': '#FFFFFF',
//       '--el-text-color-disabled': '#FF00FF',
//       // '--el-fill-color-blank': '#FDFDFF',

//       '--el-componet-border-color-hover': '#BBBBBB',
//       '--el-border-color-hover':
//         'var(--el-componet-border-color-hover,var(--el-text-color-disabled))'
//     }
//   }
// })
</script>

<template>
	<ElConfigProvider :locale="zhCn">
		<vmo-skin themeid="vmo-base" 
			class="h-full flex flex-col bg-white dark:bg-gray-900" 
			:namespace="true"
			:use-style-to-apply-css-properties="false" 
			:css-properties="themeStore.getThemeCssProperties"
			:overwrite-class="(themeStore.getOverwriteClass as Record<string, any>)"
		>
			<vmo-console class="bg-dark-4 dark:bg-gray-950 p-20" 
				height="400px"
			>
				{{ themeStore.getThemeCssProperties["--el-disabled-bg-color"] }}
				<el-descriptions 
					size="small" 
					:column="4" 
					border
				>
					<el-descriptions-item 
						label="嵌入运行:" 
						:span="4"
						label-class-name="whitespace-nowrap w-auto shrink-0"
					>
						当前应用是否为嵌入运行在 MicroApp 环境中: {{
							appStore.getMicroAppEnvironment ? "是" : "否" }}
					</el-descriptions-item>
					<el-descriptions-item label="离开提示:"
						:span="4"
						label-class-name="whitespace-nowrap w-auto shrink-0"
					>
						当前应用跳转至其他地址时，是否会弹出阻拦提示: {{
							routerStore.getBrowserBeforeunloadDisabled ? "是" : "否" }}
					</el-descriptions-item>
					<el-descriptions-item label="路由缓存:"
						:span="4"
						label-class-name="whitespace-nowrap w-auto shrink-0"
					>
						当前缓存的路由
						KeepAlive: {{
							keepAliveStore.getNames }}
					</el-descriptions-item>
					<el-descriptions-item label="动态路由:"
						:span="4"
						label-class-name="whitespace-nowrap w-auto shrink-0"
					>
						{{
							routerStore.getCachedRoutes
						}}
					</el-descriptions-item>
					<el-descriptions-item label="主题颜色:"
						:span="4"
						label-class-name="whitespace-nowrap w-auto shrink-0"
					>
						{{
							themeStore.getOverwriteColors
						}}
					</el-descriptions-item>
					<el-descriptions-item label="用户信息:"
						:span="4"
						label-class-name="whitespace-nowrap w-auto shrink-0"
					>
						{{
							userStore.getInfo
						}}
					</el-descriptions-item>
				</el-descriptions>
			</vmo-console>
			<router-view class="grow-1" 
				v-slot="{ Component }"
			>
				<vmo-transition name="zoomin" 
					mode="out-in" 
					class="grow-1 flex-col overflow-hidden" 
					:duration="{
						enter: 300,
						leave: 200,
					}" 
					:timing="{
						enter: 'ease-out',
						leave: 'ease-in',
					}" 
					:disabled="appStore.getMicroAppEnvironment"
				>
					<keep-alive :include="keepAliveStore.getNames">
						<component 
							:is="Component" 
							class="w-full h-full"
						/>
					</keep-alive>
				</vmo-transition>
			</router-view>
			<!-- </vmo-layout> -->
		</vmo-skin>
	</ElConfigProvider>
</template>
