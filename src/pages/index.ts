/*
 * @Author: enmotion
 * @Date: 2023-11-07 15:43:42
 * @Last Modified by: enmotion
 * @Last Modified time: 2023-11-07 15:49:34
 *
 * 页面自动加载 模块;
 * 1.所有页面的命名，都以页面js文件的直接父级文件夹为命名为准
 * 2.作为批量自动加载的页面js文件，请都辅以.pg.js为尾缀命名规则
 * 3.命名转换规则,如此例:父文件夹[parent-page] => 结果:ParentPage
 * 4.页面.vue文件避免了同步加载，通过.js文件做了异步加载处理,自动提升访问体验
 */
import { loadPageTemplateByImport } from "vmo-router";
// 范例基于 vite 工程 import.meta.glob('./**/*.pg.ts') 已经涵盖了当前文件位置，所有文件夹与可能存在的子文件夹
export default loadPageTemplateByImport(
	import.meta.glob("./**/*.pg.ts", { eager: true, import: "default" }),
);
export type RouteMeta = {
	keepAlive?: boolean;
	tokenRequire?: boolean;
	pageName?: string;
	powerRequire?: string[];
	avoidPushToTag?: boolean;
	unConfigurable?: boolean;
};
// loadPageTemplateByImport 将遍历 pages 下所有的 .pg.ts 结尾的文件，并自动将其装载在 export default 对象下
// 每个页面的名称都是由 .pg.ts 文件所在直接文件夹名称转换为驼峰命名而来，如 sample-a 文件夹 则页面名称为 SampleA [S是大写的]
