/**
 * @file ScriptInfoOneDimension
 * @date 2022-11-14
 * @author liaoli
 * @lastModify liaoli 2022-11-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { TextAreaV2 } from '@datareachable/dr_front_componentlibrary';
import { DropDownListV2 } from '@datareachable/dr_front_componentlibrary/Components/Zmz/DropDownListV2';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobQuestionSaga } from '~/Store/JobList/actions';
import { JobQuestionType } from '~/Store/JobList/types';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import { QList } from '~/Utils/loopNodeUtils';
import TitleCard from '../TitleCard';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface ScriptType {
    type: string;
    name: string;
    args: string[];
    description: string;
}
type LabelType = {
    content: React.ReactNode;
    id: string;
};
interface ScriptInfoOneDimensionProps {
    isSetScript: boolean;
    testStage: boolean;
    selectScript: string[];
    setIsSetScript: () => void;
}
const ScriptInfoOneDimension: React.FC<ScriptInfoOneDimensionProps> = ({
    isSetScript,
    testStage,
    selectScript,
    setIsSetScript,
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

    /** 选择的问题 */
    const [selectQuestion, setSelectQuestion] = useState('');

    /** 选择的行 */
    const [selectRowOption, setSelectRowOption] = useState('');
    /**
     * 选择的脚本
     */
    const [selectScriptId, setSelectScriptId] = useState('');
    /**
     * 循环列表
     */
    const [loopLabels, setLoopLabels] = useState<LabelType[][]>([]);
    /**
     * 选择的loop
     */
    const [selectLoop, setSelectLoop] = useState<string[]>([]);

    /** 选择的列 */
    const [selectColOption, setSelectColOption] = useState('');

    /** 选择的输出变量 */
    const [selectVar, setSelectVar] = useState('');

    /** 开放题匹配的文本 */
    const [matchText, setMatchText] = useState('');

    /** 输出变量描述 */
    const [description, setDescription] = useState('');
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

    /** 当前显示的脚本是否是选择的脚本 */
    const isSelectScript = useMemo(() => {
        if (currentStep?.script) {
            return (
                selectScript[1] === currentStep.script.type &&
                selectScript[2] === currentStep.script.name
            );
        }
    }, [currentStep?.script, selectScript]);

    /** 当前脚本的信息 */
    const scriptInfo = useMemo(() => {
        setSelectQuestion('');
        setSelectVar('');
        setDescription('');
        setMatchText('');

        switch (selectScript[2]) {
            case '答案条目数统计-一维单选':
                return {
                    type: 'Single',
                    isTWoD: false,
                    text: '一维单选题',
                };
            case '答案条目数统计-二维单选':
                return {
                    type: 'Single',
                    isTWoD: true,
                    text: '二维单选题',
                };
            case '答案条目数统计-一维多选':
                return {
                    type: 'Multi',
                    isTWoD: false,
                    text: '一维多选题',
                };
            case '答案条目数统计-二维多选':
                return {
                    type: 'Multi',
                    isTWoD: true,
                    text: '二维多选题',
                };
            case '答案条目数统计-一维开放':
                return {
                    type: 'OpenEnd',
                    isTWoD: false,
                    text: '一维开放题',
                };
            case '答案条目数统计-二维开放':
                return {
                    type: 'OpenEnd',
                    isTWoD: true,
                    text: '二维开放题',
                };
            case '答案条目数统计-一维数字':
                return {
                    type: 'Numeric',
                    isTWoD: false,
                    text: '一维数字题',
                };
            case '答案条目数统计-二维数字':
                return {
                    type: 'Numeric',
                    isTWoD: true,
                    text: '二维数字题',
                };
            default:
                return {
                    type: '',
                    isTWoD: false,
                    text: '—',
                };
        }
    }, [selectScript]);

    /** 可选择的题目 */
    const showQuestionList = useMemo(() => {
        if (questionList) {
            return questionList.filter((v) => {
                return (
                    v.q_type === scriptInfo.type &&
                    v.q_dimension.length === (scriptInfo.isTWoD ? 2 : 1) &&
                    !v.is_extra
                );
            });
        }
    }, [questionList, scriptInfo.type, scriptInfo.isTWoD]);

    /** 当前选择的题目 */
    const currentSelectQuestion = useMemo(
        () => questionList.find((v) => v.qid === selectQuestion),
        [questionList, selectQuestion],
    );
    /** 循环列表 */
    useEffect(() => {
        const selectLoop: string[] = [];
        const loopLabels: LabelType[][] = [];
        const args = currentStep?.script?.args;
        const loopItems: string[] = [];
        if (questionList.length === 0) {
            return;
        }
        if (selectScriptId === selectScript[2]) {
            return;
        }
        if (args && isSelectScript && args[1]) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [qid, ...options] = args[1].split('#')[0].split('_');
            console.log('options', options);

            if (options) {
                options.forEach((item) => {
                    loopItems.push(item);
                });
            }
            const selectQuestion = questionList.find((v) => v.qid === qid);
            if (selectQuestion && Array.isArray(selectQuestion.q_text)) {
                const textList = selectQuestion.q_text;
                let loopIndex = 0;
                for (let i = 0; i < textList.length; i++) {
                    const item = textList[i];
                    if (typeof item !== 'string' && item.type === 'loopNode') {
                        if (loopItems[loopIndex] === '') {
                            selectLoop.push('');
                        } else {
                            selectLoop.push(loopItems[loopIndex]);
                        }
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        loopLabels.push(item.labels);
                        loopIndex++;
                    }
                }
            }
        }
        setSelectScriptId(selectScript[2]);
        setSelectLoop([...selectLoop]);
        setLoopLabels([...loopLabels]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSelectQuestion, currentStep, isSelectScript, questionList, selectScript]);
    /** 可选择的行 */
    const rowOption = useMemo(() => {
        if (currentSelectQuestion) {
            if (currentSelectQuestion.q_dimension.length === 2) {
                return currentSelectQuestion.q_dimension[1];
            } else {
                return currentSelectQuestion.q_dimension[0];
            }
        }
    }, [currentSelectQuestion]);

    /** 可选择的列 */
    const colOption = useMemo(() => {
        if (currentSelectQuestion && currentSelectQuestion.q_dimension.length === 2) {
            return currentSelectQuestion.q_dimension[0];
        }
    }, [currentSelectQuestion]);

    /** 可选择的变量 */
    const varOption = useMemo(() => {
        if (stageId && getJobStage) {
            return getJobStage.config.find((v) => v.id === stageId)?.g_vars;
        }
    }, [stageId, getJobStage]);

    /**
     * 初始化给选项赋值
     */
    useEffect(() => {
        if (!currentStep || !isSelectScript) return;
        const varValue = currentStep?.script?.args[0];
        varValue && setSelectVar(varValue);
        setDescription(currentStep.script.description);

        const args = currentStep?.script?.args;
        const isTwoD = currentStep.script.name.includes('二');

        switch (currentStep.script.name?.split('维')[1]) {
            case '单选': {
                if (isTwoD) {
                    const [qid, col] = args[1]?.split('#') || ['', ''];
                    setSelectRowOption(args[2] || '');
                    setSelectColOption(col);
                    setSelectQuestion(qid.split('_')[0]);
                } else {
                    setSelectRowOption(args[2] || '');
                    setSelectQuestion(args[1].split('_')[0] || '');
                }
                break;
            }
            case '多选': {
                const [qid, option] = args[1]?.split('#') || ['', ''];
                setSelectQuestion(qid.split('_')[0]);
                if (isTwoD) {
                    const [col, row] = option?.split('_') || ['', ''];
                    setSelectRowOption(row || '');
                    setSelectColOption(col || '');
                } else {
                    setSelectRowOption(option);
                }
                break;
            }
            case '开放': {
                const [qid, option] = args[1]?.split('#') || ['', ''];
                setSelectQuestion(qid.split('_')[0]);
                setMatchText(args[2]);
                if (isTwoD) {
                    const [col, row] = option?.split('_') || ['', ''];
                    setSelectRowOption(row || '');
                    setSelectColOption(col || '');
                } else {
                    setSelectRowOption(option);
                }
                break;
            }
            case '数字': {
                const [qid, option] = args[1]?.split('#') || ['', ''];
                setSelectQuestion(qid.split('_')[0]);
                if (isTwoD) {
                    const [col, row] = option?.split('_') || ['', ''];
                    setSelectRowOption(row || '');
                    setSelectColOption(col || '');
                } else {
                    setSelectRowOption(option);
                }
                break;
            }
            default:
                break;
        }
    }, [currentStep, isSelectScript, showQuestionList]);

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
            const initArgs = [selectVar];
            switch (scriptInfo.type) {
                case 'Multi':
                    initArgs[2] = '1';
                    break;
                case 'OpenEnd':
                    initArgs[2] = matchText;
                    break;

                default:
                    break;
            }

            const args = getQuestionCode(
                initArgs,
                selectQuestion,
                selectRowOption,
                selectColOption,
            );

            dispatch(
                updateJobStageSaga({
                    talent_group_id: tgId,
                    job_id: currentJob.id,
                    stages: {
                        status: 0,
                        config: getJobStage.config.map((v) => {
                            if (v.id === stageId) {
                                v.steps.in_stream = v.steps.in_stream.map((item) => {
                                    if (item.id === stepId) {
                                        return {
                                            ...item,
                                            script: {
                                                args: args,
                                                name: selectScript[2],
                                                type: selectScript[1],
                                                description,
                                            },
                                        };
                                    }
                                    return item;
                                });
                            }
                            return v;
                        }),
                    },
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSetScript]);

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

    /**
     * 获取code
     */
    const getQuestionCode = (
        oldArgs: string[],
        question: string,
        row?: string,
        col?: string,
        loopItems?: string[],
    ) => {
        const args = oldArgs || [];
        let loopText = '';
        if (loopItems) {
            const newLoopItem = loopItems.filter((item) => item !== '');
            if (newLoopItem.length > 0) {
                loopText += `_${newLoopItem.join('_')}`;
            }
        }
        if (!question) return oldArgs;
        if (scriptInfo.isTWoD) {
            if (!row || !col) return oldArgs;

            if (scriptInfo.type === 'Single') {
                args[1] = `${selectQuestion}${loopText}#${col}`;
                args[2] = row;
            } else {
                if (selectQuestion && col && row) {
                    args[1] = `${selectQuestion}${loopText}#${col}_${row}`;
                }
            }
        } else {
            if (!row) return oldArgs;

            if (scriptInfo.type === 'Single') {
                args[1] = `${selectQuestion}${loopText}`;
                args[2] = row;
            } else {
                if (selectQuestion && row) {
                    args[1] = `${selectQuestion}${loopText}#${row}`;
                }
            }
        }
        return oldArgs;
    };

    /**
     * 保存发请求
     */
    const saveScript = (stageId: string, stepId: string, payload: ScriptType) => {
        if (!currentJob || !tgId) {
            return;
        }
        dispatch(
            updateJobStageSaga({
                talent_group_id: tgId,
                job_id: currentJob.id,
                stages: {
                    status: 0,
                    config: getJobStage.config.map((v) => {
                        if (v.id === stageId) {
                            v.steps.in_stream = v.steps.in_stream.map((item) => {
                                if (item.id === stepId) {
                                    return {
                                        ...item,
                                        script: payload,
                                    };
                                }
                                return item;
                            });
                        }
                        return v;
                    }),
                },
            }),
        );
    };

    /**
     * 保存输出描述
     */
    const handleSaveDescription = () => {
        if (description !== currentStep?.script.description && isSelectScript) {
            const payload: ScriptType = JSON.parse(JSON.stringify(currentStep?.script));
            payload.description = description;
            saveScript(stageId, stepId, payload);
        }
    };

    /**
     * 保存匹配文本
     */
    const handleMatchTextBlur = () => {
        if (matchText !== currentStep?.script.args[2] && isSelectScript) {
            const payload: ScriptType = JSON.parse(JSON.stringify(currentStep?.script));
            payload.args[2] = matchText;
            saveScript(stageId, stepId, payload);
        }
    };

    /**
     * 保存全局变量
     */
    const handleSaveVar = (v: string) => {
        if (v && v !== currentStep?.script.args[0] && isSelectScript) {
            const payload: ScriptType = JSON.parse(JSON.stringify(currentStep?.script));
            payload.args[0] = v;
            saveScript(stageId, stepId, payload);
        }
    };

    /**
     * 保存选项
     */
    const handleQuestionChange = (question: string, row?: string, col?: string) => {
        if (!isSelectScript) {
            return;
        }
        const args = getQuestionCode(
            JSON.parse(JSON.stringify(currentStep?.script.args)) as string[],
            question,
            row,
            col,
            selectLoop,
        );
        if (args.join('&') === currentStep?.script.args.join('&')) {
            return;
        }
        saveScript(stageId, stepId, {
            name: currentStep?.script.name || '',
            type: currentStep?.script.type || '',
            description: currentStep?.script.description || '',
            args,
        });
    };

    /**
     * 保存loop
     */
    const handleLoopChange = (
        question: string,
        row?: string,
        col?: string,
        loopItems?: string[],
    ) => {
        if (!isSelectScript) {
            return;
        }
        const args = getQuestionCode(
            JSON.parse(JSON.stringify(currentStep?.script.args)) as string[],
            question,
            row,
            col,
            loopItems,
        );
        console.log('args', args);

        if (args.join('&') === currentStep?.script.args.join('&')) {
            return;
        }
        saveScript(stageId, stepId, {
            name: currentStep?.script.name || '',
            type: currentStep?.script.type || '',
            description: currentStep?.script.description || '',
            args,
        });
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.scriptInfo_container}>
            <TitleCard
                title={`答案条目数统计 - ${scriptInfo.text}`}
                label="统计类"
                description={`此脚本用于对${scriptInfo.text}中某个选项，在所有收集到的样本中，被选中的次数进行统计。`}
            />

            <div className={style.scriptInfo_card}>
                <h2 className={style.scriptInfo_cardTitle}>参数形式：</h2>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>参数名：</div>
                    <div className={style.scriptInfo_desc}>题目与选项</div>
                </div>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>参数说明：</div>
                    <div className={style.scriptInfo_desc}>
                        将题目与其选项选择为此脚本的统计范围。统计范围必须为一维多选题的某一个选项。
                    </div>
                </div>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>参数值：</div>
                    <div className={style.scriptInfo_desc}>
                        <DropDownListV2
                            placeholder="请输入..."
                            className={
                                isSelectScript && testStage && !selectQuestion
                                    ? style.scriptInfo_error
                                    : ''
                            }
                            labels={showQuestionList?.map((v) => ({
                                id: v.qid,
                                content: QList.getText(v.q_text),
                            }))}
                            defaultValue={selectQuestion}
                            handleValueChange={(v) => {
                                setSelectRowOption('');
                                setSelectColOption('');
                                setSelectQuestion(v as string);
                                const selectLoop: string[] = [];
                                const loopLabels: LabelType[][] = [];
                                const selectQuestion = questionList.find(
                                    (value) => value.qid === (v as string),
                                );
                                if (selectQuestion && Array.isArray(selectQuestion.q_text)) {
                                    const textList = selectQuestion.q_text;
                                    for (let i = 0; i < textList.length; i++) {
                                        const item = textList[i];
                                        if (typeof item !== 'string' && item.type === 'loopNode') {
                                            selectLoop.push('');
                                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                            loopLabels.push(item.labels);
                                        }
                                    }
                                }
                                setSelectLoop([...selectLoop]);
                                setLoopLabels([...loopLabels]);
                            }}
                        />
                    </div>
                </div>
                {/*  */}
                {loopLabels.map((item, index) => (
                    <Fragment key={index}>
                        <div>
                            <h2 className={style.scriptInfo_row}>循环项目</h2>
                            <div className={style.scriptInfo_item}>
                                <div className={style.scriptInfo_title}>参数说明</div>
                                <div className={style.scriptInfo_desc}>
                                    在此处选择需要补充至题目题干的循环项目。
                                </div>
                            </div>
                        </div>
                        <div className={style.scriptInfo_item}>
                            <div className={style.scriptInfo_title}>参数值：</div>
                            <div className={style.scriptInfo_desc}>
                                <DropDownListV2
                                    placeholder="请输入..."
                                    defaultValue={selectLoop[index]}
                                    labels={item}
                                    handleValueChange={(id) => {
                                        selectLoop[index] = id as string;
                                        setSelectLoop([...selectLoop]);
                                        handleLoopChange(
                                            selectQuestion,
                                            selectRowOption,
                                            selectColOption,
                                            selectLoop,
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </Fragment>
                ))}

                {selectQuestion && (
                    <div>
                        <div>
                            <h2 className={style.scriptInfo_row}>行选项</h2>
                            <div className={style.scriptInfo_item}>
                                <div className={style.scriptInfo_title}>参数说明</div>
                                <div className={style.scriptInfo_desc}>
                                    在此处选择需要进行统计的行选项。
                                </div>
                            </div>
                        </div>
                        <div className={style.scriptInfo_item}>
                            <div className={style.scriptInfo_title}>参数值：</div>
                            <div className={style.scriptInfo_desc}>
                                <DropDownListV2
                                    placeholder="请输入..."
                                    className={
                                        isSelectScript && testStage && !selectRowOption
                                            ? style.scriptInfo_error
                                            : ''
                                    }
                                    defaultValue={selectRowOption}
                                    labels={rowOption?.map((v) => ({
                                        id: v.option_code,
                                        content: getSpanInner(v.option_text),
                                    }))}
                                    handleValueChange={(v) => {
                                        setSelectRowOption(v as string);
                                        handleQuestionChange(
                                            selectQuestion,
                                            v as string,
                                            selectColOption,
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        {scriptInfo.isTWoD && (
                            <>
                                <div>
                                    <h2 className={style.scriptInfo_col}>列选项</h2>
                                    <div className={style.scriptInfo_item}>
                                        <div className={style.scriptInfo_title}>参数说明</div>
                                        <div className={style.scriptInfo_desc}>
                                            在此处选择需要进行统计的行选项。
                                        </div>
                                    </div>
                                </div>

                                <div className={style.scriptInfo_item}>
                                    <div className={style.scriptInfo_title}>参数值：</div>
                                    <div className={style.scriptInfo_desc}>
                                        <DropDownListV2
                                            placeholder="请输入..."
                                            className={
                                                isSelectScript && testStage && !selectColOption
                                                    ? style.scriptInfo_error
                                                    : ''
                                            }
                                            defaultValue={selectColOption}
                                            labels={colOption?.map((v) => ({
                                                id: v.option_code,
                                                content: getSpanInner(v.option_text),
                                            }))}
                                            handleValueChange={(v) => {
                                                setSelectColOption(v as string);
                                                handleQuestionChange(
                                                    selectQuestion,
                                                    selectRowOption,
                                                    v as string,
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            {scriptInfo.type === 'OpenEnd' && (
                <div className={style.scriptInfo_card}>
                    <h2 className={style.scriptInfo_cardTitle}>参数形式:</h2>
                    <div className={style.scriptInfo_item}>
                        <div className={style.scriptInfo_title}>参数名:</div>
                        <div className={style.scriptInfo_desc}>匹配字段</div>
                    </div>
                    <div className={style.scriptInfo_item}>
                        <div className={style.scriptInfo_title}>参数说明</div>
                        <div className={style.scriptInfo_desc}>
                            此脚本将在统计范围选项内匹配该字段。当完全匹配时，统计值+1。（同一选项中多次匹配该字段时，视为完全匹配一次）
                        </div>
                    </div>
                    <div className={style.scriptInfo_item}>
                        <div className={style.scriptInfo_title}>参数值:</div>
                        <TextAreaV2
                            className={
                                isSelectScript && testStage && !matchText
                                    ? style.scriptInfo_error
                                    : ''
                            }
                            height="11.2rem"
                            value={matchText}
                            onInput={(v) => setMatchText(v)}
                            onBlur={handleMatchTextBlur}
                        />
                    </div>
                </div>
            )}
            <div className={style.scriptInfo_card}>
                <h2 className={style.scriptInfo_cardTitle}>输出变量：</h2>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>输出描述：</div>
                    <TextAreaV2
                        className={style.scriptInfo_textArea}
                        height="7.6rem"
                        textOverflow
                        width="100%"
                        placeholder="请输入输出描述 ..."
                        onBlur={handleSaveDescription}
                        value={description}
                        onInput={(v) => {
                            setDescription(v);
                        }}
                    />
                </div>
                <div className={style.scriptInfo_item}>
                    <div className={style.scriptInfo_title}>变量：</div>
                    <div className={style.scriptInfo_desc}>
                        <DropDownListV2
                            placeholder="请输入..."
                            className={
                                isSelectScript && testStage && !selectVar
                                    ? style.scriptInfo_error
                                    : ''
                            }
                            defaultValue={selectVar}
                            labels={varOption?.map((v) => ({
                                id: v.name,
                                content: v.name,
                            }))}
                            handleValueChange={(v) => {
                                setSelectVar(v as string);
                                handleSaveVar(v as string);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ScriptInfoOneDimension;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
