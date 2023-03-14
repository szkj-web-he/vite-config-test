/**
 * @file
 * @date 2022-05-15
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2022-05-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Col,
    Icon,
    NavTool,
    Row,
    ScrollComponent,
    useLoginStatus,
} from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getUrlParamsObj } from '~/DefaultData/utils';
import { useWindowSize } from '~/Utils/windowSize';
import Header from '../Header';
import DistributionNav from './Components/DataProcessingNav';
import DataProcessing from './Components/DataProcessing';
import Preparation from './Components/Preparation';
import DataProcessingInfoWindow from './Components/DataProcessingInfoWindow';
import {
    getNavDataSaga,
    saveSelectedTGAction,
    saveShareViewAction,
} from '~/Store/Preparation/actions';
import { updateCurrentJobAction } from '~/Store/JobList/actions';
import style from './style.scss';
import { RootState } from '~/Store/rootReducer';
import DataBriefing from './Components/DataBriefing';
import { getJobListSaga } from '~/Store/JobList/actions';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { getUserInfo } from '~/Store/UserState/actions';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const DataProcessingPage: React.FC = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { dataProcId, tgId, sign, random, role_limit, view_id, job_id, share_org } =
        getUrlParamsObj<{
            sign: string;
            random: string;
            role_limit: string;
            view_id: string;
            dataProcId: string;
            tgId: string;
            job_id: string;
            share_org: string;
        }>(location.search);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);
    const loginState = useLoginStatus();
    const jobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    const [clientWidth] = useWindowSize();

    const { currentRole, shareView } = useSelector((state: RootState) => state.preparation);

    const isNotEnter = useSelector((state: RootState) => state.jobList.getJobList.data?.length);

    const tg_id = useSelector((state: RootState) => state.preparation.selectedTg, shallowEqual);

    const currentOrg = useSelector((state: RootState) => state.preparation.navData.organization);

    /** distribution window show */
    const [windowShow, setWindowShow] = useState(false);
    /** step */
    const [step, setStep] = useState(sign ? 3 : 1);

    /** 选择的处理方式 */
    const [dataProcessingMethod, setDataProcessingMethod] = useState<'default' | 'custom'>(
        'default',
    );
    useEffect(() => {
        if (loginState.status) {
            dispatch(getUserInfo());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginState.status]);
    useEffect(() => {
        if (!tg_id && tgId) {
            dispatch(saveSelectedTGAction(tgId));
        }
    }, [dispatch, tgId, tg_id]);

    /** 获取导航信息 */
    useEffect(() => {
        if (tg_id && dataProcId) {
            setWindowShow(false);
            dispatch(
                getNavDataSaga({
                    talent_group_id: tg_id,
                    data_proc_id: dataProcId,
                }),
            );
        } else if (sign && !role_limit) {
            setWindowShow(false);
        } else {
            setWindowShow(true);
        }
    }, [tg_id, dataProcId, dispatch, sign, role_limit]);

    /** 保存分享的参数 */
    useEffect(() => {
        if (sign && random) {
            dispatch(
                saveShareViewAction({
                    sign,
                    random,
                    view_id,
                    role_limit: role_limit ? role_limit.split('|') : [],
                    job_id,
                    share_org,
                    isSameOrg: share_org === currentOrg.id,
                }),
            );
        }
    }, [sign, random, role_limit, dispatch, view_id, job_id, share_org, currentOrg.id]);

    useEffect(() => {
        if (shareView.isSameOrg) {
            dispatch(
                getJobListSaga({
                    data_proc_id: dataProcId,
                    talent_group_id: tg_id || tgId,
                    fetch_archived: false,
                    deliv_role: currentRole,
                    callback(res) {
                        const currentJob = res.find((v) => v.id === shareView.job_id);
                        if (currentJob) {
                            dispatch(updateCurrentJobAction(currentJob));
                        }
                    },
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shareView.isSameOrg]);

    useEffect(() => {
        if (dataProcessingMethod === 'custom') {
            if (jobStage.status === -1 && currentJob) {
                dispatch(
                    updateJobStageSaga({
                        job_id: currentJob.id,
                        talent_group_id: tgId,
                        stages: {
                            status: 0,
                            config: jobStage.config,
                        },
                    }),
                );
            }
        } else if (dataProcessingMethod === 'default') {
            if (jobStage.status !== -1 && currentJob) {
                dispatch(
                    updateJobStageSaga({
                        job_id: currentJob.id,
                        talent_group_id: tgId,
                        stages: {
                            status: -1,
                            config: jobStage.config,
                        },
                    }),
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataProcessingMethod]);

    useEffect(() => {
        if (!jobStage) {
            setDataProcessingMethod('default');
        }
        if (jobStage.status === -1) {
            setDataProcessingMethod('default');
        } else {
            setDataProcessingMethod('custom');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobStage.status]);

    useEffect(() => {
        return () => {
            dispatch(updateCurrentJobAction(undefined));
        };
    }, [dispatch]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const disableList = () => {
        if (shareView.sign && !shareView.isSameOrg && !shareView.role_limit.length) {
            return [
                {
                    step: 1,
                    content: '',
                },
                {
                    step: 2,
                    content: '',
                },
            ];
        } else if (shareView.sign && !shareView.isSameOrg) {
            return [
                {
                    step: 2,
                    content: '',
                },
            ];
        } else if (!isNotEnter) {
            return [
                {
                    step: 2,
                    content: '您还未创建任何job, 请先在工作列表中创建job',
                },
                {
                    step: 3,
                    content: '您还未创建任何job, 请先在工作列表中创建job',
                },
            ];
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div style={{ minWidth: '102.4rem' }}>
            <Header />
            <DistributionNav
                step={step}
                handleStep={(step) => {
                    setStep(step);
                }}
                isDisable={disableList()}
            />
            <ScrollComponent
                className={style.container_scroll}
                bodyClassName={style.dataProcContent}
                isSmooth
                height="calc(100% - 10px)"
            >
                {step === 1 && (
                    <Preparation
                        setStep={(v) => {
                            setStep(v);
                        }}
                    />
                )}
                {step === 2 && (
                    <DataProcessing
                        setStep={(v: number) => setStep(v)}
                        dataProcessingMethod={dataProcessingMethod}
                        handleUpdateProcessingMethod={(v) => setDataProcessingMethod(v)}
                    />
                )}
                {step === 3 && <DataBriefing setStep={(v: number) => setStep(v)} />}
            </ScrollComponent>
            {step !== 1 && (
                <div className={style.container_btnWrap}>
                    <Row>
                        <Col
                            className={style.dataProcessing_btn}
                            span={clientWidth <= 1440 ? 10 : 8}
                        >
                            <div className={style.dataProcessing_btnWrap}>
                                {step !== 1 && (
                                    <button
                                        className={style.btn_previous}
                                        onClick={() => setStep(step - 1)}
                                    >
                                        <Icon type="open" />
                                        <Icon type="open" className={style.open_icon} />
                                        <span>{t('Common.Previous')}</span>
                                    </button>
                                )}
                                {step === 2 && (
                                    <button
                                        className={style.btn_next}
                                        onClick={() => {
                                            setStep(step + 1);
                                        }}
                                    >
                                        <span>{t('Common.Next')}</span>
                                        <Icon type="open" className={style.open_icon} />
                                        <Icon type="open" />
                                    </button>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            )}

            <DataProcessingInfoWindow
                openVisible={windowShow}
                handleClose={() => setWindowShow(false)}
            />
            <NavTool mode="fixed" />
        </div>
    );
};
export default DataProcessingPage;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
