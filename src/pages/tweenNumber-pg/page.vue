<template>
	<div class="h-full flex-row grow-1">
		<div class="w-0 grow-1 flex-col flex p-20">
			<div class="h-40 px-10 flex-row items-center bg-d-2 rounded">
				<span
					class="bg-d-10 h-10 rounded px-5 mr-5"
					:style="{ width: tweenValue + 'px' }"
				></span>
				<span class="text-xs">{{ tweenValue.toFixed(2) }}</span>
			</div>
			<input
				v-model="debounceValue"
				class="border mt-5 px-10 py-5 bg-dark-1 text-sm outline-none rounded border-light-7"
			/>
			<el-button
				class="mt-15"
				type="primary"
				size="large"
				@click="tweenValue = parseInt(debounceValue) || Math.random() * 1000"
			>
				change
			</el-button>
			<div class="flex flex-row flex-wrap -mx-5">
				<div
					v-for="i in 3"
					:key="i"
					class="h-40 w-200 grow-1 bg-d-1 border border-d-10 boxs rounded m-5 relative"
					style="box-shadow: inset 0 0 20px rgba(255, 0, 0, 0.5)"
				>
					<div
						class="h-full bg-gradient-to-r from-d-4 to-d-4 absolute"
						:style="{ width: Math.min(tweenValue / 10, 100) + '%' }"
					></div>
					<div class="h-full w-full absolute z-10 flex flex-row items-center justify-between px-10">
						<span style="text-shadow: 2px 2px 0px #000000aa">TIME</span>
						<span
							class="text-sm font-bold"
							style="text-shadow: 2px 2px 0px 40px #000000aa"
						>{{ tweenValue.toFixed(2) }} Kg</span>
					</div>
				</div>
			</div>
			<el-table
				:data="[
					{ status: 1, name: 'aaa' },
					{ status: 0, name: 'bbb' },
					{ status: 1, name: 'ccc' },
				]"
			>
				<el-table-column
					label="name"
					prop="name"
				/>
				<el-table-column
					label="status"
					prop="status"
				/>
			</el-table>
		</div>
	</div>
</template>

<script lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { ref, defineComponent, onMounted, watch, getCurrentInstance, nextTick, h } from "vue";
import { ElTag, ElButton, ElTable, ElInput, ElTableColumn, rowContextKey } from "element-plus";
import { tweenNumberRef, debounceRef } from "@src/use.lib/publicCustomeRefs";

export default defineComponent({
	name: "tween-pg",
	components: { ElButton, ElTable, ElTableColumn, ElInput },
	setup(props, context) {
		const tweenValue = tweenNumberRef(100, { duration: 0.3, ease: "circ.out" });
		const debounceValue = debounceRef(0, 300);
		onMounted(() => {
			tweenValue.value = 200;
		});
		return {
			tweenValue,
			debounceValue,
			ElInput,
			ElTag,
			h,
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
@src/use.lib/publicCustomeRefs
