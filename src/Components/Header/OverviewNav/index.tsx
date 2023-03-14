/**
 * @file overview nav
 * @date 2021-03-27
 * @author Chaman
 * @lastModify lidaoping 2021-03-27
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import style from "./style.scss";
// import { NavLink } from 'react-router-dom';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface OverviewNavProp {
    index?: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const OverviewNav: React.FC<OverviewNavProp> = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            {/* <------------------------------------ **** SECTION ONE START **** ------------------------------------ */}
            <div className={style.overviewNav_sectionOne}>
                <ul className={style.overviewNav_sectionOneUl}>
                    {/* <NavLink
                        to="/overview"
                        activeClassName={style.overviewNav_sectionOneLi_active}
                        className={index === 0 ? style.overviewNav_sectionOneLi_active : ''}
                    >
                        <li>
                            <div>
                                <span>Choose Delievable</span>
                            </div>
                            <div>
                                <span></span>
                                <span></span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink
                        to="/editor"
                        activeClassName={style.overviewNav_sectionOneLi_active}
                        className={index === 1 ? style.overviewNav_sectionOneLi_active : ''}
                    >
                        <li>
                            <div>
                                <span>Editor</span>
                            </div>
                            <div>
                                <span></span>
                                <span></span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink
                        to="/distribution"
                        activeClassName={style.overviewNav_sectionOneLi_active}
                        className={index === 2 ? style.overviewNav_sectionOneLi_active : ''}
                    >
                        <li>
                            <div>
                                <span>Distribution</span>
                            </div>
                            <div>
                                <span></span>
                                <span></span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink
                        to="/analysis"
                        
                        // activeClassName={style.overviewNav_sectionOneLi_active}
                        className={index === 3 ? style.overviewNav_sectionOneLi_active : ''}
                    >
                        <li>
                            <div>
                                <span>Analysis &amp; Report</span>
                            </div>
                            <div>
                                <span></span>
                                <span></span>
                            </div>
                        </li>
                    </NavLink> */}
                </ul>
            </div>
            {/* <------------------------------------ **** SECTION ONE END **** ------------------------------------ */}
        </>
    );
};
export default OverviewNav;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
