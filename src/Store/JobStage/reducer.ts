/**
 * @file
 * @date 2022-11-09
 * @author liaoli
 * @lastModify liaoli 2022-11-09
 */

import * as types from './types';

const initialState: types.JobStageReducer = {
    getJobStage: {
        status: -1,
        config: [],
    },
    currentStep: {
        stageId: '',
        stepId: '',
        type: '',
    },
    getPublishStage: [],
    jobHandleMethod: 'default',
};

export default (state = initialState, action: types.JobListTypes): types.JobStageReducer => {
    switch (action.type) {
        case types.ACTION_TYPE.UPDATE_JOB_STAGE_ACTION:
            return {
                ...state,
                getJobStage: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_CURRENT_STEP_ACTION:
            return {
                ...state,
                currentStep: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_JOB_HANDLE_METHOD:
            return {
                ...state,
                jobHandleMethod: action.payload,
            };
        case types.ACTION_TYPE.UPDATE_PUBLISH_STAGE_ACTION:
            return {
                ...state,
                getPublishStage: action.payload,
            };
        default:
            return state;
    }
};
