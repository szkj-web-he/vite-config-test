/**
 * @file ScriptInfoOneDimension
 * @date 2022-11-14
 * @author liaoli
 * @lastModify liaoli 2022-11-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobQuestionSaga } from '~/Store/JobList/actions';
import { JobQuestionType } from '~/Store/JobList/types';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import { QList } from '~/Utils/loopNodeUtils';
import ExpressionCard from '../ExpressionCard';
import OutPutCard from '../OutPutCard';
import ParameterCard from '../ParameterCard';
import TitleCard from '../TitleCard';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
type ParamItemType = { title: string; loopItems: string[]; row: string; column: string };
type ParamsType = Array<{ title: string; loopItems: string[]; row: string; column: string }>;

interface OperationScriptProps {
    isSetScript: boolean;
    testStage: boolean;
    selectScript: string[];
    setIsSetScript: () => void;
}

type LabelsType = Array<{
    content: React.ReactNode;
    id: string;
}>;

const OperationScript: React.FC<OperationScriptProps> = ({
    isSetScript,
    selectScript,
    setIsSetScript,
    testStage,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const { stageId, stepId } = useSelector((state: RootState) => state.jobStage.currentStep);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    /** 问题列表 */
    const [questionList, setQuestionList] = useState<JobQuestionType[]>([]);
    /**
     * 参数列表
     */
    const [paramList, setParamList] = useState<ParamsType>([
        { title: '', loopItems: [], row: '', column: '' },
        { title: '', loopItems: [], row: '', column: '' },
    ]);
    /**
     * 输出信息
     */
    const [outPut, setOutPut] = useState({ value: '', description: '' });

    /**
     * 获取所有的题目
     */
    useEffect(() => {
        if (currentJob && tgId)
            dispatch(
                getJobQuestionSaga({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    isExport: false,
                    callback(res) {
                        setQuestionList(res);
                    },
                }),
            );
    }, [currentJob, dispatch, tgId]);

    /**
     * 设置当前为已选脚本
     */
    useEffect(() => {
        if (currentJob && tgId && isSetScript) {
            setIsSetScript();
            handleSave();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSetScript]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /** 当前step的信息 */
    const currentStep = useMemo(() => {
        if (stageId && stageId && getJobStage) {
            return getJobStage.config
                .find((v) => v.id === stageId)
                ?.steps.in_stream.find((v) => v.id === stepId);
        }
    }, [getJobStage, stageId, stepId]);

    /**
     * 当前显示的脚本是否是选择的脚本
     */
    const isSelectScript = useMemo(() => {
        if (!currentStep?.script) {
            return false;
        }
        const { name, type, args } = currentStep.script;

        if (
            name === '数字选项-加减乘除' &&
            type === 'count' &&
            args[1] &&
            args[1] === selectScript[2]
        ) {
            return true;
        }
        return false;
    }, [currentStep, selectScript]);

    /** 当前脚本的信息 */
    const scriptInfo = useMemo(() => {
        setParamList([
            { title: '', loopItems: [], row: '', column: '' },
            { title: '', loopItems: [], row: '', column: '' },
        ]);
        setOutPut({ value: '', description: '' });
        switch (selectScript[2]) {
            case '+':
                return '加法';
            case '-':
                return '减法';
            case '*':
                return '乘法';
            case '/':
                return '除法';
            default:
                return '—';
        }
    }, [selectScript]);

    /**
     * 初始化给选项赋值
     */
    useEffect(() => {
        const newOut = { value: '', description: '' };
        const newParamList: ParamsType = [
            { title: '', loopItems: [], row: '', column: '' },
            { title: '', loopItems: [], row: '', column: '' },
        ];
        if (!currentStep || !isSelectScript) {
            setParamList([...newParamList]);
            setOutPut(newOut);
            return;
        }

        if (currentStep.script && currentStep.script.args) {
            // 变量值
            const varValue = currentStep.script.args[0];
            if (Array.isArray(varValue)) {
                for (let i = 0; i < varValue.length; i++) {
                    const item: ParamItemType = { title: '', loopItems: [], row: '', column: '' };
                    const [qid, option] = varValue[i].split('#');
                    if (qid) {
                        const [title, ...loopItem] = String(qid).split('_');
                        item.title = title;
                        item.loopItems = loopItem;
                    }
                    if (option) {
                        const optionArray = option.split('_');
                        if (optionArray[0]) {
                            item.row = optionArray[0];
                        }
                        if (optionArray[1]) {
                            item.column = optionArray[1];
                        }
                    }
                    newParamList[i] = item;
                }
                setParamList([...newParamList]);
            }
            const outPutValue = currentStep.script.args[2];
            if (outPutValue) {
                newOut.value = outPutValue.split('#')[0];
            }
        }
        if (currentStep.script && currentStep.script.description) {
            newOut.description = currentStep.script.description;
        }

        setOutPut(newOut);
    }, [currentStep, isSelectScript]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * 取出span标签里面的选项值
     */
    const getSpanInner = (str: string) => {
        const res = str.match(/<span[^>]*>([\s\S]*?)<\/span>/);
        return res ? res[1] : str ? str : '选项1';
    };

    const handleSave = () => {
        const type = 'count';
        const name = '数字选项-加减乘除';
        const description = outPut.description;
        const args: [string[], string, string] = [[], selectScript[2], `${outPut.value}_0`];

        for (let i = 0; i < paramList.length; i++) {
            const item = paramList[i];
            if (item.title && item.row && item.column) {
                args[0].push(`${item.title}#${item.row}_${item.column}`);
            } else if (item.title && item.row) {
                args[0].push(`${item.title}#${item.row}`);
            } else if (item.title && item.column) {
                args[0].push(`${item.title}#${item.row}_${item.column}`);
            } else if (item.title) {
                args[0].push(`${item.title}`);
            } else {
                args[0].push('');
            }
        }

        // operation
        // 数字选项-加减乘除
        const config = getJobStage.config.map((v) => {
            if (v.id === stageId) {
                v.steps.in_stream = v.steps.in_stream.map((item) => {
                    if (item.id === stepId) {
                        return {
                            ...item,
                            script: { type, name, description, args: args as string[] },
                        };
                    }
                    return item;
                });
            }
            return v;
        });
        if (currentJob) {
            dispatch(
                updateJobStageSaga({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    stages: {
                        status: 0,
                        config,
                    },
                }),
            );
        }
    };
    /**
     * 保存发请求
     */
    const saveScript = (
        outPut: { value: string; description: string },
        paramList: Array<{ title: string; loopItems: string[]; row: string; column: string }>,
    ) => {
        if (!currentJob || !tgId || !isSelectScript) {
            return;
        }

        const type = 'count';
        const name = '数字选项-加减乘除';
        const description = outPut.description;
        let code = '';
        const vars = getJobStage.config.find((v) => v.id === stageId)?.r_vars;

        if (vars && outPut.value) {
            const vas = vars.find((item) => item.qid === outPut.value);
            console.log('vas', vas);

            if (vas && vas.q_dimension && vas.q_dimension[0] && vas.q_dimension[0][0]) {
                code = vas.q_dimension[0][0].option_code;
            }
        }
        const args: [string[], string, string] = [[], selectScript[2], `${outPut.value}#${code}`];

        for (let i = 0; i < paramList.length; i++) {
            const item = paramList[i];
            let loopText = '';
            const newLoopItem = item.loopItems.filter((item) => item !== '');
            if (newLoopItem.length > 0) {
                loopText += `_${newLoopItem.join('_')}`;
            }
            console.log('loopText', loopText);

            if (item.title && item.row && item.column) {
                args[0].push(`${item.title}${loopText}#${item.row}_${item.column}`);
            } else if (item.title && item.row) {
                args[0].push(`${item.title}${loopText}#${item.row}`);
            } else if (item.title && item.column) {
                args[0].push(`${item.title}${loopText}#${item.row}_${item.column}`);
            } else if (item.title) {
                args[0].push(`${item.title}${loopText}`);
            } else {
                args[0].push('');
            }
        }

        // operation
        // 数字选项-加减乘除
        const config = getJobStage.config.map((v) => {
            if (v.id === stageId) {
                v.steps.in_stream = v.steps.in_stream.map((item) => {
                    if (item.id === stepId) {
                        return {
                            ...item,
                            script: { type, name, description, args: args as string[] },
                        };
                    }
                    return item;
                });
            }
            return v;
        });
        dispatch(
            updateJobStageSaga({
                talent_group_id: tgId,
                job_id: currentJob.id,
                stages: {
                    status: 0,
                    config,
                },
            }),
        );
    };

    /**
     * 获取问题标题列表
     *
     */
    const getTitleLabels = () => {
        const list: LabelsType = [];
        if (!questionList) {
            return list;
        }
        questionList.forEach((v) => {
            if (v.q_type === 'Numeric' && !v.is_extra) {
                list.push({ id: v.qid, content: QList.getText(v.q_text) });
            }
        });
        return list;
    };

    /**
     * 获取行列表
     */
    const getRowLabels = (selectQuestion: string) => {
        const currentSelectQuestion = questionList.find((v) => v.qid === selectQuestion);
        if (!currentSelectQuestion) {
            return [];
        }
        const qDimension = currentSelectQuestion.q_dimension;
        return qDimension[0].map((v) => ({
            id: v.option_code,
            content: getSpanInner(v.option_text),
        }));
    };

    /**
     * 获取列列表
     */
    const getColumnLabels = (selectQuestion: string) => {
        const currentSelectQuestion = questionList.find((v) => v.qid === selectQuestion);
        if (!currentSelectQuestion) {
            return [];
        }
        const qDimension = currentSelectQuestion.q_dimension;
        if (qDimension.length === 2) {
            return qDimension[1].map((v) => ({
                id: v.option_code,
                content: getSpanInner(v.option_text),
            }));
        }
        return [];
    };

    /**
     * 输出列表
     */
    const getOutLabels = () => {
        if (!stageId || !getJobStage) {
            return [];
        }
        const vars = getJobStage.config.find((v) => v.id === stageId)?.r_vars;

        if (!vars) {
            return [];
        }
        const haveVars = vars?.filter((item) => {
            if (item.q_dimension.length > 1) {
                return false;
            }
            if (
                item.q_dimension[0] &&
                item.q_dimension[0].length === 1 &&
                item.q_type === 'Numeric'
            ) {
                return true;
            }
            return false;
        });
        return haveVars.map((v) => ({ id: v.qid, content: v.qid }));
    };

    /**
     * 修改question code
     */
    const handleChangeTitle = (value: string, index: number) => {
        const newParamList: ParamsType = JSON.parse(JSON.stringify(paramList));
        newParamList[index] = { title: value, loopItems: [], row: '', column: '' };
        saveScript(outPut, [...newParamList]);
        setParamList(newParamList);
    };
    /**
     * 修改loop
     */
    const handleChangeLoop = (value: string[], index: number) => {
        paramList[index].loopItems = value;
        saveScript(outPut, [...paramList]);
        setParamList([...paramList]);
    };
    /**
     * 修改row
     */
    const handleChangeRow = (value: string, index: number) => {
        paramList[index].row = value;
        saveScript(outPut, [...paramList]);
        setParamList([...paramList]);
    };
    /**
     * 修改column
     */
    const handleChangeColumn = (value: string, index: number) => {
        paramList[index].column = value;
        saveScript(outPut, [...paramList]);
        setParamList([...paramList]);
    };

    /**
     * 修改output值
     */
    const handleChangeOutPutValue = (value: string) => {
        outPut.value = value;
        saveScript({ ...outPut }, paramList);
        setOutPut({ ...outPut });
    };

    /**
     * 修改output描述
     */
    const handleChangeOutPutDescription = (value: string) => {
        outPut.description = value;
        setOutPut({ ...outPut });
    };
    /**
     * 检查有效性
     */
    const handleCheckParamValidate = () => {
        const validate = true;
        for (let i = 0; i < paramList.length; i++) {
            const item = paramList[i];
            const selectQuestion = questionList.find((v) => v.qid === item.title);
            if (!selectQuestion) {
                return false;
            }
            const length = selectQuestion.q_dimension.length;
            if (length === 1 && !item.row) {
                return false;
            }
            if (length === 2 && (!item.row || !item.column)) {
                return false;
            }
        }
        return validate;
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.operationScript_container}>
            <TitleCard
                title={`基础四则运算 - ${scriptInfo}`}
                label="基础运算类"
                description={`此脚本用于将多个数字题中若干选项进行${scriptInfo}运算，并将运算结果储存为被访者变量。`}
            />
            <ExpressionCard
                length={paramList.length}
                isValidate={handleCheckParamValidate()}
                symbol={selectScript[2]}
                handleAdd={() => {
                    paramList.push({ title: '', loopItems: [], row: '', column: '' });
                    setParamList([...paramList]);
                    saveScript(outPut, [...paramList]);
                }}
                handleDelete={() => {
                    paramList.pop();
                    setParamList([...paramList]);
                    saveScript(outPut, [...paramList]);
                }}
            />
            {paramList.map((item, index) => (
                <ParameterCard
                    key={`${index}_${selectScript[2]}`}
                    parameterName={`var${index + 1}`}
                    parameterDescription="请选择数字题的单一选项作为此脚本的输入参数。"
                    rowDescription="在此处选择需要进行求和的行选项。"
                    columnDescription="在此处选择需要进行求和的列选项。"
                    title={item.title}
                    loopItems={item.loopItems}
                    handleChangeLoopItems={(value) => handleChangeLoop(value, index)}
                    questionList={questionList}
                    testStage={testStage}
                    titleLabels={getTitleLabels()}
                    handleChangeTitle={(value) => handleChangeTitle(value as string, index)}
                    row={item.row}
                    rowLabels={getRowLabels(item.title)}
                    handleChangeRow={(value) => handleChangeRow(value as string, index)}
                    column={item.column}
                    columnLabels={getColumnLabels(item.title)}
                    handleChangeColumn={(value) => handleChangeColumn(value as string, index)}
                />
            ))}

            <OutPutCard
                testStage={testStage}
                outPutValue={outPut.value}
                outPutLabels={getOutLabels()}
                handleChangeOutPutValue={handleChangeOutPutValue}
                outPutDescription={outPut.description}
                handleChangeDescription={handleChangeOutPutDescription}
                handleSaveDescription={() => {
                    saveScript(outPut, paramList);
                }}
            />
        </div>
    );
};
export { OperationScript };
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
