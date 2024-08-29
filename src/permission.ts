import router from '@/router';
import { TOKEN_KEY } from '@/enums/CacheEnum';
import { useUserStore } from '@/store/user';

// 白名单路由
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
    const hasToken = localStorage.getItem(TOKEN_KEY);
    if (hasToken) {
        if (to.path === '/login') {
            // 如果已登录，跳转到首页
            next({ path: '/' });
        } else {
            const userStore = useUserStore();
            const hasRoles = userStore.user.roles && userStore.user.roles.length > 0;

            if (hasRoles) {
                next();
            } else {
                try {
                    await userStore.getUserInfo();
                    next();
                } catch {
                    // 移除 token 并重定向到登录页，携带当前页面路由作为跳转参数
                    await userStore.resetToken();
                    next(`/login?redirect=${to.path}`);
                }
            }
        }
    } else {
        // 未登录
        if (whiteList.includes(to.path)) {
            next(); // 在白名单，直接进入
        } else {
            // 不在白名单，重定向到登录页
            next(`/login?redirect=${to.path}`);
        }
    }
});
