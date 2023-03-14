/**
 * @file
 * @date 2023-02-13
 * @author zhoubin
 * @lastModify zhoubin 2023-02-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { ResetInput } from '@datareachable/dr_front_componentlibrary';
import { FC, ReactNode } from 'react';
import NumberInput from '~/Components/NumberInput';
import getClassNames from '~/Utils/getClassNames';
import { reg } from '~/Utils/reg';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

interface ParameterCardProps {
    type?: 'value' | 'template';
    parameterName: string;
    parameterDescription: string;
    value?: string;
    isPhone?: boolean;
    testStage: boolean;
    template?: ReactNode;
    handleChangeValue?: (value: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ParameterCard: FC<ParameterCardProps> = ({
    parameterName,
    parameterDescription,
    type = 'value',
    value,
    template,
    testStage,
    isPhone,
    handleChangeValue,
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
                <div className={style.parameterCard_title}>
                    {type === 'value' && '参数值：'}
                    {type === 'template' && '模板内容'}
                </div>
                <div className={style.parameterCard_desc}>
                    {/* {type === 'value' && (
                        <NumberInput
                            isPhone={isPhone}
                            value={value}
                            handleChange={handleChangeValue}
                        />
                    )} */}

                    {type === 'value' && !isPhone && (
                        <ResetInput
                            className={getClassNames({
                                [style.parameterCard_phone]: true,
                                [style.parameterCard_error]:
                                    testStage && !reg.sendEmail.test(value ?? ''),
                            })}
                            value={value}
                            onChange={handleChangeValue}
                        />
                    )}

                    {type === 'value' && isPhone && (
                        <NumberInput
                            className={getClassNames({
                                [style.parameterCard_error]:
                                    testStage && !reg.sendMessage.test(value ?? ''),
                            })}
                            isPhone={isPhone}
                            value={value}
                            handleChange={handleChangeValue}
                        />
                    )}

                    {type === 'template' && template}
                </div>
            </div>
        </div>
    );
};
export default ParameterCard;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
