/**
 * @file TwoDimensionalQuestion
 * @date 2022-11-24
 * @author liaoli
 * @lastModify liaoli 2022-11-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Check, Radio, RadioGroup } from '@datareachable/dr_front_componentlibrary';
import React, { useState } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TwoDimensionalQuestionProps {
    type: 'Single' | 'Multi' | 'Numeric' | 'OpenEnd';
    row: string[];
    col: string[];
}
const TwoDimensionalQuestion: React.FC<TwoDimensionalQuestionProps> = ({
    type,
    row,
    col,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [select, setSelect] = useState<{ [key: string]: number }>({});
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const el = (index: number) => {
        switch (type) {
            case 'Single':
                return <Radio value={index} className={style.previewOneD_select} />;

            case 'Multi':
                return <Check className={style.previewOneD_select} />;

            case 'Numeric':
                return (
                    <input
                        className={style.previewOneD_input}
                        type="text"
                        placeholder="您可在此输入数字..."
                    />
                );
            case 'OpenEnd':
                return (
                    <input
                        className={style.previewOneD_input}
                        type="text"
                        placeholder="您可在此输入..."
                    />
                );

            default:
                return '';
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.previewOneD_container}>
            <div className={style.previewOneD_row}>
                <div></div>
                {row.map((v, i) => (
                    <div key={i}>{v}</div>
                ))}
            </div>
            {col.map((v, i) => (
                <RadioGroup
                    key={i}
                    onChange={(v) => setSelect({ ...select, [i]: v })}
                    value={select[i]}
                >
                    <div className={style.previewOneD_row} key={i}>
                        <div className={style.previewOneD_colTitle}>{v}</div>
                        <div className={style.previewOneD_main}>
                            {row.map((item, index) => (
                                <div key={index}>{el(index)}</div>
                            ))}
                        </div>
                    </div>
                </RadioGroup>
            ))}
        </div>
    );
};
export default TwoDimensionalQuestion;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
