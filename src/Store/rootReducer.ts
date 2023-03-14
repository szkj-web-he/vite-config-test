/**
 * @file root reducer
 * @date 2020-09-22
 * @author Frank
 * @lastModify Frank 2020-09-22
 */
import { combineReducers } from 'redux';
import userState from './UserState/reducer';
import organizationState from './OrganizationState/reducer';
import projectState from './ProjectState/reducer';
import homePage from './HomePage/reducer';
import dataProcWindow from './DataProcWindow/reducer';
import preparation from './Preparation/reducer';
import jobList from './JobList/reducer';
import jobView from './JobView/reducer';
import jobStage from './JobStage/reducer';
// combine all the reducer in here
const rootReducer = combineReducers({
    userState,
    projectState,
    organizationState,
    homePage,
    dataProcWindow,
    preparation,
    jobList,
    jobView,
    jobStage,
});
// export the root reducer state
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
