/**
 * @file CreateView
 * @date 2022-08-31
 * @author liaoli
 * @lastModify liaoli 2022-08-31
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Alert,
    ScrollComponent,
    SelectInput,
    Button,
} from '@datareachable/dr_front_componentlibrary';
import notQuestion from '~/Assets/images/icon_questionnaire.png';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JobListType } from '~/Store/JobList/types';
import { createViewSaga, getViewListSaga } from '~/Store/JobView/actions';
import { ViewType } from '~/Store/JobView/types';
import style from './style.scss';
import { RootState } from '~/Store/rootReducer';
import { QList } from '~/Utils/loopNodeUtils';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface CreateViewProps {
    job?: JobListType;
    tgId: string;
    show: boolean;
    defaultView?: ViewType[];
    handleClose?: () => void;
}
const CreateView: React.FC<CreateViewProps> = ({
    handleClose,
    show,
    defaultView,
    job,
    tgId,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    /** 视角名称 */
    const [viewName, setViewName] = useState('');

    /** 选中的问题 */
    const [selectQuestion, setSelectQuestion] = useState<(string | number)[]>([]);
    /* <------------------------------------- **** STATE END **** ------------------------------------ */
    /* <----------------------------------- **** PARAMETER START **** ------------------------------------ */
    /**
     * 获取界面中文名称
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

    const questionList = useMemo(() => {
        if (getJobStage.status !== -1) {
            return [
                ...(defaultView?.map((v) => ({
                    id: v.id,
                    value: `【${getNodeType(v.type, v.is_extra)}-${
                        v.isTwoDimensional ? '二维' : '一维'
                    }】${QList.getText(v.text)}`,
                })) || []),
                { id: 'global', value: '【全局变量-常规】' },
                { id: 'marks', value: '【全局变量-配额】' },
            ];
        } else {
            return defaultView
                ?.filter((v) => !v.is_extra)
                .map((v) => ({
                    id: v.id,
                    value: `【${getNodeType(v.type, v.is_extra)}-${
                        v.isTwoDimensional ? '二维' : '一维'
                    }】${QList.getText(v.text)}`,
                }));
        }
    }, [defaultView, getJobStage.status]);
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */

    /** 创建view */
    const handleCreateView = () => {
        if (!defaultView || !job) return;
        const selectQuestionData = defaultView.filter((item) => selectQuestion.includes(item.id));
        const isSelectGlobal = selectQuestion.includes('global');
        const isSelectMarks = selectQuestion.includes('marks');
        const setting = selectQuestionData.map((item) => {
            return {
                ...item,
                dataSets: item.dataSets.map((v) => ({
                    label: v.label,
                    backgroundColor: v.backgroundColor,
                    id: v.id,
                })),
            };
        });
        dispatch(
            createViewSaga({
                talent_group_id: tgId,
                job_id: job.id,
                name: viewName,
                questions: { questions: setting, global: isSelectGlobal, marks: isSelectMarks },
                callBack() {
                    dispatch(
                        getViewListSaga({
                            talent_group_id: tgId,
                            job_id: job.id,
                            callBack() {
                                handleClose && handleClose();
                            },
                        }),
                    );
                },
            }),
        );
    };

    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            className={style.createView_alert}
            width="60rem"
            height="51.9rem"
            custom
            status={show}
            changeStatus={handleClose}
        >
            <div className={style.createView_container}>
                <h2 className={style.createView_title}>创建视角</h2>
                <p className={style.createView_tips}>创建不同的视角来分析数据</p>
                {defaultView?.length ? (
                    <>
                        <h3 className={style.createView_name}>视角名称</h3>
                        <input
                            className={style.createView_nameInput}
                            type="text"
                            placeholder="请输入视角名称..."
                            value={viewName}
                            onChange={(e) => {
                                setViewName(e.target.value.trim());
                            }}
                        />
                        <h3 className={style.createView_selectQuestion}>选择题目和变量</h3>
                        <ScrollComponent height="15.9rem">
                            <SelectInput
                                defaultValue={selectQuestion}
                                handleChange={(v) => {
                                    setSelectQuestion(v);
                                }}
                                isToggle
                                list={questionList?.map((item) => {
                                    return {
                                        content: (
                                            <div className={style.createView_questionOption}>
                                                {item.value}
                                            </div>
                                        ),
                                        id: item.id,
                                    };
                                })}
                                type="check"
                            />
                        </ScrollComponent>
                    </>
                ) : (
                    <div className={style.createView_notQuestion}>
                        <img src={notQuestion} alt="" />
                        <div>无可添加的问题</div>
                    </div>
                )}
                <div className={style.createView_button}>
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
                        label="创建"
                        size="normal"
                        type="primary"
                        disabled={viewName.trim() === '' || !selectQuestion.length}
                        onClick={() => {
                            handleCreateView();
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default CreateView;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
