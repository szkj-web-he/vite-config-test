/**
 * @file
 * @date 2021-12-23
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2021-12-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import style from './style.scss';
import React, { useEffect, useState } from 'react';
import { Button, Icon, ScrollComponent } from '@datareachable/dr_front_componentlibrary';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/Store/rootReducer';
import * as HomePageAction from '~/Store/HomePage/actions';
import { DataProcessingListType } from '~/Store/HomePage/types';
import Empty from '~/Components/Empty';
import { useTranslation } from 'react-i18next';
import Skeleton from '~/Components/Skeleton';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface DataProcessingDetailProp {
    dataProcessing?: DataProcessingListType;
    bodyWidth: number;
    changeOpen?: () => void;
    handleDataProcShow?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const DataProcessingDetail: React.FC<DataProcessingDetailProp> = ({
    dataProcessing,
    bodyWidth,
    changeOpen,
    handleDataProcShow,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const tg_id = useSelector((state: RootState) => state.organizationState.currentTalentGroupId);
    const { selectedCategory } = useSelector((state: RootState) => state.homePage);
    const { currDataProcessing, isLoading } = useSelector(
        (state: RootState) => state.homePage.getOpenedDataProcessing,
    );

    /** remove keyword icon show */
    const [removeKeyword, setRemoveKeyword] = useState(false);
    /** add keyword input show */
    const [addKeyword, setAddKeyword] = useState(false);
    /** add keyword input value */
    const [keywordValue, setKeywordValue] = useState('');
    /** keyword list */
    const [keywordList, setKeywordList] = useState<string[]>([]);
    /** 是否有权限添加关键词 */
    const [isTaskGiver, setIsTaskGiver] = useState(false);
    /**
     * 当页面在 1200px 以上时， 展示 distribution detail页面
     * 将 父组件传递过来的 distribution 保存到 redux 中
     * 同时 第一个 grid_view 为选中状态
     */
    useEffect(() => {
        setAddKeyword(false);
        setRemoveKeyword(false);
        if (dataProcessing && dataProcessing.id) {
            setKeywordList(dataProcessing.keywords || []);
            setIsTaskGiver(dataProcessing.role?.includes('proc_task_giver'));
            if (currDataProcessing?.id === '') {
                handleSelectDataProc(false, dataProcessing);
                // dispatch(
                //     HomePageAction.updateCurrDataProc({
                //         getOpenedDataProcessing: {
                //             isLoading: false,
                //             currDistribution: distribution,
                //         },
                //     }),
                // );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataProcessing, dispatch]);

    /**
     * 当 currDistribution 中有值时，获取当前 distribution 绑定的 survey
     */
    // useEffect(() => {
    //     // if (selectedCategory !== 'Not Bound') {
    //     if (currDistribution?.id && currDistribution?.role?.length) {
    //         dispatch(
    //             HomePageAction.getDistributionVersion({
    //                 tg_id,
    //                 distribution: currDistribution.id,
    //             }),
    //         );
    //     }
    //     // }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch, tg_id, currDistribution?.id]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** handle remove keyword */
    const handleRemoveKeyword = (item: string) => {
        if (dataProcessing) {
            const newKeywords = keywordList.filter((value) => {
                return value !== item;
            });
            // 调用删除 keyword 的 api
            setKeywordList(newKeywords);
            dispatch(
                HomePageAction.updateKeyWordsSaga({
                    talent_group_id: tg_id,
                    data_proc_id: dataProcessing.id,
                    keywords: newKeywords,
                }),
            );
        }
    };
    /** handle add keyword */
    const handleAddKeyword = () => {
        if (keywordValue && dataProcessing) {
            if (keywordList.includes(keywordValue)) {
                const index = keywordList.findIndex((item) => item === keywordValue);
                const newKeywordList = keywordList.splice(index, 1);
                setKeywordList(newKeywordList);
            }
            if (!keywordList.includes(keywordValue)) {
                setKeywordList([...keywordList, keywordValue]);
            }
            dispatch(
                HomePageAction.updateKeyWordsSaga({
                    talent_group_id: tg_id,
                    data_proc_id: dataProcessing.id,
                    keywords: [...(keywordList ?? []), keywordValue],
                }),
            );
        }
        setAddKeyword(false);
        setKeywordValue('');
    };
    /** 当前选择的distribution */
    const handleSelectDataProc = (isLoading: boolean, curDis?: DataProcessingListType) => {
        dispatch(
            HomePageAction.updateCurrDataProc({
                getOpenedDataProcessing: {
                    isLoading,
                    currDataProcessing: curDis,
                },
            }),
        );
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            style={{
                borderColor: !currDataProcessing
                    ? '#ebebeb'
                    : bodyWidth < 1440
                    ? 'transparent'
                    : '',
                backgroundColor: !currDataProcessing || bodyWidth < 1440 ? '#fff' : '',
                boxShadow: bodyWidth < 1440 ? undefined : 'none',
            }}
            className={style.dataProcessingDetail_container}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                e.defaultPrevented;
                if (!keywordValue) {
                    setAddKeyword(false);
                }
                setRemoveKeyword(false);
            }}
        >
            {!currDataProcessing ? (
                <Empty
                    description={t('HomePage.DistributionSlider.NotSelect')}
                    textStyle={{ color: '#757575' }}
                    className={style.dataProcessingDetail_empty}
                />
            ) : (
                <>
                    <div className={style.dataProcessingDetail_header}>
                        <div className={style.dataProcessingDetail_header_enter}>
                            {bodyWidth >= 1440 ? (
                                <div
                                    className={
                                        !dataProcessing?.role || dataProcessing?.role?.length === 0
                                            ? style.dataProcessingDetail_notEnter
                                            : ''
                                    }
                                    onClick={() => {
                                        if (
                                            dataProcessing?.role &&
                                            dataProcessing?.role?.length !== 0
                                        ) {
                                            changeOpen?.();
                                        }
                                    }}
                                >
                                    <Icon type="exit" />
                                    <span>{t('HomePage.DistributionSlider.Enter')}</span>
                                </div>
                            ) : (
                                <Button
                                    label={t('HomePage.DistributionSlider.Enter')}
                                    type="primary"
                                    onClick={() => {
                                        if (
                                            dataProcessing?.role &&
                                            dataProcessing?.role?.length !== 0
                                        ) {
                                            changeOpen?.();
                                        }
                                    }}
                                    className={
                                        !dataProcessing?.role || dataProcessing.role.length === 0
                                            ? style.dataProcessingDetail_not_enter
                                            : ''
                                    }
                                />
                            )}
                        </div>
                        {bodyWidth < 1440 && (
                            <Icon
                                type="closeDetails"
                                onClick={() => {
                                    handleDataProcShow?.();
                                    const gridView = document.querySelector('.gridView_container');
                                    handleSelectDataProc(true);
                                    // dispatch(
                                    //     HomePageAction.updateCurrDataProc({
                                    //         getOpenedDataProcessing: {
                                    //             isLoading: true,
                                    //         },
                                    //     }),
                                    // );
                                    if (gridView) {
                                        gridView.classList.remove('gridView_container_active');
                                    }
                                }}
                            />
                        )}
                    </div>
                    {isLoading && isLoading ? (
                        <Skeleton title={false} />
                    ) : (
                        // <LoadingComponent
                        //     type="spinningBubbles"
                        //     className={style.diatributionDetail_loading}
                        // />

                        <ScrollComponent height="calc(100% - 6rem)">
                            <div className={style.dataProcessingDetail_content}>
                                <div className={style.dataProcessingDetail_contentOne}>
                                    <h2>{t('HomePage.DistributionSlider.DataProcessing Name')}</h2>
                                    <p>{dataProcessing?.name}</p>
                                </div>
                                <div className={style.dataProcessingDetail_contentTwo}>
                                    <h2>{t('HomePage.DistributionSlider.Organization')}</h2>
                                    <p>{dataProcessing?.org.name}</p>
                                </div>
                                <div className={style.dataProcessingDetail_contentThree}>
                                    <div className={style.dataProcessing_keywordHead}>
                                        <h2>{t('HomePage.DistributionSlider.Keywords')}</h2>
                                        {selectedCategory !== 'Not Bound' && isTaskGiver && (
                                            <span>
                                                <Icon
                                                    type="addition"
                                                    className={style.keyword_addition}
                                                    // style={{ color: addKeyword || removeKeyword ? '#bdbdbd' : '' }}
                                                    style={{
                                                        color:
                                                            keywordList.length >= 5
                                                                ? '#bdbdbd'
                                                                : undefined,
                                                    }}
                                                    onClick={(e) => {
                                                        if (keywordList.length >= 5) {
                                                            return;
                                                        }
                                                        e.stopPropagation();
                                                        setAddKeyword(true);
                                                        setRemoveKeyword(false);
                                                    }}
                                                />
                                                <Icon
                                                    type="dustbin"
                                                    className={style.keyword_dustbin}
                                                    // style={{ color: addKeyword || removeKeyword ? '#bdbdbd' : '' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setAddKeyword(false);
                                                        setRemoveKeyword(true);
                                                    }}
                                                />
                                            </span>
                                        )}
                                    </div>
                                    {dataProcessing?.role?.length === 0 ||
                                    selectedCategory === 'Not Bound' ? (
                                        //not bound
                                        <div className={style.dataProcessing_keywordEmpty}>
                                            <div className={style.keywordsEmpty_row}>
                                                <Icon
                                                    type={'warningTriangle'}
                                                    className={style.keywordsEmpty_warningIcon}
                                                />
                                                <div className={style.keywordsEmpty_warningText}>
                                                    {t('HomePage.DistributionSlider.NoKeywords')}
                                                </div>
                                            </div>
                                        </div>
                                    ) : isTaskGiver ? (
                                        //有权限
                                        // <div>123</div>
                                        keywordList && keywordList.length === 0 && !addKeyword ? (
                                            <div className={style.dataProcessing_keywordEmpty}>
                                                <div className={style.keywordsEmpty_row}>
                                                    <Icon
                                                        type={'warningTriangle'}
                                                        className={style.keywordsEmpty_warningIcon}
                                                    />
                                                    <div
                                                        className={style.keywordsEmpty_warningText}
                                                    >
                                                        {t(
                                                            'HomePage.DistributionSlider.NoKeywords',
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={style.dataProcessing_keywordList}>
                                                {keywordList?.map((item, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={
                                                                style.distribution_keywordItem
                                                            }
                                                        >
                                                            <span>{item}</span>
                                                            {removeKeyword && (
                                                                <Icon
                                                                    type="deleteMinus"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRemoveKeyword(item);
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )
                                    ) : (
                                        <div className={style.dataProcessing_keywordEmpty}>
                                            <div className={style.keywordsEmpty_row}>
                                                <Icon
                                                    type={'warningTriangle'}
                                                    className={style.keywordsEmpty_warningIcon}
                                                />
                                                <div className={style.keywordsEmpty_warningText}>
                                                    {t('HomePage.DistributionSlider.NoKeywords')}
                                                </div>
                                            </div>
                                            {!isTaskGiver && (
                                                <div className={style.keywordsEmpty_row}>
                                                    <div
                                                        className={style.keywordsEmpty_warningHint}
                                                    >
                                                        {t('HomePage.DistributionSlider.RoleTips')}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {addKeyword && (
                                        <div className={style.dataProcessing_addKeyword}>
                                            <input
                                                type="text"
                                                maxLength={30}
                                                value={keywordValue}
                                                autoFocus
                                                onChange={(e) =>
                                                    setKeywordValue(e.currentTarget.value)
                                                }
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAddKeyword(true);
                                                }}
                                                onBlur={() => {
                                                    if (!keywordValue) {
                                                        setAddKeyword(false);
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleAddKeyword();
                                                    }
                                                    if (e.key === 'Escape') {
                                                        setAddKeyword(false);
                                                        setKeywordValue('');
                                                    }
                                                }}
                                            />
                                            <span>
                                                <Icon
                                                    type="right"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (keywordValue) {
                                                            handleAddKeyword();
                                                            setKeywordValue('');
                                                        }
                                                    }}
                                                />
                                                <Icon
                                                    type="close"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setAddKeyword(false);
                                                        setKeywordValue('');
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollComponent>
                    )}
                </>
            )}
        </div>
    );
};
export default DataProcessingDetail;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
