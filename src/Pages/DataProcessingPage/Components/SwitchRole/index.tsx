/**
 * @file
 * @date 2021-11-18
 * @author zhoubin
 * @lastModify zhoubin 2021-11-18
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Button, DropDownListV2, Icon } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.scss';
import { useTranslation } from 'react-i18next';
import { roleChange } from '~/Utils/dataType';
import { IconProps } from '@datareachable/dr_front_componentlibrary/Components/Icon';
import { handleRoleIcon } from '~/Utils/dataType';
import { NavDataType } from '~/Store/Preparation/types';
import { RootState } from '~/Store/rootReducer';
import { getDistributionRoleSaga } from '~/Store/DataProcWindow/actions';
import { getTalentGroupForOrgSaga } from '~/Store/OrganizationState/actions';
import { saveSelectedTGAction } from '~/Store/Preparation/actions';
// import { getDistributionRoleSaga } from "~/Store/DistributionWindow/actions";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface SwitchRoleProps {
    show: boolean;
    navData: NavDataType;
    curRole: string;
    isNotice?: boolean;
    onClose: () => void;
    handleUpdate?: (role: string) => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const SwitchRole: React.FC<SwitchRoleProps> = ({
    show,
    navData,
    isNotice = false,
    curRole = 'distr_writer',
    onClose,
    handleUpdate,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /** dispatch */
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { organizationList, talentGroupForOrg } = useSelector(
        (state: RootState) => state.organizationState,
    );
    const { getDistributionRoles } = useSelector((state: RootState) => state.dataProcWindow);

    const { shareView } = useSelector((state: RootState) => state.preparation);

    const [tgList, setTgList] = useState<{ id: string; content: string }[]>([]);
    const [roleList, setRoleList] = useState<{ id: string; content: string }[]>([]);
    /** current organization dri */
    const [currentOrgId, setCurrentOrgId] = useState('');
    /** current talent dri */
    const [currentTalentId, setCurrentTalentId] = useState('');
    /** current role */
    const [currentRole, setCurrentRole] = useState('');
    useEffect(() => {
        if (!show) {
            return;
        }
        if (navData) {
            setCurrentOrgId(navData.organization.id);
            setCurrentTalentId(navData.talent_group.id);
            setCurrentRole(curRole);
        }
        if (navData.organization.id) {
            getTGList(navData.organization.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curRole, navData, t, show]);
    useEffect(() => {
        if (currentTalentId) {
            dispatch(
                getDistributionRoleSaga({
                    talent_group_id: currentTalentId,
                    data_proc_id: navData.data_proc?.id,
                }),
            );
        }
    }, [currentTalentId, dispatch, navData, navData.data_proc?.id]);
    useEffect(() => {
        if (talentGroupForOrg && talentGroupForOrg.length > 0) {
            const arr = talentGroupForOrg.map((item) => {
                if (item.name === 'default-group') {
                    return {
                        id: item.id,
                        content: t('Common.DefaultGroup'),
                    };
                } else {
                    return {
                        id: item.id,
                        content: item.name,
                    };
                }
            });
            setTgList(arr);
        }
    }, [setTgList, t, talentGroupForOrg]);
    useEffect(() => {
        if (getDistributionRoles && getDistributionRoles.length > 0) {
            const arr = getDistributionRoles.map((item) => ({
                id: roleChange(item),
                content: t(`Common.${roleChange(item)}`),
            }));
            setRoleList(arr);
        } else {
            setRoleList([]);
        }
    }, [getDistributionRoles, setRoleList, t]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    // const disabled = !currentOrgId || !currentTalentId || !currentRole;
    const disabled =
        !currentOrgId ||
        !currentTalentId ||
        !currentRole ||
        (!shareView.isSameOrg && !!shareView.sign && !shareView.role_limit.includes(currentRole));

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const getTGList = (id: string) => {
        dispatch(getTalentGroupForOrgSaga({ organization_id: id }));
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={show}
            custom
            width="41.4rem"
            height="auto"
            className={style.switchRole_alert}
            changeStatus={onClose}
        >
            <div className={style.switchRole_container}>
                {isNotice ? (
                    <>
                        <h2>
                            <Icon type="info" />
                            是否切换角色？
                        </h2>
                        <span>
                            只有 “可分配任务”
                            角色，才能绑定表单。请确认您是否拥有此角色可以进行切换。
                        </span>
                    </>
                ) : (
                    <>
                        <h1>{t('PreparationPage.SwitchRole')}</h1>
                        <p>{t('PreparationPage.SwitchRoleMsg')}</p>
                    </>
                )}

                <div className={style.switchRole_row}>
                    <span>{t('Common.OrganizationName')}</span>
                    <DropDownListV2
                        width="100%"
                        height="4rem"
                        defaultValue={currentOrgId}
                        placeholder={t('DistributionWindow.OrgNamePlaceholder')}
                        labels={organizationList.map((i) => ({ id: i.id, content: i.name }))}
                        floatingClassName={style.switchRole_dropDown}
                        handleValueChange={(id) => {
                            setCurrentOrgId(id as string);
                            setCurrentTalentId('');
                            setCurrentRole('');
                            getTGList(id as string);
                            // dispatch(
                            //     getTalentGroupListSaga({
                            //         organization_id: id as string,
                            //     }),
                            // );
                        }}
                    />
                </div>
                <div className={style.switchRole_row}>
                    <span>{t('Common.TalentGroup')}</span>
                    <DropDownListV2
                        width="100%"
                        height="4rem"
                        defaultValue={currentTalentId}
                        placeholder={t('DistributionWindow.TGPlaceholder')}
                        labels={tgList}
                        floatingClassName={style.switchRole_dropDown}
                        handleValueChange={(value) => {
                            setCurrentTalentId(value as string);
                            setCurrentRole('');
                        }}
                    />
                </div>
                {roleList.length === 0 ? (
                    <p style={{ color: '#757575' }}>{t('PreparationPage.NoRoleMsg')}</p>
                ) : (
                    <div
                        className={[
                            style.switchRole_row,
                            currentRole && style.switchRole_role,
                        ].join(' ')}
                    >
                        <span>{t('Common.Role')}</span>
                        {currentRole && (
                            <Icon
                                className={[style.role_icon, handleRoleIcon(currentRole)].join(' ')}
                                type={handleRoleIcon(currentRole) as IconProps['type']}
                            />
                        )}

                        <DropDownListV2
                            width="100%"
                            height="4rem"
                            placeholder={t('DistributionWindow.RolePlaceholder')}
                            defaultValue={currentRole}
                            labels={roleList}
                            floatingClassName={style.switchRole_dropDown}
                            handleValueChange={(value) => setCurrentRole(value as string)}
                        />
                    </div>
                )}
                <div className={style.switchRole_btn}>
                    <Button
                        label={t('Common.Cancel')}
                        size="big"
                        type="primary"
                        onClick={onClose}
                    />
                    <Button
                        disabled={disabled}
                        label={t('Common.Confirm')}
                        type="primary"
                        // onClick={handleChangeRole}
                        onClick={() => {
                            if (currentTalentId) {
                                dispatch(saveSelectedTGAction(currentTalentId));
                            }
                            handleUpdate?.(currentRole);
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default SwitchRole;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
