/**
 * @file JobDetail
 * @date 2022-08-25
 * @author liaoli
 * @lastModify liaoli 2022-08-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { useDispatch } from 'react-redux';
import { updateJobSaga, updateCurrentJobAction } from '~/Store/JobList/actions';
import {
    Alert,
    Button,
    Icon,
    MagneticEditor,
    Descendant,
    Avatar,
} from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useState } from 'react';
import style from './style.scss';
import { JobListType } from '~/Store/JobList/types';
import { initDescendant } from '@datareachable/dr_front_componentlibrary/Components/TextEdit/Unit/initDescendant';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface JobDetailProps {
    job?: JobListType;
    tgId: string;
    show: boolean;
    isTaskGiver: boolean;
    handleClose: () => void;
    handleGoJobPage: () => void;
}
const JobDetail: React.FC<JobDetailProps> = ({
    job,
    tgId,
    show,
    handleClose,
    isTaskGiver,
    handleGoJobPage,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<1 | 2>(1);
    const [textareaValue, setTextareaValue] = useState<Descendant[]>([
        { children: [{ text: '' }] },
    ]);
    const [updateDescLoading, setUpdateDescLoading] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    useEffect(() => {
        if (job?.description) {
            setTextareaValue(initDescendant(job.description));
        }
    }, [job]);
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    const updateJobDes = () => {
        if (job && tgId) {
            setUpdateDescLoading(true);
            dispatch(
                updateJobSaga({
                    talent_group_id: tgId,
                    job_id: job?.id,
                    job_new_data: {
                        description: JSON.stringify(textareaValue),
                    },
                    callback: () => {
                        setUpdateDescLoading(false);
                        setCurrentPage(1);
                    },
                }),
            );
        }
    };

    const goJobPage = () => {
        if (job) {
            dispatch(updateCurrentJobAction(job));
            handleGoJobPage();
        }
    };

    const getTime = (time?: string) => {
        if (!time) {
            return `— / — / —`;
        }
        const data = new Date(time);
        const year = data.getFullYear();
        const month = data.getMonth() + 1;
        const day = data.getDate();

        return `${day}/${month}/${year}`;
    };

    const jobInfo = (
        <div className={style.jobDetail_container}>
            <div className={style.jobDetail_header}>
                <Icon
                    className={style.prevPage_icon}
                    type="nextArrow"
                    onClick={() => {
                        handleClose();
                    }}
                />
                <Button
                    onClick={() => {
                        goJobPage();
                    }}
                    className={style.goJobPage_button}
                    label={
                        <div className={style.goJobPage}>
                            <Icon type="enter" />
                            <span>进入工作页</span>
                        </div>
                    }
                />
            </div>
            <h2 className={style.job_name}>{job?.name}</h2>
            <div className={style.job_creator}>
                <h3>创建者:</h3>
                <div>
                    <Avatar imgUrl={job?.creator_user.avatar} size="20" />
                    <span>{job?.creator_user.name}</span>
                </div>
            </div>
            <div className={style.job_createTime}>
                <h3>创建时间:</h3>
                <span>{getTime(job?.created_at)}</span>
            </div>
            <div className={style.job_org}>
                <h3>所属组织:</h3>
                <div>
                    <Avatar imgUrl={job?.creator_org.logo} size="20" type="org" />
                    <span>{job?.creator_org.name}</span>
                </div>
            </div>
            <h2 className={style.job_dataSource}>数据源</h2>
            <p>
                {job?.source_type === 0
                    ? `表单${job.survey_version.survey.name || ''}`
                    : `通过${job?.source_job.name || ''}处理后的数据`}
            </p>
            <div className={style.job_describe}>
                <h2>工作描述</h2>
                {isTaskGiver && (
                    <Icon
                        className={style.editDesc}
                        type="edit"
                        onClick={() => {
                            setCurrentPage(2);
                        }}
                    />
                )}
            </div>
            <div className={style.jobDesc_textEdit}>
                <MagneticEditor
                    editorValue={textareaValue}
                    handleValueChange={(res) => {
                        setTextareaValue(res);
                    }}
                    readOnly
                />
            </div>
        </div>
    );

    const editJobDesc = (
        <div className={style.jobDetail_container}>
            <div className={style.jobDesc}>
                <Icon
                    type="nextArrow"
                    className={style.prevPage_icon}
                    onClick={() => {
                        setCurrentPage(1);
                    }}
                />
                <h2>工作描述</h2>
                <p>请为工作添加描述</p>
                <div className={style.textarea_wrap}>
                    <MagneticEditor
                        defaultValue={textareaValue.toString()}
                        editorValue={job?.description}
                        placeholder="请做一些关于此工作的描述..."
                        handleValueChange={(value) => {
                            setTextareaValue(value);
                        }}
                    />
                </div>
                <div className={style.createJobs_createButton}>
                    <Button
                        height="3.2rem"
                        label="取消"
                        size="big"
                        type="primary"
                        width="7.6rem"
                        onClick={() => {
                            handleClose();
                        }}
                    />
                    <Button
                        width="6rem"
                        height="3.2rem"
                        label="保存"
                        size="normal"
                        type="primary"
                        loading={updateDescLoading}
                        disabled={job?.description === JSON.stringify(textareaValue)}
                        onClick={() => {
                            updateJobDes();
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <Alert
            className={style.jobDetail_alert}
            status={show}
            custom={true}
            width="60rem"
            height="45.2rem"
        >
            <div
                className={style.jobInfo_wrap}
                style={currentPage === 2 ? { transform: 'translate(-100%)' } : {}}
            >
                {jobInfo}
                {editJobDesc}
            </div>
        </Alert>
    );
};
export default JobDetail;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
