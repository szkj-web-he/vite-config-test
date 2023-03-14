/**
 * @file PagerSetting
 * @date 2021-09-25
 * @author Chaman
 * @lastModify  2021-09-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from "@datareachable/dr_front_componentlibrary";
import React from "react";
import style from "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface PagerSettingProps {
    /**
     *whether  the pagerSetting_container is opened
     */
    isExistedForContainer: boolean;
    /**
     * handle set pagerSetting_container's status
     */
    handleSetPagerContainerStatus: (status: boolean) => void;
    /**
     * pagerType
     */
    pagerType: boolean;
    /**
     * set pagerType
     */
    handleSetPagerType: (type: boolean) => void;
    /**
     *the secondary drop-down box status
     */
    isExisted: boolean;
    /**
     * set the secondary drop-down box status
     */
    handleSetSecondaryStatus: (status: boolean) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const PagerSetting: React.FC<PagerSettingProps> = ({
    handleSetPagerContainerStatus,
    isExistedForContainer,
    pagerType,
    handleSetPagerType,
    isExisted,
    handleSetSecondaryStatus,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={style.pagerSetting_container}
            onClick={() => {
                handleSetSecondaryStatus(true);
            }}
            tabIndex={-1}
            ref={(ref) => ref?.focus()}
            onBlur={() => {
                handleSetSecondaryStatus(false);
                handleSetPagerContainerStatus(false);
            }}
            style={{ display: isExistedForContainer ? "block" : "none" }}
        >
            <span>Switching list loading mode</span>
            <Icon type="open" fontSize="1rem" />
            <div
                className={style.pagerSetting_sort}
                style={{ display: isExisted ? "block" : "none" }}
            >
                <ul>
                    {[true, false].map((item, index) => {
                        return (
                            <li
                                key={String(item) + String(index)}
                                onClick={() => {
                                    handleSetPagerType(item);
                                    handleSetSecondaryStatus(false);
                                    handleSetPagerContainerStatus(false);
                                }}
                            >
                                <Icon
                                    type="right"
                                    style={{
                                        visibility: pagerType === item ? "visible" : "hidden",
                                    }}
                                />
                                <span style={{ color: pagerType === item ? "#478da5" : "" }}>
                                    {item ? "With Pagination" : "Without Pagination"}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
export default PagerSetting;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
