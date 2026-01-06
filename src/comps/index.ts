/*
 * 组件自动加载 模块;
 * 1.所有组件的命名，都以组件js文件的直接父级文件夹为命名样本
 * 2.作为批量自动加载的组件js文件，请都辅以.cp.js为尾缀命名规则
 * 3.命名转换规则,如此例:父文件夹[parent-component] => 结果:ParentComponent
 * 4.组件.vue文件避免了同步加载，通过.js文件做了异步加载处理,自动提升访问体验
 */
// import { Component } from "vue";
import { type App } from "vue";
import upperFirst from "lodash/upperFirst"; // 首字母大写字符转换
import camelCase from "lodash/camelCase"; // 骆驼字符转换 your-name => YourName
import * as R from "ramda";
// vite 自动加载模式:
// 添加匹配规则 三种匹配类型 cp:组件wg:物件gc:图形 非 cp.js||wg.js||gc.js结尾的文件不论深度将不会载入成组件
const requireSources = import.meta.glob("./**/*.cp.ts", {
	eager: true,
	import: "default",
}); // vite模式资源自动加载的方式 全深度遍历符 **
const ComponentName = R.keys(requireSources);

export const GlobalComponents = ComponentName.map(
	(pathName): { name: string; config: any } => {
		// 获取组件配置
		const componentConfig = requireSources[pathName];
		// 获取相关页面所在文件夹位置,取直接父文夹的 PascalCase为 组件命名
		const componentName = upperFirst(
			camelCase(pathName.split("/").splice(-2, 1)[0]),
		);
		// 输出全局组件 名称与配置对象
		return {
			name: componentName,
			config:
				(componentConfig as { default: unknown }).default || componentConfig,
		};
	},
);

export function useGlobalComponents(app: App<Element>) {
	GlobalComponents.map((item) => {
		app?.component(item.name, item.config);
	});
}
