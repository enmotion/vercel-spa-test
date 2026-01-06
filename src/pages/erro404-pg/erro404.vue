<template>
	<div class="h-full flex-col grow-1 items-center justify-center">
		<div
			class="w-2/12 xcol p-40 rounded-md border-dark-4 border shadow-md bg-white"
			style="min-width: 320px"
		>
			<div
				class="bg-d-2 rounded-md h-40 flex-row items-center font-bold text-white"
				style="font-size: 20px"
			>
				<span
					class="h-40 px-20 bg-d-10 mr-5 rounded-md flex-row items-center uppercase"
				>Error:</span>
				<span class="text-d-10 uppercase">404</span>
			</div>
			<div class="p-40 text-dark-12">
				<!-- <key-visual :svg-url="svgURL"></key-visual> -->
			</div>
			<div class="text-sm text-dark-24">
				抱歉 ! 您当前访问的路径不存在！
			</div>
			<div class="mt-20 flex-row justify-center">
				<el-button
					size="default"
					class="w-full"
					type="success"
					plain
					@click="router.back()"
				>
					返回
				</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import svg from "@src/assets/img/svg/404.svg";
import { ElButton } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
	components: { ElButton },
	name: "error-404",
	setup(props, context) {
		let router = useRouter();
		const svgURL: string = svg;
		const url = ref(window.location.href as string);
		return {
			svgURL,
			router,
			url,
		};
	},
});
</script>
