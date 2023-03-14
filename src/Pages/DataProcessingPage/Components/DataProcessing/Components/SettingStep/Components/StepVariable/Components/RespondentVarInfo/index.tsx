/**
 * @file RespondentVarInfo
 * @date 2022-11-16
 * @author liaoli
 * @lastModify liaoli 2022-11-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, Kite, ResetInput, TextAreaV2 } from '@datareachable/dr_front_componentlibrary';
import {
    Active,
    defaultDropAnimationSideEffects,
    DndContext,
    DragOverlay,
    DropAnimation,
    KeyboardSensor,
    Over,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { respondentsVarType } from '~/DefaultData/Stages';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import { BulkAdd } from './Components/BulkAdd';
import OptionItem from './Components/OptionItem/Index';
import PreviewQuestion from './Components/PreviewQuestion';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RespondentOptionType {
    id: string;
    qid: string;
    q_text: string;
    q_type: string;
    q_dimension: {
        option_code: string;
        option_text: string;
    }[][];
    q_label_name: string;
    q_description: string;
}

interface RespondentVarInfoProps {
    selectVariable: string;
}
const RespondentVarInfo: React.FC<RespondentVarInfoProps> = ({ selectVariable }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const {
        getJobStage,
        currentStep: { stageId },
    } = useSelector((state: RootState) => state.jobStage);

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const dispatch = useDispatch();

    /**
     * 是否显示预览页面
     */
    const [showPreviewQuestion, setShowPreviewQuestion] = useState(false);

    /**
     * 是否显示批量增加
     */
    const [showBatchAdd, setShowBatchAdd] = useState('');

    /**
     * 显示 question type 下拉
     */
    const [showQuestionType, setShowQuestionType] = useState(false);

    /**
     * var name
     */
    const [varName, setVarName] = useState('');

    /**
     * question name
     */
    const [questionName, setQuestionName] = useState('');

    /**
     * question type
     */
    const [questionType, setQuestionType] = useState('');

    /**
     * var description
     */
    const [varDescription, setVarDescription] = useState('');

    /**
     * row list
     */
    const [rowList, setRowList] = useState<{ code: string; text: string }[]>([]);

    /**
     * col list
     */
    const [colList, setColList] = useState<{ code: string; text: string }[]>([]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */

    /**
     * 当前选择的被访者变量的数据
     */
    const currentVar = useMemo(() => {
        return getJobStage.config
            .find((v) => v.id === stageId)
            ?.r_vars.find((v) => v.id === selectVariable);
    }, [getJobStage, selectVariable, stageId]);

    /**
     * 当前选择被访者变量的行、列
     */
    const currentOption = useMemo(() => {
        if (currentVar?.q_dimension.length === 2) {
            return {
                row: currentVar.q_dimension[1],
                col: currentVar.q_dimension[0],
            };
        } else {
            return {
                row: currentVar?.q_dimension[0] || [],
                col: [],
            };
        }
    }, [currentVar]);

    /**
     * 变量名称是否已有
     */
    const isNameRepeat = useMemo(() => {
        return getJobStage.config.some(
            (v) =>
                v.r_vars.some((item) => item.qid === varName && item.id !== currentVar?.id) ||
                v.g_vars.some((item) => item.name === varName),
        );
    }, [currentVar?.id, varName, getJobStage.config]);

    /**
     * 检查变量名
     */
    const testVarname = useMemo(() => {
        return /^[a-zA-Z0-9_]{1,72}$/.test(varName);
    }, [varName]);

    /**
     * 切换时初始化
     */
    useLayoutEffect(() => {
        if (currentVar) {
            const { qid, q_dimension, q_description, q_text, q_type } = currentVar;
            setVarName(qid);
            setQuestionName(q_text);
            setQuestionType(q_type);
            setVarDescription(q_description);

            if (q_dimension.length === 1) {
                setRowList(
                    q_dimension[0].map((v) => ({ code: v.option_code, text: v.option_text })),
                );
            } else if (q_dimension.length === 2) {
                setRowList(
                    q_dimension[1].map((v) => ({ code: v.option_code, text: v.option_text })),
                );
                setColList(
                    q_dimension[0].map((v) => ({ code: v.option_code, text: v.option_text })),
                );
            } else {
                setRowList([]);
                setColList([]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentVar?.id]);

    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * 正在拖动的step
     */
    const [active, setActive] = useState<Active | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const dropAnimationConfig: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.4',
                },
            },
        }),
    };

    /**
     * 发请求
     */
    const updateRespondentVarInfo = (
        stageId: string,
        id: string,
        payload: RespondentOptionType,
    ) => {
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
                            return {
                                ...v,
                                r_vars: v.r_vars.map((item) => {
                                    if (item.id === id) {
                                        return payload;
                                    }
                                    return item;
                                }),
                            };
                        }
                        return v;
                    }),
                },
            }),
        );
    };
    /**
     * 变量名称修改
     */
    const handleChangeVarName = () => {
        if (varName && currentVar && varName !== currentVar.qid) {
            const payload: RespondentOptionType = JSON.parse(JSON.stringify(currentVar));
            payload.qid = varName;
            updateRespondentVarInfo(stageId, currentVar.id, payload);
        }
    };

    /**
     * 问题名称修改
     */
    const handleChangeQuestionName = (name: string) => {
        if (name && currentVar && name !== currentVar.q_text) {
            const payload: RespondentOptionType = JSON.parse(JSON.stringify(currentVar));
            payload.q_text = name;
            updateRespondentVarInfo(stageId, currentVar.id, payload);
        }
    };

    /**
     * 问题type修改
     */
    const handleChangeQuestionType = (v: string) => {
        setQuestionType(v);
        if (v && currentVar && v !== currentVar.q_type) {
            const payload: RespondentOptionType = JSON.parse(JSON.stringify(currentVar));
            payload.q_type = v;
            updateRespondentVarInfo(stageId, currentVar.id, payload);
        }
    };

    /**
     * 问题描述修改
     */
    const handleChangeVarDescription = () => {
        if (varDescription && currentVar && varDescription !== currentVar.q_description) {
            const payload: RespondentOptionType = JSON.parse(JSON.stringify(currentVar));
            payload.q_description = varDescription;
            updateRespondentVarInfo(stageId, currentVar.id, payload);
        }
    };

    /**
     * 行选项修改
     */

    const handleChangeRowOption = () => {
        if (
            rowList &&
            currentVar &&
            JSON.stringify(rowList) !== JSON.stringify(currentOption.row)
        ) {
            const payload: RespondentOptionType = JSON.parse(JSON.stringify(currentVar));
            if (currentVar.q_dimension.length === 2) {
                payload.q_dimension[1] = rowList.map((v, i) => ({
                    option_code: i.toString(),
                    option_text: v.text,
                }));
            } else {
                payload.q_dimension[0] = rowList.map((v, i) => ({
                    option_code: i.toString(),
                    option_text: v.text,
                }));
            }

            updateRespondentVarInfo(stageId, currentVar.id, payload);
        }
    };

    /**
     * 列选项修改
     */
    const handleChangeColOption = () => {
        if (
            colList &&
            currentVar &&
            JSON.stringify(colList) !== JSON.stringify(currentOption.col)
        ) {
            const payload: RespondentOptionType = JSON.parse(JSON.stringify(currentVar));
            payload.q_dimension[0] = colList.map((v, i) => ({
                option_code: i.toString(),
                option_text: v.text,
            }));
            if (currentVar.q_dimension.length !== 2) {
                payload.q_dimension[1] = currentVar.q_dimension[0] || [];
            }
            updateRespondentVarInfo(stageId, currentVar.id, payload);
        }
    };

    /**
     * 交换
     */
    const handleReplaceFn = (active: Active, over: Over | null, type: 'col' | 'row') => {
        const obj = type === 'col' ? colList : rowList;
        if (over && active.id !== over?.id) {
            const activeIndex = obj.findIndex(({ code }) => code === active.id);
            const overIndex = obj.findIndex(({ code }) => code === over.id);
            const data = arrayMove(obj, activeIndex, overIndex);
            obj.splice(0, obj.length, ...data);

            if (type === 'col') {
                setColList([...obj]);
                handleChangeColOption();
            } else {
                setRowList([...obj]);
                handleChangeRowOption();
            }
            setActive(null);
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div className={style.respondentVarInfo_header}>
                <h2>设置变量</h2>
                <div
                    className={`${style.respondentVarInfo_preview} ${
                        rowList.length ? style.respondentVarInfo_canPreview : ''
                    }`}
                    onClick={() => {
                        if (rowList.length) {
                            setShowPreviewQuestion(true);
                        }
                    }}
                >
                    <Icon type="eyeOpen" />
                    <span>预览</span>
                </div>
            </div>
            <h3 className={style.respondentVarInfo_title}>变量名称</h3>
            <ResetInput
                className={`${style.respondentVarInfo_name} ${
                    varName && (isNameRepeat || !testVarname)
                        ? style.respondentVarInfo_nameRepeat
                        : ''
                }`}
                value={varName}
                onChange={(v) => setVarName(v)}
                onBlur={() => {
                    if (isNameRepeat || varName === '' || !testVarname) {
                        setVarName(currentVar?.qid || '');
                    } else {
                        handleChangeVarName;
                    }
                }}
            />

            <div className={style.respondentVarInfo_container}>
                <div className={style.respondentVarInfo_varInfo}>
                    <Kite
                        show={showQuestionType}
                        placement="lb"
                        offset={{ y: 1 }}
                        handleGlobalClick={(v) => {
                            if (!v.isBtn && !v.isMenu) {
                                setShowQuestionType(false);
                            }
                        }}
                        root={
                            <div
                                className={style.respondentVarInfo_varType}
                                onClick={() => setShowQuestionType(!showQuestionType)}
                            >
                                <Icon
                                    type={
                                        respondentsVarType.find((v) => v.id === questionType)
                                            ?.icon || 'singleChoiceUnselected'
                                    }
                                    className={style.respondentVarInfo_typeIcon}
                                />
                                <Icon
                                    type="dropdown"
                                    className={style.respondentVarInfo_dropdownIcon}
                                />
                            </div>
                        }
                    >
                        <div className={style.respondentVarInfo_questionType}>
                            {respondentsVarType.map((v) => (
                                <div
                                    style={questionType === v.id ? { color: '#22A6B3' } : {}}
                                    key={v.id}
                                    onClick={() => {
                                        setShowQuestionType(false);
                                        handleChangeQuestionType(v.id);
                                    }}
                                >
                                    <Icon type={v.icon} />
                                    <p>{v.text}</p>
                                </div>
                            ))}
                        </div>
                    </Kite>
                    <div
                        className={style.respondentVarInfo_titleWarp}
                        onClick={(e) => {
                            (e.currentTarget.children[0] as HTMLElement).focus();
                        }}
                    >
                        {/* <input
                            className={style.respondentVarInfo_titleInp}
                            placeholder="请在此编辑该变量的标题..."
                            type="text"
                            value={questionName}
                            onChange={(e) => setQuestionName(e.target.value)}
                            onBlur={handleChangeQuestionName}
                        /> */}
                        <div
                            contentEditable
                            suppressContentEditableWarning
                            className={style.respondentVarInfo_titleEdit}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    (e.target as HTMLElement).blur();
                                }
                            }}
                            onBlur={(e) => {
                                setQuestionName(e.target.innerText);
                                handleChangeQuestionName(e.target.innerText);
                            }}
                        >
                            {questionName}
                        </div>
                    </div>
                </div>
                <h3 className={style.respondentVarInfo_descTitle}>变量说明</h3>
                {/* <textarea
                    className={style.respondentVarInfo_desc}
                    placeholder="请在此编辑该变量的相关说明..."
                    value={varDescription}
                    onChange={(e) => setVarDescription(e.target.value)}
                    onBlur={handleChangeVarDescription}
                /> */}
                <TextAreaV2
                    className={style.respondentVarInfo_desc}
                    placeholder="请在此编辑该变量的相关说明..."
                    value={varDescription}
                    onInput={(v) => setVarDescription(v)}
                    onBlur={handleChangeVarDescription}
                />
                <div className={style.respondentVarInfo_row}>选项（行）</div>
                {rowList.length ? (
                    <DndContext
                        sensors={sensors}
                        onDragStart={({ active }) => {
                            setActive(active);
                        }}
                        onDragEnd={({ active, over }) => {
                            handleReplaceFn(active, over, 'row');
                        }}
                        onDragCancel={() => {
                            setActive(null);
                        }}
                    >
                        <SortableContext items={rowList.map((v) => ({ id: v.code, text: v }))}>
                            <ul className="SortableList" role="application">
                                {rowList.map((v, i) => (
                                    <OptionItem
                                        key={v.code}
                                        item={{ ...v }}
                                        index={i}
                                        handleAdd={(index) => {
                                            rowList.splice(index + 1, 0, {
                                                code: (
                                                    Math.max(
                                                        ...[
                                                            ...rowList.map((item) =>
                                                                Number(item.code),
                                                            ),
                                                            0,
                                                        ],
                                                    ) + 1
                                                ).toString(),
                                                text: '',
                                            });
                                            setRowList([...rowList]);
                                        }}
                                        handleDel={(index) => {
                                            rowList.splice(index, 1);
                                            setRowList([...rowList]);
                                            handleChangeRowOption();
                                        }}
                                        handleChange={(v, j) => {
                                            setRowList(
                                                rowList.map((item, index) => {
                                                    if (index === j) {
                                                        item.text = v;
                                                    }
                                                    return item;
                                                }),
                                            );
                                        }}
                                        handleBlur={handleChangeRowOption}
                                    />
                                ))}
                            </ul>
                        </SortableContext>
                        <DragOverlay dropAnimation={dropAnimationConfig}>
                            {active !== null ? (
                                <OptionItem
                                    index={rowList.findIndex((v) => v.code === active.id)}
                                    item={
                                        rowList.find((v) => v.code === active.id) as {
                                            code: string;
                                            text: string;
                                        }
                                    }
                                />
                            ) : (
                                <></>
                            )}
                        </DragOverlay>
                    </DndContext>
                ) : (
                    <div className={style.respondentVarInfo_addOption}>
                        <div onClick={() => setRowList([{ code: '0', text: '' }])}>
                            <Icon type="addition" />
                            <p>添加选项</p>
                        </div>
                        <i></i>
                        <div onClick={() => setShowBatchAdd('1')}>
                            <Icon type="Row" />
                            <p>批量添加行</p>
                        </div>
                    </div>
                )}
                <div className={style.respondentVarInfo_col}>选项（列）</div>
                {colList.length ? (
                    <DndContext
                        sensors={sensors}
                        onDragStart={({ active }) => {
                            setActive(active);
                        }}
                        onDragEnd={({ active, over }) => {
                            handleReplaceFn(active, over, 'col');
                        }}
                        onDragCancel={() => {
                            setActive(null);
                        }}
                    >
                        <SortableContext items={colList.map((v) => ({ id: v.code, text: v }))}>
                            <ul className="SortableList" role="application">
                                {colList.map((v, i) => (
                                    <OptionItem
                                        key={v.code}
                                        item={{ ...v }}
                                        index={i}
                                        handleAdd={(index) => {
                                            colList.splice(index + 1, 0, {
                                                code: (
                                                    Math.max(
                                                        ...[
                                                            ...colList.map((item) =>
                                                                Number(item.code),
                                                            ),
                                                            0,
                                                        ],
                                                    ) + 1
                                                ).toString(),
                                                text: '',
                                            });
                                            setColList([...colList]);
                                        }}
                                        handleDel={(index) => {
                                            colList.splice(index, 1);
                                            setColList([...colList]);
                                            handleChangeColOption();
                                        }}
                                        handleChange={(v, j) => {
                                            setColList(
                                                colList.map((item, index) => {
                                                    if (index === j) {
                                                        item.text = v;
                                                    }
                                                    return item;
                                                }),
                                            );
                                        }}
                                        handleBlur={handleChangeColOption}
                                    />
                                ))}
                            </ul>
                        </SortableContext>
                        <DragOverlay dropAnimation={dropAnimationConfig}>
                            {active !== null ? (
                                <OptionItem
                                    index={colList.findIndex((v) => v.code === active.id)}
                                    item={
                                        colList.find((v) => v.code === active.id) as {
                                            code: string;
                                            text: string;
                                        }
                                    }
                                />
                            ) : (
                                <></>
                            )}
                        </DragOverlay>
                    </DndContext>
                ) : (
                    <div className={style.respondentVarInfo_addOption}>
                        <div onClick={() => setColList([{ code: '0', text: '' }])}>
                            <Icon type="addition" />
                            <p>添加选项</p>
                        </div>
                        <i></i>
                        <div onClick={() => setShowBatchAdd('2')}>
                            <Icon type="Row" />
                            <p>批量添加列</p>
                        </div>
                    </div>
                )}
            </div>

            {showPreviewQuestion && (
                <PreviewQuestion
                    type={questionType}
                    row={rowList.map((v) => v.text)}
                    col={colList.map((v) => v.text)}
                    handleClose={() => setShowPreviewQuestion(false)}
                />
            )}
            {showBatchAdd && (
                <BulkAdd
                    type={showBatchAdd}
                    handleClose={() => setShowBatchAdd('')}
                    handleBatchAdd={(list, type) => {
                        setShowBatchAdd('');
                        if (type === '1') {
                            const rowMaxCode = Math.max(
                                ...[...rowList.map((item) => Number(item.code)), 0],
                            );
                            list.forEach((item, index) => {
                                rowList.push({
                                    code: (rowMaxCode + index).toString(),
                                    text: item,
                                });
                            });
                            setRowList(rowList);
                            handleChangeRowOption();
                        } else {
                            const colMaxCode = Math.max(
                                ...[...colList.map((item) => Number(item.code)), 0],
                            );

                            list.forEach((item, index) => {
                                colList.push({
                                    code: (colMaxCode + index).toString(),
                                    text: item,
                                });
                            });
                            setColList(colList);
                            handleChangeColOption();
                        }
                    }}
                />
            )}
        </>
    );
};
export default RespondentVarInfo;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
