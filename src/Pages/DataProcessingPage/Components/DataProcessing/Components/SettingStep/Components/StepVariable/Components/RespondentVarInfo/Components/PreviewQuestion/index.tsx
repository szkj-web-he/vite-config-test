/**
 * @file PreviewQuestion
 * @date 2022-11-17
 * @author liaoli
 * @lastModify liaoli 2022-11-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Icon, Button, ScrollComponent } from '@datareachable/dr_front_componentlibrary';
import React from 'react';
import OneDimensionalQuestion from './Components/OneD';
import TwoDimensionalQuestion from './Components/TwoD';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PreviewQuestionProps {
    row: string[];
    col: string[];
    type: string;
    handleClose: () => void;
}
const PreviewQuestion: React.FC<PreviewQuestionProps> = ({
    row,
    col,
    type,
    handleClose,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={true}
            custom={true}
            width="80rem"
            height="45.8rem"
            className={style.previewQuestion_alert}
            changeStatus={handleClose}
        >
            <div className={style.previewQuestion_container}>
                <h2 className={style.previewQuestion_title}>预览变量</h2>
                <p className={style.previewQuestion_tips}>对七十岁以下年龄的分类设置</p>
                <div className={style.previewQuestion_type}>
                    <Icon type="singleChoiceUnselected" />
                    <p>多选题 - {col.length ? '二' : '一'}维</p>
                </div>
                <h3 className={style.previewQuestion_question}>问题：XIN年龄段</h3>
                <div className={style.previewQuestion_preview}>
                    <ScrollComponent height="18rem">
                        {col.length ? (
                            <TwoDimensionalQuestion
                                type={type as 'Single' | 'Multi' | 'Numeric' | 'OpenEnd'}
                                row={row}
                                col={col}
                            />
                        ) : (
                            <OneDimensionalQuestion
                                type={type as 'Single' | 'Multi' | 'Numeric' | 'OpenEnd'}
                                options={row}
                            />
                        )}
                    </ScrollComponent>
                </div>
                <div className={style.previewQuestion_button}>
                    <Button
                        width="6rem"
                        height="3.2rem"
                        label="关闭"
                        size="normal"
                        type="primary"
                        onClick={handleClose}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default PreviewQuestion;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
