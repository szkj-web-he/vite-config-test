/**
 * @file
 * @date 2022-03-09
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2022-03-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Alert,
    Button,
    Descendant,
    Icon,
    MagneticEditor,
} from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style.scss';
// import TextEditor from "~/Pages/DistributionPage/Components/DistributorDetail/Components/TextEditor";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface EditConditionsProps {
    showType?: string;
    show: boolean;
    value: Descendant[];
    isAdd?: boolean;
    closeIcon?: React.ReactNode;
    className?: string;
    handleClose: () => void;
    handleSave?: (value: Descendant[]) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const EditConditions: React.FC<EditConditionsProps> = ({
    // showType,
    show,
    value,
    isAdd = true,
    closeIcon,
    className,
    handleClose,
    handleSave,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    /** criteria input value */
    const [textareaValue, setTextareaValue] = useState<Descendant[]>([
        { children: [{ text: '' }] },
    ]);
    // const [textareaValue, setTextareaValue] = useState("");
    /** save btn disabled */
    const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);

    useEffect(() => {
        if (value && show) {
            setTextareaValue(value);
        }
        if (!show) {
            setTextareaValue([{ children: [{ text: '' }] }]);
        }
    }, [value, show]);

    // const [inputValue, setInputValue] = useState<Descendant[]>([{ children: [{ text: "" }] }]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={show}
            custom
            className={style.editConditions_alert}
            width="60rem"
            height="54.2rem"
        >
            <div className={[style.editInfo_container, className].join(' ')}>
                {closeIcon ? (
                    closeIcon
                ) : (
                    <Icon
                        type="shrink"
                        className={style.shrink_icon}
                        onClick={() => {
                            handleClose();
                            // setTextareaValue(value);
                        }}
                    />
                )}
                <h1>{t('PreparationPage.EditConditions.Title')}</h1>
                <p>{t('PreparationPage.EditConditions.Message')}</p>
                <div
                    className={style.textarea_wrap}
                    style={!isAdd ? { borderColor: '#ebebeb' } : undefined}
                >
                    <MagneticEditor
                        editorValue={textareaValue}
                        readOnly={!isAdd}
                        handleValueChange={(value) => {
                            setTextareaValue(value);
                            if (value.length === 0) {
                                setSaveBtnDisabled(true);
                            } else {
                                setSaveBtnDisabled(false);
                            }
                        }}
                    />
                    {/* {show ? (
                        <MagneticEditor
                            // editorValue={textareaValue}
                            readOnly={!isAdd}
                            handleValueChange={(value) => {
                                setTextareaValue(value);
                                if (value.length === 0) {
                                    setSaveBtnDisabled(true);
                                } else {
                                    setSaveBtnDisabled(false);
                                }
                            }}
                        />
                    ) : (
                        <></>
                    )} */}
                </div>
                {isAdd && (
                    <div className={style.editConditions_btn}>
                        <Button
                            type="primary"
                            size="big"
                            label={t('Common.Cancel')}
                            onClick={handleClose}
                        />
                        <Button
                            type="primary"
                            label={t('Common.Save')}
                            disabled={saveBtnDisabled}
                            onClick={() => {
                                handleSave?.(textareaValue);
                                setSaveBtnDisabled(true);
                                handleClose();
                            }}
                        />
                    </div>
                )}
            </div>
        </Alert>
    );
};
export default EditConditions;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
