import mitt from "mitt";

export enum PermissionEvents {
	LOGIN_SUCCESS = "user:login-success", // 用户登录成功
	LOGOUT = "user:logout", // 用户退登
	TOKEN_EXPIRED = "user:token-expired", // 用户 token 失效
}

export type MittEventMap = {
	[PermissionEvents.LOGIN_SUCCESS]: {
		userId: string;
		token: Record<string, any> | string;
	};
	[PermissionEvents.LOGOUT]: { userId: string }; // 退登时传递用户ID
	[PermissionEvents.TOKEN_EXPIRED]: { userId: string }; // token 失效时传递用户ID
};

const emitter = mitt<MittEventMap>();
emitter.emit(PermissionEvents.LOGOUT,{userId:'ser'})
export default emitter;
