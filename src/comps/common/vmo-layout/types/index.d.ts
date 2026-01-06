namespace THEME {
	export type ColorNames =
		| "primary"
		| "success"
		| "danger"
		| "error"
		| "warning"
		| "info"
		| "accent"; // 定义颜色类型 主色，安全，危险，警告，信息, 辅助色
	export type StepsNames =
		| "-dark-2"
		| "-light-3"
		| "-light-5"
		| "-light-7"
		| "-light-8"
		| "-light-9"; // 颜色透明色阶
	export type Steps = { [key in StepsNames]: number }; // 颜色色阶值定义
	export type Colors = { [key in ColorNames]: `#${string}` };
	export type Mode = "dark" | "light";
	export type ModelBackground = string;
	export type DialogCardPadding = number;
}
export default THEME;
