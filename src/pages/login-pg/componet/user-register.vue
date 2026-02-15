<template>
	<div class="el-keep-light">
		<!-- <div class="h-auto flex-col">
      <slot name="header"></slot>
    </div> -->
		<div class="grow-1 flex-col p-30 justify-center login-input">
			<el-form ref="ReqDataFormRef"
				:show-message="false"
				:model="reqdata"
			>
				<el-form-item :prop="computedFormJson.nickname.key"
					:rules="computedFormJson.nickname.rules"
					class="my-0 mb-10 last:mb-0"
				>
					<el-input v-model="reqdata[computedFormJson.nickname.key]"
						:type="computedFormJson.nickname.type"
						:size="computedFormJson.nickname.size"
						:placeholder="computedFormJson.nickname.placeholder"
					>
						<template #prefix>
							<span :class="['iconfont', computedFormJson.username.icon]"></span>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item :prop="computedFormJson.username.key"
					:rules="computedFormJson.username.rules"
					class="my-0 mb-10 last:mb-0"
				>
					<el-input v-model="reqdata[computedFormJson.username.key]"
						:type="computedFormJson.username.type"
						:size="computedFormJson.username.size"
						:placeholder="computedFormJson.username.placeholder"
					>
						<template #prefix>
							<span :class="['iconfont', computedFormJson.username.icon]"></span>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item :prop="computedFormJson.password.key"
					:rules="computedFormJson.password.rules"
					class="my-0 mb-10 last:mb-0"
				>
					<el-input v-model="reqdata[computedFormJson.password.key]"
						:type="computedFormJson.password.type"
						:size="computedFormJson.password.size"
						class="login-input"
						:placeholder="computedFormJson.password.placeholder"
					>
						<template #prefix>
							<span :class="['iconfont', computedFormJson.password.icon]"></span>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item :prop="computedFormJson.repeatpw.key"
					:rules="computedFormJson.repeatpw.rules"
					class="my-0 mb-10 last:mb-0"
				>
					<el-input v-model="reqdata[computedFormJson.repeatpw.key]"
						:type="computedFormJson.repeatpw.type"
						:size="computedFormJson.repeatpw.size"
						class="login-input"
						:placeholder="computedFormJson.repeatpw.placeholder"
					>
						<template #prefix>
							<span :class="['iconfont', computedFormJson.repeatpw.icon]"></span>
						</template>
					</el-input>
				</el-form-item>
				<!-- <div class="flex-row mb-10 last:mb-0">
					<el-form-item :prop="computedFormJson.validate.key" :rules="computedFormJson.validate.rules" class="my-0 grow-1">
						<el-input v-model="reqdata[computedFormJson.validate.key]" :type="computedFormJson.validate.type"
							:size="computedFormJson.validate.size" class="login-input" :placeholder="computedFormJson.validate.placeholder">
							<template #prefix>
								<span :class="['iconfont', computedFormJson.validate.icon]"></span>
							</template>
						</el-input>
					</el-form-item>
					<div class="w-120 bg-dark-3 ml-5 rounded"></div>
				</div> -->
			</el-form>
		</div>
		<div class="h-140 border-t border-dark-3 bg-gray-50 p-30 flex-col">
			<el-button class="w-full mb-15"
				size="large"
				type="primary"
				@click="submit"
			>
				注册账号
			</el-button>
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<style scoped>
:deep(.login-input) .el-input__wrapper,
:deep(.login-input) .el-input-group__prepend {
	background-color: #f7f7f7;
	box-shadow: 0 0 0 1px #f1f1f1;
}

:deep(.login-input) .el-input__wrapper.is-focus {
	background-color: rgb(239, 247, 255);
	box-shadow: 0px 0px 2px 1px var(--el-input-focus-border-color);
}

:deep(.login-input) .is-error .el-input__wrapper {
	background-color: rgba(var(--el-color-danger-rgb), 0.1);
	box-shadow: 0 0 1px 1px rgba(var(--el-color-danger-rgb), 0.5);
}
</style>

<script lang="ts">
import { keys } from "ramda";
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { ElForm, ElFormItem } from "element-plus";
import { useAppStore } from "@src/stores";

export default defineComponent({
	name: "user-register",
	components: { ElForm, ElFormItem },
	emits: ["submit"],
	setup(props, context) {
		const { proxy } = getCurrentInstance() as { proxy: any };
		const reqdata = ref({} as any);
		const ReqDataFormRef = ref(null as any);
		const appStore = useAppStore()
		const computedFormJson = computed(()=>{
			return {
				username: {
					key: "username",
					type: "text",
					icon: "vmo-icon-user",
					placeholder: "登录账户",
					size: appStore.getScreen.isWideScreen?"default":"large",
					rules: {
						required: true,
						message: "账号不可为空",
					},
				},
				nickname: {
					key: "nickname",
					type: "text",
					icon: "vmo-icon-user",
					placeholder: "用户昵称",
					size: appStore.getScreen.isWideScreen?"default":"large",
					rules: {
						required: true,
						message: "用户昵称不可为空",
					},
				},
				password: {
					key: "password",
					type: "password",
					icon: "vmo-icon-lock",
					placeholder: "登录密码",
					size: appStore.getScreen.isWideScreen?"default":"large",
					rules: {
						required: true,
						message: "密码不可为空",
					},
				},
				repeatpw: {
					key: "repeatpw",
					type: "password",
					icon: "vmo-icon-lock",
					placeholder: "重复密码",
					size: appStore.getScreen.isWideScreen?"default":"large",
					rules: {
						validator(rule: any, value: string, callback: Function) {
							if (value == reqdata.value.password) {
								callback()
							} else {
								callback(new Error("重复密码不等于密码"))
							}
						},
					},
				}
			}
		})
		function submit() {
			ReqDataFormRef.value
				.validate()
				.then(() => {
					context.emit("submit", {
						type: "UserRegister",
						payload: reqdata.value,
					});
				})
				.catch((err: any) => {
					keys(err).map((key: any) => {
						proxy.$message({
							message: err[key][0].message,
							type: "error",
						});
					});
				});
		}
		// console.log(Key)
		return {
			context,
			computedFormJson,
			reqdata,
			ReqDataFormRef,
			submit,
		};
	},
});
</script>
@src/use.lib/preventBrowserBehavior
