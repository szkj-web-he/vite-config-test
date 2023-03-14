/**
 * @file
 * @date 2023-02-13
 * @author zhoubin
 * @lastModify zhoubin 2023-02-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { DropDownListV2 } from '@datareachable/dr_front_componentlibrary/Components/Zmz/DropDownListV2';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { JobQuestionType } from '~/Store/JobList/types';
import getClassNames from '~/Utils/getClassNames';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

type LabelType = {
    content: React.ReactNode;
    id: string;
};

interface ParameterCardProps {
    parameterName: string;
    parameterDescription: string;
    rowDescription: string;
    columnDescription: string;
    title: string;
    titleLabels: LabelType[];
    loopItems: string[];
    questionList: JobQuestionType[];
    testStage: boolean;
    handleChangeTitle: (v: string | number) => void;
    handleChangeLoopItems: (loopItems: string[]) => void;
    row: string;
    rowLabels: LabelType[];
    handleChangeRow: (v: string | number) => void;
    column: string;
    columnLabels: LabelType[];
    handleChangeColumn: (v: string | number) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ParameterCard: FC<ParameterCardProps> = ({
    parameterName,
    parameterDescription,
    rowDescription,
    columnDescription,
    title,
    loopItems,
    handleChangeLoopItems,
    questionList,
    testStage,
    titleLabels,
    handleChangeTitle,
    row,
    rowLabels,
    handleChangeRow,
    column,
    columnLabels,
    handleChangeColumn,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * 循环列表
     */
    const [loopLabels, setLoopLabels] = useState<LabelType[][]>([]);
    /**
     * 选择的loop
     */
    const [selectLoop, setSelectLoop] = useState<string[]>([]);

    /**
     *
     */
    useEffect(() => {
        const selectLoop: string[] = [];
        const loopLabels: LabelType[][] = [];
        const selectQuestion = questionList.find((v) => v.qid === title);
        if (!selectQuestion) {
            return;
        }
        if (Array.isArray(selectQuestion.q_text)) {
            const textList = selectQuestion.q_text;
            let loopIndex = 0;
            for (let i = 0; i < textList.length; i++) {
                const item = textList[i];
                if (typeof item !== 'string' && item.type === 'loopNode') {
                    console.log('loopItems', loopItems);

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
            console.log('selectLoop', selectLoop);
        }

        setSelectLoop(selectLoop);
        setLoopLabels(loopLabels);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionList, title, loopItems]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const isTWoD = columnLabels.length > 0;
    /**
     *
     */
    const isLoopSelect = useMemo(() => {
        if (selectLoop.length === 0) {
            return true;
        }
        return selectLoop.every((item) => item !== '');
    }, [selectLoop]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.parameterCard_card}>
            <h2 className={style.parameterCard_cardTitle}>参数形式：</h2>
            <div className={style.parameterCard_item}>
                <div className={style.parameterCard_title}>参数名：</div>
                <div className={style.parameterCard_desc}>{parameterName}</div>
            </div>
            <div className={style.parameterCard_item}>
                <div className={style.parameterCard_title}>参数说明：</div>
                <div className={style.parameterCard_desc}>{parameterDescription}</div>
            </div>
            <div className={style.parameterCard_item}>
                <div className={style.parameterCard_title}>参数值：</div>
                <div className={style.parameterCard_desc}>
                    <DropDownListV2
                        placeholder="请输入..."
                        className={getClassNames({
                            [style.parameterCard_error]: testStage && !title,
                        })}
                        defaultValue={title}
                        labels={titleLabels}
                        handleValueChange={handleChangeTitle}
                    />
                </div>
            </div>

            <>
                {loopLabels.map((item, index) => (
                    <Fragment key={index}>
                        <div>
                            <h2 className={style.parameterCard_row}>循环项目</h2>
                            <div className={style.parameterCard_item}>
                                <div className={style.parameterCard_title}>参数说明</div>
                                <div className={style.parameterCard_desc}>
                                    在此处选择需要补充至题目题干的循环项目。
                                </div>
                            </div>
                        </div>
                        <div className={style.parameterCard_item}>
                            <div className={style.parameterCard_title}>参数值：</div>
                            <div className={style.parameterCard_desc}>
                                <DropDownListV2
                                    placeholder="请输入..."
                                    defaultValue={selectLoop[index]}
                                    className={getClassNames({
                                        [style.parameterCard_error]: testStage && !row,
                                    })}
                                    labels={item}
                                    handleValueChange={(id) => {
                                        selectLoop[index] = id as string;
                                        handleChangeLoopItems([...selectLoop]);
                                        setSelectLoop([...selectLoop]);
                                    }}
                                />
                            </div>
                        </div>
                    </Fragment>
                ))}
            </>
            {isLoopSelect && title && (
                <>
                    <div>
                        <h2 className={style.parameterCard_row}>行选项</h2>
                        <div className={style.parameterCard_item}>
                            <div className={style.parameterCard_title}>参数说明</div>
                            <div className={style.parameterCard_desc}>{rowDescription}</div>
                        </div>
                    </div>
                    <div className={style.parameterCard_item}>
                        <div className={style.parameterCard_title}>参数值：</div>
                        <div className={style.parameterCard_desc}>
                            <DropDownListV2
                                placeholder="请输入..."
                                defaultValue={row}
                                className={getClassNames({
                                    [style.parameterCard_error]: testStage && !row,
                                })}
                                labels={rowLabels}
                                handleValueChange={handleChangeRow}
                            />
                        </div>
                    </div>
                </>
            )}

            {isLoopSelect && title && isTWoD && (
                <>
                    <div>
                        <h2 className={style.parameterCard_col}>列选项</h2>
                        <div className={style.parameterCard_item}>
                            <div className={style.parameterCard_title}>参数说明</div>
                            <div className={style.parameterCard_desc}>{columnDescription}</div>
                        </div>
                    </div>
                    <div className={style.parameterCard_item}>
                        <div className={style.parameterCard_title}>参数值：</div>
                        <div className={style.parameterCard_desc}>
                            <DropDownListV2
                                placeholder="请输入..."
                                className={getClassNames({
                                    [style.parameterCard_error]: testStage && !column,
                                })}
                                defaultValue={column}
                                labels={columnLabels}
                                handleValueChange={handleChangeColumn}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default ParameterCard;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
