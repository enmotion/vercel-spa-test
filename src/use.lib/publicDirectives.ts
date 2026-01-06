import type { DirectiveBinding } from "vue";

/* vue-resize 自定指令
 * 1. 使用方式 引入该 lib 中的 vResize 对象，并注册到 vue 实例中的 directives 中; 如为 setup 语法糖，并更名为 vResize;
 * 2. 在组件上 操作 <span v-resize="[handlerName]"></span> 完成绑定
 * 3. 之后即可通过 [handlerName] 方法获取到 getBoundingClientRect() 方法返回的 DOMRect 对象
 */
const resizeMap: WeakMap<HTMLElement, any> = new WeakMap(); // 考虑到 ob 可能会观测多个 DOM 的尺寸变化，此处采用 WeakMap 引用来完成，避免出现当组件移除时，因为map继续持有导致内存泄漏的问题
let reizeDebounceTimer: null | number = null;
const resizeOb = new ResizeObserver((entries) => {
	// !!reizeDebounceTimer && clearTimeout(reizeDebounceTimer);
	reizeDebounceTimer = setTimeout(() => {
		for (const entry of entries) {
			const handler = resizeMap.get(entry.target as HTMLElement);
			handler(entry.target.getBoundingClientRect());
		}
	}, 10) as unknown as number;
});
export const resize = {
	mounted: (el: HTMLElement, binding: DirectiveBinding) => {
		resizeMap.set(el, binding.value);
		binding.value(el.getBoundingClientRect());
		resizeOb.observe(el);
	},
};

/* vue-lazy 懒加载指令
 * 1. 使用方式 引入该 lib 中的 vResize 对象，并注册到 vue 实例中的 directives 中; 如为 setup 语法糖，并更名为 vResize;
 * 2. 在组件上 操作 <span v-resize="[handlerName]"></span> 完成绑定
 * 3. 之后即可通过 [handlerName] 方法获取到 getBoundingClientRect() 方法返回的 DOMRect 对象
 */
const intersectionMap: WeakMap<HTMLElement, any> = new WeakMap(); // 考虑到 ob 可能会观测多个 DOM 的尺寸变化，此处采用 WeakMap 引用来完成，避免出现当组件移除时，因为map继续持有导致内存泄漏的问题
const intersectionOb = new IntersectionObserver((entries) => {
	// console.log(entries)
	for (const entry of entries) {
		const handler = intersectionMap.get(entry.target as HTMLElement);
		handler(entry);
	}
});
export const lazy = {
	mounted: (el: HTMLElement, binding: DirectiveBinding) => {
		intersectionMap.set(el, binding.value);
		intersectionOb.observe(el);
	},
};
