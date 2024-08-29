import { userLogin, LoginData, userInfo, UserInfo } from '@/api/user';
import { TOKEN_KEY } from '@/enums/CacheEnum';
export const useUserStore = defineStore('user', () => {
    const user = ref<UserInfo>({
        roles: [],
        perms: []
    });

    /**
     * 登录接口
     * @param loginData
     * @returns
     */
    function login(loginData: LoginData) {
        return new Promise<void>((resolve, reject) => {
            userLogin(loginData)
                .then((data) => {
                    localStorage.setItem(TOKEN_KEY, data.token);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    // 获取信息(用户昵称、头像、角色集合、权限集合)
    function getUserInfo() {
        return new Promise<UserInfo>((resolve, reject) => {
            userInfo()
                .then((data) => {
                    Object.assign(user.value, { ...data });
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    // remove token
    function resetToken() {
        return new Promise<void>((resolve) => {
            localStorage.setItem(TOKEN_KEY, '');
            resolve();
        });
    }

    return { user, login, getUserInfo, resetToken };
});
