<template>
	<div
		class="vmo-search p-[15px] rounded border bg-white border-dark-3 dark:bg-light-3 dark:border-light-4 h-auto"
		@mouseover="isActivated.mouse = true"
		@mouseleave="isActivated.mouse = false"
		@focusin="isActivated.focus = true"
		@focusout="isActivated.focus = false"
	>
		<slot
			v-if="title || context.slots.title"
			name="title"
		>
			<span class="title">
				<span class="!w-[6px] bg-p-10 h-[18px] mr-10 rounded"></span>
				<span>{{ title }}</span>
			</span>
		</slot>
		<!-- {{ computedQuery }} -->
		<div 
			v-resize="(rec:DOMRect)=>{
				width=rec.width
			}"
			:key="renderKey"
			:class="[computedIsWideScreen ? 'flex-row items-center':'flex-col',' -mb-5 mt-[10px]']"
		>
			<vmo-x-form
				ref="basicVmoXFormRef"
				:model-value="computedQuery"
				:debounce-delay="computedBasicFormJson.debounceDelay"
				:disabled="false"
				:elements="computedBasicFormJson.elements"
				:components="{}"
				v-bind="computedBasicFormJson.props"
				@update:modelValue="commit($event)"
			/>
			<vmo-x-form
				v-if="isExpand"
				ref="basicVmoXFormRef"
				:model-value="computedQuery"
				:debounce-delay="computedExpandFormJson.debounceDelay"
				:disabled="false"
				:elements="computedExpandFormJson.elements"
				:components="{}"
				v-bind="computedExpandFormJson.props"
				@update:modelValue="commit($event)"
			/>
			<div :class="[computedIsWideScreen?'ml-10':'mt-[10px] justify-end','flex-row items-center']">
				<el-button
					v-if="needConfirm"
					type="primary"
					:loading="loading"
					@click="context.emit('search', mergeDeepRight(innerQuery, query))"
				>
					查询
				</el-button>
				<el-button
					class="!ml-5"
					:loading="loading"
					@click="reset"
				>
					重置
				</el-button>
				<el-button
					v-if="Object.keys(computedExpandFormJson.elements as Record<string|number,any>).length>0"
					class="!ml-5"
					@click="isExpand=!isExpand"
				>
					{{isExpand?'收敛':'展开'}}
				</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { mergeDeepRight, omit, clone } from "ramda";
import { ref, defineComponent, watch, computed, onBeforeMount, onDeactivated, getCurrentInstance, onActivated,  type Component } from "vue";
import { ElInput, ElPopover, ElTree, ElScrollbar } from "element-plus";
import { VmoXForm } from "vmo-x-form";
import type { VXF_JSON, VXF_PUB } from "vmo-x-form";
import "vmo-x-form/dist/style.css";
import { defaultFormJson } from "./default-config";
import { VmoTree } from "vmo-tree";
import type { InputProps, ButtonProps } from "element-plus";
import type { PropType } from "vue";
import { useAppStore } from "@src/stores/pubState/appStore"
import { resize } from "@src/use.lib/publicDirectives";
import { receiveMessageOnPort } from "worker_threads";

