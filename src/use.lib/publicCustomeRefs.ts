import { mergeAll } from "ramda";
import gasp from "gsap";
import { reactive, computed, customRef } from "vue";

/* 数值更新动画 ref */
export function tweenNumberRef(value: number, params: gsap.TweenVars) {
	const data = reactive({
		value: value,
	} as { value: number });
	return computed({
		get: () => {
			return data.value;
		},
		set: (value) => {
			gasp.to(data, mergeAll([{ value: value, duration: 200 }, params]));
		},
	});
}
/* 延迟防抖 ref */
export function debounceRef(value: any, duration: number = 1000) {
	let T: any = null;
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(v: any) {
				clearTimeout(T);
				T = setTimeout(() => {
					trigger();
					value = v;
				}, duration);
			},
		};
	});
}
