/**
 * @file progress bar
 * @date 2021-04-16
 * @author Chaman
 * @lastModify  2021-04-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import style from "./style.scss";
import { Icon } from "@datareachable/dr_front_componentlibrary";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ProgressBarProps {
    /**
     * set of points
     */
    pointSet?: Array<{ label: string; func: () => void }>;
    /**
     * current step, count from 1
     */
    step?: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ProgressBar: React.FC<ProgressBarProps> = ({
    pointSet = [
        { label: "content", func: () => "demo" },
        { label: "logic", func: () => "demo" },
    ],
    step = 1,
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
        <div className={style.progressBar_container}>
            <div>
                {step === 1 ? (
                    <Icon
                        type="nextProgress"
                        color="#F2F2F2"
                        fontSize="2.4rem"
                        style={{ transform: "rotate(180deg)" }}
                    />
                ) : (
                    <Icon
                        type="nextProgress"
                        onClick={pointSet[0].func}
                        color="#478DA5"
                        fontSize="2.4rem"
                        style={{ transform: "rotate(180deg)" }}
                    />
                )}
            </div>
            <div className={style.progressBar_content}>
                <div className={style.progressBar_contentTop}>
                    <div
                        className={
                            step === 1 ? style.progressBar_circle : style.progressBar_circleGray
                        }
                    ></div>
                    <div className={style.progressBar_line}></div>
                    <div
                        className={
                            step === 2 ? style.progressBar_circle : style.progressBar_circleGray
                        }
                    ></div>
                </div>
                <div className={style.progressBar_contentBottom}>
                    <span className={step === 2 ? style.progressBar_gray : ""}>
                        {pointSet[0].label}
                    </span>
                    <span className={step === 1 ? style.progressBar_gray : ""}>
                        {pointSet[1].label}
                    </span>
                </div>
            </div>
            <div>
                {step === 2 ? (
                    <Icon type="nextProgress" color="#F2F2F2" fontSize="2.4rem" />
                ) : (
                    <Icon
                        type="nextProgress"
                        color="#478DA5"
                        fontSize="2.4rem"
                        onClick={pointSet[1].func}
                    />
                )}
            </div>
        </div>
    );
};
export default ProgressBar;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
