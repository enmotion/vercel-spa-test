<template>
	<div class="flex-row">
		<div class="flex-col dark:bg-gray-900 grow-1 border-r border-dark-18">
			<div class="h-auto mb-5 flex-row flex-wrap -mx-5"
				style=""
			>
				<div class="w-1/5 flex-col h-100 p-5">
					<div class="flex-col grow-1 rounded-lg overflow-hidden">
						<div
							class="bg-p-10 grow-1 flex-col px-20 justify-center text-white"
						>
							{{ themeStore.getOverwriteColors["--el-color-primary"] }}
						</div>
						<div class="h-40 flex-row">
							<span class="h-40 grow-1 bg-p-9"></span>
							<span class="h-40 grow-1 bg-p-8"></span>
							<span class="h-40 grow-1 bg-p-7"></span>
							<span class="h-40 grow-1 bg-p-6"></span>
							<span class="h-40 grow-1 bg-p-5"></span>
							<span class="h-40 grow-1 bg-p-4"></span>
							<span class="h-40 grow-1 bg-p-3"></span>
							<span class="h-40 grow-1 bg-p-2"></span>
							<span class="h-40 grow-1 bg-p-1"></span>
						</div>
					</div>
				</div>
				<div class="w-1/5 flex-col h-100 p-5">
					<div class="flex-col grow-1 rounded-lg overflow-hidden">
						<div
							class="bg-s-10 grow-1 flex-col px-20 justify-center text-white"
						>
							{{ themeStore.getOverwriteColors["--el-color-success"] }}
						</div>
						<div class="h-40 flex-row">
							<span class="h-40 grow-1 bg-s-9"></span>
							<span class="h-40 grow-1 bg-s-8"></span>
							<span class="h-40 grow-1 bg-s-7"></span>
							<span class="h-40 grow-1 bg-s-6"></span>
							<span class="h-40 grow-1 bg-s-5"></span>
							<span class="h-40 grow-1 bg-s-4"></span>
							<span class="h-40 grow-1 bg-s-3"></span>
							<span class="h-40 grow-1 bg-s-2"></span>
							<span class="h-40 grow-1 bg-s-1"></span>
						</div>
					</div>
				</div>
				<div class="w-1/5 flex-col h-100 p-5">
					<div class="flex-col grow-1 rounded-lg overflow-hidden">
						<div
							class="bg-d-10 grow-1 flex-col px-20 justify-center text-white"
						>
							{{ themeStore.getOverwriteColors["--el-color-danger"] }}
						</div>
						<div class="h-40 flex-row">
							<span class="h-40 grow-1 bg-d-9"></span>
							<span class="h-40 grow-1 bg-d-8"></span>
							<span class="h-40 grow-1 bg-d-7"></span>
							<span class="h-40 grow-1 bg-d-6"></span>
							<span class="h-40 grow-1 bg-d-5"></span>
							<span class="h-40 grow-1 bg-d-4"></span>
							<span class="h-40 grow-1 bg-d-3"></span>
							<span class="h-40 grow-1 bg-d-2"></span>
							<span class="h-40 grow-1 bg-d-1"></span>
						</div>
					</div>
				</div>
				<div class="w-1/5 flex-col h-100 p-5">
					<div class="flex-col grow-1 rounded-lg overflow-hidden">
						<div
							class="bg-w-10 grow-1 flex-col px-20 justify-center text-white"
						>
							{{ themeStore.getOverwriteColors["--el-color-warning"] }}
						</div>
						<div class="h-40 flex-row">
							<span class="h-40 grow-1 bg-w-9"></span>
							<span class="h-40 grow-1 bg-w-8"></span>
							<span class="h-40 grow-1 bg-w-7"></span>
							<span class="h-40 grow-1 bg-w-6"></span>
							<span class="h-40 grow-1 bg-w-5"></span>
							<span class="h-40 grow-1 bg-w-4"></span>
							<span class="h-40 grow-1 bg-w-3"></span>
							<span class="h-40 grow-1 bg-w-2"></span>
							<span class="h-40 grow-1 bg-w-1"></span>
						</div>
					</div>
				</div>
				<div class="w-1/5 flex-col h-100 p-5">
					<div class="flex-col grow-1 rounded-lg overflow-hidden">
						<div
							class="bg-e-10 grow-1 flex-col px-20 justify-center text-white"
						>
							{{ themeStore.getOverwriteColors["--el-color-error"] }}
						</div>
						<div class="h-40 flex-row">
							<span class="h-40 grow-1 bg-e-9"></span>
							<span class="h-40 grow-1 bg-e-8"></span>
							<span class="h-40 grow-1 bg-e-7"></span>
							<span class="h-40 grow-1 bg-e-6"></span>
							<span class="h-40 grow-1 bg-e-5"></span>
							<span class="h-40 grow-1 bg-e-4"></span>
							<span class="h-40 grow-1 bg-e-3"></span>
							<span class="h-40 grow-1 bg-e-2"></span>
							<span class="h-40 grow-1 bg-e-1"></span>
						</div>
					</div>
				</div>
				<div class="w-1/5 flex-col h-100 p-5">
					<div class="flex-col grow-1 rounded-lg overflow-hidden">
						<div
							class="bg-a-10 grow-1 flex-col px-20 justify-center text-white"
						>
							{{ themeStore.getOverwriteColors["--el-color-accent"] }}
						</div>
						<div class="h-40 flex-row">
							<span class="h-40 grow-1 bg-a-9"></span>
							<span class="h-40 grow-1 bg-a-8"></span>
							<span class="h-40 grow-1 bg-a-7"></span>
							<span class="h-40 grow-1 bg-a-6"></span>
							<span class="h-40 grow-1 bg-a-5"></span>
							<span class="h-40 grow-1 bg-a-4"></span>
							<span class="h-40 grow-1 bg-a-3"></span>
							<span class="h-40 grow-1 bg-a-2"></span>
							<span class="h-40 grow-1 bg-a-1"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="border-2 border-s-10 p-20">
				<el-button type="primary">
					primary
				</el-button>
				<el-button type="success">
					success
				</el-button>
				<el-alert title="success alert"
					type="success"
				/>

				<el-button type="warning">
					时间
				</el-button>
				<el-alert title="warning alert"
					type="warning"
				/>

				<el-button type="danger"
					plain
				>
					danger
				</el-button>
				<el-alert title="error alert"
					type="error"
				/>

				<el-button type="info"
					plain
				>
					info
				</el-button>
				<el-alert title="info alert"
					type="info"
				/>
				<!-- <vmox-theme-container :colors="{'D':'0,255,0'}">
          <el-button type="danger" plain>primary2</el-button>
        </vmox-theme-container> -->
			</div>
		</div>
		<div
			class="flex-col w-340 shrink-0 p-30 bg-gray-800 border-l border-light-4"
		>
			<h1
				@click="counter.increment"
				class="select-none cursor-pointer uppercase text-white"
			>
				Theme setting :
			</h1>
			<h2 class="mt-20 text-sm text-light-24">
				colors: theme colors are setting here
			</h2>
			<div class="flex-row my-10 flex-wrap -mx-5">
				<div
					v-for="(item, key) in themeStore.getStepColors"
					:key="item + key"
					class="flex-col w-1/2 p-5"
				>
					<div class="rounded bg-light-2 h-auto xrow">
						<el-color-picker
							v-model="themeStore.getOverwriteColors[item]"
							size="large"
						/>
						<span class="px-10 text-xs uppercase text-light-32">{{
							item.split("-")[4]
						}}</span>
					</div>
				</div>
				<!-- <el-color-picker  :key="item+key" size="large" v-model="LayoutState.theme.colors[key]" @change="saveColor"></el-color-picker> -->
			</div>
			<el-button @click="sendMsgToHost">
				aaa
			</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { ref, defineComponent, watch, getCurrentInstance, nextTick } from "vue";
import { useCounterStore } from "@src/stores/pubState/counter";
import { ElInput } from "element-plus";
import { useThemeStore } from "@src/stores/pubState/themeStore";

export default defineComponent({
	name: "theme-pg",
	components: {},
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		const themeStore = useThemeStore();
		const counter = useCounterStore();
		const scontext = ref("");
		const isDark = useDark();
		const shiftDark = useToggle(isDark);
		function saveColor() {
			// LayoutState.updateTheme({ colors: LayoutState.theme.colors })
		}
		function sendMsgToHost() {
			proxy.$message({
				message: "这是一个子应用弹窗",
				type: "error",
			});
			// nextTick(function () {
			//   window.microApp?.dispatch({
			//     type: 'message',
			//     payload: { message: '这是一个主应用弹窗', type: 'error' }
			//   })
			// })
		}
		return {
			counter,
			scontext,
			themeStore,
			sendMsgToHost,
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
