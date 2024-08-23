import request from '@/utils/request';

/**
 * 登录接口
 * @param data
 * @returns
 */
export function userLogin(data: LoginData) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    });
}

/** 登录请求参数 */
export interface LoginData {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
}
