/**
 * @file
 * @date 2021-10-21
 * @author zhoubin
 * @lastModify zhoubin 2021-10-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from "@datareachable/dr_front_componentlibrary";
import React, { useState } from "react";
import style from "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface RenameInputProps {
    defaultValue: string;
    onBlur: (value: string) => void;
    styles?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const RenameInput: React.FC<RenameInputProps> = ({ defaultValue, onBlur, styles }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /** input value */
    const [value, setValue] = useState(defaultValue);
    /* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
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
        <div className={style.gridView_renameInput} style={styles}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                autoFocus
                onBlur={() => onBlur(value)}
            />
            <Icon
                type="empty"
                color="#BDBDBD"
                onMouseDown={(e) => {
                    e.preventDefault();
                    setValue("");
                }}
            />
        </div>
    );
};
export default RenameInput;
