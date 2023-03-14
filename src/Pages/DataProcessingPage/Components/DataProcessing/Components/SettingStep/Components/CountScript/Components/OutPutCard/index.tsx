/**
 * @file
 * @date 2023-02-13
 * @author zhoubin
 * @lastModify zhoubin 2023-02-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { TextAreaV2 } from '@datareachable/dr_front_componentlibrary';
import { DropDownListV2 } from '@datareachable/dr_front_componentlibrary/Components/Zmz/DropDownListV2';
import { FC } from 'react';
import getClassNames from '~/Utils/getClassNames';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type LabelType = {
    content: React.ReactNode;
    id: string;
};
interface OutPutCardProps {
    outPutDescription: string;
    handleChangeDescription: (value: string) => void;
    handleSaveDescription: () => void;
    outPutValue: string;
    testStage: boolean;
    outPutLabels: LabelType[];
    handleChangeOutPutValue: (v: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const OutPutCard: FC<OutPutCardProps> = ({
    outPutDescription,
    handleChangeDescription,
    handleSaveDescription,
    outPutValue,
    outPutLabels,
    testStage,
    handleChangeOutPutValue,
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
        <div className={style.outPutCard_card}>
            <h2 className={style.outPutCard_cardTitle}>输出变量：</h2>
            <div className={style.outPutCard_item}>
                <div className={style.outPutCard_title}>输出描述：</div>
                <TextAreaV2
                    className={style.outPutCard_textArea}
                    height="7.6rem"
                    textOverflow
                    width="100%"
                    placeholder="请输入输出描述 ..."
                    onBlur={handleSaveDescription}
                    value={outPutDescription}
                    onInput={handleChangeDescription}
                />
            </div>
            <div className={style.outPutCard_item}>
                <div className={style.outPutCard_title}>变量：</div>
                <div className={style.outPutCard_desc}>
                    <DropDownListV2
                        placeholder="请输入..."
                        defaultValue={outPutValue}
                        className={getClassNames({
                            [style.outPutCard_error]: testStage && !outPutValue,
                        })}
                        labels={outPutLabels}
                        handleValueChange={(value) => handleChangeOutPutValue(String(value))}
                    />
                </div>
            </div>
        </div>
    );
};
export default OutPutCard;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
