/**
 * @file
 * @date 2022-06-04
 * @author zhuxiaojixo
 * @lastModify zhuxiaojixo 2022-06-04
 */
import { fork, call, put, takeLatest } from 'redux-saga/effects';
import { APIResponse } from '~/Api/interceptor';
import * as types from './types';
import * as DistributionWindowApis from '~/Api/dataProcWindow';
import { getAllTalentGroup, getOrgList } from '~/Api/organization';
import * as actions from './actions';
import { OrganizationType, TalentGroupType } from '../OrganizationState/types';
import { commonNotice } from '~/Utils/notice';

// 根据 name 搜索distribution
function* handleSearchDistributionsByName(action: types.SearchDistributionsByNameSaga) {
    const res: APIResponse<{ data_processing: types.SearchDistributionType[] }> = yield call(
        DistributionWindowApis.searchDistributionListByName,
        { name: action.payload.name },
    );
    if (res.status !== 200) {
        commonNotice(res.data.code);
        return;
    }
    yield put(
        actions.UpdateDistributionsByNameAction({
            getDistributions: res.data.data.data_processing,
        }),
    );
    action.payload.callback && action.payload.callback(res.data.data.data_processing);
}
// 获取 organization list
function* handleGetOrgList() {
    yield put(actions.UpdateOrgListAction([]));
    const res: APIResponse<{
        organizations: OrganizationType[];
    }> = yield call(getOrgList);
    if (res.status !== 200) {
        return;
    }
    yield put(actions.UpdateOrgListAction(res.data.data.organizations));
}
// 获取talent group
function* handleGetTalentGroupList(action: types.GetTalentGroupListSaga) {
    yield put(actions.UpdateTalentGroupListAction({ talentGroupList: [] }));
    const res: APIResponse<{
        talent_groups: TalentGroupType[];
    }> = yield call(getAllTalentGroup, action.payload);
    if (res.status !== 200) {
        return;
    }
    yield put(
        actions.UpdateTalentGroupListAction({ talentGroupList: res.data.data.talent_groups }),
    );
}
// 获取 distribution 的权限
function* handleGetDistributionRole(action: types.GetDistributionRoleSaga) {
    const { callback, ...data } = action.payload;
    yield put(actions.updateDistributionRoleAction({ getDistributionRoles: [] }));
    const res: APIResponse<string[]> = yield call(DistributionWindowApis.getDistributionRole, data);
    if (res.status !== 200) {
        yield put(actions.updateDistributionRoleAction({ getDistributionRoles: [] }));
        callback && callback(true);
        commonNotice(res.data.code);
        return;
    }
    yield put(actions.updateDistributionRoleAction({ getDistributionRoles: res.data.data }));
    callback && callback(false);
}

function* watchActions() {
    yield takeLatest(
        types.ACTION_TYPE.SEARCH_DIStRIBUTIONS_BY_NAME_SAGA,
        handleSearchDistributionsByName,
    );
    yield takeLatest(types.ACTION_TYPE.GET_ORG_LIST_SAGA, handleGetOrgList);
    yield takeLatest(types.ACTION_TYPE.GET_TALENT_GROUP_LIST_SAGA, handleGetTalentGroupList);
    yield takeLatest(types.ACTION_TYPE.GET_DISTRIBUTION_ROLE_SAGA, handleGetDistributionRole);
}

const sagas = [fork(watchActions)];
export default sagas;
