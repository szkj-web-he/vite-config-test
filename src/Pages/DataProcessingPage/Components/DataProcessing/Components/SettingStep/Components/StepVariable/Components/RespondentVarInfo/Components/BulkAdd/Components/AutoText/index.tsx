/**
 * @file
 * @date 2022-10-21
 * @author zhoubin
 * @lastModify zhoubin 2022-10-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { FC, useState } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface AutoTextProps {
    handleEnterKey: () => void;
    handleChange: (value: string) => void;
    handleDelete?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const AutoText: FC<AutoTextProps> = ({
    handleEnterKey,
    handleChange,
    handleDelete,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [height, setHeight] = useState(34);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        const div = document.querySelector('.autoText_txt');
        if (div) {
            const newValue = value.replaceAll(' ', '&nbsp;');
            div.innerHTML = newValue;
            setHeight(div.clientHeight);
            console.log('div.clientHeight', div.clientHeight);
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div className={style.autoText_container}>
                <div className={style.autoText_textAreaContainer}>
                    <div className={style.autoText_bg} style={{ height: `${height}px` }}></div>
                    <textarea
                        className={style.autoText_textArea}
                        style={{ height: `${height}px` }}
                        onKeyDown={(e) => {
                            const value = e.currentTarget.value;
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleEnterKey();
                            }
                            if (['Backspace', 'Delete'].includes(e.key) && value === '') {
                                handleDelete && handleDelete();
                                e.preventDefault();
                            }
                        }}
                        onBlur={(e) => handleChange(e.currentTarget.value)}
                        onChange={handleChangeValue}
                    ></textarea>
                </div>
            </div>
            <div className={style.autoText_txt}></div>
        </>
    );
};
export default AutoText;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
