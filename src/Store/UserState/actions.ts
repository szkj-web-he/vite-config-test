/**
 * @file
 * @date 2021-10-16
 * @author zhoubin
 * @lastModify zhoubin 2021-10-16
 */
import * as types from "./types";
/**
 * update user info
 */
export const getUserInfo = (): types.UserActionTypes => {
    return {
        type: types.ACTION_TYPE.GET_USER_INFO,
    };
};
export const updateUserInfo = (payload: {
    userInfo: types.UserInfoType;
}): types.UserActionTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_USER_INFO,
        payload,
    };
};
/**
 * update user role saga
 */
export const updateUserRoleSaga = (userRole: string): types.UserActionTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_USER_ROLE_SAGA,
        payload: {
            userRole,
        },
    };
};
/**
 * update user role
 */
export const updateUserRoleAction = (userRole: string): types.UserActionTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_USER_ROLE,
        payload: {
            userRole,
        },
    };
};
