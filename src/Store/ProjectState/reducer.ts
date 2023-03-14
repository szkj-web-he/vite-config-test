/**
 * @file project reducer
 * @date 2021-11-04
 * @author zhoubin
 * @lastModify zhoubin 2021-11-04
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import * as types from "./types";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

const initialState: types.ProjectReducer = {
    projects: [],
    project: null,
};

export default (state = initialState, action: types.ProjectActionTypes): types.ProjectReducer => {
    switch (action.type) {
        case types.ACTION_TYPE.UPDATE_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_PROJECT_ACTION:
            return {
                ...state,
                project: action.payload.project,
            };
        default:
            return state;
    }
};
