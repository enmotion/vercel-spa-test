/*
 * @Author: enmotion
 * @Date: 2023-11-07 11:19:13
 * @Last Modified by: enmotion
 * @Last Modified time: 2023-11-07 11:19:46
 */

/**
 * i18n 实现方法
 */
export enum SupportLanguages {
	EN = "en",
	CN = "cn",
	JP = "JP",
}
export interface Translation<T> {
	[key in SupportLanguages]?: T;
}
