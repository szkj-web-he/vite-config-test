/**
 * @file DataBriefing
 * @date 2022-08-30
 * @author liaoli
 * @lastModify liaoli 2022-08-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Button, Icon, notice, Col, Row } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoleNavBox from '../RoleNavBox';
import ViewRename from './Components/ViewRename';
import ViewShare from './Components/ViewShare';
import ViewsSideBar from './Components/ViewsSideBar';
import style from './style.scss';
// import { viewInfo } from '~/DefaultData/DataBriefing';
import QuestionsChart from './Components/QuestionsChart';
import { RootState } from '~/Store/rootReducer';
import {
    getJobResultSaga,
    getJobQuestionSaga,
    updateJobQuestionAction,
    updateJobResultAction,
} from '~/Store/JobList/actions';
import { JobQuestionType } from '~/Store/JobList/types';
import {
    getShareViewSaga,
    // getShareViewSaga,
    getViewInfoSaga,
    getViewListSaga,
    shareViewSaga,
    updateDefaultViewAction,
    updateShareDataAction,
    updateViewInfoAction,
    updateViewListAction,
    updateViewSaga,
    viewRenameSaga,
} from '~/Store/JobView/actions';
import { chartColorList } from '~/DefaultData/DataBriefing';
import ChartLoading from './Components/ChartLoading';
import Skeleton from '~/Components/Skeleton';
import emptyImg from '~/Assets/images/icon_questionnaire.png';
import JobNavigation from '../JobNavigation';
import { copyText } from '~/Utils/str';
import { GetShareDataType, ViewType } from '~/Store/JobView/types';
import { saveShareViewAction } from '~/Store/Preparation/actions';
import GlobalVarTable from './Components/GlobalVarTable';
import { getJobStageSage } from '~/Store/JobStage/actions';
import { QList } from '~/Utils/loopNodeUtils';
// import { viewInfo } from '~/DefaultData/DataBriefing';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface DataBriefingProps {
    setStep: (v: number) => void;
}
const DataBriefing: React.FC<DataBriefingProps> = ({ setStep }): JSX.Element => {
    /* <------------------------------------ ****  STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const dispatch = useDispatch();

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const { currentRole, shareView } = useSelector((state: RootState) => state.preparation);

    /** getDataProcessing info */
    const dataProcInfo = useSelector((state: RootState) => state.preparation.navData.data_proc);

    const getShareData = useSelector((state: RootState) => state.jobView.getShareData);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    const getJobResult = useSelector((state: RootState) => state.jobList.getJobResult);

    /** 视角列表 */
    const {
        isLoading,
        data: { views },
    } = useSelector((state: RootState) => state.jobView.getViewList);

    /** 当前选中的job */
    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    /** views info */
    const getViewInfo = useSelector((state: RootState) => state.jobView.getViewInfo);

    // 图标的原数据
    const jobQuestion = useSelector((state: RootState) => state.jobList.getJobQuestion);
    const jobResult = useSelector((state: RootState) => state.jobList.getJobResult)?.find(
        (v) => v.stage === 'default processing',
    )?.data.options_count;

    // const allJobResult = useSelector((state: RootState) => state.jobList.getJobResult);

    const defaultData = useSelector((state: RootState) => state.jobView.getDefaultView);

    /** 当前选中的视角和题目 */
    const [currentQuestion, setCurrentQuestion] = useState({
        view: '-1',
        question: '',
    });

    /** 视角重命名弹框 */
    const [showViewRename, setShowViewRename] = useState(false);

    /** 复制链接弹框 */
    const [showViewShare, setShowViewShare] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */

    /** 获取分享的数据 */
    useEffect(() => {
        if (shareView.sign && (!shareView.role_limit?.length || tgId)) {
            dispatch(
                getShareViewSaga({
                    view_id: shareView.view_id,
                    sign: shareView.sign,
                    random: shareView.random,
                    talent_group_id: tgId || undefined,
                    role_limit: shareView.role_limit,
                    callBack(res) {
                        shareDataToChart(res);
                    },
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, shareView, tgId]);

    /** 获取数据处理配置 */
    useEffect(() => {
        if (currentJob && tgId) {
            dispatch(
                getJobStageSage({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                }),
            );
        }
    }, [currentJob, dispatch, tgId]);

    useEffect(() => {
        return () => {
            dispatch(
                saveShareViewAction({
                    ...shareView,
                    isSameOrg: true,
                }),
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** 获取view info */
    useEffect(() => {
        if (currentJob) {
            dispatch(
                getJobResultSaga({
                    job_id: currentJob.id,
                    talent_group_id: tgId,
                }),
            );
            dispatch(
                getJobQuestionSaga({
                    job_id: currentJob.id,
                    talent_group_id: tgId,
                    isExport: false,
                    callback(res) {
                        dispatch(updateJobQuestionAction(res || []));
                    },
                }),
            );
        }
    }, [dispatch, currentJob, tgId]);

    /** 获取vie list */
    useEffect(() => {
        if (currentJob && tgId) {
            dispatch(
                getViewListSaga({
                    job_id: currentJob.id,
                    talent_group_id: tgId,
                }),
            );
        }
    }, [dispatch, currentJob, tgId]);

    /** 找到当前选中的视角或问题对应的数据 */
    const showViewList = useMemo(() => {
        let data: ViewType[] = [];

        console.log('currentQuestion', currentQuestion);

        if (currentQuestion.view === '-1') {
            if (currentQuestion.question) {
                data =
                    (
                        (!shareView.isSameOrg && getShareData.view.id && getShareData.data) ||
                        defaultData
                    )?.filter((v) => v.id === currentQuestion.question) || [];
            } else {
                // const data: ViewType[] = [];
                data = [];
                if (!shareView.isSameOrg && getShareData.view.id && getShareData.data) {
                    data = getShareData.data;
                } else if (defaultData) {
                    data = defaultData;
                }
            }
        } else {
            const questionsData = getViewInfo[currentQuestion.view]?.question?.map((v) => {
                return {
                    ...v,
                    dataSets: v.dataSets.map((item) => {
                        return {
                            ...item,
                            data:
                                defaultData
                                    ?.find((items) => items.id === v.id)
                                    ?.dataSets.find((i) => i.id === item.id)?.data || [],
                        };
                    }),
                };
            });

            if (currentQuestion.question) {
                data = questionsData?.filter((v) => v.id === currentQuestion.question) || [];
            } else {
                data = questionsData || [];
            }
        }
        if (getJobStage.status !== -1 || getShareData.view.job.stages?.status !== -1) {
            return data;
        } else {
            return data.filter((v) => !v.is_extra);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        currentQuestion.question,
        currentQuestion.view,
        defaultData,
        getJobStage.status,
        getShareData.data,
        getShareData.view.id,
        getShareData.view.job.stages?.status,
        getViewInfo,
        shareView.isSameOrg,
    ]);

    console.log('showViewList', showViewList);

    const isWriter = useMemo(() => {
        return currentRole === 'writer';
    }, [currentRole]);

    /** 生成默认视角 */
    useEffect(() => {
        if (jobQuestion && jobResult) {
            const res = jobQuestion
                // .filter((v) => !v.is_extra)
                .map((item) => {
                    const isTwoDimensional = item.q_dimension.length > 1;
                    const chartOption = {
                        is_extra: !!item.is_extra,
                        id: item.qid,
                        type: item.q_type,
                        // text: getSpanInner(item.q_text),
                        text: item.q_text,
                        label: getSpanInner(item.q_label_name),
                        isTwoDimensional,
                        is_loop: item.is_loop,
                        labelData: isTwoDimensional
                            ? item?.q_dimension[1].map((items) => ({
                                  value: getSpanInner(items.option_text),
                                  id: items.option_code,
                              }))
                            : item?.q_dimension[0].map((items) => ({
                                  value: getSpanInner(items.option_text),
                                  id: items.option_code,
                              })),
                        chartsType: [1, 1],
                        dataSets: getChartData(item) || [],
                        specificValue: false,
                        max: 100,
                        min: 0,
                        yType: 0,
                        yGuides: 0,
                    };

                    chartOption.max = Math.max(
                        ...chartOption.labelData.map((v, i) => {
                            return (
                                chartOption.dataSets as { data: (number | undefined)[] }[]
                            ).reduce((num, item) => {
                                return (num += item.data[i] || 0);
                            }, 0);
                        }),
                    );

                    return chartOption;
                });
            // const mark = allJobResult?.map(v=>v.data.marks_count)
            console.log('更新default1', res);

            dispatch(updateDefaultViewAction(res || []));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobQuestion, jobResult]);

    useEffect(() => {
        return () => {
            dispatch(updateDefaultViewAction([]));
            dispatch(updateJobResultAction([]));
            dispatch(updateJobQuestionAction([]));
            dispatch(
                updateViewListAction({
                    isLoading: true,
                    data: [],
                }),
            );
        };
    }, [dispatch]);

    /** 当前的view name */
    const currentViewName = useMemo(() => {
        return currentQuestion.view === '-1'
            ? !shareView.sign || shareView.isSameOrg
                ? '默认视角'
                : getShareData.view.name
            : views?.find((v) => v.id === currentQuestion.view)?.name;
    }, [currentQuestion.view, getShareData.view.name, shareView.isSameOrg, shareView.sign, views]);

    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    const getSpanInner = (str: string) => {
        const res = str.match(/<span[^>]*>([\s\S]*?)<\/span>/);
        return res ? res[1] : str ? str : '选项1';
    };

    /** 生成默认颜色 */
    const getColor = (index: number) => {
        return chartColorList[index % chartColorList.length];
    };

    /** 分享视角 */
    const handleShareView = (
        viewId: string,
        sign: string,
        random: string,
        role_limit?: string[],
    ) => {
        const origin = window.location.origin;
        copyText(
            `${origin}${
                process.env.BASENAME == '/' ? '' : (process.env.BASENAME as string)
            }/dataProcessing?sign=${sign}&random=${random}${
                role_limit?.length ? '&role_limit=' + role_limit.join('|') : ''
            }&dataProcessingName=${dataProcInfo.name}&view_id=${viewId}&share_org=${
                currentJob?.creator_org.id || ''
            }&job_id=${currentJob?.id || ''}`,
        )
            .then(() => {
                notice.success({
                    title: '成功',
                    description: '已复制链接',
                    showIcon: true,
                });
            })
            .catch((message) => {
                console.log('error', message);
            });
    };

    /** 通过分享返回的配置以及原数据进行生成图表 */
    const shareDataToChart = (data: GetShareDataType) => {
        const result = data.job_result.find((item) => item.stage === 'default processing')?.data
            .options_count;
        if (!result) return;
        const shareChartData = data.view.config.questions.map((v) => {
            let dataSets;
            switch (v.type) {
                case 'Single':
                    if (v.isTwoDimensional) {
                        dataSets = v.dataSets.map((item) => {
                            return {
                                ...item,
                                data: v.labelData.map(
                                    (items) => result[`${v.id}#${item.id}`]?.[items.id],
                                ),
                            };
                        });
                    } else {
                        dataSets = v.dataSets.map((item) => {
                            return {
                                ...item,
                                data: v.labelData.map((items) => result[v.id]?.[items.id]),
                            };
                        });
                    }
                    break;
                default:
                    if (v.isTwoDimensional) {
                        dataSets = v.dataSets.map((item) => {
                            return {
                                ...item,
                                data: v.labelData.map(
                                    (items) => result[`${v.id}#${item.id}_${items.id}`]?.['1'],
                                ),
                            };
                        });
                    } else {
                        dataSets = v.dataSets.map((item) => {
                            return {
                                ...item,
                                data: v.labelData.map(
                                    (items) => result[`${v.id}#${items.id}`]?.['1'],
                                ),
                            };
                        });
                    }
            }
            return {
                ...v,
                dataSets: dataSets,
            };
        });
        dispatch(
            updateShareDataAction({
                view: data.view,
                data: shareChartData,
                jobResult: data.job_result,
            }),
        );
    };

    /** 通过答案和问题生成默认的表格数据 */
    const getChartData = (v: JobQuestionType) => {
        if (!jobResult) return;
        const isTwoDimensional = v.q_dimension.length > 1;
        switch (v.q_type) {
            case 'Single':
                if (isTwoDimensional) {
                    return v.q_dimension?.[0]?.map((item, index) => {
                        const data = v.q_dimension?.[1]?.map((items) => {
                            return jobResult[`${v.qid}#${item.option_code}`]?.[
                                items.option_code
                            ] as number | undefined;
                        });
                        return {
                            data,
                            backgroundColor: getColor(index),
                            label: getSpanInner(item.option_text),
                            id: item.option_code,
                        };
                    });
                } else {
                    const data = v.q_dimension?.[0]?.map((item) => {
                        return jobResult[v.qid]?.[item.option_code] as number | undefined;
                    });
                    return [
                        {
                            data,
                            backgroundColor: v.q_dimension?.[0].map((i, index) => ({
                                id: i.option_code,
                                value: getColor(index),
                            })),
                            label: QList.getText(v.q_text),
                            id: '-1',
                        },
                    ];
                }
            default:
                if (isTwoDimensional) {
                    return v.q_dimension?.[0]?.map((item, index) => {
                        const data = v.q_dimension?.[1]?.map((items) => {
                            return jobResult[`${v.qid}#${item.option_code}_${items.option_code}`]?.[
                                '1'
                            ] as number | undefined;
                        });
                        return {
                            data,
                            backgroundColor: getColor(index),
                            label: getSpanInner(item.option_text),
                            id: item.option_code,
                        };
                    });
                } else {
                    const data = v.q_dimension?.[0]?.map((item) => {
                        return jobResult[`${v.qid}#${item.option_code}`]?.['1'] as
                            | number
                            | undefined;
                    });
                    return [
                        {
                            data,
                            backgroundColor: v.q_dimension?.[0].map((i, index) => ({
                                id: i.option_code,
                                value: getColor(index),
                            })),
                            label: QList.getText(v.q_text),
                            id: '-1',
                        },
                    ];
                }
        }
    };

    const disableList = () => {
        if (shareView.sign && !shareView.isSameOrg && !shareView.role_limit.length) {
            return [1, 2];
        } else if (shareView.sign && !shareView.isSameOrg) {
            return [2];
        } else {
            return [];
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.dataBriefing_container}>
            <Row justify="center">
                <Col span={10}>
                    <JobNavigation
                        step={3}
                        viewName={currentViewName || '默认视角'}
                        jobName={shareView.sign && getShareData.view.job.name}
                        dataProcName={shareView.sign && getShareData.view.job.data_proc.name}
                        disable={disableList()}
                        handleStepClick={(step) => {
                            setStep(step);
                        }}
                    />
                    <RoleNavBox />
                </Col>
            </Row>
            <Row justify="center" style={{ alignItems: 'inherit' }}>
                {/* <div className={style.dataBriefing_views}> */}
                {isLoading && (!getShareData.view.id || shareView.isSameOrg) ? (
                    <Col span={10}>
                        <ChartLoading />
                    </Col>
                ) : (
                    <>
                        <Col span={3} style={{ height: 'calc(100vh - 36.2rem)' }}>
                            <ViewsSideBar
                                job={currentJob}
                                tgId={tgId}
                                isWriter={isWriter}
                                currentQuestion={currentQuestion}
                                handleChange={(v: { view: string; question: string }) => {
                                    setCurrentQuestion(Object.assign({}, v));
                                }}
                                handleGetViewInfo={(id) => {
                                    if (getViewInfo[id]) return;

                                    dispatch(
                                        getViewInfoSaga({
                                            talent_group_id: tgId,
                                            view_id: id,
                                        }),
                                    );
                                }}
                            />
                        </Col>
                        <Col span={7} style={{ height: 'calc(100vh - 35.4rem)' }}>
                            <div className={style.dataBriefing_charts}>
                                {(getJobResult?.length || shareView.sign) && (
                                    <div className={style.question_header}>
                                        <div>
                                            <h2>{currentViewName || '默认视角'}</h2>
                                            {isWriter && !(currentQuestion.view === '-1') && (
                                                <Icon
                                                    className={style.editViewName_icon}
                                                    onClick={() => {
                                                        setShowViewRename(true);
                                                    }}
                                                    type="edit"
                                                />
                                            )}
                                        </div>
                                        {isWriter && (!shareView.sign || shareView.isSameOrg) && (
                                            <Button
                                                height="2.8rem"
                                                label="分享"
                                                size="normal"
                                                type="primary"
                                                width="5.2rem"
                                                disabled={currentQuestion.view === '-1'}
                                                onClick={() => {
                                                    setShowViewShare(true);
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                                {!getViewInfo[currentQuestion.view] &&
                                currentQuestion.view !== '-1' ? (
                                    <Skeleton
                                        row={8}
                                        style={{ padding: '0.6rem', marginTop: '-2.4rem' }}
                                    />
                                ) : currentQuestion.question === 'global' ? (
                                    <GlobalVarTable type="global" />
                                ) : currentQuestion.question === 'marks' ? (
                                    <GlobalVarTable type="marks" />
                                ) : showViewList?.length ? (
                                    <QuestionsChart
                                        isWriter={isWriter}
                                        viewId={currentQuestion.view}
                                        chartsData={[showViewList[0]] || []}
                                        handleQuestionChange={(id, viewId, data) => {
                                            const question = getViewInfo[viewId].question.map(
                                                (v) => {
                                                    if (v.id === id) {
                                                        return data;
                                                    }
                                                    return v;
                                                },
                                            );
                                            dispatch(
                                                updateViewSaga({
                                                    talent_group_id: tgId,
                                                    view_id: viewId,
                                                    questions: {
                                                        questions: question,
                                                    },
                                                    callBack() {
                                                        dispatch(
                                                            updateViewInfoAction({
                                                                id: viewId,
                                                                question,
                                                            }),
                                                        );
                                                    },
                                                }),
                                            );
                                        }}
                                    />
                                ) : (
                                    <div className={style.question_emptyImg}>
                                        <img src={emptyImg} alt="" />
                                        <p>
                                            {currentQuestion.view === '-1'
                                                ? '暂无可展示数据'
                                                : '请选择问题或者变量'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </>
                )}
                {/* </div> */}
            </Row>
            {showViewRename && (
                <ViewRename
                    view={{ id: currentQuestion.view, name: currentViewName || '默认视角' }}
                    show={showViewRename}
                    handleClose={() => {
                        setShowViewRename(false);
                    }}
                    handleViewRename={(id, name) => {
                        if (tgId && currentJob) {
                            dispatch(
                                viewRenameSaga({
                                    talent_group_id: tgId,
                                    job_id: currentJob.id,
                                    view_id: id,
                                    name,
                                    callBack() {
                                        dispatch(
                                            getViewListSaga({
                                                talent_group_id: tgId,
                                                job_id: currentJob.id,
                                            }),
                                        );
                                        setShowViewRename(false);
                                    },
                                }),
                            );
                        }
                    }}
                />
            )}

            {showViewShare && (
                <ViewShare
                    job={currentJob}
                    viewId={currentQuestion.view}
                    show={showViewShare}
                    handleClose={() => {
                        setShowViewShare(false);
                    }}
                    handleShareView={(viewId, role) => {
                        dispatch(
                            shareViewSaga({
                                talent_group_id: tgId,
                                view_id: viewId,
                                role_limit: role.length ? role : undefined,

                                callBack(res) {
                                    handleShareView(viewId, res.sign, res.random, role);
                                },
                            }),
                        );
                        setShowViewShare(false);
                    }}
                />
            )}
        </div>
    );
};
export default DataBriefing;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
