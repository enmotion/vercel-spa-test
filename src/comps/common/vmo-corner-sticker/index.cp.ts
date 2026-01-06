import { defineAsyncComponent } from "vue";
const component = defineAsyncComponent(() => import("./component.vue")); // vue3 的懒加载方式
export default component;
