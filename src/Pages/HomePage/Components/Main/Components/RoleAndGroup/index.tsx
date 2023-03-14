/**
 * @file
 * @date 2021-12-29
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2021-12-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, Kite, ScrollComponent } from "@datareachable/dr_front_componentlibrary";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Store/rootReducer";
import { updateUserRoleAction } from "~/Store/UserState/actions";
import style from "./style.scss";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TalentGroupType } from "~/Store/OrganizationState/types";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface RoleAndGroupProp {
    talentGroupList?: TalentGroupType[];
    handleChangeRoleAndTG: (role: string, talentGroup: TalentGroupType) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const RoleAndGroup: React.FC<RoleAndGroupProp> = ({ handleChangeRoleAndTG }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { selectedCategory } = useSelector((state: RootState) => state.homePage);
    // talentGroupList;
    const { currentOrg, talentGroupList } = useSelector(
        (state: RootState) => state.organizationState,
    );

    /** role  list */
    const [roleList, setRoleList] = useState<string[]>([
        t("HomePage.Main.RoleAndTalentGroup.Client"),
        t("HomePage.Main.RoleAndTalentGroup.Supplier"),
    ]);
    /** talent group */
    const [talentGroup, setTalentGroup] = useState<TalentGroupType[]>([]);
    /** 默认选择的 role 和 group */
    const [defaultSelected, setDefaultSelected] = useState({ role: 0, group: 0 });
    /** role and group drop down show */
    const [dropdownShow, setDropdownShow] = useState(false);
    /** value */
    const [inputValue, setInputValue] = useState("");
    /** change select */
    const [changeRole, setChangeRole] = useState(false);
    /** is focus */
    const [isFocus, setIsFocus] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (talentGroupList) {
            const arr = talentGroupList.map((item) => {
                if (item.name === "default-group" || item.name === "默认部门") {
                    item.name = t("HomePage.Main.RoleAndTalentGroup.DefaultGroup");
                }
                return item;
            });
            setTalentGroup(arr);
        }
    }, [t, talentGroupList]);
    /** 初始化默认选项 role 和 talentGroup */
    useEffect(() => {
        if (roleList && talentGroup.length !== 0) {
            setInputValue(
                roleList[defaultSelected.role] + "-" + talentGroup[defaultSelected.group].name,
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [talentGroup]);
    /** 切换组织时，重置默认选项 role 和 talenGroup */
    useEffect(() => {
        setDefaultSelected({ role: 0, group: 0 });
    }, [currentOrg.id]);
    /** 切换文件夹时 */
    useEffect(() => {
        if (selectedCategory === "Not Bound") {
            setRoleList([t("HomePage.Main.RoleAndTalentGroup.Client")]);
        } else {
            setRoleList([
                t("HomePage.Main.RoleAndTalentGroup.Client"),
                t("HomePage.Main.RoleAndTalentGroup.Supplier"),
            ]);
        }
    }, [selectedCategory, t]);
    useEffect(() => {
        if (dropdownShow) {
            const arr = inputValue.split("-");
            const role = arr[0];
            let talent_group = "";
            arr.splice(0, 1);
            if (arr.length > 1) {
                talent_group = arr.join("-");
            } else {
                talent_group = inputValue.split("-")[1];
            }
            const role_index = roleList.findIndex((item) => item === role);
            // console.log(talentGroup);
            // const tg_index = talentGroup.findIndex((item) => {
            //     if (item.talent_group_name === "default-group") {
            //         return (
            //             item.talent_group_name ===
            //             t("HomePage.Main.RoleAndTalentGroup.DefaultGroup")
            //         );
            //     } else {
            //         return item.talent_group_name === talent_group;
            //     }
            // });
            const tg_index = talentGroup.findIndex((item) => item.name === talent_group);
            if (role_index !== defaultSelected.role) {
                setChangeRole(false);
                setDefaultSelected({ role: role_index, group: tg_index });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropdownShow]);

    useEffect(() => {
        if (isFocus) {
            setDropdownShow(true);
        } else {
            setDropdownShow(false);
        }
    }, [isFocus]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** handle role params */
    const handleRoleParams = (role: string): string => {
        if (role === "Client" || role === "合同甲方") {
            return "client";
        } else if (role === "Supplier" || role === "合同乙方") {
            return "supplier";
        } else {
            return "client";
        }
    };
    /** handle talent group params */
    const handleTgParams = (tg: TalentGroupType): TalentGroupType => {
        if (tg.name === "默认部门") {
            return {
                ...tg,
                id: tg.id,
                name: "default-group",
            };
        } else {
            return tg;
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.roleAndGroup_container}>
            <Kite
                show={dropdownShow}
                root={
                    <div>
                        <div
                            className={style.roleAndGroup_wrap}
                            ref={containerRef}
                            onMouseDown={() => {
                                if (dropdownShow) {
                                    setIsFocus(false);
                                } else {
                                    setIsFocus(true);
                                    containerRef.current?.focus();
                                }
                            }}
                            tabIndex={-1}
                            onFocus={() => {
                                setIsFocus(true);
                            }}
                            onBlur={() => {
                                setIsFocus(false);
                            }}
                        >
                            <span className={style.roleAndGroup_box}>{inputValue}</span>
                            <Icon
                                type="dropdown"
                                className={style.roleAndGroup_icon}
                                style={{
                                    transform: dropdownShow ? "rotate(180deg)" : "rotate(0deg)",
                                }}
                            />
                        </div>
                    </div>
                }
                offset={{ x: -115, y: 5 }}
            >
                <>
                    <div
                        className={style.roleAndGroup_dropDown}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <ul
                            className={style.roleAndGroup_role}
                            tabIndex={-1}
                            onFocus={() => setDropdownShow(true)}
                            onBlur={() => setDropdownShow(false)}
                        >
                            {roleList.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={
                                            defaultSelected.role === index
                                                ? style.roleAndGroup_active
                                                : ""
                                        }
                                        onClick={() => {
                                            setDefaultSelected({ ...defaultSelected, role: index });

                                            if (defaultSelected.role !== index) {
                                                setChangeRole(true);
                                            }
                                        }}
                                    >
                                        <span>{item}</span>
                                        <Icon type="open" />
                                    </li>
                                );
                            })}
                        </ul>

                        <ul className={style.roleAndGroup_group}>
                            <ScrollComponent height="18rem">
                                {talentGroup.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={
                                                defaultSelected.group === index && !changeRole
                                                    ? style.roleAndGroup_active
                                                    : ""
                                            }
                                            onMouseDown={(e) => {
                                                e.stopPropagation();
                                                setDefaultSelected({
                                                    ...defaultSelected,
                                                    group: index,
                                                });
                                                setDropdownShow(false);
                                                setChangeRole(false);
                                                setInputValue(
                                                    roleList[defaultSelected.role] +
                                                        "-" +
                                                        talentGroup[index].name,
                                                );
                                                if (
                                                    !changeRole &&
                                                    defaultSelected.group === index
                                                ) {
                                                    dispatch(
                                                        updateUserRoleAction(
                                                            handleRoleParams(
                                                                roleList[defaultSelected.role],
                                                            ),
                                                        ),
                                                    );
                                                    return;
                                                }
                                                handleChangeRoleAndTG(
                                                    handleRoleParams(
                                                        roleList[defaultSelected.role],
                                                    ),
                                                    handleTgParams(item),
                                                );
                                            }}
                                        >
                                            <span>{item.name}</span>
                                        </li>
                                    );
                                })}
                            </ScrollComponent>
                        </ul>
                    </div>
                </>
            </Kite>
        </div>
    );
};
export default RoleAndGroup;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
