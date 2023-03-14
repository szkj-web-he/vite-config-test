/**
 * @file
 * @date 2021-10-16
 * @author zhoubin
 * @lastModify zhoubin 2021-10-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import * as types from './types';
import * as actions from './actions';
import { fork, takeLatest, put, call } from 'redux-saga/effects';
import { APIResponse } from '~/Api/interceptor';
import {
    getAllTalentGroup,
    getDefaultOrganization,
    getOrgList,
    setDefaultOrganization,
    getTalentGroupForOrg,
} from '~/Api/organization';
import { select } from 'redux-saga/effects';
import { RootState } from '../rootReducer';
// import { getFileNumberSaga } from "../HomePage/actions";
import { updateUserRoleAction } from '../UserState/actions';
import { updateCurrentTalentGroupAction } from './actions';
import { errorNotice } from '~/Utils/notice';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

function* handleGetOrganizationList() {
    const res: APIResponse<{ organizations: Array<types.OrganizationType> }> = yield call(
        getOrgList,
    );
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400100:
            case 403100:
            case 500100:
                errorNotice({
                    code: res.data.code,
                    opera: 'Organization.GetAllOrg',
                });
                return;
        }
    }
    if (res && res.data.code === 200100) {
        yield put(
            actions.updateOrganizationListAction({
                isLoading: false,
                data: res.data.data.organizations,
            }),
        );
        yield put(actions.getDefaultOrganization());
    }
}
/**
 * get user default organization
 */
function* handelGetDefaultOrganization() {
    const res: APIResponse<{ organization_id: string }> = yield call(getDefaultOrganization);
    if (!res) return;
    if (res.status === 200) {
        yield put(actions.recordDefaultOrganization(res.data.data));
        // 获取当前组织下的 talent group
        // yield put(actions.getAllTalentGroupSaga(res.data.data));
        // 保存当前所在的组织
        const { organizationList } = yield select((state: RootState) => state.organizationState);
        yield put(
            actions.updateCurrentOrgAction({
                currentOrg: organizationList.find(
                    (item) => item.id === res.data.data.organization_id,
                ),
            }),
        );
    }
}
// 设置默认组织
function* handelSetDefaultOrganization(action: types.SetDefaultOrganizationSaga) {
    const res: APIResponse<{ organization_id: string }> = yield call(
        setDefaultOrganization,
        action.payload,
    );
    if (!res) return;
    if (res.status === 200) {
        yield put(actions.getDefaultOrganization());
    }
}
/** 获取当前组织下的所有 talent group */
function* handleGetAllTalentGroup(action: types.GetAllTalentGroupSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse<{
        talent_groups: types.TalentGroupType[];
    }> = yield call(getAllTalentGroup, data);
    if (!res || res.status !== 200) {
        switch (res.data.code) {
            case 400100:
            case 500100:
                errorNotice({
                    code: res.data.code,
                    opera: 'Organization.GetAllTalentGroup',
                });
                return;
        }
    }
    yield put(
        actions.updateAllTalentGroupAction({
            talentGroupList: res.data.data.talent_groups,
        }),
    );
    callback && callback();
    yield put(updateUserRoleAction('client'));
    // /** 获取到 talent group后 获取文件夹数量 */
    // const role = yield select((state: RootState) => state.userState.userRole);
    const defaultTalentGroup = res.data.data.talent_groups.find((item) => {
        return item.name === 'default-group' || item.name === '默认部门';
    });
    yield put(
        updateCurrentTalentGroupAction({ currentTalentGroupId: defaultTalentGroup?.id ?? '' }),
    );
    // yield put(
    //     getFileNumberSaga({
    //         org_id: action.payload.organization_id,
    //         type: role,
    //         // tg_id: defaultTalentGroup?.id,
    //     }),
    // );
}
/** 批量获取 user 在一个 organization 下加入的所有的 talent group */
function* handleGetTalentGroupForOrg(action: types.GetTalentGroupForOrgSaga) {
    const { callback, ...data } = action.payload;
    const res: APIResponse<{
        talent_groups: types.TalentGroupForOrgType[];
    }> = yield call(getTalentGroupForOrg, data);
    if (!res || res.status !== 200) {
        errorNotice({
            code: res.data.code,
            opera: 'Organization.GetTGForOrg',
        });
    }
    yield put(actions.updateTalentGroupForOrgAction(res.data.data.talent_groups));
    callback && callback();
}
function* watchActions() {
    yield takeLatest(types.ACTION_TYPE.GET_ORGANIZATION_LIST_SAGA, handleGetOrganizationList);
    yield takeLatest(types.ACTION_TYPE.GET_USER_DEFAULT_ORGANIZATION, handelGetDefaultOrganization);
    yield takeLatest(types.ACTION_TYPE.SET_DEFAULT_ORGANIZATION, handelSetDefaultOrganization);
    yield takeLatest(types.ACTION_TYPE.GET_ALL_TALENT_GROUP_SAGA, handleGetAllTalentGroup);
    yield takeLatest(types.ACTION_TYPE.GET_TALENT_GROUP_FOR_ORG_SAGA, handleGetTalentGroupForOrg);
}
const sagas = [fork(watchActions)];
export default sagas;
