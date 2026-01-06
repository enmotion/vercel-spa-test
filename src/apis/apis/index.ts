import type { ApiRecord } from "vmo-umi-request";
const lib: Record<
	string,
	Record<string, ApiRecord<string>>
> = import.meta.glob("./**/*.api.ts", {
	eager: true,
	import: "default",
});
let apis: Record<string, ApiRecord<string>> = {};
Object.keys(lib).forEach((path) => {
	apis = Object.assign(apis, lib[path]);
});
export default apis;
