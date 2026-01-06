import { mergeAll } from "ramda";
import type { App, AppContext } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { ElMessageBoxOptions, MessageParams } from "element-plus";
// 全局引入 element 消息方法
export function useMessagePlugin(
	app: App<Element>,
	appendTo: string = ".vmo-base",
) {
	app.config.globalProperties.$message = function (
		msgParams: MessageParams & { message: string },
	) {
		const duration = (msgParams.message?.length || 0) * 140 + 1500;
		if (msgParams) {
			ElMessage(
				mergeAll([
					{ duration: duration, offset: 20, appendTo: appendTo },
					msgParams,
				]),
			);
		}
	};
	app.provide("$message", ElMessage);
}

// 全局 confirm 方法配置
export function useConfirmPlugin(app: App<Element>) {
	const confirm = function (
		params: ElMessageBoxOptions,
		appContext?: AppContext | null,
	) {
		const defaultParams = {
			title: "操作提示:",
			showCancelButton: true,
			dangerouslyUseHTMLString: true,
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			class: "msg-light",
			inputPlaceholder: "请输入...",
		};
		const mergedParams = mergeAll([defaultParams, params]);
		// element-plus 存在一个有关 ElMessageBox方法的缺陷，只有prompt方法才可以做输入框内容验证
		return mergedParams.showInput
			? ElMessageBox.prompt(
					mergedParams.message,
					mergedParams.title,
					mergedParams,
					appContext,
				)
			: ElMessageBox(mergedParams, appContext);
	}; // 全局引入element-ui确认组件
	app.config.globalProperties.$confirm = confirm;
	app.provide("$confirm", confirm);
}
