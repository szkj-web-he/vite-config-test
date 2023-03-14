/**
 * @file DelVariable
 * @date 2022-11-17
 * @author liaoli
 * @lastModify liaoli 2022-11-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Icon, Button, ScrollComponent } from '@datareachable/dr_front_componentlibrary';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/Store/rootReducer';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DelVariableProps {
    type: string;
    name: string;
    id: string;
    handleClose: () => void;
    handleDel: (id: string, type: string) => void;
}
const DelVariable: React.FC<DelVariableProps> = ({
    id,
    type,
    name,
    handleClose,
    handleDel,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { getJobStage, currentStep } = useSelector((state: RootState) => state.jobStage);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const getInfo = useMemo(() => {
        const stage = getJobStage.config.find((v) => v.id === currentStep.stageId);

        return {
            name: stage?.name,
            list: [
                ...(stage?.steps?.after_stream.filter((v) => v.script.args[0] === name) || []),
                ...(stage?.steps?.in_stream.filter((v) => v.script.args[0] === name) || []),
            ],
        };
    }, [currentStep.stageId, getJobStage.config, name]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={true}
            custom={true}
            width="60rem"
            height={type === '2' ? '39.2rem' : '22rem'}
            className={style.delVariable_alert}
            changeStatus={handleClose}
        >
            <div className={style.delVariable_container}>
                <div className={style.delVariable_header}>
                    <Icon type="warningTriangle" />
                    <h2>删除变量?</h2>
                </div>
                <div className={style.delVariable_content}>
                    <p className={style.delVariable_tips}>
                        请确定您想要删除此变量？
                        <span>( 一旦您删除了此变量，以下脚本将会受到影响， 请谨慎删除。)</span>
                    </p>
                    {type === '2' && (
                        <div className={style.delVariable_varWrap}>
                            <ScrollComponent height="11.2rem">
                                <h2 className={style.delVariable_title}>{getInfo.name}</h2>
                                <div className={style.delVariable_varList}>
                                    {getInfo.list.length ? (
                                        getInfo.list.map((v) => (
                                            <div key={v.id} className={style.delVariable_varItem}>
                                                <Icon type="binded" />
                                                <p>{v.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={style.delVariable_empty}>暂无输入脚本</div>
                                    )}
                                </div>
                            </ScrollComponent>
                        </div>
                    )}
                </div>

                <div className={style.delVariable_button}>
                    <Button
                        height="3.2rem"
                        label="取消"
                        size="big"
                        type="primary"
                        width="7.6rem"
                        onClick={() => {
                            handleClose();
                        }}
                    />
                    <Button
                        width="6rem"
                        height="3.2rem"
                        label="确定"
                        size="normal"
                        type="primary"
                        onClick={() => handleDel(id, type)}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default DelVariable;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
