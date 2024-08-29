import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';

// 本地SVG图标
import 'virtual:svg-icons-register';

// 样式
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/styles/index.scss';
import 'virtual:uno.css';
import 'animate.css';

//路由权限
import '@/permission';

const pinia = createPinia();
const app = createApp(App);

// 注册所有Element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 状态管理(store)
app.use(pinia);
// 路由(router)
app.use(router);

app.mount('#app');
