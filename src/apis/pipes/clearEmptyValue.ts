import { isNil, keys, isEmpty, pick, clone } from "ramda";
import type { MiddleWare } from "vmo-onion";
import type { RestfullApiConfig } from "@typs/restful";

function pipe(): MiddleWare<RestfullApiConfig<Record<string, any>, string>> {
	return async function (ctx, next: Function) {
		if (
			ctx.middleware?.includes("/CLEAR-EMPTY-VALUE/") &&
			!!ctx.payload &&
			typeof ctx.payload === "object"
		) {
			const data: Record<string, any> = clone(
				ctx.payload as Record<string, any>,
			);
			const pickedKeys = keys(data).filter(
				(key) => !isNil(data[key]) && !isEmpty(data[key]),
			) as any as readonly [string, ...string[]];
			ctx.payload = pick(pickedKeys, data);
		}
		await next();
	};
}
export default pipe;
