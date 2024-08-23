// 常见全局变量的库（如 window、document 等）
import globals from 'globals';
// ESLint 官方提供的 JavaScript 规则插件
import pluginJs from '@eslint/js';
// TypeScript ESLint 插件，允许解析和检查 TypeScript 代码
import tseslint from 'typescript-eslint';
// Vue.js 的 ESLint 插件，用于解析和检查 Vue 文件
import pluginVue from 'eslint-plugin-vue';

import { readFile } from 'node:fs/promises';
/**
 * 由于安装了autoimport 插件，所以，需要引入.eslintrc-auto-import.json 来完善eslint以免不必要的报错
 * 如果没有使用autoimport ，就不需要引入了
 * @description:
 * @return {*}
 */
const autoImportFile = new URL('./.eslintrc-auto-import.json', import.meta.url);
const autoImportGlobals = JSON.parse(await readFile(autoImportFile, 'utf8'));

export default [
    // 指定 ESLint 要检查的文件类型，包括 JS、MJS、CJS、TS 和 Vue 文件
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    // 为浏览器环境设置全局变量选项，允许代码中使用这些全局变量而不会触发 ESLint 警告
    { languageOptions: { globals: { ...globals.browser, ...autoImportGlobals.globals } } },
    // 使用 ESLint 官方推荐的 JavaScript 规则配置
    pluginJs.configs.recommended,
    // 使用 TypeScript ESLint 推荐的规则配置
    ...tseslint.configs.recommended,
    // 使用 Vue.js 插件提供的基本规则配置
    ...pluginVue.configs['flat/essential'],
    // 针对 Vue 文件做特殊配置
    // 指定 TypeScript ESLint 解析器来解析 Vue 文件中的 `<script>` 块
    { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
    //添加自定义规则
    {
        rules: {
            // eslint（https://eslint.bootcss.com/docs/rules/）
            // 'no-var': 'off', // 要求使用 let 或 const 而不是 var
            // 'no-multiple-empty-lines': ['off', { max: 1 }], // 不允许多个空行
            // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            // 'no-unexpected-multiline': 'off', // 禁止空余的多行
            'no-useless-escape': 'off', // 禁止不必要的转义字符
            // 'prefer-const': 'off', // 关闭没有使用const的报错

            // typeScript (https://typescript-eslint.io/rules)
            // '@typescript-eslint/no-unused-vars': 'off', // 禁止定义未使用的变量
            // '@typescript-eslint/no-multiple-empty-lines': 'off', // 禁止定义未使用的变量
            // '@typescript-eslint/no-var': 'off', // 禁止定义未使用的变量
            // '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
            // '@typescript-eslint/prefer-const': 'off', // 关闭没有使用const的报错
            '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
            '@typescript-eslint/no-unused-expressions': 'off', // 禁止表达式调用函数
            // '@typescript-eslint/no-non-null-assertion': 'off',
            // '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
            // '@typescript-eslint/semi': 'off',

            // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
            'vue/multi-word-component-names': 'off' // 要求组件名称始终为 “-” 链接的单词
            // 'vue/script-setup-uses-vars': 'off', // 防止<script setup>使用的变量<template>被标记为未使用
            // 'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
            // 'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
        }
    }
];
