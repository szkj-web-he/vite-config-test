/**
 * @file StageList
 * @date 2022-11-10
 * @author liaoli
 * @lastModify liaoli 2022-11-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, Transition } from '@datareachable/dr_front_componentlibrary';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateJobStageAction, updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import style from './style.scss';
import {
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
import type { Active } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import StageListItem from './Components/StageListItem';
import { StageType } from '~/Store/JobStage/types';
import { verifyScriptParams } from '~/Utils/verifyScriptParams';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface ScriptType {
    id: string;
    name: string;
    script?:
        | {
              name: string;
              args: string[];
          }
        | undefined;
}

interface StageListProps {
    stageTest: boolean;
    handleSetKite: (el: HTMLElement) => void;
    handleCurrentStageChange: (id: string) => void;
}
const StageList: React.FC<StageListProps> = ({
    stageTest,
    handleSetKite,
    handleCurrentStageChange,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);

    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);

    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);

    /**
     * 展示的stage列表？
     */
    const [showStageList, setShowStageList] = useState<{ [key: string]: boolean }>({
        [getJobStage.config[0]?.id]: true,
    });

    /**
     * 展示的step列表
     */
    const [showStepList, setShowStepList] = useState<{ [key: string]: boolean }>({
        [`${getJobStage.config[0]?.id}_1`]: true,
        [`${getJobStage.config[0]?.id}_2`]: true,
    });

    /**
     * 正在拖动的step
     */
    const [active, setActive] = useState<{ [key: string]: Active }>({});

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
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 是否设置变量
     */
    const isSetVar = (setp: StageType) => {
        return setp.g_vars.length || setp.r_vars.length;
    };

    /**
     * 拖动替换
     */
    const handleReplaceFn = (
        active: Active,
        over: Over | null,
        id,
        item: StageType['steps']['in_stream'] | StageType['steps']['after_stream'],
        type,
    ) => {
        if (over && active.id !== over?.id) {
            const activeIndex = item.findIndex(({ id }) => id === active.id);
            const overIndex = item.findIndex(({ id }) => id === over.id);
            const data = arrayMove(item, activeIndex, overIndex);

            const payload = {
                status: 0,
                config: getJobStage.config.map((v) => {
                    if (v.id === id) {
                        return {
                            ...v,
                            steps: {
                                ...v.steps,
                                in_stream:
                                    type === 'const'
                                        ? (data as StageType['steps']['in_stream'])
                                        : v.steps.in_stream,
                                after_stream: type === 'action' ? data : v.steps.after_stream,
                            },
                        };
                    }
                    return v;
                }),
            };
            dispatch(updateJobStageAction(payload));
            if (tgId && currentJob) {
                dispatch(
                    updateJobStageSaga({
                        talent_group_id: tgId,
                        job_id: currentJob.id,
                        stages: payload,
                    }),
                );
            }

            setActive({});
        }
    };

    const getScript = (data: ScriptType[], id: string) => {
        return data.find((v) => v.id === active[id].id) as ScriptType;
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.stageList_container}>
            {getJobStage.config.map((item) => (
                <div key={item.id} className={style.stageList_item}>
                    <div
                        className={style.stageList_itemHeader}
                        onClick={() => {
                            setShowStageList({
                                ...showStageList,
                                [`${item.id}`]: !showStageList[`${item.id}`],
                            });
                        }}
                    >
                        <div>
                            <Icon
                                type="down"
                                style={showStageList[item.id] ? { transform: 'rotate(0)' } : {}}
                            />
                            <h2>{item.name}</h2>
                            <span className={isSetVar(item) ? style.stageList_setVar : ''}>
                                {isSetVar(item) ? '已设变量' : '未设变量'}
                            </span>
                        </div>
                        <Icon
                            type="moreVertical"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCurrentStageChange(item.id);
                                handleSetKite(e.currentTarget as EventTarget as HTMLElement);
                            }}
                        />
                    </div>
                    <Transition
                        show={showStageList[item.id]}
                        animationType="taller"
                        className={style.stageList_stepContainer}
                    >
                        <div className={style.stageList_step}>
                            <div
                                className={style.stageList_title}
                                onClick={() => {
                                    setShowStepList({
                                        ...showStepList,
                                        [`${item.id}_1`]: !showStepList[`${item.id}_1`],
                                    });
                                }}
                            >
                                <p>计算类步骤</p>
                                <Icon
                                    type="dropdown"
                                    style={
                                        showStepList[`${item.id}_1`]
                                            ? { transform: 'rotate(0)' }
                                            : {}
                                    }
                                />
                            </div>
                            <Transition show={showStepList[`${item.id}_1`]} animationType="taller">
                                <div className={style.stageList_countContent}>
                                    <StageListItem
                                        index={1}
                                        isShowDrop={true}
                                        stageTest={stageTest}
                                        isParams={
                                            !!verifyScriptParams(item.steps.in_stream[0].script)

                                            // !!item.steps.in_stream[0]?.script?.args[0] &&
                                            // !!item.steps.in_stream[0]?.script?.args[2]
                                        }
                                        item={item.steps.in_stream[0]}
                                        stage={item}
                                        isSetScript={!!item.steps.in_stream[0]?.script?.name}
                                        type="1"
                                    />
                                    <DndContext
                                        sensors={sensors}
                                        onDragStart={({ active }) => {
                                            setActive({ [item.id]: active });
                                        }}
                                        onDragEnd={({ active, over }) => {
                                            handleReplaceFn(
                                                active,
                                                over,
                                                item.id,
                                                item.steps.in_stream,
                                                'const',
                                            );
                                        }}
                                        onDragCancel={() => {
                                            setActive({});
                                        }}
                                    >
                                        <SortableContext
                                            items={item.steps.in_stream.slice(
                                                1,
                                                item.steps.in_stream.length - 1,
                                            )}
                                        >
                                            <ul className="SortableList" role="application">
                                                {item.steps.in_stream
                                                    .slice(1, item.steps.in_stream.length - 1)
                                                    .map((v, i) => (
                                                        <StageListItem
                                                            index={i + 2}
                                                            stageTest={stageTest}
                                                            isParams={
                                                                !!verifyScriptParams(v.script)
                                                                // !!v.script.args[0] &&
                                                                // !!v.script.args[2]
                                                            }
                                                            key={v.id}
                                                            item={v}
                                                            stage={item}
                                                            isSetScript={!!v.script.name}
                                                            type="1"
                                                        />
                                                    ))}
                                            </ul>
                                        </SortableContext>
                                        <DragOverlay dropAnimation={dropAnimationConfig}>
                                            {active[item.id]?.id ? (
                                                <StageListItem
                                                    index={
                                                        item.steps.in_stream.findIndex(
                                                            (v) => v.id === active[item.id].id,
                                                        ) + 1
                                                    }
                                                    stageTest={stageTest}
                                                    isParams={
                                                        !!verifyScriptParams(
                                                            getScript(item.steps.in_stream, item.id)
                                                                ?.script,
                                                        )

                                                        // !!getScript(item.steps.in_stream, item.id)
                                                        //     ?.script?.args[0] &&
                                                        // !!getScript(item.steps.in_stream, item.id)
                                                        //     ?.script?.args[2]
                                                    }
                                                    item={getScript(item.steps.in_stream, item.id)}
                                                    isSetScript={
                                                        !!getScript(item.steps.in_stream, item.id)
                                                            ?.script?.name
                                                    }
                                                    type="1"
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </DragOverlay>
                                    </DndContext>
                                    <StageListItem
                                        index={item.steps.in_stream.length}
                                        isShowDrop={true}
                                        stageTest={stageTest}
                                        stage={item}
                                        isParams={
                                            !!verifyScriptParams(
                                                item.steps.in_stream[
                                                    item.steps.in_stream.length - 1
                                                ]?.script,
                                            )

                                            // !!item.steps.in_stream[item.steps.in_stream.length - 1]
                                            //     ?.script?.args[0] &&
                                            // !!item.steps.in_stream[item.steps.in_stream.length - 1]
                                            //     ?.script?.args[2]
                                        }
                                        item={item.steps.in_stream[item.steps.in_stream.length - 1]}
                                        isSetScript={
                                            !!item.steps.in_stream[item.steps.in_stream.length - 1]
                                                ?.script?.name
                                        }
                                        type="1"
                                    />
                                </div>
                            </Transition>
                        </div>
                        <div className={style.stageList_step}>
                            <div
                                className={style.stageList_title}
                                onClick={() => {
                                    setShowStepList({
                                        ...showStepList,
                                        [`${item.id}_2`]: !showStepList[`${item.id}_2`],
                                    });
                                }}
                            >
                                <p>行动类步骤</p>
                                <Icon
                                    type="dropdown"
                                    style={
                                        showStepList[`${item.id}_2`]
                                            ? { transform: 'rotate(0)' }
                                            : {}
                                    }
                                />
                            </div>
                            <Transition show={showStepList[`${item.id}_2`]} animationType="taller">
                                <div className={style.stageList_countContent}>
                                    <DndContext
                                        sensors={sensors}
                                        onDragStart={({ active }) => {
                                            setActive({ [item.id]: active });
                                        }}
                                        onDragEnd={({ active, over }) => {
                                            handleReplaceFn(
                                                active,
                                                over,
                                                item.id,
                                                item.steps.after_stream,
                                                'action',
                                            );
                                        }}
                                        onDragCancel={() => {
                                            setActive({});
                                        }}
                                    >
                                        <SortableContext items={item.steps.after_stream}>
                                            <ul className="SortableList" role="application">
                                                {item.steps.after_stream.map((v, i) => (
                                                    <StageListItem
                                                        index={i + 1}
                                                        stageTest={stageTest}
                                                        // isParams={!!textParams(v)}
                                                        isParams={!!verifyScriptParams(v.script)}
                                                        key={v.id}
                                                        item={v}
                                                        type="2"
                                                        isSetScript={!!v.script.name}
                                                        stage={item}
                                                    />
                                                ))}
                                            </ul>
                                        </SortableContext>
                                        <DragOverlay dropAnimation={dropAnimationConfig}>
                                            {active[item.id]?.id ? (
                                                <StageListItem
                                                    index={
                                                        item.steps.after_stream.findIndex(
                                                            (v) => v.id === active[item.id].id,
                                                        ) + 1
                                                    }
                                                    stageTest={stageTest}
                                                    isParams={
                                                        !!verifyScriptParams(
                                                            getScript(
                                                                item.steps.after_stream,
                                                                item.id,
                                                            )?.script,
                                                        )

                                                        // !!getScript(
                                                        //     item.steps.after_stream,
                                                        //     item.id,
                                                        // )?.script?.args[0] &&
                                                        // !!getScript(
                                                        //     item.steps.after_stream,
                                                        //     item.id,
                                                        // )?.script?.args[1]
                                                    }
                                                    item={getScript(
                                                        item.steps.after_stream,
                                                        item.id,
                                                    )}
                                                    isSetScript={
                                                        !!getScript(
                                                            item.steps.after_stream,
                                                            item.id,
                                                        )?.script?.name
                                                    }
                                                    type="1"
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </DragOverlay>
                                    </DndContext>
                                </div>
                            </Transition>
                        </div>
                    </Transition>
                </div>
            ))}
        </div>
    );
};
export default StageList;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
