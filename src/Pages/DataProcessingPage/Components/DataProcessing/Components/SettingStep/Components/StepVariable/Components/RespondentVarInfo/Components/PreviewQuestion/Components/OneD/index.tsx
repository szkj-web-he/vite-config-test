/**
 * @file OneDimensionalQuestion
 * @date 2022-11-24
 * @author liaoli
 * @lastModify liaoli 2022-11-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { RadioGroup } from '@datareachable/dr_front_componentlibrary';
import { Check } from '@datareachable/dr_front_componentlibrary/Components/Choose/Check';
import { Radio } from '@datareachable/dr_front_componentlibrary/Components/Choose/Radio';
import React, { useState } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OneDimensionalQuestionProps {
    type: 'Single' | 'Multi' | 'Numeric' | 'OpenEnd';
    options: string[];
}
const OneDimensionalQuestion: React.FC<OneDimensionalQuestionProps> = ({
    options,
    type,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [selectIndex, setSelectIndex] = useState(-1);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const iconEl = (index: number) => {
        switch (type) {
            case 'Single':
                return <Radio value={index} className={style.previewOneD_select} />;

            case 'Multi':
                return <Check className={style.previewOneD_select} />;

            default:
                return '';
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.previewOneD_wrap}>
            <RadioGroup onChange={(v) => setSelectIndex(v as number)} value={selectIndex}>
                {options.map((v, i) => (
                    <div
                        key={i}
                        className={
                            type === 'OpenEnd' || type === 'Numeric'
                                ? style.previewOneD_haveBorder
                                : ''
                        }
                    >
                        {iconEl(i)}
                        <p>{v}</p>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};
export default OneDimensionalQuestion;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
