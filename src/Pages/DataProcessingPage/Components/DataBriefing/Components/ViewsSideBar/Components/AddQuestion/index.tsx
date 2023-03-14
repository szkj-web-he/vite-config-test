/**
 * @file AddQuestion
 * @date 2022-09-01
 * @author liaoli
 * @lastModify liaoli 2022-09-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo, useState } from 'react';
import {
    Alert,
    CheckGroup,
    Check,
    Button,
    ScrollComponent,
} from '@datareachable/dr_front_componentlibrary';
import notQuestion from '~/Assets/images/icon_questionnaire.png';
import style from './style.scss';
import { ViewType } from '~/Store/JobView/types';
import { useSelector } from 'react-redux';
import { RootState } from '~/Store/rootReducer';
import { QList } from '~/Utils/loopNodeUtils';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AddQuestionProps {
    show: boolean;
    defaultView?: ViewType[];
    id?: string;
    viewInfo: {
        [view_id: string]: {
            question: ViewType[];
            marks: boolean;
            global: boolean;
        };
    };
    handleClose?: () => void;
    handleAddView: (id: string, data: ViewType[], global: boolean, marks: boolean) => void;
}
const AddQuestion: React.FC<AddQuestionProps> = ({
    show,
    defaultView,
    id,
    viewInfo,
    handleClose,
    handleAddView,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    /** 所有选中的题目 */
    const [selectQuestion, setSelectQuestion] = useState<string[]>([]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /**
     * 获取节点中文名称
     */
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
    const defaultList = useMemo(() => {
        if (id && viewInfo) {
            return [
                ...(viewInfo[id]?.question?.map((v) => v.id) || []),
                ...(getJobStage.status !== -1 && viewInfo[id]?.global ? ['global'] : []),
                ...(getJobStage.status !== -1 && viewInfo[id]?.marks ? ['marks'] : []),
            ];
        }
    }, [getJobStage.status, id, viewInfo]);

    const questionList = useMemo(() => {
        let globalVar: { id: string; value: string }[] = [];
        let list = defaultView?.filter((v) => !v.is_extra);
        if (getJobStage.status !== -1) {
            globalVar = [
                { id: 'global', value: '【全局变量-常规】' },
                { id: 'marks', value: '【全局变量-配额】' },
            ];
            list = defaultView;
        }
        return [
            ...(list?.map((v) => ({
                id: v.id,
                value: `【${getNodeType(v.type, v.is_extra)}-${
                    v.isTwoDimensional ? '二维' : '一维'
                }】 ${QList.getText(v.text)}`,
            })) || []),
            ...globalVar,
        ];
    }, [defaultView, getJobStage.status]);

    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            className={style.addQuestion_alert}
            width="60rem"
            height="46.2rem"
            custom
            status={show}
            changeStatus={handleClose}
        >
            <div className={style.addQuestion_container}>
                <h2>添加题目和变量</h2>
                <p>选择要添加的题目或变量。</p>
                {defaultView?.length ? (
                    <>
                        <h3>选择题目和变量</h3>
                        <ScrollComponent height="19.4rem">
                            <CheckGroup
                                value={selectQuestion}
                                defaultValue={defaultList}
                                onChange={(v) => {
                                    setSelectQuestion(Object.assign([], v));
                                }}
                            >
                                {questionList?.map((item) => {
                                    return (
                                        <Check
                                            disabled={defaultList?.includes(item.id)}
                                            value={item.id}
                                            key={item.id}
                                        >
                                            {item.value}
                                        </Check>
                                    );
                                })}
                            </CheckGroup>
                        </ScrollComponent>
                    </>
                ) : (
                    <div className={style.addQuestion_notQuestion}>
                        <img src={notQuestion} alt="" />
                        <div>无可添加的问题</div>
                    </div>
                )}
                <div className={style.addQuestion_button}>
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
                        label="添加"
                        size="normal"
                        type="primary"
                        disabled={
                            defaultList?.length === selectQuestion.length || !selectQuestion.length
                        }
                        onClick={() => {
                            if (!id) return;
                            const addViewId = selectQuestion.filter(
                                (v) => !defaultList?.includes(v),
                            );
                            const addViewData = defaultView?.filter((v) =>
                                addViewId.includes(v.id),
                            );
                            if (!addViewData) return;
                            handleAddView(
                                id,
                                [...viewInfo[id].question, ...addViewData],
                                selectQuestion.includes('global'),
                                selectQuestion.includes('marks'),
                            );
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default AddQuestion;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
