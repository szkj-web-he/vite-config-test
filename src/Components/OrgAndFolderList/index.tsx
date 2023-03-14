/**
 * @file OrgAndFolderList
 * @date 2021-12-24
 * @author Zhou Chengzhi
 * @lastModify Zhou Chengzhi 2021-12-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Avatar, Icon, ScrollComponent } from '@datareachable/dr_front_componentlibrary';
import { FC, useEffect, useState } from 'react';
import { classNames } from '~/Utils/classname';
import iconType from '@datareachable/dr_front_componentlibrary/Components/Icon/Unit/customFontIcon';
import { useTranslation } from 'react-i18next';
import style from './style.scss';
import { redirectToProfile } from '~/Api/redirectDomain';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface OrgProps {
    id: string;
    name: string;
    logo: string;
    type: string;
    members: {
        avatar: string;
        id: string;
        name: string;
    }[];
}
export interface FolderProps {
    iconType: keyof typeof iconType;
    name: string;
    count: number;
}

interface OrgAndFolderListProps {
    orgList: Array<OrgProps>;
    folderList: Array<FolderProps>;
    defaultSelectOrg: OrgProps;
    // defaultSelectOrg: string;
    // defaultSelectOrgIndex: number;
    defaultSelectFolderIndex: number;
    preferredOrgId: string;
    handleOrgChange?: (index: number, orgDri: string) => void;
    handleFolderChange?: (index: number) => void;
    handleChangeDefaultOrg?: (dri: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const OrgAndFolderList: FC<OrgAndFolderListProps> = ({
    orgList,
    folderList,
    defaultSelectFolderIndex,
    defaultSelectOrg,
    preferredOrgId,
    // defaultSelectOrgIndex,
    handleOrgChange,
    handleFolderChange,
    handleChangeDefaultOrg,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [selectOrg, setSelectOrg] = useState('');
    const [selectFolder, setSelectFolder] = useState(0);
    const [orgDropdown, setOrgDropdown] = useState(false);
    // const [selectOrgItem, setSelectOrgItem] = useState<OrgProps | undefined>(undefined);
    useEffect(() => {
        setSelectFolder(defaultSelectFolderIndex);
    }, [defaultSelectFolderIndex]);
    // useEffect(() => {
    //     if (defaultSelectOrg) {
    //         setSelectOrg(defaultSelectOrg);
    //     }
    // }, [defaultSelectOrg]);
    // useEffect(() => {
    //     setSelectOrgItem(orgList.find((i) => i.dri === selectOrg));
    // }, [orgList, selectOrg]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    // const selectOrgItem = useMemo(() => orgList[selectOrg], [orgList, selectOrg]);
    const { t } = useTranslation();
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleShowAllOrg = () => {
        setOrgDropdown(!orgDropdown);
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={style.orgAndFolderList}
            // style={{ maxHeight: orgDropdown ? "56.1rem" : "29.8rem", transition: "all 0.5s" }}
        >
            <div className={style.orgAndFolderList_orgArea}>
                <div className={style.orgAndFolderList_selectOrg} onClick={handleShowAllOrg}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            className={style.orgAndFolderList_selectOrgLogo}
                            imgUrl={defaultSelectOrg?.logo}
                            size="20"
                            type="org"
                        />
                        <div
                            className={style.orgAndFolderList_selectOrgLogoName}
                            title={defaultSelectOrg?.name}
                        >
                            {defaultSelectOrg?.name}
                        </div>
                    </div>
                    <Icon
                        className={classNames(style.orgAndFolderList_selectOrgLogoIcon, {
                            [style.orgAndFolderList_selectOrgLogoIcon__active]: orgDropdown,
                        })}
                        type="dropdown"
                    />
                </div>
                <div
                    className={style.orgAndFolderList_orgList}
                    style={
                        orgDropdown
                            ? {
                                  height:
                                      orgList.length > 5 ? '26rem' : 41 * (orgList.length + 1) + 16,
                              }
                            : { height: 0 }
                    }
                >
                    <ScrollComponent
                        style={
                            orgList.length > 5
                                ? { height: '21.9rem' }
                                : { height: orgList.length * 41 + 16 }
                        }
                    >
                        {orgList.map((item, index) => (
                            <div
                                key={`${item.id}_${index}`}
                                className={style.orgAndFolderList_orgListItem}
                                onMouseDown={() => {
                                    if (item.id !== selectOrg) {
                                        setSelectOrg(item.id);
                                        handleOrgChange && handleOrgChange(index, item.id);
                                    }
                                    setOrgDropdown(false);
                                }}
                            >
                                <Avatar
                                    className={style.orgAndFolderList_orgListItemLogo}
                                    imgUrl={item.logo}
                                    type="org"
                                    size="20"
                                />
                                <div
                                    className={style.orgAndFolderList_orgListItemName}
                                    title={item.name}
                                >
                                    {item.name}
                                </div>
                                {item.type === 'personal' && (
                                    <span
                                        className={style.orgAndFolderList_personal}
                                        style={{
                                            display:
                                                item.id === preferredOrgId ? 'block' : undefined,
                                        }}
                                    >
                                        {t('HomePage.OrgAndFolderList.Personal')}
                                    </span>
                                )}
                                {item.id === preferredOrgId && item.type !== 'personal' && (
                                    <span className={style.orgAndFolderList_preferred}>
                                        {t('HomePage.OrgAndFolderList.Preferred')}
                                    </span>
                                )}

                                {item.id !== preferredOrgId && (
                                    <span
                                        className={style.orgAndFolderList_prefer}
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                            if (item.id !== preferredOrgId) {
                                                handleChangeDefaultOrg?.(item.id);
                                            }
                                        }}
                                    >
                                        {t('HomePage.OrgAndFolderList.Prefer')}
                                    </span>
                                )}
                            </div>
                        ))}
                    </ScrollComponent>
                    <div
                        className={style.orgAndFolderList_orgListManage}
                        onClick={() => {
                            location.assign(`${redirectToProfile}/profile/organization`);
                        }}
                    >
                        <Icon type="management" />
                        <span>{t('HomePage.OrgAndFolderList.ManageOrg')}</span>
                    </div>
                </div>
            </div>
            <div className={style.orgAndFolderList_folderArea}>
                <span style={{ top: `${selectFolder * 5.4 + 2.4}rem` }}></span>
                {folderList.map((item, index) => (
                    <div
                        key={`${item.name}_${item.iconType}_${index}`}
                        className={`${style.orgAndFolderList_folderItem} ${
                            selectFolder === index ? style.orgAndFolderList_folderItem_active : ''
                        }`}
                        onClick={() => {
                            if (index !== selectFolder) {
                                setSelectFolder(index);
                                handleFolderChange && handleFolderChange(index);
                            }
                        }}
                    >
                        <div className={style.orgAndFolderList_folderItemLeft}>
                            <Icon
                                type={item.iconType}
                                className={style.orgAndFolderList_folderItemIcon}
                            />
                            <div className={style.orgAndFolderList_folderItemName}>
                                {t(`HomePage.OrgAndFolderList.FolderList.${item.name}`)}
                            </div>
                            {/* <div className={style.orgAndFolderList_folderItemName}>{item.name}</div> */}
                        </div>
                        <div className={style.orgAndFolderList_folderItemCount}>{item.count}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrgAndFolderList;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
