/**
 * @file CreateJobs
 * @date 2022-08-24
 * @author liaoli
 * @lastModify liaoli 2022-08-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Alert,
    Button,
    Radio,
    RadioGroup,
    MagneticEditor,
    Descendant,
    Icon,
} from '@datareachable/dr_front_componentlibrary';
import style from './style.scss';
import SearchInput from './Components/SearchInput';
import { RootState } from '~/Store/rootReducer';
import * as actions from '~/Store/JobList/actions';
import { CreateJobType } from '~/Store/JobList/types';
// import { jobList, questionnaire_list } from '~/DefaultData/Jobs';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface CreateJobsProps {
    show: boolean;
    handleClose: () => void;
    handleGetJobList: () => void;
}

const CreateJobs: React.FC<CreateJobsProps> = ({
    show,
    handleClose,
    handleGetJobList,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();
    const orgId = useSelector((state: RootState) => state.preparation.navData.organization.id);
    const tgId = useSelector((state: RootState) => state.preparation.navData.talent_group.id);
    const dataProcId = useSelector((state: RootState) => state.preparation.navData.data_proc.id);

    const surveyList = useSelector(
        (state: RootState) => state.jobList.getSurveyList.questionnaireList,
    );
    const jobList = useSelector((state: RootState) => state.jobList.getJobList.data);

    /** 当前在哪一页 */
    const [currentPage, setCurrentPage] = useState<'JobInfo' | 'jobDescription'>('JobInfo');

    /** 当前选择的数据源类型 */
    const [selectDataSourceType, setSelectDataSourceType] = useState<'questionnaire' | 'jobData'>();

    /** job名称 */
    const [jobName, setJobName] = useState('');

    /** 选择表单的数据 */
    const [questionnaireInfo, setQuestionnaireInfo] = useState<{
        questionnaire_id: string;
        version: string;
    }>({
        questionnaire_id: '',
        version: '',
    });

    /** 选择其他的job */
    const [otherJob, setOtherJob] = useState<string>('');

    const [textareaValue, setTextareaValue] = useState<Descendant[]>([
        { children: [{ text: '' }] },
    ]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    useEffect(() => {
        dispatch(
            actions.getSurveyListSaga({
                org_id: orgId,
                data_proc_id: dataProcId,
            }),
        );
    }, [orgId, dataProcId, dispatch]);

    const currentVersion = useMemo(() => {
        if (surveyList && questionnaireInfo.questionnaire_id) {
            const currentSurvey = surveyList.find(
                (item) => item.id === questionnaireInfo.questionnaire_id,
            );
            return (
                currentSurvey?.versions?.map((item) => {
                    return {
                        key: item.tag.toString(),
                        value: item.tag.toString(),
                    };
                }) || []
            );
        } else {
            return [];
        }
    }, [surveyList, questionnaireInfo.questionnaire_id]);
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    const handleCreateJob = () => {
        const payload: CreateJobType = {
            data_proc_id: dataProcId,
            talent_group_id: tgId,
            new_job_data: {
                name: jobName,
                description: JSON.stringify(textareaValue),
            },
        };
        if (selectDataSourceType === 'jobData') {
            payload.new_job_data.job_id = otherJob;
        } else {
            payload.new_job_data.questionnaire = {
                id: questionnaireInfo.questionnaire_id,
                version: parseInt(questionnaireInfo.version),
            };
        }
        dispatch(
            actions.createJobSaga({
                ...payload,
                callback: () => {
                    handleGetJobList();
                },
            }),
        );
    };
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const jobInfoContent = (
        <div className={style.createJobs_container}>
            <h2 className={style.createJobs_title}>创建工作</h2>
            <p className={style.createJobs_tips}>创建一个工作来开始处理数据，最终形成数据简报</p>
            <div className={style.jobInfo}>
                <div className={style.jobName}>
                    <p>工作名称</p>
                    <input
                        value={jobName}
                        onChange={(e) => {
                            setJobName(e.target.value);
                        }}
                        type="text"
                        className={style.jobName_input}
                        placeholder="请输入名称..."
                    />
                </div>
                <div className={style.jobData_source}>
                    <p>选择数据源</p>
                    <RadioGroup
                        onChange={(value) => {
                            setQuestionnaireInfo({ questionnaire_id: '', version: '' });
                            setOtherJob('');
                            setSelectDataSourceType(value as 'questionnaire' | 'jobData');
                        }}
                        value={selectDataSourceType}
                    >
                        <React.Fragment key="0">
                            <Radio value="questionnaire">
                                <p className={style.createJobs_optionsTitle}>
                                    选择某一个表单的一个版本
                                </p>
                            </Radio>
                            <div className={style.jobData_source__question}>
                                <SearchInput
                                    width="33.3rem"
                                    height="4rem"
                                    currentKey={questionnaireInfo.questionnaire_id}
                                    disable={selectDataSourceType !== 'questionnaire'}
                                    placeholder="请选择表单..."
                                    dataList={surveyList.map((item) => {
                                        return {
                                            key: item.id,
                                            value: item.name,
                                        };
                                    })}
                                    handleOptionClick={(key) => {
                                        setQuestionnaireInfo(
                                            Object.assign(
                                                {},
                                                {
                                                    questionnaire_id: key,
                                                    version: '',
                                                },
                                            ),
                                        );
                                    }}
                                />
                                <SearchInput
                                    width="17.9rem"
                                    height="4rem"
                                    currentKey={questionnaireInfo.version}
                                    disable={
                                        selectDataSourceType !== 'questionnaire' ||
                                        questionnaireInfo.questionnaire_id === ''
                                    }
                                    placeholder="版本号..."
                                    dataList={currentVersion}
                                    handleOptionClick={(key) => {
                                        setQuestionnaireInfo(
                                            Object.assign({}, questionnaireInfo, {
                                                version: key,
                                            }),
                                        );
                                    }}
                                />
                            </div>
                            <Radio value="jobData">
                                <p>选择之前处理的数据</p>
                            </Radio>
                            <div className={style.jobData_source__otherJob}>
                                <SearchInput
                                    width="52.8rem"
                                    height="4rem"
                                    currentKey={otherJob}
                                    disable={selectDataSourceType !== 'jobData'}
                                    placeholder="请选择..."
                                    dataList={
                                        jobList?.map((item) => {
                                            return {
                                                key: item.id,
                                                value: item.name,
                                            };
                                        }) || []
                                    }
                                    handleOptionClick={(key) => {
                                        setOtherJob(key);
                                    }}
                                />
                            </div>
                        </React.Fragment>
                    </RadioGroup>
                </div>
            </div>
            <div className={style.createJobs_button}>
                <Button label="取消" size="big" type="primary" onClick={handleClose} />
                <Button
                    disabled={
                        !jobName?.trim() ||
                        (selectDataSourceType === 'jobData'
                            ? !otherJob
                            : !(questionnaireInfo.questionnaire_id && questionnaireInfo.version))
                    }
                    label="下一步"
                    type="primary"
                    onClick={() => {
                        setCurrentPage('jobDescription');
                    }}
                />
            </div>
        </div>
    );

    const jobDescription = (
        <div className={style.jobDescription}>
            <Icon
                type="nextArrow"
                className={style.createJobs_backIcon}
                onClick={() => {
                    setCurrentPage('JobInfo');
                }}
            />
            <h2>创建工作</h2>
            <p>工作描述</p>
            <div className={style.textarea_wrap}>
                <MagneticEditor
                    editorValue={textareaValue}
                    placeholder="请做一些关于此工作的描述..."
                    handleValueChange={(value) => {
                        setTextareaValue(value);
                    }}
                />
            </div>
            <div className={style.createJobs_createButton}>
                <Button
                    width="6.1rem"
                    height="3.2rem"
                    label="创建"
                    size="normal"
                    type="primary"
                    onClick={() => {
                        handleCreateJob();
                    }}
                />
            </div>
        </div>
    );

    return (
        <Alert
            custom
            status={show}
            className={style.alert_box}
            width="60rem"
            height="50.8rem"
            changeStatus={handleClose}
        >
            <div
                className={style.createJob_wrap}
                style={currentPage === 'jobDescription' ? { transform: 'translate(-60rem)' } : {}}
            >
                {jobInfoContent}
                {jobDescription}
            </div>
        </Alert>
    );
};
export default CreateJobs;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
