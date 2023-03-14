/**
 * @file EditJobDescription
 * @date 2022-11-09
 * @author liaoli
 * @lastModify liaoli 2022-11-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, MagneticEditor, Button } from '@datareachable/dr_front_componentlibrary';
import { initDescendant } from '@datareachable/dr_front_componentlibrary/Components/TextEdit/Unit/initDescendant';
import React, { useState } from 'react';
import { Descendant } from 'slate';
import { JobListType } from '~/Store/JobList/types';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface EditJobDescriptionProps {
    job?: JobListType;
    value: string;
    handleClose: () => void;
    handleUpdateDescription: (id: string, value: Descendant[]) => void;
}
const EditJobDescription: React.FC<EditJobDescriptionProps> = ({
    job,
    value,
    handleClose,
    handleUpdateDescription,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [textareaValue, setTextareaValue] = useState<Descendant[]>(initDescendant(value));
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            width="60rem"
            className={style.dataProcessing_alert}
            height="45.2rem"
            custom
            status={true}
            changeStatus={() => {
                handleClose();
            }}
        >
            <div className={style.dataProcessing_alertBox}>
                <h2>编辑工作描述</h2>
                <p>请为工作添加描述</p>
                <div className={style.textarea_wrap}>
                    <MagneticEditor
                        editorValue={textareaValue}
                        placeholder="请在此添加工作描述..."
                        handleValueChange={(value) => {
                            setTextareaValue(value);
                        }}
                    />
                </div>
                <div className={style.dataProcessing_button}>
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
                        onClick={() => {
                            if (job) {
                                handleUpdateDescription(job.id, textareaValue);
                            }
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default EditJobDescription;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
