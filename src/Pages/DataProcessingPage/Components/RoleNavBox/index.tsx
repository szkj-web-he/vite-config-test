/**
 * @file
 * @date 2022-05-17
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2022-05-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from '@datareachable/dr_front_componentlibrary';
import { IconProps } from '@datareachable/dr_front_componentlibrary/Components/Icon';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUrlParamsObj } from '~/DefaultData/utils';
import { updateCurrentRoleAction } from '~/Store/Preparation/actions';
import { RootState } from '~/Store/rootReducer';
import { handleRoleIcon, roleChange } from '~/Utils/dataType';
import SwitchRole from '../SwitchRole';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const RoleNavBox: React.FC = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { role } = getUrlParamsObj<{ role: string }>(location.search);
    const {
        navData,
        currentRole: curRole,
        shareView,
    } = useSelector((state: RootState) => state.preparation);
    // current role
    const [currentRole, setCurrentRole] = useState('');
    /** change role alert show */
    const [changeRoleAlert, setChangeRoleAlert] = useState(false);
    useEffect(() => {
        saveRole(curRole || role);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role, curRole, dispatch]);
    useEffect(() => {
        if (curRole) {
            setCurrentRole(roleChange(curRole));
        }
    }, [curRole]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const saveRole = (role: string) => {
        dispatch(updateCurrentRoleAction(roleChange(role)));
    };
    const handleTranslateTGName = (name: string) => {
        if (name === 'default-group') {
            return t('Common.DefaultGroup');
        } else {
            return name;
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div
                className={style.preparation_nav}
                onClick={() => {
                    if (shareView.sign && !shareView.role_limit.length) {
                        return;
                    }
                    setChangeRoleAlert(true);
                }}
            >
                <div>
                    <div>
                        <h2>{navData.organization.name || '—'}</h2>
                        <div>
                            <Icon type="targetedResponses" />
                            <span>{t('PreparationPage.Organization')}</span>
                        </div>
                    </div>
                </div>
                <div className={style.border_box}>
                    <div>
                        <h2>{handleTranslateTGName(navData.talent_group.name) || '—'}</h2>
                        <div>
                            <Icon type="qtree" />
                            <span>{t('PreparationPage.TalentGroup')}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h2 style={{ display: 'flex', alignItems: 'center' }}>
                            {currentRole ? (
                                <>
                                    <Icon
                                        type={handleRoleIcon(currentRole) as IconProps['type']}
                                        className={handleRoleIcon(currentRole)}
                                    />
                                    {t(`Common.${currentRole}`)}
                                </>
                            ) : (
                                '—'
                            )}
                        </h2>
                        <div>
                            <Icon type="person01" />
                            <span>{t('PreparationPage.Role')}</span>
                        </div>
                    </div>
                </div>
            </div>
            <SwitchRole
                show={changeRoleAlert}
                navData={navData}
                curRole={currentRole}
                onClose={() => setChangeRoleAlert(false)}
                handleUpdate={(role: string) => {
                    setCurrentRole(role);
                    setChangeRoleAlert(false);
                    saveRole(role);
                }}
            />
        </>
    );
};
export default RoleNavBox;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
