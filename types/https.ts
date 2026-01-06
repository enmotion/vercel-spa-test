// 树的基本结构
type TreeData = {
	label: string; // 标签类型，
	value: string | number; //值 一般是ID
	key?: string; // 创建时指定唯一ID
	createdType: "user" | "system"; // 创建类型
	parent?: string[]; // 父级别ID
	ancestor?: string[]; //祖先树 所有的父类
	description?: string; // 描述信息
	order?: number; // 排序规则
	type: "org" | ""; // 标签基础分类
	createTime: Date; // 创建时间
	updateTime: Date; // 更新时间
	modifyUser: string; // 更新时间
};

// 简单列表搜索的基本结构
// 链表查询问题？？

type SimpleQueryRequest<T extends Record<string, any>> = Omit<T, "order" | "page"> & {
	// 排序规则，不传时，不做特别排序, 传时，因为它时数组，依照数组从首位到末尾设置排序权重
	order?: {
		key: string;
		type: "ASC" | "DESC";
	}[];
	// 分页规则，不传时，不做分页
	page?: {
		current: number;
		size: number;
	};
};

const query: SimpleQueryRequest<{ name: string; age: number }> = {
	age: 123,
	name: "fdsaf",
	order: [
		{
			key: "table_a.name",
			type: "ASC",
		},
	],
	page: {
		current: 1,
		size: 10,
	},
};

// 删除结构

type DeleteData = {
	ids: string[];
	skip: boolean; // default : true 批量操作提交协议, 设置 skip 时，则会对不满足批量操作的数据记录做跳过操作，确保部分满足的依然成功， false， 则会强制要求全部成功，否则事务回滚
};

type HttpsResponse = {
	code: number; // 200:成功, 401：token失效或者错误, 400:参数错误, 403: 权限错误,
	data:
		| {
				list: Record<string, any>[];
				total: number;
		  } /*列表*/
		| Record<string, any> /*常规 */;
	msg: string;
};
