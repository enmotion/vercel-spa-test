<template>
	<div class="flex-row grow-1">
		<vmo-transition name="growx"
			class="grow-1"
		>
			<div v-if="expended"
				:class="[shrinkAble ? 'w-[280px]' : '', 'flex-col grow-1 overflow-hidden']"
			>
				<vmo-dir-tree ref="CategoryTreeRef"
					v-bind="computedTreeConfig"
					:title="title"
					:data="treeDatas"
					@create="createNewNode"
					@check="context.emit('check', $event)"
					@node-click="context.emit('node-click', $event)"
					@check-change="context.emit('check-change', $event)"
					@update:model-value="context.emit('update:model-value', $event)"
				/>
			</div>
		</vmo-transition>
		<el-dialog :title="`${!nodeData.id ? '新建' : '编辑'}${title}`"
			:destroy-on-close="true"
			v-model="showDialog"
		>
			<vmo-x-form ref="nodeDataFormRef"
				v-model="nodeData"
				v-bind="computedNodeForm.props"
				:elements="computedNodeForm.elements"
			/>
			<template #footer>
				<div class="flex-row items-center justify-end">
					<el-button @click="showDialog = false">
						取消
					</el-button>
					<el-button :loading="isActing"
						@Click="saveOrUpdate"
						type="primary"
					>
						保存
					</el-button>
				</div>
			</template>
		</el-dialog>
		<div v-if="shrinkAble"
			class="w-0 flex-col justify-center"
		>
			<div
				class="w-[10px] h-30 rounded-r bg-white hover:bg-gray-50 dark:bg-gray-800 hover:dark:bg-gray-700 flex-row items-center justify-center cursor-pointer transition-all duration-150"
				@click="expended = !expended"
			>
				<span class="iconfont vmo-icon-left_small_line !text-base font-bold"></span>
			</div>
		</div>
	</div>
</template>

<style lang="css"></style>

<script lang="ts">
import { mergeDeepRight, pick, values, clone } from "ramda";
import { VmoTree, type TreeNode } from "vmo-tree";
import { ref, defineComponent, computed, onMounted, watch, nextTick, unref, getCurrentInstance, onActivated } from "vue";
import { ElPopover, ClickOutside, ElDialog, ElButton } from "element-plus";
import VmoDirTree from "@src/comps/common/vmo-dir-tree/component.vue";
import type { VmoDirTreeProps } from "@src/comps/common/vmo-dir-tree/component.vue";
import VmoTransition from "@src/comps/common/transition/vmo-transition/component.vue";
import { treeConfig, generatorNodeForm } from "./config/index";
import type { PropType } from "vue";
import { VmoXForm } from "vmo-x-form";
import "vmo-x-form/dist/style.css";

export default defineComponent({
	name: "wgt-category-tree",
	components: { VmoDirTree, VmoTransition, ElDialog, ElButton, VmoXForm },
	props: {
		title: {
			type: String as PropType<string>,
			default: "title",
		},
		treeProps: {
			type: Object as PropType<Partial<VmoDirTreeProps>>,
			default: () => ({}),
		},
		shrinkAble: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		type: {
			type: String as PropType<string>,
			default: "TEST",
		},
	},
	directives: { ClickOutside },
	emits: ["click", "node-click", 'check', "check-change", "update:model-value"],
	setup(props, context) {
		// 获取树配置
		const { proxy } = getCurrentInstance() as { proxy: any };
		const isLoading = ref(false);
		const isActing = ref(false);
		const CategoryTreeRef = ref(null as any);
		const nodeDataFormRef = ref(null as any);
		const expended = ref(true);
		const nodeData = ref({
			createdType: "user",
		} as Record<string, any>);
		const treeDatas = ref([] as TreeNode<Record<string, any>, "children">[]);
		const showDialog = ref(false);
		const computedTreeConfig = computed(() => {
			return mergeDeepRight(treeConfig, props.treeProps) as VmoDirTreeProps;
		});
		const computedNodeForm = computed(() => {
			return generatorNodeForm(props.title, nodeData.value.id);
		});
		watch(() => props.type, (n, o) => {
			nextTick(() => {
				!!CategoryTreeRef.value && getCategorytreeDatas();
			})
		}, { immediate: true, deep: true })
		onActivated(() => {
			!!CategoryTreeRef.value && getCategorytreeDatas();
		})
		onMounted(() => {
			!!CategoryTreeRef.value && getCategorytreeDatas();
		})
		function createNewNode() {
			showDialog.value = true;
			nodeData.value = {
				createdType: "user",
			};
		}
		function saveOrUpdate() {
			nodeDataFormRef.value.validate().then((res: any) => {
				isActing.value = true;
				proxy.$request(proxy.$apis.mapiTagSave, Object.assign(nodeData.value, { type: props.type })).then((res: Record<string, any>) => {
					console.log(res);
					if (res.code == 200) {
						console.log("ok");
						getCategorytreeDatas();
						showDialog.value = false;
					} else {
						proxy.$message({
							message: res.msg,
							type: "error",
						});
					}
					isActing.value = false;
				});
			}).catch(() => {
				isActing.value = false;
			});
		}
		async function getCategorytreeDatas() {
			// console.log('getCategorytreeDatas')
			CategoryTreeRef.value.isLoading = true;
			proxy.$request(proxy.$apis.mapiTagList, { type: props.type, order: { key: "order", type: "DESC" } }).then((res: any) => {
				console.log(res);
				if (res.code == 200) {
					const pickKeys: string[] = props.treeProps?.labelKeys ?? []
					treeDatas.value = VmoTree.array2Tree(
						clone(res.data.list).map((item: Record<string, any>) => {
							item.label = !!props.treeProps.labelKeys ? values(pick(pickKeys as any, item)).join(' / ') : item.label
							item.value = item.id;
							return item;
						}),
						"id",
						"parent",
						"children",
						true,
					) as TreeNode<Record<string, any>, "children">[];
				} else {
					treeDatas.value = [];
				}
				CategoryTreeRef.value.isLoading = false;
			}).catch(() => {
				CategoryTreeRef.value.isLoading = false;
			});
		}
		return {
			context,
			computedTreeConfig,
			nodeData,
			treeDatas,
			expended,
			showDialog,
			CategoryTreeRef,
			nodeDataFormRef,
			computedNodeForm,
			isLoading,
			isActing,
			getCategorytreeDatas,
			saveOrUpdate,
			createNewNode,
		};
	},
});
</script>
