/**
 * @file
 * @date 2021-11-10
 * @author zhoubin
 * @lastModify zhoubin 2021-11-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Fragment } from "react";
import style from "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type RowType = {
    title: string;
    disabled?: boolean;
    onClick?: () => void;
    color?: string;
};
interface OpenListProps {
    width?: string;
    height?: string;
    list: Array<RowType>;
    handleClick?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const OpenList: React.FC<OpenListProps> = ({
    // width = "13rem",
    // height = "14.6rem",
    list,
    handleClick,
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
            className={style.openList_container}
            // style={{ width, height }}
            onMouseDown={(e) => {
                e.stopPropagation();
                handleClick?.();
            }}
        >
            {list.map((item, index) => {
                return (
                    <Fragment key={index}>
                        {item.title === "/" ? (
                            <div className={style.openList_line}></div>
                        ) : (
                            <li
                                style={{
                                    color: item.disabled ? "#bdbdbd" : item.color,
                                    backgroundColor: item.disabled ? "transparent" : undefined,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (item.disabled) {
                                        return;
                                    }
                                    item.onClick?.();
                                }}
                            >
                                {item.title}
                            </li>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};
export default OpenList;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
