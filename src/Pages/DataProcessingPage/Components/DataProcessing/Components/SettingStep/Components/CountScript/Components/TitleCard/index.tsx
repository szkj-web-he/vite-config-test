/**
 * @file
 * @date 2023-02-13
 * @author zhoubin
 * @lastModify zhoubin 2023-02-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { FC } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TitleCardProps {
    title: string;
    label: string;
    description: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const TitleCard: FC<TitleCardProps> = ({ title, label, description }): JSX.Element => {
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
        <div className={style.titleCard_card}>
            <div className={style.titleCard_header}>
                <h2 className={style.titleCard_cardTitle}>{title}</h2>
                <span>{label}</span>
            </div>
            <div className={style.titleCard_item}>
                <div className={style.titleCard_title}>脚本描述：</div>
                <div className={style.titleCard_desc}>{description}</div>
            </div>
        </div>
    );
};
export default TitleCard;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
