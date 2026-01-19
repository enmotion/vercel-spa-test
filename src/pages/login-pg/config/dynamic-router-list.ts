import type { VmoRouteMenuItemRaw } from "vmo-router";
import type { RouteMeta } from "@src/pages";

export const userMenuSampleData: VmoRouteMenuItemRaw<{ label: string; icon: string; key: string }, RouteMeta>[] = [
	{
	label: "系统管理",
		icon: "iconfont vmo-icon-target_line",
		key: "system-setting",
		children: [
		{
			label: "用户管理",
			icon: "iconfont vmo-icon-target_line",
			key: "admin-pg",
			to: {
				name: "admin-pg",
				template: {
					pageKey: "AdminPg",
					parent: "main-pg",
					route: {
						path: "/admin-pg",
						meta: {
							keepAlive: true,
							tokenRequire: true,
							pageName: "用户管理",
						},
					},
				},
			},
		},
		{
			label: "主题配置", // 菜单名称
			icon: "icon-type_line", // 菜单ICON
			key: "theme-color", // 菜单key全菜单树唯一
			to: {
				name: "theme-color", // 菜单对应的跳转 路由名称
				query: { name: "enmotion22" }, // 菜单对应的跳转 路由 query
				params: { name: "enmotion2" }, // 菜单对应的跳转 路由 params
				template: {
					// 路由模版数据，如果路由不存在，则会通过模版描述创建这个路由
					pageKey: "ThemePg", // 路由的模版名称, 对应的 PGS 页面名称
					parent: "main-pg", // 路由的父级路由，方便路由可以做嵌套装填
					route: {
						path: "theme-color/:name/enmotion4", // 生成新的路由的最终地址
						meta: {
							// 生成新的路由的meta
							keepAlive: true,
							tokenRequire: true,
							pageName: "主题配置",
						},
					},
				},
			},
			
		},
		{
			label: "转场动画",
			icon: "icon-type_line",
			key: "test-ani",
			to: {
				name: "tween-number-pg",
				params: { name: "queryname1" },
				template: {
					pageKey: "TweenNumberPg",
					parent: "main-pg",
					route: {
						path: "/tween-pg/:name",
						meta: {
							keepAlive: true,
							tokenRequire: true,
							pageName: "enmotion1",
						},
					},
				},
			},
		}
	]
}
// 	{
// 		label: "系统管理",
// 		icon: "iconfont vmo-icon-target_line",
// 		key: "system-setting",
// 		children: [
// 			{
// 				label: "用户管理",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "admin-pg",
// 				to: {
// 					name: "admin-pg",
// 					template: {
// 						pageKey: "AdminPg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/admin-pg",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "用户管理",
// 							},
// 						},
// 					},
// 				},
// 			},
// 			{
// 				label: "分类标签",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "category-pg",
// 				children:[
// 					{
// 						label: "分类管理",
// 						icon: "iconfont vmo-icon-target_line",
// 						key: "category-pg",
// 						to: {
// 							name: "category-pg",
// 							template: {
// 								pageKey: "CategoryPg",
// 								parent: "main-pg",
// 								route: {
// 									path: "/category-pg",
// 									meta: {
// 										keepAlive: true,
// 										tokenRequire: true,
// 										pageName: "分类管理",
// 									},
// 								},
// 							},
// 						},
// 					},					
// 					{
// 						label: "标签管理",
// 						icon: "iconfont vmo-icon-target_line",
// 						key: "tag-pg",
// 						to: {
// 							name: "tag-pg",
// 							template: {
// 								pageKey: "TagPg",
// 								parent: "main-pg",
// 								route: {
// 									path: "/tag-pg",
// 									meta: {
// 										keepAlive: true,
// 										tokenRequire: true,
// 										pageName: "分类管理",
// 									},
// 								},
// 							},
// 						},
// 					},
// 					{
// 						label: "分类标签",
// 						icon: "iconfont vmo-icon-target_line",
// 						key: "tag-association-pg",
// 						to: {
// 							name: "tag-association-pg",
// 							template: {
// 								pageKey: "TagAssociationPg",
// 								parent: "main-pg",
// 								route: {
// 									path: "/tag-association-pg",
// 									meta: {
// 										keepAlive: true,
// 										tokenRequire: true,
// 										pageName: "分类关系",
// 									},
// 								},
// 							},
// 						},
						
// 					},
// 				]
// 			},
// 			{
// 				label: "第三方应用",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "app-manage-pg",
// 				to: {
// 					name: "app-manage-pg",
// 					template: {
// 						pageKey: "AppManagePg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/app-manage-pg",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "第三方应用管理",
// 							},
// 						},
// 					},
// 				},
// 			},
// 			{
// 				label: "问题集管理",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "problem-pg",
// 				to: {
// 					name: "problem-pg",
// 					template: {
// 						pageKey: "ProblemPg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/problem-pg",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "问题集管理",
// 							},
// 						},
// 					},
// 				},
// 			},
// 			{
// 				label: "亮点集管理",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "appreciate-pg",
// 				to: {
// 					name: "appreciate-pg",
// 					template: {
// 						pageKey: "AppreciatePg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/appreciate-pg",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "问题集管理",
// 							},
// 						},
// 					},
// 				},
// 			},
// 		],
// 	},
//   {
// 		label: "范文管理",
// 		icon: "iconfont vmo-icon-target_line",
// 		key: "system-setting",
// 		children: [
// 			{
// 				label: "范文存档",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "model-essay-pg",
// 				to: {
// 					name: "model-essay-pg",
// 					template: {
// 						pageKey: "ModelEssayPg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/model-essay-pg",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "范文存档",
// 							},
// 						},
// 					},
// 				},
// 			},
// 			{
// 				label: "范文上架",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "model-essay-review-pg",
// 				to: {
// 					name: "model-essay-review-pg",
// 					template: {
// 						pageKey: "ModelEssayReviewPg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/model-essay-review-pg",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "范文上架",
// 							},
// 						},
// 					},
// 				},
// 			},
//       {
// 				label: "范文搜索",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "model-essay-search-pg",
// 				to: {
// 					name: "model-essay-search-pg",
// 					template: {
// 						pageKey: "ModelEssaySearchPg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/model-essay-search-pg",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "范文搜索",
// 							},
// 						},
// 					},
// 				},
// 			},
// 		],
// 	},
// 	{
// 		label: "用户管理",
// 		icon: "iconfont vmo-icon-target_line",
// 		key: "table-list-sample",		
// 		children: [
// 			{
// 				label: "用户管理",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "clients-pg",
// 				to: {
// 					name: "clients-pg",
// 					query: { name: "queryname1" },
// 					template: {
// 						pageKey: "ClientsPg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/clients-pg",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "分类表格",
// 							},
// 						},
// 					},
// 				},
// 			},
// 			{
// 				label: "多级表头",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "table-list-sample-02",
// 				to: {
// 					name: "table-list-sample-02",
// 					query: { name: "queryname1" },
// 					template: {
// 						pageKey: "ListSamplePg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/table-list-sample-02",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "复杂表格",
// 							},
// 						},
// 					},
// 				},
// 			},
// 			{
// 				label: "折叠扩展",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "table-list-sample-03",
// 				to: {
// 					name: "table-list-sample-03",
// 					query: { name: "queryname1" },
// 					template: {
// 						pageKey: "ListSamplePg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/table-list-sample-03",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "折叠扩展",
// 							},
// 						},
// 					},
// 				},
// 			},
// 			{
// 				label: "字典列",
// 				icon: "iconfont vmo-icon-target_line",
// 				key: "table-list-sample-04",
// 				to: {
// 					name: "table-list-sample-04",
// 					query: { name: "queryname1" },
// 					template: {
// 						pageKey: "ListSamplePg",
// 						parent: "main-pg",
// 						route: {
// 							path: "/table-list-sample-04",
// 							meta: {
// 								keepAlive: true,
// 								tokenRequire: true,
// 								pageName: "字典列",
// 							},
// 						},
// 					},
// 				},
// 			},
// 		],
// 	},
	// {
	// 	label: "缓存测试",
	// 	icon: "icon-type_line",
	// 	key: "test-01",
	// 	to: {
	// 		name: "test-01",
	// 		query: { name: "enmotion11" },
	// 		params: { name: "enmotion1" },
	// 		template: {
	// 			pageKey: "TestPg",
	// 			parent: "main-pg",
	// 			route: {
	// 				path: "/test-01/:name",
	// 				meta: {
	// 					keepAlive: true,
	// 					tokenRequire: true,
	// 					pageName: "缓存测试01",
	// 				},
	// 			},
	// 		},
	// 	},
	// 	children: [
	// 		{
	// 			label: "缓存测试01-01",
	// 			icon: "icon-type_line",
	// 			key: "test-01-01",
	// 			to: {
	// 				name: "test-01-01",
	// 				query: { name: "queryname1" },
	// 				params: { name: "name11", tanentId: "id1" },
	// 				template: {
	// 					pageKey: "TestPg",
	// 					parent: "main-pg",
	// 					route: {
	// 						path: "/test-01-01/:name/:tanentId",
	// 						meta: {
	// 							keepAlive: true,
	// 							tokenRequire: true,
	// 							pageName: "缓存测试01-01",
	// 						},
	// 					},
	// 				},
	// 			},
	// 			children: [
	// 				{
	// 					label: "缓存测试01-01-01",
	// 					icon: "icon-type_line",
	// 					key: "test-01-01-01",
	// 					to: {
	// 						name: "test-01-01-01",
	// 						query: { name: "queryname1" },
	// 						params: { name: "name12", tanentId: "id1" },
	// 						template: {
	// 							pageKey: "TestPg",
	// 							parent: "main-pg",
	// 							route: {
	// 								path: "/test-01-01-01/:name/:tanentId",
	// 								meta: {
	// 									keepAlive: true,
	// 									tokenRequire: true,
	// 									pageName: "缓存测试01-01-01",
	// 								},
	// 							},
	// 						},
	// 					},
	// 				},
	// 				{
	// 					label: "缓存测试01-01-02",
	// 					icon: "icon-type_line",
	// 					key: "test-01-01-02",
	// 					to: {
	// 						name: "test-01-01-02",
	// 						query: { name: "queryname1" },
	// 						params: { name: "name12", tanentId: "id1" },
	// 						template: {
	// 							pageKey: "TestPg",
	// 							parent: "main-pg",
	// 							route: {
	// 								path: "/test-01-01-02/:name/:tanentId",
	// 								meta: {
	// 									keepAlive: true,
	// 									tokenRequire: true,
	// 									pageName: "缓存测试01-01-02",
	// 								},
	// 							},
	// 						},
	// 					},
	// 				},
	// 			],
	// 		},
	// 		{
	// 			label: "MOD2",
	// 			icon: "icon-type_line",
	// 			key: "MOD2",
	// 			to: {
	// 				name: "MOD2",
	// 				query: { name: "queryname1" },
	// 				params: { name: "name12", tanentId: "id1" },
	// 				template: {
	// 					pageKey: "TestPg",
	// 					parent: "main-pg",
	// 					route: {
	// 						path: "/MOD2/:name/:tanentId",
	// 						meta: {
	// 							keepAlive: true,
	// 							tokenRequire: true,
	// 							pageName: "MOD2",
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	label: "主题配置", // 菜单名称
	// 	icon: "icon-type_line", // 菜单ICON
	// 	key: "theme-color", // 菜单key全菜单树唯一
	// 	to: {
	// 		name: "theme-color", // 菜单对应的跳转 路由名称
	// 		query: { name: "enmotion22" }, // 菜单对应的跳转 路由 query
	// 		params: { name: "enmotion2" }, // 菜单对应的跳转 路由 params
	// 		template: {
	// 			// 路由模版数据，如果路由不存在，则会通过模版描述创建这个路由
	// 			pageKey: "ThemePg", // 路由的模版名称, 对应的 PGS 页面名称
	// 			parent: "main-pg", // 路由的父级路由，方便路由可以做嵌套装填
	// 			route: {
	// 				path: "theme-color/:name/enmotion4", // 生成新的路由的最终地址
	// 				meta: {
	// 					// 生成新的路由的meta
	// 					keepAlive: true,
	// 					tokenRequire: true,
	// 					pageName: "主题配置",
	// 				},
	// 			},
	// 		},
	// 	},
	// },
	// {
	// 	label: "JSON表单",
	// 	icon: "icon-type_line",
	// 	key: "formpg",
	// 	to: {
	// 		name: "formpg",
	// 		query: { name: "enmotion22" },
	// 		params: { name: "enmotion2" },
	// 		template: {
	// 			pageKey: "FormPg",
	// 			parent: "main-pg",
	// 			route: {
	// 				path: "formpg/:name/enmotion4",
	// 				meta: {
	// 					keepAlive: true,
	// 					tokenRequire: true,
	// 					pageName: "JSON表单",
	// 				},
	// 			},
	// 		},
	// 	},
	// },
	// {
	// 	label: "转场动画",
	// 	icon: "icon-type_line",
	// 	key: "test-ani",
	// 	to: {
	// 		name: "tween-number-pg",
	// 		params: { name: "queryname1" },
	// 		template: {
	// 			pageKey: "TweenNumberPg",
	// 			parent: "main-pg",
	// 			route: {
	// 				path: "/tween-pg/:name",
	// 				meta: {
	// 					keepAlive: true,
	// 					tokenRequire: true,
	// 					pageName: "enmotion1",
	// 				},
	// 			},
	// 		},
	// 	},
	// },
	// {
	// 	label: "表单控件",
	// 	icon: "icon-type_line",
	// 	key: "test-theme",
	// 	to: {
	// 		name: "theme-pg-s",
	// 		params: { name: "queryname1" },
	// 		template: {
	// 			pageKey: "ThemePg",
	// 			parent: "main-pg",
	// 			route: {
	// 				path: "/theme-pg-s/:name",
	// 				meta: {
	// 					keepAlive: true,
	// 					tokenRequire: true,
	// 					// tokenRequire: false,
	// 					pageName: "enmotion1",
	// 				},
	// 			},
	// 		},
	// 	},
	// },
	// {
	// 	label: "跳转路由",
	// 	icon: "icon-type_line",
	// 	key: "test-theme2",
	// 	to: {
	// 		name: "theme-pg-s2",
	// 		params: { name: "queryname1" },
	// 		template: {
	// 			pageKey: "ThemePg",
	// 			// parent: 'main-pg',
	// 			route: {
	// 				path: "/theme-pg-s2/:name",
	// 				meta: {
	// 					keepAlive: true,
	// 					tokenRequire: true,
	// 					// tokenRequire: false,
	// 					pageName: "enmotion1",
	// 				},
	// 			},
	// 		},
	// 	},
	// },
	// {
	// 	label: "菜单配置",
	// 	icon: "icon-type_line",
	// 	key: "test-3",
	// 	to: {
	// 		name: "test-catch3",
	// 		params: { name: "queryname1" },
	// 		template: {
	// 			pageKey: "CatchTestPg",
	// 			parent: "main-pg",
	// 			route: {
	// 				path: "/test-catch/:name",
	// 				meta: {
	// 					keepAlive: true,
	// 					tokenRequire: true,
	// 					// tokenRequire: false,
	// 					pageName: "enmotion1",
	// 				},
	// 			},
	// 		},
	// 	},
	// },
];
