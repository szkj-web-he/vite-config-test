/**
 * @file project types
 * @date 2021-11-04
 * @author zhoubin
 * @lastModify zhoubin 2021-11-04
 */
/**
 * action types
 */
export enum ACTION_TYPE {
    GET_PROJECTS = "GET_PROJECTS",
    UPDATE_PROJECTS = "UPDATE_PROJECTS",
    UPDATE_PROJECT_SAGA = "UPDATE_PROJECT_SAGA",
    UPDATE_PROJECT_ACTION = "UPDATE_PROJECT_ACTION",
}
/**
 * project type
 */
export interface ProjectType {
    project: {
        id: string;
        name: string;
    };
    organization: {
        id: string;
        name: string;
    };
}

/**get projects saga */
export interface GetProjectsSaga {
    type: ACTION_TYPE.GET_PROJECTS;
    payload: {
        tg_id: string;
        type: number;
        scope?: string;
        callback?: () => void;
    };
}
/**
 * update projects action
 */
interface UpdateProjectsAction {
    type: typeof ACTION_TYPE.UPDATE_PROJECTS;
    payload: ProjectType[];
}
/**
 * update current project
 */
interface UpdateProjectAction {
    type: typeof ACTION_TYPE.UPDATE_PROJECT_ACTION;
    payload: {
        project: ProjectType | null;
    };
}
/**
 * project reducer
 */
export type ProjectReducer = {
    projects: Array<ProjectType>;
    project: ProjectType | null;
};
/**
 * project actionType
 */
export type ProjectActionTypes = GetProjectsSaga | UpdateProjectsAction | UpdateProjectAction;
