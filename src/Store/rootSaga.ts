/**
 * @file root saga file
 * @date 2020-09-22
 * @author Frank
 * @lastModify Frank 2020-09-22
 */
import { all } from 'redux-saga/effects';
import userState from './UserState/sagas';
import organizationState from './OrganizationState/sagas';
import homePageState from './HomePage/sagas';
import projectState from './ProjectState/sagas';
import dataProcWindow from './DataProcWindow/sagas';
import preparation from './Preparation/sagas';
import jobList from './JobList/sagas';
import jobView from './JobView/sagas';
import jobStage from './JobStage/sagas';

export default function* rootSaga(): Generator {
    try {
        yield all([
            // this is where the saga combine into the rootSaga
            ...userState,
            ...organizationState,
            ...projectState,
            ...homePageState,
            ...dataProcWindow,
            ...preparation,
            ...jobList,
            ...jobView,
            ...jobStage,
        ]);
    } catch (err) {
        // This is where error monitoring should go
        console.log('error caught in rootsaga::', err);
    }
}
