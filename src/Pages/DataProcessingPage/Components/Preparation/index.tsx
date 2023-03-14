/**
 * @file recruitment component
 * @date 2021-03-28
 * @author Chaman
 * @lastModify lidaoping 2021-06-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import style from './style.scss';
import {
    Descendant,
    Icon,
    MagneticEditor,
    Popover,
    ScrollComponent,
    Kite,
    Transition,
    Row,
    Col,
} from '@datareachable/dr_front_componentlibrary';
import Empty from '~/Components/Empty';
import EditConditions from './Components/EditConditions';
import EditDocument, { UploadFile } from './Components/EditDocument';
import DocumentIcon from '~/Components/DocumentIcon';
import { useTranslation } from 'react-i18next';
import { getUrlParamsObj } from '~/DefaultData/utils';
import { useDispatch, useSelector } from 'react-redux';
import * as preparationActions from '~/Store/Preparation/actions';
import { RootState } from '~/Store/rootReducer';
import Skeleton from '~/Components/Skeleton';
import axios, { Canceler } from 'axios';
import CreateJobs from './Components/CreateJobs';
import JobDetail from './Components/JobDetail';
import SetRefreshTime from './Components/SetRefreshTime';
import ArchiveJob from './Components/ArchiveJob';
import ExportJobsFile from './Components/ExportJobsFile';
import ArchivedJobList from './Components/ArchivedJobList';
import RoleNavBox from '../RoleNavBox';
// import { jobList, JobListType } from '~/DefaultData/Jobs';
import { JobListType } from '~/Store/JobList/types';

import * as jobListActions from '~/Store/JobList/actions';
import { refreshTimeList } from '~/DefaultData/Jobs';
import JobNavigation from '../JobNavigation';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface RecruitmentProps {
    setStep: (v: number) => void;
}

const Recruitment: React.FC<RecruitmentProps> = ({ setStep }): JSX.Element => {
    const renameRefs = useRef<React.ReactNode[]>([]);
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /** bind questionnaire alert show */
    const [bindQueAlertShow, setBindQueAlertShow] = useState(false);
    /** edit condition alert show */
    const [editConditionsAlertShow, setEditConditionsAlertShow] = useState(false);
    /** condition value */
    const [conditionsValue, setConditionsValue] = useState<Descendant[]>([
        { children: [{ text: '' }] },
    ]);
    // const [conditionsValue, setConditionsValue] = useState("");
    /** upload alert show */
    const [uploadAlertShow, setUploadAlertShow] = useState(false);
    /** upload queue */
    const [uploadQueue, setUploadQueue] = useState<Array<UploadFile>>([]);
    const [isTaskGiver, setIsTaskGiver] = useState(false);
    /** show searchInput */
    // eslint-disable-next-line prefer-const
    let [searchInputValue, setSearchInputValue] = useState('');
    const [showJobList, setShowJobList] = useState(() => {
        return jobList;
    });
    /** 显示搜索input */
    const [showSearchInput, setShowSearchInput] = useState(false);

    const [showSearchJobList, setShowSearchJobList] = useState(false);

    const [searchJobList, setSearchJobList] = useState<{ key: string; value: string }[]>([]);

    const [showJobOption, setShowJobOption] = useState(false);

    const [showJobDetail, setShowJobDetail] = useState(false);

    const [showJobUpdateTime, setShowJobUpdateTime] = useState(false);

    const [showJobArchive, setShowJobArchive] = useState(false);

    const [showJobArchivedList, setShowJobArchivedList] = useState(false);

    const [showJobExport, setShowJobExport] = useState(false);

    const [selectJobOption, setSelectJobOption] = useState<EventTarget>();

    const [currentJob, setCurrentJob] = useState<string>('');

    const [rename, setRename] = useState('');

    const [jobList, setJobList] = useState<JobListType[]>([]);
    /** search input */
    const searchInput = useRef<HTMLInputElement>(null);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { dataProcId, distributionId, role } = getUrlParamsObj<{
        dataProcId: string;
        distributionId: string;
        role: string;
    }>(location.search);
    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);
    const { recruitment, attachments, currentRole } = useSelector(
        (state: RootState) => state.preparation,
    );

    /** getJobList */
    const { getJobList } = useSelector((state: RootState) => state.jobList);

    /** 获取当前选中的job */
    const currJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    /** 获取当前的jobData */
    const currentJobData = useMemo(() => {
        if (currentJob && getJobList) {
            const currentData = getJobList.data?.find((item) => item.id === currentJob);
            if (currentData) {
                return currentData;
            }
        }
        return undefined;
    }, [currentJob, getJobList]);

    /** 更新job name */
    const handleUpdateJobName = (id, name) => {
        dispatch(
            jobListActions.updateJobSaga({
                talent_group_id: tgId,
                job_id: id,
                job_new_data: {
                    name,
                },
                callback(res) {
                    if (res.code !== 200001) {
                        if (renameRefs.current[id]) {
                            (renameRefs.current[id] as HTMLHeadingElement).innerText = rename;
                        }
                    }
                },
            }),
        );
    };

    /** 更新刷新时间 */
    const handleSetReTime = (id: string, value: number, isOpen: boolean) => {
        dispatch(
            jobListActions.updateJobReTimeSaga({
                talent_group_id: tgId,
                job_id: id,
                interval: isOpen ? value : -value,
            }),
        );
    };

    /** 获取jobList */
    useEffect(() => {
        if (dataProcId && currentRole && tgId) {
            dispatch(
                jobListActions.getJobListSaga({
                    data_proc_id: dataProcId,
                    talent_group_id: tgId,
                    fetch_archived: false,
                    deliv_role: currentRole,
                    callback(res) {
                        if (res.some((v) => v.id === currJob?.id)) return;
                        if (res.length) {
                            dispatch(jobListActions.updateCurrentJobAction(res[0]));
                        }
                    },
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRole, tgId, dataProcId, dispatch]);
    /** 获取归档的jobList */
    useEffect(() => {
        if (dataProcId && currentRole && tgId && showJobArchivedList) {
            dispatch(
                jobListActions.getJobListSaga({
                    data_proc_id: dataProcId,
                    talent_group_id: tgId,
                    fetch_archived: true,
                    deliv_role: currentRole,
                }),
            );
        }
    }, [currentRole, tgId, dataProcId, dispatch, showJobArchivedList]);

    useEffect(() => {
        setJobList(getJobList.data || []);
        setShowJobList(getJobList.data || []);
    }, [getJobList.data]);

    /** 获取要求与附件、绑定的表单 */
    useEffect(() => {
        if (tgId && dataProcId) {
            dispatch(
                preparationActions.getRecruitmentAndAttachSaga({
                    talent_group_id: tgId,
                    data_proc_id: dataProcId,
                }),
            );
            dispatch(
                preparationActions.getBoundSurveySaga({
                    tg_id: tgId,
                    distribution: dataProcId,
                    filter_archived: true,
                    show_version: true,
                }),
            );
        }
    }, [tgId, dataProcId, dispatch, distributionId]);
    useEffect(() => {
        if (recruitment) {
            if (recruitment.includes('[{"children":[{"text":')) {
                setConditionsValue(JSON.parse(recruitment) as Descendant[]);
            } else {
                setConditionsValue([{ children: [{ text: recruitment }] }]);
            }
        }
    }, [recruitment]);
    useEffect(() => {
        if (attachments.length > 0) {
            const arr = attachments.reverse().map((i) => {
                return {
                    id: i.id,
                    name: i.name,
                    type: i.type,
                    size: Number(i.size),
                    progress: '100%',
                    fail: false,
                };
            });

            setUploadQueue(arr);
        } else {
            setUploadQueue([]);
        }
    }, [attachments]);

    useEffect(() => {
        setIsTaskGiver(currentRole === 'task_giver');
    }, [currentRole]);

    /** 更新currentjob */
    useEffect(() => {
        if (currentJobData) {
            dispatch(jobListActions.updateCurrentJobAction(currentJobData));
        }
    }, [currentJobData, dispatch]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** 显示的工作列表 */
    const showJobListFn = (arr: string[]) => {
        const arr1: JobListType[] = [];
        arr.forEach((item) => {
            const job = jobList.find((items) => items.id === item);
            if (job) {
                arr1.push(job);
            }
        });
        setShowJobList(arr1);
    };

    const handleGetJobList = () => {
        if (dataProcId && currentRole && tgId) {
            dispatch(
                jobListActions.getJobListSaga({
                    data_proc_id: dataProcId,
                    talent_group_id: tgId,
                    fetch_archived: false,
                    deliv_role: currentRole,
                }),
            );
        }
    };

    /** 设置搜索列表 */
    const setSearchJobListFn = (value: string) => {
        const arr: {
            value: string;
            key: string;
        }[] = [];
        if (!jobList) {
            return;
        }
        jobList.forEach((item) => {
            if (!item.name.includes(value)) {
                return false;
            } else {
                const __html = item.name.replaceAll(
                    value,
                    `<span style="color:#212121;font-weight:700;">${value}</span>`,
                );
                arr.push({
                    key: item.id,
                    value: __html,
                });
            }
        });
        setSearchJobList(arr);
    };
    /** add file info */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        /**
         * 获取文件上传进度的对象，进行不同阶段的监听（每个文件都有独立的上传文件事件）
         * @param {ProgressEvent<XMLHttpRequestUpload>} progressEvent XMLHttpRequestUpload 的上传事件
         */
        const onUploadProgress =
            (file: UploadFile) => (progressEvent: ProgressEvent<XMLHttpRequestUpload>) => {
                progressEvent.target?.addEventListener('loadend', () => {
                    // 因为这里无论成功还是失败结束都会调用，而且成功后会调用多次，所以需要加个 if 判断是否上传完成
                    if (progressEvent.loaded === progressEvent.total) {
                        file.progress = '100%';
                        setUploadQueue([...uploadQueue]);
                    }
                });
                progressEvent.target?.addEventListener('progress', () => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    file.progress = `${progress.toFixed(1)}%`;
                    setUploadQueue([...uploadQueue]);
                });
            };
        onUploadProgress;
        const file: UploadFile = {
            id: String(files[0].lastModified),
            name: files[0]?.name,
            size: files[0].size,
            progress: '0%',
            type: files[0].type,
            fail: false,
        };

        uploadQueue.unshift(file);

        setUploadQueue([...uploadQueue]);
        const formData = new FormData();
        formData.append('talent_group_id', tgId);
        formData.append('data_proc_id', dataProcId);
        formData.append('att', files[0]);
        e.target.value = '';
        dispatch(
            preparationActions.uploadFileSaga({
                formData: formData,
                onUploadProgress: onUploadProgress(file),
                cancelToken: new axios.CancelToken((cancel: Canceler) => {
                    file.onCancel = cancel;
                }),
                // errorCallback: () => {
                //     setDocumentUploadFail(true);
                // },
            }),
        );
    };

    /* <-----------------   ------------------- **** FUNCTION END **** ------------------------------------ */
    return (
        <Row justify="center">
            <Col span={10}>
                <div className={style.preparation_container}>
                    <JobNavigation step={1} />
                    <RoleNavBox />
                    <div className={style.preparation_conditions}>
                        <div className={style.preparation_boxHead}>
                            <div>
                                <h1>{t('PreparationPage.TargetInDataProcessing')} </h1>
                                <Popover
                                    root={<Icon type="query" />}
                                    placement="ct"
                                    className={style.query_popover}
                                >
                                    {t('PreparationPage.ConditionsPopover')}
                                </Popover>
                            </div>
                        </div>

                        <div className={style.preparation_conditionsText}>
                            <div
                                className={style.conditions}
                                onClick={() => setEditConditionsAlertShow(true)}
                                // style={!isTaskGiver ? { backgroundColor: "#f9fbfb" } : undefined}
                            >
                                <span className={style.shrink_icon}>
                                    <Icon type="shrink" />
                                </span>
                                <h3>{t('PreparationPage.Targets')}</h3>
                                <div className={style.condition_textEdit}>
                                    <MagneticEditor
                                        editorValue={conditionsValue}
                                        handleValueChange={(res) => {
                                            setConditionsValue(res);
                                        }}
                                        placeholder="请为数据处理添加处理目标"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div
                                className={style.attachments}
                                // style={!isTaskGiver ? { backgroundColor: "#f9fbfb" } : undefined}
                                onClick={() => setUploadAlertShow(true)}
                            >
                                <span className={style.shrink_icon}>
                                    <Icon type="shrink" />
                                </span>
                                <h3>{t('PreparationPage.Attachments')}</h3>
                                {uploadQueue.length === 0 ? (
                                    <p>{t('PreparationPage.NoAttachment')}</p>
                                ) : (
                                    <ScrollComponent height="calc(100% - 5rem)">
                                        <div className={style.attachments_list}>
                                            {uploadQueue.map((item) => {
                                                return (
                                                    <div key={item.id}>
                                                        <DocumentIcon
                                                            fileName={item.name}
                                                            style={{
                                                                fontSize: '1.4rem',
                                                            }}
                                                        />
                                                        {/* <Icon type="graphicFile" /> */}
                                                        <span className={style.file_name}>
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </ScrollComponent>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={style.preparation_boundQue}>
                        <div className={style.preparation_boxHead}>
                            <div>
                                <h1>{t('PreparationPage.JobList')} </h1>
                                <Popover
                                    root={<Icon type="query" />}
                                    placement="ct"
                                    className={style.query_popover}
                                >
                                    {t('PreparationPage.JobListPopover')}
                                </Popover>
                            </div>
                            <div className={style.preparation_menu}>
                                <div>
                                    <Transition
                                        animationType="slideRight"
                                        show={showSearchInput}
                                        handleTransitionEnd={() => {
                                            searchInput.current?.focus();
                                        }}
                                    >
                                        <Kite
                                            show={showSearchJobList && searchJobList.length > 0}
                                            offset={{
                                                y: 4,
                                            }}
                                            root={
                                                <input
                                                    value={searchInputValue}
                                                    ref={searchInput}
                                                    type="text"
                                                    className={style.search_input}
                                                    placeholder={'按工作名称搜索...'}
                                                    onFocus={() => {
                                                        setShowSearchJobList(true);
                                                        setSearchJobListFn(searchInputValue);
                                                    }}
                                                    onChange={(e) => {
                                                        searchInputValue = e.target.value;
                                                        setSearchInputValue(searchInputValue);
                                                        setSearchJobListFn(searchInputValue);
                                                        setShowSearchJobList(true);
                                                        if (searchInputValue === '') {
                                                            setShowJobList([...jobList]);
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        setShowSearchJobList(false);

                                                        if (!searchInputValue.trim()) {
                                                            setShowSearchInput(false);
                                                        }
                                                    }}
                                                />
                                            }
                                        >
                                            <ScrollComponent className={style.searchInput_jobList}>
                                                <ul className={style.searchJobList}>
                                                    {showSearchJobList &&
                                                        searchJobList.map((item) => {
                                                            return (
                                                                <li
                                                                    key={item.key}
                                                                    onMouseDown={(e) => {
                                                                        e.preventDefault();
                                                                    }}
                                                                    onClick={() => {
                                                                        showJobListFn([item.key]);
                                                                        searchInputValue =
                                                                            jobList.find(
                                                                                (items) =>
                                                                                    items.id ===
                                                                                    item.key,
                                                                            )?.name || '';
                                                                        setSearchInputValue(
                                                                            searchInputValue,
                                                                        );
                                                                        searchInput.current?.blur();
                                                                        setShowSearchJobList(false);
                                                                    }}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item.value,
                                                                    }}
                                                                ></li>
                                                            );
                                                        })}
                                                </ul>
                                            </ScrollComponent>
                                        </Kite>
                                    </Transition>
                                    <div
                                        className={style.query_icon}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                        }}
                                        onClick={() => {
                                            if (showSearchInput) {
                                                showJobListFn(
                                                    searchJobList.map((item) => item.key),
                                                );
                                                searchInput.current?.blur();
                                                setShowSearchJobList(false);
                                                return;
                                            }
                                            setShowSearchInput(true);
                                        }}
                                    >
                                        <Icon type="search" />
                                    </div>
                                </div>

                                <Popover
                                    offset={{
                                        y: -4,
                                    }}
                                    root={
                                        <div
                                            className={style.archived_icon}
                                            onClick={() => {
                                                setShowJobArchivedList(true);
                                            }}
                                        >
                                            <Icon type="Archived" />
                                        </div>
                                    }
                                    className={style.archived_popover}
                                    placement="ct"
                                >
                                    {t('PreparationPage.ArchivedJobPopover')}
                                </Popover>
                                {isTaskGiver && (
                                    <div
                                        className={style.bindQue_btn}
                                        onClick={() => {
                                            setBindQueAlertShow(true);
                                            // dispatch(
                                            //     preparationActions.getUnboundSurveySaga({
                                            //         tg_id: tgId,
                                            //         distribution: distributionId,
                                            //     }),
                                            // );
                                        }}
                                    >
                                        <Icon type="addition01" />
                                        <span>{t('PreparationPage.CreateJob')} </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {getJobList.isLoading ? (
                            <Skeleton row={7} style={{ padding: ' 0 1.6rem' }} />
                        ) : showJobList?.length === 0 ? (
                            <Empty
                                description="还未创建任何工作"
                                className={style.boundQue_empty}
                            />
                        ) : (
                            <ScrollComponent height="calc(100% - 5rem)">
                                <ul className={style.preparation_jobList}>
                                    {showJobList?.map((item) => {
                                        return (
                                            <li key={item.id} className={style.jobItem}>
                                                <div className={style.jobItem_left}>
                                                    <div className={style.jobItem_name}>
                                                        <h2
                                                            tabIndex={-1}
                                                            ref={(e) => {
                                                                renameRefs.current[item.id] = e;
                                                            }}
                                                            suppressContentEditableWarning
                                                            style={
                                                                rename && item.id === currentJob
                                                                    ? {
                                                                          borderBottom:
                                                                              '0.1rem solid #22A6B3',
                                                                      }
                                                                    : {}
                                                            }
                                                            contentEditable={
                                                                !!rename && item.id === currentJob
                                                            }
                                                            onBlur={(e) => {
                                                                setCurrentJob('');
                                                                setRename('');
                                                                handleUpdateJobName(
                                                                    item.id,
                                                                    e.target.innerText,
                                                                );
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    e.currentTarget.blur();
                                                                    window
                                                                        .getSelection()
                                                                        ?.removeAllRanges();
                                                                }
                                                            }}
                                                        >
                                                            {item.name}
                                                        </h2>
                                                        {rename && item.id === currentJob && (
                                                            <Icon
                                                                onMouseDown={(e) => {
                                                                    e.preventDefault();
                                                                }}
                                                                onClick={() => {
                                                                    renameRefs.current[
                                                                        currentJob
                                                                    ].innerText = '';
                                                                }}
                                                                className={style.rename_icon}
                                                                type="empty"
                                                            />
                                                        )}
                                                    </div>

                                                    <div className={style.preparation_jobSource}>
                                                        <Icon type="weblink" />
                                                        {item.source_type === 0 ? (
                                                            <React.Fragment>
                                                                <div>
                                                                    表单
                                                                    {
                                                                        item.survey_version.survey
                                                                            .name
                                                                    }
                                                                </div>
                                                                <div
                                                                    className={
                                                                        style.question_version
                                                                    }
                                                                >
                                                                    V{item.survey_version.number}
                                                                </div>
                                                            </React.Fragment>
                                                        ) : (
                                                            <div>
                                                                通过{item.source_job.name}
                                                                处理的数据
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={style.jobItem_right}>
                                                    <div
                                                        className={style.question_refresh}
                                                        style={
                                                            item.id == currentJob && showJobOption
                                                                ? { display: 'none' }
                                                                : {}
                                                        }
                                                    >
                                                        <Icon type="timing" />
                                                        <div>
                                                            {item.refresh_interval >= 0 ? (
                                                                <React.Fragment>
                                                                    <span>每隔</span>
                                                                    <span
                                                                        className={
                                                                            style.refreshTime
                                                                        }
                                                                    >
                                                                        {
                                                                            refreshTimeList.find(
                                                                                (v) =>
                                                                                    v.time ===
                                                                                    item.refresh_interval,
                                                                            )?.minute
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            refreshTimeList.find(
                                                                                (v) =>
                                                                                    v.time ===
                                                                                    item.refresh_interval,
                                                                            )?.company
                                                                        }
                                                                        刷新
                                                                    </span>
                                                                </React.Fragment>
                                                            ) : (
                                                                '刷新时间关闭'
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={style.jobItem_more}
                                                        style={
                                                            item.id == currentJob && showJobOption
                                                                ? { display: 'block' }
                                                                : {}
                                                        }
                                                    >
                                                        <Icon
                                                            type="moreHorizontal"
                                                            className={style.jobItem_moreIcon}
                                                            onClick={(e) => {
                                                                setSelectJobOption(e.currentTarget);
                                                                setCurrentJob(item.id);
                                                                setShowJobOption(true);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                    {selectJobOption && (
                                        <Kite
                                            show={showJobOption}
                                            offset={{
                                                y: 8,
                                            }}
                                            placement="rb"
                                            root={selectJobOption as Element}
                                            handleGlobalClick={(res) => {
                                                if (!res.isBtn) {
                                                    setShowJobOption(false);
                                                }
                                            }}
                                        >
                                            <ul className={style.job_option}>
                                                <li
                                                    onClick={() => {
                                                        setShowJobDetail(true);
                                                    }}
                                                >
                                                    详情
                                                </li>
                                                <li
                                                    className={
                                                        !isTaskGiver
                                                            ? style.job_option__notSelect
                                                            : ''
                                                    }
                                                    onClick={() => {
                                                        if (!isTaskGiver) return;
                                                        setRename(currentJobData?.name || '');
                                                        const selection = window.getSelection();
                                                        selection && selection.removeAllRanges();
                                                        const range = document.createRange();
                                                        range.selectNodeContents(
                                                            renameRefs.current[currentJob] as Node,
                                                        );
                                                        selection && selection.addRange(range);
                                                        renameRefs.current[currentJob].focus();
                                                    }}
                                                >
                                                    重命名
                                                </li>
                                                <li
                                                    className={
                                                        !isTaskGiver
                                                            ? style.job_option__notSelect
                                                            : ''
                                                    }
                                                    onClick={() => {
                                                        if (!isTaskGiver) return;
                                                        setShowJobUpdateTime(true);
                                                    }}
                                                >
                                                    设置刷新时间
                                                </li>
                                                <li
                                                    className={
                                                        currentRole === 'commenter'
                                                            ? style.job_option__notSelect
                                                            : ''
                                                    }
                                                    onClick={() => {
                                                        if (currentRole === 'commenter') return;
                                                        setShowJobExport(true);
                                                    }}
                                                >
                                                    导出
                                                </li>
                                                <li
                                                    style={isTaskGiver ? { color: '#FF525D' } : {}}
                                                    className={
                                                        !isTaskGiver
                                                            ? style.job_option__notSelect
                                                            : ''
                                                    }
                                                    onClick={() => {
                                                        if (!isTaskGiver) return;
                                                        setShowJobArchive(true);
                                                    }}
                                                >
                                                    归档
                                                </li>
                                            </ul>
                                        </Kite>
                                    )}
                                </ul>
                            </ScrollComponent>
                        )}
                    </div>
                    {showJobDetail && (
                        <JobDetail
                            job={currentJobData}
                            isTaskGiver={isTaskGiver}
                            show={showJobDetail}
                            tgId={tgId}
                            handleClose={() => {
                                setShowJobDetail(false);
                            }}
                            handleGoJobPage={() => {
                                setStep(2);
                            }}
                        />
                    )}
                    {showJobUpdateTime && (
                        <SetRefreshTime
                            job={currentJobData}
                            defaultState={false}
                            show={showJobUpdateTime}
                            handleClose={() => {
                                setShowJobUpdateTime(false);
                            }}
                            handleSetReTime={handleSetReTime}
                        />
                    )}

                    {showJobArchive && (
                        <ArchiveJob
                            job={currentJobData}
                            show={showJobArchive}
                            handleClose={() => {
                                setShowJobArchive(false);
                            }}
                            handleGetJobList={(id) => {
                                handleGetJobList();
                                setShowJobArchive(false);
                                dispatch(
                                    jobListActions.updateCurrentJobAction(
                                        jobList[0].id === id ? jobList?.[1] : jobList?.[0],
                                    ),
                                );
                            }}
                        />
                    )}
                    {/* {showJobExport && ( */}
                    <ExportJobsFile
                        job={currentJobData}
                        show={showJobExport}
                        handleClose={() => {
                            setShowJobExport(false);
                        }}
                    />
                    {/* )} */}

                    {showJobArchivedList && (
                        <ArchivedJobList
                            isTaskGiver={isTaskGiver}
                            show={showJobArchivedList}
                            handleClose={() => {
                                setShowJobArchivedList(false);
                            }}
                            getJobList={() => {
                                handleGetJobList();
                                if (dataProcId && role && tgId) {
                                    dispatch(
                                        jobListActions.getJobListSaga({
                                            data_proc_id: dataProcId,
                                            talent_group_id: tgId,
                                            fetch_archived: true,
                                            deliv_role: role,
                                        }),
                                    );
                                }
                            }}
                        />
                    )}
                    {bindQueAlertShow && (
                        <CreateJobs
                            show={bindQueAlertShow}
                            handleClose={() => {
                                setBindQueAlertShow(false);
                            }}
                            handleGetJobList={() => {
                                handleGetJobList();
                                setBindQueAlertShow(false);
                            }}
                        />
                    )}
                    <EditConditions
                        show={editConditionsAlertShow}
                        value={conditionsValue}
                        isAdd={isTaskGiver}
                        handleClose={() => setEditConditionsAlertShow(false)}
                        handleSave={(value) => {
                            setConditionsValue(value);
                            if (!value) {
                                return;
                            }
                            const str = JSON.stringify(value);
                            dispatch(
                                preparationActions.updateRecruitmentSaga({
                                    talent_group_id: tgId,
                                    data_proc_id: dataProcId,
                                    recruitment: str,
                                }),
                            );
                        }}
                    />
                    <EditDocument
                        show={uploadAlertShow}
                        uploadQueue={uploadQueue}
                        isAdd={isTaskGiver}
                        title={t('PreparationPage.UploadAttachment.Title')}
                        handleClose={() => setUploadAlertShow(false)}
                        handleUpload={addFile}
                        handleRename={(id, name) => {
                            const file = uploadQueue.map((item) => {
                                if (item.id === id) {
                                    item.name = name;
                                }
                                return item;
                            });
                            setUploadQueue(file);
                            dispatch(
                                preparationActions.updateFileNameSaga({
                                    talent_group_id: tgId,
                                    data_proc_id: dataProcId,
                                    att_id: id,
                                    name,
                                }),
                            );
                        }}
                        handleDelete={(id) => {
                            setUploadQueue(
                                uploadQueue.filter((item) => {
                                    return item.id !== id;
                                }),
                            );
                            dispatch(
                                preparationActions.deleteFileSaga({
                                    talent_group_id: tgId,
                                    data_proc_id: dataProcId,
                                    att_id: id,
                                }),
                            );
                        }}
                        handleDownload={(id, name) => {
                            dispatch(
                                preparationActions.downloadFileSaga({
                                    talent_group_id: tgId,
                                    data_proc_id: dataProcId,
                                    att_id: id,
                                    file_name: name,
                                }),
                            );
                        }}
                    />
                </div>
            </Col>
        </Row>
    );
};
export default Recruitment;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