export default defineComponent({
	name: "vmo-search",
	components: { VmoXForm },
	props: {
		// 搜索面板标题，支持直接用 title 作为插槽
		title: {
			type: String as PropType<string>,
			default: "搜索标题",
		},
		needConfirm:{
			type:Boolean as PropType<boolean>,
			default:true,
		},
		loading:{
			type:Boolean as PropType<boolean>,
			default:false,
		},
		query: {
			type: Object as PropType<Record<string, any>>,
			default: () => ({}),
		},
		basic: {
			type: Object as PropType<Partial<VXF_JSON.CompProp<{}>>>,
			default: () => ({}),
		},
		// 是否是宽屏模式
		isWideScreen:{
			type: Boolean as PropType<boolean>,
			default:false
		},
		expand: {
			type: Object as PropType<Partial<VXF_JSON.CompProp<{}>>>,
			default: () => ({}),
		},
	},
	directives:{ resize }, 
	emits: ["search"],
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		const isExpand = ref(false);
		const width = ref(0);
		const renderKey=ref(0);
		const isActivated = ref({ mouse: false, focus: false });
		const basicVmoXFormRef = ref(null as any);
		const innerQuery = ref({} as Record<string, any>);
		const computedQuery = computed(() => {
			return mergeDeepRight(innerQuery.value,props.query)
		});
		const computedBasicFormJson = computed(() => mergeDeepRight(defaultFormJson, props.basic) as Record<string,any>);
		const computedExpandFormJson = computed(() => mergeDeepRight(defaultFormJson, props.expand));
		const computedIsActivated = computed(() => {
			return isActivated.value.mouse || isActivated.value.focus;
		});
		const computedIsWideScreen = computed(()=>{
			return (width.value -125) > (computedBasicFormJson.value?.props?.view?.display?.reactive?.critical??0) && !isExpand.value
		})
		watch(
			() => computedIsActivated.value,
			(n, o) => {
				n ? window.addEventListener("keydown", keyDownHandler) : window.removeEventListener("keydown", keyDownHandler);
			},
		);
		// watch(
		// 	() => computedQuery.value,
		// 	(n, o) => {
		// 		console.log(n);
		// 		console.log(o);
		// 		if (n != o) {
		// 			context.emit("search", mergeDeepRight(JSON.parse(n) ?? {}, innerQuery.value));
		// 		}
		// 	},
		// 	{ deep: true, immediate: true },
		// );
		onActivated(()=>{
			renderKey.value++
		})
		onDeactivated(() => {
			window.removeEventListener("keydown", keyDownHandler);
		});
		onBeforeMount(() => {
			window.removeEventListener("keydown", keyDownHandler);
		});
		function keyDownHandler(event: KeyboardEvent) {
			if (event.code == "Enter") {
				context.emit("search", mergeDeepRight(props.query, innerQuery.value));
			}
		}
		function reset() {
			innerQuery.value = {};
			context.emit("search", mergeDeepRight(props.query, innerQuery.value));
		}
		function getSearchData(){
			return mergeDeepRight(props.query, innerQuery.value)
		}
		function commit(event:Record<string,any>){
			console.log(event)
			innerQuery.value = mergeDeepRight(innerQuery.value,event)
			if(!props.needConfirm){
				console.log( mergeDeepRight(innerQuery.value, props.query))
				context.emit('search', mergeDeepRight(innerQuery.value, props.query))
			}
		}
		return {
			context,
			basicVmoXFormRef,
			innerQuery,
			computedQuery,
			computedBasicFormJson,
			computedExpandFormJson,
			computedIsActivated,
			computedIsWideScreen,
			isActivated,
			width,
			isExpand,
			renderKey,
			commit,
			getSearchData,
			mergeDeepRight,
			reset,
		};
	},
});
</script>

<style lang="css">
.vmo-search {
	@apply flex-col;
}

.vmo-search .title {
	@apply text-base text-dark-32 dark:text-light-32 flex-row items-center;
}

.vmo-search .search {
	@apply flex-row;
}

.vmo-search .search .icon {
	@apply w-[20px] h-[20px] flex-row items-center justify-center;
}

.vmo-search .search .button {
	@apply flex-row items-center justify-center ml-[5px] w-[30px] h-[30px] shrink-0 rounded font-bold text-base text-white bg-p-10 border border-p-10 cursor-pointer hover:bg-p-6 transition-all duration-150;
}

.vmo-search .el-input__wrapper {
	padding: 1px 8px !important;
}

.vmo-search .el-tree {
	--el-tree-node-content-height: computedListTreeProps.value.nodeHeight + "px";
}
</style>
