<template>
	<!-- 定义一个 Element Plus 的表格组件 -->
	<div class="vmo-textarea"
		v-html="computedModelValue"
	>
	</div>
</template>

<style lang="css">

</style>

<script lang="ts">
import * as R from "ramda";
import { defineComponent, computed, ref, watch, getCurrentInstance } from "vue";
import type { PropType, StyleValue, ComputedRef } from "vue";
import { ElTable, ElTableColumn, ElPopover, ElCheckbox } from "element-plus";


export default defineComponent({
	// 组件名称
	name: "vmo-textarea",
	// 引入 Element Plus 的表格和表格列组件
	components: { ElTable, ElTableColumn, ElPopover, ElCheckbox },
	// 组件接收的属性
	props: {
		modelValue:{
			type:String as PropType<string>,
			default:''
		}
	},
	// 组件触发的事件
	emits: [],
	setup(props, context) {
		// 获取当前实例的 proxy，用于传递到外部
		const { proxy } = getCurrentInstance() as { proxy: any };
		const computedModelValue:ComputedRef<string> = computed(()=>{
			console.log(props.modelValue);
			return props.modelValue.split('\n').map(item=>`<p>${item}</p>`).reduce((a,b)=>a+b,'') || '-'
		})
		return {
			proxy,
			computedModelValue,
		};
	},
});
</script>
