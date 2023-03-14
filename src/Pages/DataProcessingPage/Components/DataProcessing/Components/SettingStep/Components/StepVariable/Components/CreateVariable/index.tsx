/**
 * @file CreateVariable
 * @date 2022-11-16
 * @author liaoli
 * @lastModify liaoli 2022-11-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert } from '@datareachable/dr_front_componentlibrary';
import { Input } from '@datareachable/dr_front_componentlibrary/Components/Zmz/Input';
import { DropDownListV2 } from '@datareachable/dr_front_componentlibrary/Components/Zmz/DropDownListV2';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './style.scss';
import { Button } from '@datareachable/dr_front_componentlibrary/Components/Buttons/Button';
import { Icon } from '@datareachable/dr_front_componentlibrary/Components/Icon';
import { globalVarType, respondentsVarType } from '~/DefaultData/Stages';
import { RootState } from '~/Store/rootReducer';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface CreateVariableProps {
    type: 'global' | 'respondents';
    handleClose: () => void;
    handleCreateVar: (varType: 'global' | 'respondents', name: string, type: string) => void;
}
const CreateVariable: React.FC<CreateVariableProps> = ({
    type,
    handleClose,
    handleCreateVar,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const stageList = useSelector((state: RootState) => state.jobStage.getJobStage.config);

    const [selectType, setSelectType] = useState(type === 'global' ? 'number' : 'Single');

    const [varName, setVarName] = useState('');

    const isNameRepeat = useMemo(() => {
        return stageList.some(
            (v) =>
                v.r_vars.some((item) => item.qid === varName) ||
                v.g_vars.some((item) => item.name === varName),
        );
    }, [stageList, varName]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    const testVarName = () => /^[a-zA-Z0-9_]{1,72}$/.test(varName);
    return (
        <Alert
            custom
            status={true}
            width="60rem"
            height="30rem"
            className={style.createVariable_alert}
            changeStatus={() => {
                handleClose();
            }}
        >
            <div className={style.createVariable_container}>
                <h2 className={style.createVariable_title}>
                    创建{type === 'global' ? '全局变量' : '被访者'}
                </h2>
                <p className={style.createVariable_tips}>
                    创建一个{type === 'global' ? '全局' : '被访者变量'}类型的变量到数据处理配置。
                </p>
                <h3 className={style.createVariable_name}>变量名称</h3>
                <Input
                    width="100%"
                    placeholder="请输入变量名称 ..."
                    className={`${style.createVariable_input} ${
                        isNameRepeat || (!testVarName() && varName)
                            ? style.createVariable_error
                            : ''
                    }`}
                    onChange={(e) => {
                        setVarName(e.target.value);
                    }}
                    addonBefore={
                        <DropDownListV2
                            floatingClassName={style.createVariable_type}
                            defaultValue={selectType}
                            handleValueChange={(v) => setSelectType(v as string)}
                            labels={(type === 'global' ? globalVarType : respondentsVarType).map(
                                (v) => {
                                    return {
                                        id: v.id,
                                        content: (
                                            <div className={style.createVariable_typeList}>
                                                <Icon type={v.icon} />
                                                <span>{v.text}</span>
                                            </div>
                                        ),
                                    };
                                },
                            )}
                        />
                    }
                />
            </div>
            <div className={style.createVariable_button}>
                <Button
                    height="3.2rem"
                    label="取消"
                    size="big"
                    type="primary"
                    width="7.6rem"
                    onClick={() => {
                        handleClose && handleClose();
                    }}
                />
                <Button
                    width="6rem"
                    height="3.2rem"
                    label="创建"
                    size="normal"
                    type="primary"
                    disabled={!varName.trim() || isNameRepeat || !testVarName()}
                    onClick={() => {
                        handleCreateVar(type, varName, selectType);
                    }}
                />
            </div>
        </Alert>
    );
};
export default CreateVariable;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
