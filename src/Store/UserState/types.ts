/**
 * @file
 * @date 2021-10-16
 * @author zhoubin
 * @lastModify zhoubin 2021-10-16
 */
export interface UserInfoType {
    id: string;
    name: string;
    email: string;
    real_name: {
        first_name: string;
        last_name: string;
        middle_name: string;
    };
    mobile: {
        country: string | null;
        area: string | null;
        number: string | null;
    };
    birthday: string;
    gender: string;
    avatar: string;
}
/**
 * action types
 */
export enum ACTION_TYPE {
    GET_USER_INFO = "GET_USER_INFO",
    UPDATE_USER_INFO = "UPDATE_USER_INFO",
    UPDATE_USER_ROLE_SAGA = "UPDATE_USER_ROLE_SAGA",
    UPDATE_USER_ROLE = "UPDATE_USER_ROLE",
    /** 获取用户 */
}
/**
 * get user info
 */
interface GetUserInfoSaga {
    type: typeof ACTION_TYPE.GET_USER_INFO;
}
interface UpdateUserInfoAction {
    type: typeof ACTION_TYPE.UPDATE_USER_INFO;
    payload: {
        userInfo: UserInfoType;
    };
}
/**
 * update user role saga
 */
export interface UpdateUserRoleSaga {
    type: typeof ACTION_TYPE.UPDATE_USER_ROLE_SAGA;
    payload: {
        userRole: string;
    };
}
/**
 * update user role
 */
interface UpdateUserRoleAction {
    type: typeof ACTION_TYPE.UPDATE_USER_ROLE;
    payload: {
        userRole: string;
    };
}
/**
 * user reducer
 */
export type UserReducer = {
    userInfo: UserInfoType;
    userRole: string;
};
/**
 * user actionType
 */
export type UserActionTypes =
    | GetUserInfoSaga
    | UpdateUserInfoAction
    | UpdateUserRoleAction
    | UpdateUserRoleSaga;
