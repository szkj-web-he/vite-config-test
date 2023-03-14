/**
 * @file
 * @date 2021-12-14
 * @author zhoubin
 * @lastModify zhoubin 2021-12-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from "react";
import style from "./style.scss";
import { Icon, ToolTips } from "@datareachable/dr_front_componentlibrary";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface SortBoxProps {
    // surveyDistributionList: SurveyDisListType[];
    // pageNumber: number;
    pagerType: boolean;
    typeShow: boolean;
    setTypeShow: (status: boolean) => void;
    setPagerType: (pagerType: boolean) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const SortBox: React.FC<SortBoxProps> = ({
    pagerType,
    setPagerType,
    typeShow,
    setTypeShow,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /** dispatch **/
    // const dispatch = useDispatch();
    /** show pagenation type */
    // const [typeShow, setTypeShow] = useState(false);
    /** tips show */
    const [tipsShow, setTipsShow] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    useEffect(() => {
        let time: NodeJS.Timeout;
        if (typeShow) {
            setTipsShow(false);
            setTimeout(() => {
                setTypeShow(false);
            }, 500);
        }
        return () => {
            clearTimeout(time);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeShow]);

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={style.sortBox_settingIconContainer}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => {
                setTipsShow(true);
            }}
            onMouseLeave={() => setTipsShow(false)}
            onClick={() => {
                setPagerType(!pagerType);
                setTypeShow(true);
            }}
        >
            <Icon type="setting" />
            <span
                style={{
                    width: typeShow ? (pagerType ? "9.5rem" : "11.5rem") : "0rem",
                    // transition: typeShow
                    //     ? 'all 0.3s cubic-bezier(0, 0, 0, 1)'
                    //     : 'all 0.3s cubic-bezier(0, 0, 0.1,0.2)',
                }}
            >
                {pagerType ? "With pagination" : "Without pagination"}
            </span>

            {tipsShow && (
                <div className={style.sortBox_settingTips}>
                    <ToolTips
                        background="black"
                        content="Setting Pagination"
                        height="3.2rem"
                        width="auto"
                        type="LM"
                    />
                </div>
            )}
        </div>
    );
};
export default SortBox;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
