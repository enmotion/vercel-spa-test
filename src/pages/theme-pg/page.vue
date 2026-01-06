<template>
	<div class="flex-row">
		<div class="flex-col dark:bg-gray-900 grow-1 last:mr-0 mr-10">
			<div class="h-auto mb-5 flex-row flex-wrap -mx-5"
				style=""
			>
				<div
					v-for="(color, index) in themeStore.getStepColors"
					:key="color"
					class="lg:w-1/6 md:w-1/4 sm:w-1/2 flex-col p-5"
				>
					<div
						class="flex-row h-[50px] text-xs p-5 rounded text-white"
						:style="{
							backgroundColor: themeStore.getOverwriteColors[color] as string,
						}"
					>
						{{ color.split("-")[4] }}<br />{{
							themeStore.getOverwriteColors[color]
						}}
					</div>
				</div>
			</div>
			<div
				class="flex-col border rounded p-10 border-dark-4 dark:border-light-4"
			>
				<div class="flex-col mb-10 last:mb-0">
					<div class="text-base font-bold">
						Buttons:
					</div>
					<div class="flex-row items-center mt-5">
						<el-button
							v-for="(type, index) in [
								'default',
								'primary',
								'success',
								'info',
								'warning',
								'danger',
							]"
							:key="type"
							:type="type"
							class="font-normal uppercase"
							@click="
								proxy.$message({
									message: '这是一条消息',
									type: ['danger', 'primary', 'default'].includes(
										type as string,
									)
										? 'info'
										: type,
								})
							"
						>
							{{ type }}
						</el-button>
					</div>
					<div class="flex-row items-center mt-5">
						<el-button
							v-for="(type, index) in [
								'default',
								'primary',
								'success',
								'info',
								'warning',
								'danger',
							]"
							:key="type"
							plain
							:type="type"
							class="font-normal uppercase"
						>
							{{ type }}
						</el-button>
					</div>
					<div class="flex-row items-center mt-5">
						<el-tag
							v-for="(type, index) in [
								'primary',
								'success',
								'info',
								'warning',
								'danger',
							]"
							:key="type"
							plain
							:type="type"
							class="font-normal uppercase"
						>
							{{ type }}
						</el-tag>
					</div>
					<div class="flex-col items-center mt-5">
						<el-alert
							v-for="(type, index) in ['success', 'info', 'warning', 'error']"
							:key="type"
							plain
							:type="type"
							class="font-normal uppercase"
						>
							{{ type }}
						</el-alert>
					</div>
				</div>
				<div class="flex-col mb-10 last:mb-0">
					<div class="text-base font-bold">
						Inputs:
					</div>
					<div class="flex-col mt-5">
						<el-input
							v-model="sampleData.input"
							placeholder="input contents..."
							class="mb-10 last:mb-0"
						/>
						<el-input-number
							v-model="sampleData.inputNumber"
							placeholder="input contents..."
							class="mb-10 last:mb-0"
						/>
						<el-select
							v-model="sampleData.select"
							placeholder="input contents..."
							class="mb-10 last:mb-0"
							:disabled="true"
						>
							<el-option
								v-for="(item, index) in [
									{ label: 'a', value: 'a' },
									{ label: 'b', value: 'b' },
									{ label: 'c', value: 'c' },
									{ label: 'd', value: 'd' },
								]"
								:key="item.value + index"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
						<el-date-picker
							v-model="sampleData.date"
							class="w-full mb-10 last:mb-0"
						/>
						<el-date-picker
							v-model="sampleData.dateRange"
							type="datetimerange"
							class="w-full mb-10 last:mb-0"
						/>
						<el-autocomplete
							v-model="sampleData.autocomplete"
							type="datetimerange"
							class="w-full mb-10 last:mb-0"
						/>
						<el-checkbox-group
							v-model="sampleData.checkbox"
							class="w-full mb-10 last:mb-0"
						>
							<el-checkbox
								v-for="(item, index) in [
									{ label: 'aoption', value: 'a' },
									{ label: 'boption', value: 'b' },
									{ label: 'coption', value: 'c' },
									{ label: 'doption', value: 'd' },
								]"
								:key="item.value + index"
								:label="item.label"
								:value="item.value"
							/>
						</el-checkbox-group>
						<el-radio-group
							v-model="sampleData.radio"
							class="w-full mb-10 last:mb-0"
						>
							<el-radio
								v-for="(item, index) in [
									{ label: 'aoption', value: 'a' },
									{ label: 'boption', value: 'b' },
									{ label: 'coption', value: 'c' },
									{ label: 'doption', value: 'd' },
								]"
								:key="item.value + index"
								:label="item.label"
								:value="item.value"
							/>
						</el-radio-group>
						<el-radio-group
							v-model="sampleData.radio"
							class="w-full mb-10 last:mb-0"
						>
							<el-radio-button
								v-for="(item, index) in [
									{ label: 'aoption', value: 'a' },
									{ label: 'boption', value: 'b' },
									{ label: 'coption', value: 'c' },
									{ label: 'doption', value: 'd' },
								]"
								:key="item.value + index"
								:label="item.label"
								:value="item.value"
							/>
						</el-radio-group>
						<el-switch
							v-model="sampleData.switch"
							class="w-full mb-10 last:mb-0"
						/>
						<el-slider
							v-model="sampleData.slider"
							class="w-full mb-10 last:mb-0"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="flex-col w-340 shrink-0 p-30 bg-gray-800">
			<h1
				@click="counter.increment"
				class="select-none cursor-pointer uppercase text-white"
			>
				Theme setting :
			</h1>
			<el-select
				:model-value="themeStore.getMode"
				@change="themeStore.setMode($event)"
			>
				<el-option
					v-for="(item, index) in ['lighten', 'darken', 'alpha']"
					:key="item"
					:label="item.toUpperCase()"
					:value="item"
				/>
			</el-select>
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
							:model-value="(themeStore.getOverwriteColors[item as `--${string}`] as string)"
							@update:model-value="(val) => val && themeStore.setOverwriteColors({ [item as `--${string}`]: val })"
							size="large"
						/>
						<span class="px-10 text-xs uppercase text-light-32">{{
							item.split("-")[4]
						}}</span>
					</div>
				</div>
			</div>
			<h2 class="mt-20 text-sm text-light-24">
				some key colors
			</h2>
			<div class="flex-row my-10 flex-wrap -mx-5">
				<div
					v-for="(item, key) in [
						'--el-border-color',
						'--el-componet-border-color-hover',
						// '--el-fill-color-light'
					]"
					:key="item + key"
					class="flex-col w-full p-5"
				>
					<div class="rounded bg-light-2 h-auto xrow">
						<el-color-picker
							:model-value="(themeStore.getOverwriteColors[item as `--${string}`] as string)"
							@update:model-value="(val) => val && themeStore.setOverwriteColors({ [item as `--${string}`]: val })"
							:show-alpha="true"
							size="large"
						/>
						<span class="px-10 text-xs uppercase text-light-32">{{
							item.split("-").slice(3, item.length).join("_")
						}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, getCurrentInstance, nextTick } from "vue";
import { useCounterStore } from "@src/stores/pubState/counter";
import {
	ElInput,
	ElSelect,
	ElOption,
	ElColorPicker,
	ElInputNumber,
	ElDatePicker,
	ElAutocomplete,
	ElCheckboxGroup,
	ElCheckbox,
	ElRadioGroup,
	ElRadioButton,
	ElRadio,
	ElSlider,
	ElSwitch,
} from "element-plus";
import { useThemeStore } from "@src/stores/pubState/themeStore";

export default defineComponent({
	name: "theme-pg",
	components: {
		ElInput,
		ElColorPicker,
		ElSelect,
		ElOption,
		ElInputNumber,
		ElDatePicker,
		ElAutocomplete,
		ElCheckboxGroup,
		ElCheckbox,
		ElRadioGroup,
		ElRadioButton,
		ElRadio,
		ElSlider,
		ElSwitch,
	},
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		const themeStore = useThemeStore();
		const counter = useCounterStore();
		const sampleData = ref({} as Record<string, any>);
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
			proxy,
			counter,
			sampleData,
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
