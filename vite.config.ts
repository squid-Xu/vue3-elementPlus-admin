import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// ELementPlus 自动导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
//  ElementPlus的Icon自动导入
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
// 引入path模块
import path from 'path';
// 引入Unocss
import UnoCSS from 'unocss/vite';
// 引入SVG本地图标
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// vite加入编译eslint错误提示
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslint({
			// 配置选项
			cache: false, // 不缓存结果，每次都检查
		}),
		AutoImport({
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'],
			eslintrc: {
				enabled: false, // 是否自动生成 eslint 规则，建议生成之后设置 false，避免重复生成消耗
			},
			resolvers: [
				// 自动导入ElementPlus组件
				ElementPlusResolver(),
			],
		}),
		Components({
			resolvers: [
				// 自动注册ElementPlus组件
				ElementPlusResolver(),
				// 自动注册图标组件
				IconsResolver({
					// 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
					// prefix: 'icon',
					// 指定collection，即指定为elementplus图标集ep
					enabledCollections: ['ep'],
				}),
			],
		}),
		// Icons图标自动下载
		Icons({
			autoInstall: true,
		}),
		//用于生成 svg 雪碧图.
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
		}),
		// 使用Unocss
		// UnoCSS 是一个即时、按需的原子级 CSS 引擎，旨在提供快速、高性能的原子级 CSS 解决方案。
		UnoCSS(),
	],
	//路径别名
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	css: {
		// CSS 预处理器
		preprocessorOptions: {
			//define global scss variable
			scss: {
				javascriptEnabled: true,
				additionalData: `@use "@/styles/variables.scss" as *;`,
			},
		},
	},
});
