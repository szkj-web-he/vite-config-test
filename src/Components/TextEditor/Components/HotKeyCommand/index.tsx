/**
 * @file Hot key command
 * @date 2020-11-17
 * @author Andy
 * @lastModify Andy 2020-11-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import style from "./style.module.scss";
import { defaultSelections } from "../../DefaultData/TextEditor/hotKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
export interface HotKeyCommandProps {
    /**
     * id of this component
     */
    id: string;
    /**
     * label name
     */
    label?: string;
    /**
     * width of this component
     */
    width?: string;
    /**
     * width of this component
     */
    height?: string;
    /**
     * selection list of this component
     */
    selectionList?: typeof defaultSelections;
    /**
     * current range
     */
    currentRange?: undefined | Range;
}
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const HotKeyCommand: React.FC<HotKeyCommandProps> = ({
    width = "24rem",
    label = "Command",
    ...props
}: HotKeyCommandProps): JSX.Element => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    if (props.selectionList === undefined) {
        props.selectionList = defaultSelections;
    }
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.HKC_container} style={{ width }}>
            <div className={style.HKC_title}>{label}</div>
            <div>
                <ul id={props.id} className={style.HKC_selectionWrapper} tabIndex={1}>
                    {props.selectionList.map((item, index) => (
                        <li
                            tabIndex={1}
                            className={style.HKC_selectionItem}
                            key={`${index}defaultSelections`}
                            onClick={() => {
                                if (props.currentRange !== undefined) item.func(props.currentRange);
                            }}
                        >
                            <div className={style.HKC_selectionItemIcon}>
                                <FontAwesomeIcon icon={item.icon as IconProp} />
                            </div>
                            <div className={style.HKC_selectionItemText}>
                                <div className={style.HKC_selectionItemLabel}>{item.label}</div>
                                <div className={style.HKC_selectionItemContent}>{item.content}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
