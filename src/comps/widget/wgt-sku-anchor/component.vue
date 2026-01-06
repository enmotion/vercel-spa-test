<template>
	<div class="flex-row grow-1">
		<el-popover placement="top-start"
			width="400"
			trigger="hover"
			@before-enter="queryDetail"
		>
			<template #reference>
				<span class="grow-1 w-0 text-p-10 whitespace-nowrap overflow-hidden !text-ellipsis cursor-help">
					{{ name }}
				</span>
			</template>
			<div v-loading="!itemData"
				class="flex-col min-h-[40px]"
			>
				<!-- {{ itemData }} batchManage -->
				<el-descriptions v-if="!!itemData"
					:title="itemData?.key + ' : ' + itemData?.name"
					:column="2"
					size="small"
				>
					<el-descriptions-item label="物料规格"
						:span="1"
					>
						{{ itemData?.spec ?? '-' }} / {{ itemData?.unit
						}}
					</el-descriptions-item>
					<el-descriptions-item label="参考单价"
						:span="2"
					>
						￥{{ (itemData?.price / 10000).toFixed(4) ??
							'-'}}
					</el-descriptions-item>
					<el-descriptions-item label="批量管理"
						:span="2"
					>
						{{ ["否", '是'][itemData?.batchManage] }}
					</el-descriptions-item>
					<!-- <el-descriptions-item label="创建时间" :span="2">{{itemData?.createTime ?? '-'}}</el-descriptions-item> -->
					<el-descriptions-item v-if="!!itemData?.description"
						label="物料描述"
						:span="2"
					>
						{{ itemData?.description ??
							'-'}}
					</el-descriptions-item>
				</el-descriptions>
			</div>
		</el-popover>
	</div>
</template>

<style lang="css"></style>

<script lang="ts">
import { mergeDeepRight, pick, values, clone } from "ramda";
import { ref, defineComponent, computed, onMounted, watch, nextTick, unref, getCurrentInstance, onActivated } from "vue";
import { ElPopover, ElDescriptions, ElDescriptionsItem } from "element-plus";
import VmoDirTree from "@src/comps/common/vmo-dir-tree/component.vue";
import type { VmoDirTreeProps } from "@src/comps/common/vmo-dir-tree/component.vue";
import VmoTransition from "@src/comps/common/transition/vmo-transition/component.vue";
import type { PropType } from "vue";
import { VmoXForm } from "vmo-x-form";
import "vmo-x-form/dist/style.css";

export default defineComponent({
	name: "wgt-sku-anchor",
	components: { ElPopover, ElDescriptions, ElDescriptionsItem },
	props: {
		id: {
			type: [String, Number] as PropType<string | number>,
			default: "",
		},
		type: {
			type: String,
			default: "material"
		},
		name: {
			type: String as PropType<string>,
			default: "",
		},
	},
	emits: ["click", "node-click", 'check', "check-change", "update:model-value"],
	setup(props, context) {
		// 获取树配置
		const { proxy } = getCurrentInstance() as { proxy: any };
		const showPopover = ref(false);
		const itemData = ref(null as Record<string, any> | null)
		const isLoading = ref(false);
		function queryDetail() {
			if (!itemData.value) {
				proxy.$request(proxy.$apis.mapiMaterialSkuDetail, { id: props.id }).then((res: any) => {
					console.log(res)
					if (res.code == 200) {
						itemData.value = res.data
					}
					showPopover.value = true;
				}).catch((err: any) => {
					showPopover.value = true;
				})
			} else {
				showPopover.value = true
			}
		}
		return {
			context,
			showPopover,
			itemData,
			queryDetail
		};
	},
});
</script>
