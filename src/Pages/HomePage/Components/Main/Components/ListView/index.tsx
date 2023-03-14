/**
 * @file
 * @date 2021-04-16
 * @author zhoubin
 * @lastModify  2021-04-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from 'react';
import style from './style.scss';
// import { useSelector } from "react-redux";
// import { RootState } from "~/Store/rootReducer";
import * as types from '~/Store/HomePage/types';

import List from './Components/List';
import { useTranslation } from 'react-i18next';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface ListViewProps {
    dataProcessingList: Array<types.DataProcessingListType>;
    handleClickedEdit: (curDis: types.DataProcessingListType) => void;
    changeOpen: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// const ListView: React.FC<ListViewProps> = ({ ...props }): JSX.Element => {
const ListView: React.FC<ListViewProps> = ({
    dataProcessingList,
    handleClickedEdit,
    changeOpen,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    /**
     * project list
     */
    // const { list_surveyDistribution } = useSelector((state: RootState) => state.homePage);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.listView_container}>
            <table>
                <thead>
                    <tr>
                        <th>{t('HomePage.Main.DistributionItem.Name')}</th>
                        <th>{t('HomePage.Main.DistributionItem.Last Modified')}</th>
                        <th>{t('HomePage.Main.DistributionItem.Creation Date')}</th>
                        <th>{t('HomePage.Main.DistributionItem.Creator')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {dataProcessingList.map((item) => {
                        return (
                            <List
                                key={item.id}
                                listItem={item}
                                handleClickedEdit={(curDis: types.DataProcessingListType) =>
                                    handleClickedEdit(curDis)
                                }
                                changeOpen={changeOpen}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default ListView;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
