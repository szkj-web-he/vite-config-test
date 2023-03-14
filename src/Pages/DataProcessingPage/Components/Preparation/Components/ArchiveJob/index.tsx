/**
 * @file ArchiveJob
 * @date 2022-08-26
 * @author liaoli
 * @lastModify liaoli 2022-08-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, TextAreaV2, Icon, Button } from '@datareachable/dr_front_componentlibrary';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JobListType } from '~/Store/JobList/types';
import { RootState } from '~/Store/rootReducer';
import * as actions from '~/Store/JobList/actions';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface ArchiveJobProps {
    job?: JobListType;
    show: boolean;
    handleClose?: () => void;
    handleGetJobList?: (id: string) => void;
}
const ArchiveJob: React.FC<ArchiveJobProps> = ({
    show,
    handleClose,
    job,
    handleGetJobList,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    const dispatch = useDispatch();

    const tgId = useSelector((state: RootState) => state.preparation.navData.talent_group.id);

    const [archivedInfo, setArchivedInfo] = useState('');
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    const handleArchived = () => {
        if (archivedInfo && tgId && job) {
            dispatch(
                actions.archiveJobSaga({
                    talent_group_id: tgId,
                    job_id: job.id,
                    archive_info: archivedInfo,
                    callback: () => {
                        handleGetJobList && handleGetJobList(job.id);
                    },
                }),
            );
        }
    };
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={show}
            custom={true}
            width="60rem"
            height="42.4rem"
            className={style.archiveJob_alert}
            changeStatus={handleClose}
        >
            <div className={style.archiveJob_box}>
                <div className={style.archiveJob_header}>
                    <Icon className={style.archiveJob_warning} type="warningTriangle" />
                    <h2>归档此工作?</h2>
                </div>
                <p className={style.archiveJob_tip}>请确定您想要归档此工作“job{job?.name}”?</p>
                <p className={style.archiveJob_remarks}>(您可以前往归档的工作列表中找回)</p>
                <h3>工作归档后的展示信息：</h3>
                <p className={style.archiveJob_statement}>
                    一旦您归档了此工作，其他人就不能访问或查看相关内容。
                </p>
                <TextAreaV2
                    defaultValue="本次工作目前已结束。 请联系此工作的作者，以获得进一步的帮助。"
                    height="12rem"
                    textOverflow
                    value={archivedInfo}
                    onInput={(v) => {
                        setArchivedInfo(v);
                    }}
                    width="100%"
                    placeholder="请输入..."
                />
                <div className={style.archiveJob_button}>
                    <Button
                        height="3.2rem"
                        label="取消"
                        size="big"
                        type="primary"
                        width="7.6rem"
                        onClick={() => {
                            handleClose && handleClose();
                        }}
                    />
                    <Button
                        width="6rem"
                        height="3.2rem"
                        label="确定"
                        size="normal"
                        type="primary"
                        disabled={!archivedInfo}
                        onClick={() => {
                            handleArchived();
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default ArchiveJob;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
