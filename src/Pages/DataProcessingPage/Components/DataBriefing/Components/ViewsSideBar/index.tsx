/**
 * @file ViewsSideBar
 * @date 2022-08-30
 * @author liaoli
 * @lastModify liaoli 2022-08-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, Kite, ScrollComponent, Transition } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './style.scss';
import CreateView from './Components/CreateView';
import DelView from './Components/DelView';
import AddQuestion from './Components/AddQuestion';
// import { viewInfo } from '~/DefaultData/DataBriefing';
import { JobListType } from '~/Store/JobList/types';
import * as actions from '~/Store/JobView/actions';
import { RootState } from '~/Store/rootReducer';
import Skeleton from '~/Components/Skeleton';
import { ViewType } from '~/Store/JobView/types';
import { QList } from '~/Utils/loopNodeUtils';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
type currentQuestionType = {
    view: string;
    question: string;
};
interface ViewsSideBar {
    job?: JobListType;
    tgId: string;
    currentQuestion: currentQuestionType;
    isWriter: boolean;
    handleChange: (v: currentQuestionType) => void;
    handleGetViewInfo: (id: string) => void;
}
const ViewsSideBar: React.FC<ViewsSideBar> = ({
    currentQuestion,
    tgId,
    job,
    isWriter,
    handleChange,
    handleGetViewInfo,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const defaultView = useSelector((state: RootState) => state.jobView.getDefaultView);

    const getViewInfo = useSelector((state: RootState) => state.jobView.getViewInfo);

    const getShareData = useSelector((state: RootState) => state.jobView.getShareData);

    const shareParams = useSelector((state: RootState) => state.preparation.shareView);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    const getJobResult = useSelector((state: RootState) => state.jobList.getJobResult);

    const {
        // isLoading,
        data: { views },
    } = useSelector((state: RootState) => state.jobView.getViewList);

    /** 是否显示添加视角弹框 */
    const [showCreateView, setShowCreateView] = useState(false);

    /** 是否显示删除视角弹框 */
    const [showDelView, setShowDelView] = useState(false);

    /** 是否显示添加题目弹框 */
    const [showAddQuestion, setShowAddQuestion] = useState(false);

    const [showViewList, setShowViewList] = useState<string[]>([]);

    // const [currentQuestion, setCurrentQuestion] = useState({
    //     view: '-1',
    //     question: '',
    // });

    /** 点击选项的元素 */
    const [selectView, setSelectView] = useState<{ id?: string; name?: string; el?: EventTarget }>(
        {},
    );
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        if (shareParams.isSameOrg && shareParams.sign) {
            handleChange({ view: getShareData.view.id, question: '' });
            handleGetViewInfo(getShareData.view.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getShareData.view.id, shareParams.isSameOrg]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** 获取题目图标 */
    const questionIcon = (type: string) => {
        switch (type) {
            case 'Single':
                return 'singleChoiceUnselected';
            case 'Multi':
                return 'multipleLinear';
            case 'OpenEnd':
                return 'openEnd2';
            case 'Numeric':
                return 'Numeric';
            case 'global':
            case 'marks':
                return 'GlobalVariable';
            default:
                return 'multipleLinear';
        }
    };
    /** 获取内容 */
    const getNodeType = (type: string, isExtra: boolean) => {
        let content = '';
        if (isExtra) {
            content = '被访者变量-';
        }
        const allTypes = {
            Single: '单选',
            Multi: '多选',
            OpenEnd: '开放',
            Numeric: '数字',
        };
        if (allTypes[type]) {
            content += allTypes[type];
        }
        return content;
    };
    /** 切换列表的展开 */
    const toggleShowView = (id: string) => {
        const index = showViewList.findIndex((item) => item == id);
        if (index > -1) {
            showViewList.splice(index, 1);
        } else {
            showViewList.push(id);
        }
        setShowViewList(Object.assign([], showViewList));
    };

    /** 列表是否展开 */
    const isCurrentQuestion = (view: string, question: string) => {
        return currentQuestion.question === question && currentQuestion.view === view;
    };

    const getQuestionList = (id: string) => {
        return [
            ...((getJobStage.status !== -1
                ? getViewInfo[id]?.question
                : getViewInfo[id]?.question.filter((v) => !v.is_extra)) || []),
            ...(getViewInfo[id]?.global && getJobStage.status !== -1
                ? [{ id: 'global', type: 'global', text: 'global', is_extra: false }]
                : []),
            ...(getViewInfo[id]?.marks && getJobStage.status !== -1
                ? [{ id: 'marks', type: 'marks', text: 'marks', is_extra: false }]
                : []),
        ];
    };

    const getShareQuestionList = () => {
        return [
            ...((getShareData.view.job.stages?.status !== -1
                ? getShareData.data
                : getShareData.data.filter((v) => !v.is_extra)) || []),
            ...(getShareData.view.config.global && getShareData.view.job.stages?.status !== -1
                ? [{ id: 'global', type: 'global', text: 'global', is_extra: false }]
                : []),
            ...(getShareData.view.config.marks && getShareData.view.job.stages?.status !== -1
                ? [{ id: 'marks', type: 'marks', text: 'marks', is_extra: false }]
                : []),
        ];
    };

    const handleDelQuestion = (view, question, index) => {
        const data = {
            questions: getViewInfo[view.id].question.filter((v) => v.id !== question.id),
            global: question.id === 'global' ? false : getViewInfo[view.id].global || false,
            marks: question.id === 'marks' ? false : getViewInfo[view.id].marks || false,
        };
        dispatch(
            actions.updateViewSaga({
                talent_group_id: tgId,
                view_id: view.id,
                questions: data,
                callBack() {
                    dispatch(
                        actions.updateViewInfoAction({
                            id: view.id,
                            question: data.questions,
                            global: data.global,
                            marks: data.marks,
                        }),
                    );
                    if (
                        currentQuestion.view === view.id &&
                        currentQuestion.question === question.id
                    ) {
                        handleChange({
                            view: view.id,
                            question: getViewInfo[view.id].question?.[index - 1]?.id || 'global',
                        });
                    }
                },
            }),
        );
    };

    const getDefaultView = () => {
        type QuestListType = {
            id: string;
            type: string;
            text: string;
            titleText?: string;
            is_extra: boolean;
        };
        let list: (ViewType | QuestListType)[] = [];
        if (!shareParams.isSameOrg && getShareQuestionList().length) {
            list = getShareQuestionList();
            return list;
        }
        if (defaultView) {
            list = defaultView
                ?.filter((v) => !v.is_extra)
                .map((item) => {
                    return { ...item, titleText: QList.getText(item.text) };
                });
        }

        return list;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <ScrollComponent className={style.viewsSideBar_scroll}>
            <div className={style.viewsSideBar_container}>
                <ul className={style.views_list}>
                    <li className={style.views_item}>
                        <div
                            className={`${style.default_view} ${
                                !getJobResult?.length && !getShareData.view.id
                                    ? style.viewsSideBar_notResult
                                    : ''
                            }`}
                            onClick={() => {
                                handleChange({
                                    view: '-1',
                                    question: '',
                                });
                                !showViewList.includes('-1') && toggleShowView('-1');
                            }}
                        >
                            <div>
                                <Icon
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleShowView('-1');
                                    }}
                                    className={style.views_downIcon}
                                    style={
                                        showViewList.includes('-1')
                                            ? { transform: 'rotate(0)' }
                                            : {}
                                    }
                                    type="down"
                                />
                                <p
                                    style={
                                        currentQuestion.view === '-1' ? { color: '#22A6B3' } : {}
                                    }
                                >
                                    {!shareParams.sign || shareParams.isSameOrg
                                        ? '默认视角'
                                        : getShareData.view.name}
                                </p>
                            </div>
                            {isWriter && (!shareParams.sign || shareParams.isSameOrg) && (
                                <Icon
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowCreateView(true);
                                    }}
                                    className={style.views_addIcon}
                                    type="addition"
                                />
                            )}
                        </div>
                        <Transition show={showViewList.includes('-1')} animationType="taller">
                            {(!shareParams.isSameOrg && getShareQuestionList().length) ||
                            defaultView?.length ? (
                                <ul className={style.question_list}>
                                    {getDefaultView().map((item) => {
                                        return (
                                            <li
                                                key={item.id}
                                                onClick={() => {
                                                    handleChange({
                                                        view: '-1',
                                                        question: item.id,
                                                    });
                                                }}
                                                className={
                                                    isCurrentQuestion('-1', item.id)
                                                        ? style.question_selectItem
                                                        : ''
                                                }
                                            >
                                                <div className={style.question_select}></div>
                                                <div className={style.question_name}>
                                                    <Icon
                                                        type={
                                                            item.is_extra
                                                                ? 'VariableOfRespondent'
                                                                : questionIcon(item.type)
                                                        }
                                                        className={style.question_icon}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                        }}
                                                    />
                                                    {/* <p>{item.text}</p> */}
                                                    <p>{QList.getText(item.text)}</p>
                                                    {/* <p>{item.titleText && item.titleText}</p> */}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <div className={style.question_empty}>当前job无表单数据</div>
                            )}
                        </Transition>
                    </li>
                    {/** 视角 */}
                    {(!getShareData.data.length || shareParams.isSameOrg) &&
                        views?.map((item) => {
                            return (
                                <li className={style.views_item} key={item.id}>
                                    <div
                                        className={style.custom_view}
                                        onClick={(e) => {
                                            handleGetViewInfo(item.id);
                                            const el = e.target as HTMLElement;
                                            if (el?.nodeName != 'svg' && el?.nodeName != 'path') {
                                                handleChange({
                                                    view: item.id,
                                                    question: '',
                                                });
                                                !showViewList.includes(item.id) &&
                                                    toggleShowView(item.id);
                                            }
                                        }}
                                    >
                                        <div>
                                            <Icon
                                                onClick={() => {
                                                    toggleShowView(item.id);
                                                }}
                                                className={style.views_downIcon}
                                                style={
                                                    showViewList.includes(item.id)
                                                        ? { transform: 'rotate(0)' }
                                                        : {}
                                                }
                                                type="down"
                                            />
                                            <p
                                                style={
                                                    currentQuestion.view === item.id
                                                        ? { color: '#22A6B3' }
                                                        : {}
                                                }
                                            >
                                                {item.name}
                                            </p>
                                        </div>
                                        {isWriter && (
                                            <Icon
                                                className={style.view_moreIcon}
                                                type="moreHorizontal"
                                                onClick={(e) => {
                                                    if (selectView.id === item.id) {
                                                        setSelectView({});
                                                    } else {
                                                        setSelectView({
                                                            el: e.target,
                                                            id: item.id,
                                                            name: item.name,
                                                        });
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>
                                    <Transition
                                        show={showViewList.includes(item.id)}
                                        animationType="taller"
                                    >
                                        {!getViewInfo[item.id] ? (
                                            <Skeleton
                                                row={3}
                                                style={{ padding: '0.6rem', marginTop: '-2.4rem' }}
                                                paragraph={{ height: '2rem' }}
                                            />
                                        ) : getQuestionList(item.id).length ? (
                                            <ul className={style.question_list}>
                                                {getQuestionList(item.id)?.map((items, index) => {
                                                    return (
                                                        <li
                                                            key={items.id}
                                                            onClick={() => {
                                                                handleChange({
                                                                    view: item.id,
                                                                    question: items.id,
                                                                });
                                                            }}
                                                            className={
                                                                isCurrentQuestion(item.id, items.id)
                                                                    ? style.question_selectItem
                                                                    : ''
                                                            }
                                                        >
                                                            <div
                                                                className={style.question_select}
                                                            ></div>
                                                            <div className={style.question_name}>
                                                                <Icon
                                                                    type={
                                                                        items.is_extra
                                                                            ? 'VariableOfRespondent'
                                                                            : questionIcon(
                                                                                  items.type,
                                                                              )
                                                                    }
                                                                    className={style.question_icon}
                                                                />
                                                                <p>
                                                                    {items.is_extra &&
                                                                        getNodeType(
                                                                            // items.text,
                                                                            items.type,
                                                                            items.is_extra,
                                                                        )}
                                                                    {/* {items.text} */}
                                                                    {QList.getText(items.text)}
                                                                </p>
                                                            </div>
                                                            {isWriter && (
                                                                <Icon
                                                                    type="dustbin"
                                                                    className={
                                                                        style.question_delIcon
                                                                    }
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();

                                                                        handleDelQuestion(
                                                                            item,
                                                                            items,
                                                                            index,
                                                                        );
                                                                    }}
                                                                />
                                                            )}
                                                        </li>
                                                    );
                                                })}

                                                {/* <li className={style.question_selectItem}>
                                                    <div className={style.question_select}></div>
                                                    <Icon type="login" />
                                                    <Icon type="dustbin" />
                                                </li> */}
                                            </ul>
                                        ) : (
                                            <div className={style.question_empty}>无问题或变量</div>
                                        )}
                                    </Transition>
                                </li>
                            );
                        })}
                </ul>
                {selectView?.el && (
                    <Kite
                        offset={{
                            x: -51,
                        }}
                        show={true}
                        handleGlobalClick={(v) => {
                            if (!v.isBtn && !v.isMenu) {
                                setSelectView({});
                            }
                        }}
                        root={selectView?.el as Element}
                        className={style.view_more__kite}
                    >
                        <div className={style.view_more}>
                            <p
                                className={style.view_addQuestion}
                                onClick={() => {
                                    setSelectView({ ...selectView, el: undefined });

                                    setShowAddQuestion(true);
                                }}
                            >
                                添加题目与变量
                            </p>
                            <p
                                className={style.delView}
                                onClick={() => {
                                    setSelectView({
                                        ...selectView,
                                        el: undefined,
                                    });

                                    setShowDelView(true);
                                }}
                            >
                                删除视角
                            </p>
                        </div>
                    </Kite>
                )}
                {showDelView && (
                    <DelView
                        currentView={{ id: selectView?.id, name: selectView?.name }}
                        show={showDelView}
                        handleClose={() => {
                            setShowDelView(false);
                        }}
                        handleDelView={(id) => {
                            dispatch(
                                actions.deleteViewSaga({
                                    talent_group_id: tgId,
                                    view_id: id,
                                    callBack() {
                                        if (currentQuestion.view === id) {
                                            handleChange({
                                                view: '-1',
                                                question: '',
                                            });
                                        }
                                        if (!job) return;
                                        dispatch(
                                            actions.getViewListSaga({
                                                talent_group_id: tgId,
                                                job_id: job.id,
                                                callBack() {
                                                    setShowDelView(false);
                                                },
                                            }),
                                        );
                                    },
                                }),
                            );
                        }}
                    />
                )}
                {showCreateView && (
                    <CreateView
                        job={job}
                        tgId={tgId}
                        handleClose={() => {
                            setShowCreateView(false);
                        }}
                        defaultView={defaultView}
                        show={showCreateView}
                    />
                )}

                {showAddQuestion && (
                    <AddQuestion
                        viewInfo={getViewInfo}
                        id={selectView.id}
                        show={showAddQuestion}
                        defaultView={defaultView}
                        handleClose={() => {
                            setShowAddQuestion(false);
                        }}
                        handleAddView={(id, data, global, marks) => {
                            dispatch(
                                actions.updateViewSaga({
                                    talent_group_id: tgId,
                                    view_id: id,
                                    questions: {
                                        questions: data,
                                        global,
                                        marks,
                                    },
                                    callBack() {
                                        dispatch(
                                            actions.updateViewInfoAction({
                                                id: id,
                                                question: data,
                                                global,
                                                marks,
                                            }),
                                        );
                                        setShowAddQuestion(false);
                                    },
                                }),
                            );
                        }}
                    />
                )}
            </div>
        </ScrollComponent>
    );
};
export default ViewsSideBar;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
