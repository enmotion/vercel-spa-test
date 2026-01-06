import type { AxiosRequestConfig, AxiosResponse } from "axios";
// 请求格式
export type RestfullApiConfig<P, M extends string> = {
	name?: string;
	key?: string;
	payload?: P;
	axiosRequesetConfig: Partial<AxiosRequestConfig>;
	axiosResponseData?: Partial<AxiosResponse>;
	middleware?: M;
	retry?: number;
	expiredTime?: number;
};

export type ResponseListData<T extends Record<string, any>> = {
	items: T[];
	total: number;
};
