/**
 * @file
 * @date 2022-04-29
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2022-04-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
// import { Skeleton } from "@datareachable/dr_front_componentlibrary";
import React from "react";
import Skeleton from "~/Components/Skeleton";
import style from "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const HomeLoading: React.FC = (): JSX.Element => {
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
        <div className={style.homeLoading}>
            <div className={style.main_one}>
                <div className={style.main_one_left}>
                    {/* <Skeleton variant="rect" /> */}
                    <Skeleton paragraph={{ rows: 1, width: "15rem" }} />
                </div>
                <div className={style.main_one_right}>
                    {/* <Skeleton variant="rect" /> */}
                    <Skeleton paragraph={{ rows: 1, width: "10rem" }} />
                </div>
            </div>
            <div className={style.main_two}>
                <div className={style.main_two_left}>
                    {/* <Skeleton variant="rect" /> */}
                    <Skeleton paragraph={{ rows: 1, width: "10rem" }} />
                </div>
                <div className={style.main_two_right}>
                    {/* <Skeleton variant="rect" width="40rem" /> */}
                    <Skeleton paragraph={{ rows: 1, width: "40rem" }} />
                </div>
            </div>
            <div className={style.main_there}>
                <Skeleton paragraph={{ rows: 8 }} />
                {/* <Skeleton variant="rect" width="100%" />
                <Skeleton variant="rect" width="100%" />
                <Skeleton variant="rect" width="100%" />
                <Skeleton variant="rect" width="100%" />
                <Skeleton variant="rect" width="100%" /> */}
            </div>
        </div>
    );
};
export default HomeLoading;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
