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
    DropDownListV2,
    GeneralInput,
    Icon,
} from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.scss';
import * as distributionWindowActions from '~/Store/DataProcWindow/actions';
import { RootState } from '~/Store/rootReducer';
import { useNavigate } from 'react-router-dom';
import { getUrlParamsObj } from '~/DefaultData/utils';
import { useTranslation } from 'react-i18next';
import { handleRoleIcon, roleChange } from '~/Utils/dataType';
import { SearchDistributionType } from '~/Store/DataProcWindow/types';
import { getTalentGroupForOrgSaga } from '~/Store/OrganizationState/actions';
import { IconProps } from '@datareachable/dr_front_componentlibrary/Components/Icon';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface DistributionInfoWindowProps {
    openVisible: boolean;
    handleClose: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const DistributionInfoWindow: React.FC<DistributionInfoWindowProps> = ({
    openVisible,
    handleClose,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /** distribution name */
    const [disName, setDisnName] = useState('');
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigator = useNavigate();
    const { dataProcessingName, sign, random, role_limit, view_id, share_org, job_id } =
        getUrlParamsObj<{
            dataProcessingName: string;
            sign: string;
            random: string;
            role_limit: string;
            view_id: string;
            job_id: string;
            share_org: string;
        }>(location.search);

    const { getDistributions, orgList, getDistributionRoles } = useSelector(
        (state: RootState) => state.dataProcWindow,
    );
    const { talentGroupForOrg } = useSelector((state: RootState) => state.organizationState);
    /**
     * 下拉框当前选择的distribution
     */
    const [selectedDistribution, setSelectedDistribution] = useState<
        SearchDistributionType | undefined
    >(undefined);
    const [selectOrg, setSelectOrg] = useState('');
    const [talentGroupListState, setTalentGroupListState] = useState<
        { id: string; content: string }[]
    >([]);
    const [talentGroupId, setTalentGroupId] = useState('');

    const [userRoleListState, setUserRoleListState] = useState<{ id: string; content: string }[]>(
        [],
    );
    const [currentRole, setCurrentRole] = useState('');

    /** no roles text show */
    const [noRolesShow, setNoRoleShow] = useState(false);

    // 获取到distribution name时，搜索
    useEffect(() => {
        if (dataProcessingName) {
            setDisnName(dataProcessingName);
            searchDistribution(dataProcessingName, (data: SearchDistributionType[]) => {
                setSelectedDistribution(data[0]);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataProcessingName]);
    useEffect(() => {
        if (talentGroupForOrg) {
            setTalentGroupListState(
                talentGroupForOrg.map((i) => {
                    return {
                        id: i.id,
                        content: i.name === 'default-group' ? t('Common.DefaultGroup') : i.name,
                    };
                }),
            );
        }
    }, [t, talentGroupForOrg]);
    useEffect(() => {
        if (getDistributionRoles) {
            setUserRoleListState(
                getDistributionRoles.map((i) => ({
                    id: i,
                    content: t(`Common.${roleChange(i)}`),
                })),
            );
        }
    }, [getDistributionRoles, t]);

    /** 获取如果是分享的链接是否有权限进入 */
    const isIncludeRole = useMemo(() => {
        if (role_limit && userRoleListState) {
            return userRoleListState.some((v) => role_limit.split('|').includes(v.id));
        }
        return true;
    }, [role_limit, userRoleListState]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** 根据 name 搜索 distribution */
    const searchDistribution = (name: string, cb?: (data: SearchDistributionType[]) => void) => {
        dispatch(
            distributionWindowActions.searchDistributionsByNameSaga({
                name: name,
                callback(res) {
                    cb && cb(res);
                },
            }),
        );
        getOrgList();
    };
    /** 获取 org list */
    const getOrgList = () => {
        dispatch(distributionWindowActions.getOrgListSaga());
    };
    /** 获取 tg list */
    const getTgList = (org_id: string) => {
        dispatch(
            getTalentGroupForOrgSaga({
                organization_id: org_id,
            }),
        );
    };
    /** 获取 role list */
    const getRoles = (talent_group_id: string) => {
        dispatch(
            distributionWindowActions.getDistributionRoleSaga({
                talent_group_id,
                data_proc_id: selectedDistribution?.id ?? '',
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
            style={!openVisible ? { display: 'none' } : undefined}
        >
            <div className={style.dataProcessingInfoWindow_container}>
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
                            defaultValue={dataProcessingName}
                            handleInputOnChange={setDisnName}
                        />
                        <span
                            onClick={() => {
                                disName && searchDistribution(disName);
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
                        defaultValue={selectedDistribution?.id}
                        labels={getDistributions?.map((item) => {
                            const temp = {
                                id: item.id,
                                content: item.name,
                            };
                            return temp;
                        })}
                        handleValueChange={(item) => {
                            const dis = getDistributions.find((i) => i.id === item);
                            setSelectedDistribution(dis);
                            setSelectOrg('');
                            setTalentGroupId('');
                            setCurrentRole('');
                        }}
                    />
                    <div className={style.dataProcessingInfoWindow_belong}>
                        <span>{t('DistributionWindow.BelongOrg')} - </span>
                        <span>{selectedDistribution?.owner_org?.name || 'N/A'}</span>
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
                                const temp = {
                                    id: item.id,
                                    content: item.name,
                                };
                                return temp;
                            })}
                            handleValueChange={(item) => {
                                setSelectOrg(item as string);
                                setTalentGroupId('');
                                getTgList(item as string);
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
                            defaultValue={talentGroupId}
                            placeholder={t('DistributionWindow.TGPlaceholder')}
                            labels={talentGroupListState}
                            handleValueChange={(item) => {
                                setTalentGroupId(item as string);
                                setCurrentRole('');
                                getRoles(item as string);
                            }}
                        />
                    </div>
                    {noRolesShow ? (
                        <p className={style.no_roles}>{t('PreparationPage.NoRoleMsg')}</p>
                    ) : (
                        <div className={currentRole ? style.role_wrap : undefined}>
                            <span className={style.dataProcessingInfoWindow_title}>
                                {t('Common.Role')}
                            </span>
                            {currentRole && (
                                <Icon
                                    className={[
                                        style.role_icon,
                                        handleRoleIcon(roleChange(currentRole)),
                                    ].join(' ')}
                                    type={
                                        handleRoleIcon(roleChange(currentRole)) as IconProps['type']
                                    }
                                />
                            )}
                            <DropDownListV2
                                width="100%"
                                height="4rem"
                                floatingStyle={{ width: '52rem' }}
                                floatingClassName={style.drop_floating}
                                placeholder={t('DistributionWindow.RolePlaceholder')}
                                labels={userRoleListState}
                                defaultValue={currentRole}
                                handleValueChange={(selectedItem) => {
                                    setCurrentRole(selectedItem as string);
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
                        disabled={
                            !(selectedDistribution && talentGroupId && currentRole) ||
                            !isIncludeRole ||
                            (!!sign && !role_limit?.includes(currentRole))
                        }
                        label={t('Common.Confirm')}
                        type="primary"
                        onClick={() => {
                            navigator(
                                `/dataProcessing?orgId=${selectOrg}&dataProcId=${
                                    selectedDistribution?.id || ''
                                }&tgId=${talentGroupId}&role=${currentRole}${
                                    sign ? '&sign=' + sign : ''
                                }${random ? '&random=' + random : ''}${
                                    role_limit ? '&role_limit=' + role_limit : ''
                                }${view_id ? '&view_id=' + view_id : ''}${
                                    share_org ? '&share_org=' + share_org : ''
                                }${job_id ? '&job_id=' + job_id : ''}`,
                                { state: 1 },
                            );
                            handleClose && handleClose();
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default DistributionInfoWindow;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
