/**
 * @file project action
 * @date 2021-11-04
 * @author zhoubin
 * @lastModify zhoubin 2021-11-04
 */
import * as types from "./types";

/**
 * get projects saga
 */
const getProjectsSaga = (payload: {
    tg_id: string;
    type: number;
    scope?: string;
    callback?: () => void;
}): types.ProjectActionTypes => {
    return {
        type: types.ACTION_TYPE.GET_PROJECTS,
        payload,
    };
};

/**
 * update projects action
 */
const updateProjectsAction = (payload: types.ProjectType[]): types.ProjectActionTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_PROJECTS,
        payload,
    };
};

/**
 * update current project
 */
const updateProjectAction = (project: types.ProjectType | null): types.ProjectActionTypes => {
    return {
        type: types.ACTION_TYPE.UPDATE_PROJECT_ACTION,
        payload: {
            project,
        },
    };
};
export { getProjectsSaga, updateProjectsAction, updateProjectAction };
