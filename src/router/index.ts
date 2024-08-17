import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

export const Layout = () => import('@/layout/index.vue');

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
	// 登录页
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		meta: { hidden: true },
	},
	// 首页
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		meta: { title: '首页', icon: 'homepage' },
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index.vue'),
				name: 'Dashboard',
				meta: { title: '首页', icon: 'homepage', affix: true },
			},
		],
	},
	// 外部链接
	{
		path: '/external-link',
		component: Layout,
		name: 'Nested',
		meta: { title: '外部链接', icon: 'el-icon-Link' },
		children: [
			{
				component: () => import('@/views/external-link/index.vue'),
				path: 'https://juejin.cn/',
				name: 'Nested',
				meta: { title: '外部链接', icon: 'el-icon-Link' },
			},
		],
	},
	// 多级嵌套路由
	{
		path: '/nested',
		component: Layout,
		redirect: '/nested/level1',
		name: 'Nested',
		meta: { title: '多级菜单', icon: 'cascader' },
		children: [
			{
				path: 'level1',
				component: () => import('@/views/nested/level1/index.vue'),
				name: 'Level1',
				meta: { title: '菜单一级' },
				redirect: '/nested/level1/level2',
				children: [
					{
						path: 'level2',
						component: () => import('@/views/nested/level1/level2/index.vue'),
						name: 'Level2',
						meta: { title: '菜单二级' },
						redirect: '/nested/level1/level2/level3-1',
						children: [
							{
								path: 'level3-1',
								component: () => import('@/views/nested/level1/level2/level3/index1.vue'),
								name: 'Level3-1',
								meta: { title: '菜单三级-1' },
							},
							{
								path: 'level3-2',
								component: () => import('@/views/nested/level1/level2/level3/index2.vue'),
								name: 'Level3-2',
								meta: { title: '菜单三级-2' },
							},
						],
					},
				],
			},
		],
	},
];

/**
 * 创建路由
 */
const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes as RouteRecordRaw[],
	// 刷新时，滚动条位置还原
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
