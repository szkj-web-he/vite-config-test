/**
 * @file
 * @date 2023-02-13
 * @author zhoubin
 * @lastModify zhoubin 2023-02-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { DropDownListV2 } from '@datareachable/dr_front_componentlibrary/Components/Zmz/DropDownListV2';
import { FC } from 'react';
import NumberInput from '~/Components/NumberInput';
import getClassNames from '~/Utils/getClassNames';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

type LabelType = {
    content: React.ReactNode;
    id: string;
};

export type ParametersType = {
    name: string;
    description: string;
    labels?: LabelType[];
};

interface NoticeParameterCardProps {
    parameters: ParametersType[];
    values: string[];
    testStage: boolean;
    handleChangeParameters: (value: string[]) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const NoticeParameterCard: FC<NoticeParameterCardProps> = ({
    parameters,
    values,
    testStage,
    handleChangeParameters,
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
        <div className={style.noticeParameterCard_card}>
            <h2 className={style.noticeParameterCard_cardTitle}>参数形式：</h2>
            {parameters.map((item, index) => (
                <div key={index}>
                    <div className={style.noticeParameterCard_item}>
                        <div className={style.noticeParameterCard_title}>参数名：</div>
                        <div className={style.noticeParameterCard_desc}>{item.name}</div>
                    </div>
                    <div className={style.noticeParameterCard_item}>
                        <div className={style.noticeParameterCard_title}>参数说明：</div>
                        <div className={style.noticeParameterCard_desc}>{item.description}</div>
                    </div>
                    <div className={style.noticeParameterCard_item}>
                        <div className={style.noticeParameterCard_title}>参数值：</div>
                        <div className={style.noticeParameterCard_desc}>
                            {item.labels ? (
                                <DropDownListV2
                                    placeholder="请选择..."
                                    defaultValue={values[index]}
                                    className={getClassNames({
                                        [style.noticeParameterCard_error]:
                                            testStage && !values[index],
                                    })}
                                    labels={item.labels}
                                    height="3rem"
                                    handleValueChange={(value) => {
                                        values[index] = value as string;
                                        handleChangeParameters([...values]);
                                    }}
                                />
                            ) : (
                                <NumberInput
                                    // className={style.noticeParameterCard_phone}
                                    className={getClassNames({
                                        [style.noticeParameterCard_error]:
                                            testStage && !values[index],
                                    })}
                                    value={values[index]}
                                    placeholder="请输入"
                                    handleChange={(value) => {
                                        values[index] = value;
                                        handleChangeParameters([...values]);
                                    }}
                                />
                            )}

                            {/* <ResetInput
                                className={style.noticeParameterCard_phone}
                                value={values[index]}
                                // placeholder={placeholder}
                                onChange={(value) => {
                                    values[index] = value;
                                    handleChangeParameters([...values]);
                                }}
                            /> */}
                        </div>
                    </div>
                    <div className={style.noticeParameterCard_line}></div>
                </div>
            ))}
            <div className={style.noticeParameterCard_preview}>
                <div className={style.noticeParameterCard_title}>预警预览：</div>
                <div className={style.noticeParameterCard_desc}>
                    {parameters.map((item, index) => (
                        <span
                            key={index}
                            className={getClassNames({
                                [style.noticeParameterCard_name]: true,
                                [style.noticeParameterCard_name__have]: !!values[index],
                            })}
                        >
                            {values[index] ? values[index] : `（${item.name}） `}
                        </span>
                    ))}
                    则触发该预警。
                </div>
            </div>
        </div>
    );
};
export default NoticeParameterCard;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
