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

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'],
			resolvers: [
				// 自动导入ElementPlus组件
				ElementPlusResolver(),
				// 自动导入图标组件
				IconsResolver({
					prefix: 'Icon',
				}),
			],
		}),
		Components({
			resolvers: [
				// 自动注册ElementPlus组件
				ElementPlusResolver(),
				// 自动注册图标组件
				IconsResolver({
					enabledCollections: ['ep'], // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
				}),
			],
		}),
		// 自动安装图标库
		Icons({
			autoInstall: true,
		}),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
		}),
		// 使用Unocss
		// UnoCSS 是一个即时、按需的原子级 CSS 引擎，旨在提供快速、高性能的原子级 CSS 解决方案。
		UnoCSS({
			/* options */
		}),
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
