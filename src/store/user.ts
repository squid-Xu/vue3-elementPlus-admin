import { userLogin, LoginData } from '@/api/user';
export const useUserStore = defineStore('user', () => {
    const user = ref({});

    /**
     * 登录接口
     * @param loginData
     * @returns
     */
    function login(loginData: LoginData) {
        return new Promise<void>((resolve, reject) => {
            userLogin(loginData)
                .then((data) => {
                    console.log(data);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    return { user, login };
});
