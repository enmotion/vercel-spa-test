import { useUserStore } from "@src/stores";
import type { OnionMiddleware } from "umi-request";
import emitter from "@src/use.lib/emitter";
import type { PermissionEvents } from "@src/use.lib/emitter"

function pipe(): OnionMiddleware {
	return async function (ctx, next) {
		// 如果未配置中间件, 或者配置了但是其路径不包含 /pub/
		if (!ctx?.req?.options?.middle || !ctx?.req?.options?.middle.includes("/pub/")) {
			// 装填 token
			ctx.req.options.headers = {
				Authorization: useUserStore().getToken.access_token,
			};
		}
		await next();
		if(ctx.res.code === 401){
			emitter.emit("user:token-expired" as PermissionEvents.TOKEN_EXPIRED,{userId:''})
			ctx.res.msg = "你的登录凭证已过期，请重新登录"
		}
		// 
	};
}
export default pipe;
