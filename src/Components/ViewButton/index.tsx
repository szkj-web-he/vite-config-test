/**
 * @file
 * @date 2021-10-29
 * @author zhoubin
 * @lastModify zhoubin 2021-10-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from "@datareachable/dr_front_componentlibrary";
import React from "react";
import style from "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface ViewButtonProps {
    viewType: boolean;
    handleChangeView: (status: boolean) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ViewButton: React.FC<ViewButtonProps> = ({ viewType, handleChangeView }): JSX.Element => {
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
        <div className={style.viewButton_container}>
            <span className={viewType ? "" : style.active}>
                <Icon type="grid" onClick={() => handleChangeView(false)} />
            </span>
            <span className={viewType ? style.active : ""}>
                <Icon type="list" onClick={() => handleChangeView(true)} />
            </span>
        </div>
    );
};
export default ViewButton;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
