/**
 * @file
 * @date 2023-02-13
 * @author zhoubin
 * @lastModify zhoubin 2023-02-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from '@datareachable/dr_front_componentlibrary';
import { Fragment } from 'react';
import { FC } from 'react';
import { classNames } from '~/Utils/classname';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface ExpressionCardPropers {
    symbol: string;
    isValidate: boolean;
    handleAdd: () => void;
    handleDelete: () => void;
    length: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ExpressionCard: FC<ExpressionCardPropers> = ({
    length,
    handleAdd,
    handleDelete,
    symbol,
    isValidate,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const getSymbol = () => {
        switch (symbol) {
            case '+':
                return '+';
            case '-':
                return '-';
            case '*':
                return '×';
            case '/':
                return '÷';
        }
        return '';
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.expressionCard_card}>
            <div className={style.expressionCard_head}>
                <div className={style.expressionCard_cardTitle}>表达式：</div>
                <div className={style.expressionCard_bts}>
                    <div
                        // className={style.expressionCard_add}
                        className={classNames(style.expressionCard_add, {
                            [style.expressionCard_add__disable]: length === 10,
                        })}
                        onClick={() => {
                            if (length < 10) {
                                handleAdd();
                            }
                        }}
                    >
                        <Icon type="Magnify" />
                        <span>添加参数</span>
                    </div>
                    <div
                        className={classNames(style.expressionCard_delete, {
                            [style.expressionCard_delete__active]: length > 2,
                        })}
                        onClick={() => {
                            if (length > 2) {
                                handleDelete();
                            }
                        }}
                    >
                        <Icon type="dustbin" />
                        <span>删除参数</span>
                    </div>
                </div>
            </div>
            <div className={style.expressionCard_expression}>
                <div className={style.expressionCard_warning}>
                    <Icon
                        type={`${isValidate ? 'successSolid' : 'warning'}`}
                        color={isValidate ? '#30B876' : '#FF8F0F'}
                    />
                </div>
                <div className={style.expressionCard_content}>
                    {new Array(length).fill(0).map((_, index) => (
                        <Fragment key={index}>
                            {index !== 0 && <span>{getSymbol()}</span>}
                            Var{index + 1}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ExpressionCard;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
