/**
 * @file
 * @date 2021-11-29
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2021-11-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from 'react';
import { DataProcessingListType } from '~/Store/HomePage/types';
import { dataFormat } from '~/Utils/data';
import * as HomePageAction from '~/Store/HomePage/actions';
import style from './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/Store/rootReducer';
import { Icon, Kite } from '@datareachable/dr_front_componentlibrary';
import { useTranslation } from 'react-i18next';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface ListProps {
    listItem: DataProcessingListType;
    handleClickedEdit: (curDis: DataProcessingListType) => void;
    changeOpen: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const List: React.FC<ListProps> = ({ listItem, handleClickedEdit, changeOpen }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { selectedCategory } = useSelector((state: RootState) => state.homePage);
    const { currentTalentGroupId } = useSelector((state: RootState) => state.organizationState);
    const [floatingStatus, setFloatingStatus] = useState(false);
    const [clickFloating, setClickFloating] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleUpdateStared = (id, status) => {
        if (currentTalentGroupId !== '') {
            dispatch(
                HomePageAction.updateStarredSaga({
                    talent_group_id: currentTalentGroupId,
                    data_proc_id: id,
                    star: status,
                }),
            );
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <tr className={style.listView_listContainer}>
            <td>
                <div>
                    <span className={style.listView_starred}>
                        {selectedCategory !== 'Not Bound' && listItem.project?.id && (
                            <>
                                {listItem.starred ? (
                                    <Icon
                                        type="collected"
                                        className={style.listView_collection}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdateStared(listItem.id, false);
                                        }}
                                    />
                                ) : (
                                    <Icon
                                        type="collection"
                                        className={style.listView_unCollection}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdateStared(listItem.id, true);
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </span>
                    <p>
                        {(selectedCategory === 'Not Bound' || !listItem.project?.id) && (
                            <span className={style.list_notBound_tag}>
                                [{t('HomePage.Main.DistributionItem.NotBound')}]{' '}
                            </span>
                        )}
                        {listItem.name}
                    </p>
                </div>
            </td>
            {/* <td>{dateFormat2(listItem.updated_at)}</td>
            <td>{dateFormat2(listItem.created_at)}</td> */}
            <td>
                {dataFormat(listItem.updated_at, 'MM/DD/YYYY', '/')}
                {/* {handleDateTime(
                    window.localStorage.getItem("language") as string,
                    listItem.updated_at,
                )} */}
            </td>
            <td>
                {dataFormat(listItem.created_at, 'MM/DD/YYYY', '/')}
                {/* {handleDateTime(
                    window.localStorage.getItem("language") as string,
                    listItem.created_at,
                )} */}
            </td>
            <td>{listItem.creator.name}</td>
            <td>
                {selectedCategory !== 'Not Bound' && listItem.project?.id && (
                    <Kite
                        root={
                            <span
                                tabIndex={-1}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setFloatingStatus(!floatingStatus);
                                }}
                                onBlur={() => {
                                    setClickFloating(false);
                                    if (!clickFloating) {
                                        setFloatingStatus(false);
                                    }
                                }}
                            >
                                <Icon type="moreVertical" className={style.listView_ellipsis} />
                            </span>
                        }
                        show={floatingStatus}
                    >
                        <div className={style.more_dropDownBox}>
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeOpen();
                                    setFloatingStatus(false);
                                    setClickFloating(true);
                                    handleClickedEdit(listItem);
                                }}
                            >
                                {t('HomePage.DistributionSlider.Open')}
                            </span>
                        </div>
                    </Kite>
                )}
            </td>
            {/* <Floating
                show={floatingStatus}
                parent={floatingParent}
                changeVisible={(status) => setFloatingStatus(status)}
                startingPosition="rb"
            ></Floating> */}
        </tr>
    );
};
export default List;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
