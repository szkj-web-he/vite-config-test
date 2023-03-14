/**
 * @file
 * @date 2021-08-26
 * @author zhoubin
 * @lastModify zhoubin 2021-08-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Alert,
    Button,
    // DropDownList,
    DropDownListV2,
    GeneralInput,
    Icon,
} from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.scss';
import * as DistributionWindowActions from '~/Store/DataProcWindow/actions';
import { RootState } from '~/Store/rootReducer';
import { DataProcessingListType } from '~/Store/HomePage/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { handleRoleIcon, roleChange } from '~/Utils/dataType';
import { getTalentGroupForOrgSaga } from '~/Store/OrganizationState/actions';
import { IconProps } from '@datareachable/dr_front_componentlibrary/Components/Icon';
import { updateCurrDataProc } from '~/Store/HomePage/actions';
import { saveSelectedTGAction, updateCurrentRoleAction } from '~/Store/Preparation/actions';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface DataProcessingInfoWindowProps {
    openVisible: boolean;
    handleClose: () => void;
    // distributionName: string;
    currDataProcessing?: DataProcessingListType;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const DataProcessingInfoWindow: React.FC<DataProcessingInfoWindowProps> = ({
    openVisible,
    handleClose,
    // distributionName,
    currDataProcessing,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const distributionList = useSelector(
        (state: RootState) => state.dataProcWindow.getDistributions,
    );
    const orgList = useSelector((state: RootState) => state.organizationState.organizationList);
    const { currentTalentGroupId } = useSelector((state: RootState) => state.organizationState);
    const { getDistributionRoles } = useSelector((state: RootState) => state.dataProcWindow);
    const { talentGroupForOrg, currentOrg } = useSelector(
        (state: RootState) => state.organizationState,
    );
    /** distribution name */
    const [distributionName, setDistributionName] = useState('');
    /** 下拉框当前选择的 distribution */
    const [selectedDataProc, setSelectedDataProc] = useState('');
    /** 选择的组织 */
    const [selectOrg, setSelectOrg] = useState('');
    /** 选择的talent group */
    const [selectTG, setSelectTG] = useState('');
    /** role list */
    const [roleList, setRoleList] = useState<string[]>([]);
    /** 选择的权限 */
    const [selectRole, setSelectRole] = useState('');

    /** no roles text show */
    const [noRolesShow, setNoRoleShow] = useState(false);

    /** 弹窗刚打开时，搜索distribution */
    useEffect(() => {
        if (currDataProcessing) {
            setDistributionName(currDataProcessing.name);
            setSelectedDataProc(currDataProcessing.id);
            setSelectOrg(currentOrg.id);
            setSelectTG(currentTalentGroupId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currDataProcessing, currentTalentGroupId, currentOrg.id, dispatch]);
    useEffect(() => {
        if (distributionName) {
            handleSearchDistribution();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [distributionName]);
    useEffect(() => {
        if (selectOrg) {
            handleGetTalentGroupList(selectOrg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectOrg]);
    useEffect(() => {
        if (selectTG) {
            handleGetRole();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectTG]);
    useEffect(() => {
        if (getDistributionRoles) {
            setRoleList(getDistributionRoles);
        }
    }, [getDistributionRoles]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /** 搜索distribution */
    const handleSearchDistribution = () => {
        dispatch(
            DistributionWindowActions.searchDistributionsByNameSaga({
                name: distributionName,
            }),
        );
    };
    /** 选择组织后，重新获取tg */
    const handleGetTalentGroupList = (org_id: string) => {
        dispatch(
            getTalentGroupForOrgSaga({
                organization_id: org_id,
            }),
        );
    };
    /** 获取权限 */
    const handleGetRole = () => {
        dispatch(
            DistributionWindowActions.getDistributionRoleSaga({
                talent_group_id: selectTG,
                data_proc_id: selectedDataProc,
                callback: (isEmpty) => {
                    setNoRoleShow(isEmpty);
                },
            }),
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={openVisible}
            custom={true}
            width="60rem"
            height="68rem"
            className={style.distributionWindow_alert}
            changeStatus={handleClose}
        >
            <div
                className={style.dataProcessingInfoWindow_container}
                onClick={(e) => e.stopPropagation()}
            >
                <h1>{t('DistributionWindow.EnterDis')}</h1>
                <p>{t('DistributionWindow.EnterDisMsg')}</p>
                <div className={style.dataProcessingInfoWindow_sectionOne}>
                    <span className={style.dataProcessingInfoWindow_title}>
                        {t('Common.DataProcessingName')}
                    </span>
                    <div className={style.dataProcessingInfoWindow_search}>
                        <GeneralInput
                            width="100%"
                            height="4rem"
                            placeholder={t('DistributionWindow.DisNamePlaceholder')}
                            defaultValue={distributionName}
                            handleInputOnChange={(value: string) => {
                                setDistributionName(value.trim());
                            }}
                        />
                        <span
                            onClick={() => {
                                handleSearchDistribution();
                                setSelectedDataProc('');
                                setSelectOrg('');
                                setSelectTG('');
                                setSelectRole('');
                            }}
                        >
                            <Icon fontSize="1.6rem" type="search" />
                        </span>
                    </div>
                    <DropDownListV2
                        width="100%"
                        height="4rem"
                        floatingStyle={{ width: '52rem' }}
                        floatingClassName={style.drop_floating}
                        defaultValue={selectedDataProc}
                        labels={distributionList?.map((item) => {
                            return {
                                id: item.id,
                                content: item.name,
                            };
                        })}
                        handleValueChange={(value) => {
                            setSelectedDataProc(value as string);
                            setSelectOrg('');
                            setSelectTG('');
                            setSelectRole('');
                        }}
                    />
                    <div className={style.dataProcessingInfoWindow_belong}>
                        <span>{t('DistributionWindow.BelongOrg')} - </span>
                        <span>
                            {distributionList?.find((item) => item.id === selectedDataProc)
                                ?.owner_org?.name || 'N/A'}
                        </span>
                    </div>
                </div>
                <div className={style.dataProcessingInfoWindow_sectionTwo}>
                    <div>
                        <span className={style.dataProcessingInfoWindow_title}>
                            {t('Common.OrganizationName')}
                        </span>
                        <DropDownListV2
                            width="100%"
                            height="4rem"
                            floatingStyle={{ width: '52rem' }}
                            floatingClassName={style.drop_floating}
                            defaultValue={selectOrg}
                            placeholder={t('DistributionWindow.OrgNamePlaceholder')}
                            labels={orgList.map((item) => {
                                return {
                                    id: item.id,
                                    content: item.name,
                                };
                            })}
                            handleValueChange={(id) => {
                                setSelectOrg(id as string);
                                setSelectTG('');
                                setSelectRole('');
                            }}
                        />
                    </div>
                    <div>
                        <span className={style.dataProcessingInfoWindow_title}>
                            {t('Common.TalentGroup')}
                        </span>
                        <DropDownListV2
                            width="100%"
                            height="4rem"
                            floatingStyle={{ width: '52rem' }}
                            floatingClassName={style.drop_floating}
                            defaultValue={selectTG}
                            placeholder={t('DistributionWindow.TGPlaceholder')}
                            labels={talentGroupForOrg.map((item) => {
                                return {
                                    id: item.id,
                                    content:
                                        item.name === 'default-group'
                                            ? t('Common.DefaultGroup')
                                            : item.name,
                                };
                            })}
                            handleValueChange={(item) => {
                                setSelectTG(item as string);
                                setSelectRole('');
                            }}
                        />
                    </div>
                    {noRolesShow ? (
                        <p className={style.no_roles}>{t('PreparationPage.NoRoleMsg')}</p>
                    ) : (
                        <div className={selectRole ? style.role_wrap : undefined}>
                            <span className={style.dataProcessingInfoWindow_title}>
                                {t('Common.Role')}
                            </span>
                            {selectRole && (
                                <Icon
                                    className={[
                                        style.role_icon,
                                        handleRoleIcon(roleChange(selectRole)),
                                    ].join(' ')}
                                    type={
                                        handleRoleIcon(roleChange(selectRole)) as IconProps['type']
                                    }
                                />
                            )}
                            <DropDownListV2
                                width="100%"
                                height="4rem"
                                floatingStyle={{ width: '52rem' }}
                                floatingClassName={style.drop_floating}
                                placeholder={t('DistributionWindow.RolePlaceholder')}
                                labels={roleList?.map((item) => ({
                                    id: item,
                                    content: t(`Common.${roleChange(item)}`),
                                }))}
                                defaultValue={selectRole}
                                handleValueChange={(item) => {
                                    setSelectRole(item as string);
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className={style.dataProcessingInfoWindow_btns}>
                    <Button
                        label={t('Common.Cancel')}
                        size="big"
                        type="primary"
                        onClick={handleClose}
                    />
                    <Button
                        label={t('Common.Enter')}
                        type="primary"
                        disabled={!(selectedDataProc && selectOrg && selectTG && selectRole)}
                        onClick={() => {
                            navigator(
                                `/dataProcessing?orgId=${selectOrg}&dataProcId=${selectedDataProc}&tgId=${selectTG}&role=${selectRole}`,
                                { state: 1 },
                            );
                            if (selectTG) {
                                dispatch(saveSelectedTGAction(selectTG));
                            }
                            dispatch(updateCurrentRoleAction(selectRole));
                            dispatch(
                                updateCurrDataProc({
                                    getOpenedDataProcessing: {
                                        isLoading: true,
                                    },
                                }),
                            );
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default DataProcessingInfoWindow;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
