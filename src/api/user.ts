import request from '@/utils/request';

/**
 * 登录接口
 * @param data
 * @returns
 */
export function userLogin(data: LoginData) {
    return request<any, LoginResult>({
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

/** 登录响应 */
export interface LoginResult {
    /** 访问token */
    token: string;
}

/**
 * 获取用户登录信息
 * @returns
 */
export function userInfo() {
    return request<any, UserInfo>({
        url: '/user/info',
        method: 'get'
    });
}

/** 登录用户信息 */
export interface UserInfo {
    /** 用户ID */
    userId?: number;

    /** 用户名 */
    username?: string;

    /** 昵称 */
    nickname?: string;

    /** 头像URL */
    avatar?: string;

    /** 角色 */
    roles: string[];

    /** 权限 */
    perms: string[];
}
