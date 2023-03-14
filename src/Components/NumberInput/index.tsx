/**
 * @file
 * @date 2022-08-09
 * @author zhoubin
 * @lastModify zhoubin 2022-08-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from '@datareachable/dr_front_componentlibrary';
import { FC, useRef } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface NumberInputProps {
    placeholder?: string;
    value?: string;
    isPhone?: boolean;
    className?: string;
    handleChange?: (value: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const NumberInput: FC<NumberInputProps> = ({
    value,
    isPhone = false,
    placeholder,
    className,
    handleChange,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const flag = useRef(false);

    const inputRef = useRef<null | HTMLInputElement>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.input_container}>
            <input
                placeholder={placeholder}
                className={`${style.input_wrap} ${className ?? ''}`}
                ref={(e) => {
                    if (e) {
                        e.value = value ?? '';
                        inputRef.current = e;
                    }
                }}
                onChange={(e) => {
                    if (flag.current) {
                        return;
                    }
                    let value = e.currentTarget.value;
                    let rgx = /[^\d]/g;
                    if (!isPhone) {
                        rgx = /[^\d.]/g;
                    }
                    value = value.replace(rgx, '');
                    e.currentTarget.value = value;
                    handleChange && handleChange(value);
                }}
                onCompositionStart={() => {
                    flag.current = true;
                }}
                onCompositionEnd={(e) => {
                    flag.current = false;
                    let value = e.currentTarget.value;
                    value = value.replace(/[^\d]/g, '');
                    e.currentTarget.value = value;
                    handleChange && handleChange(value);
                }}
                onKeyDown={(e) => {
                    const pattern = /^\d+(\.\d*)?$/;
                    if (e.ctrlKey && e.key === 'v') {
                        return;
                    }
                    if (isPhone && value?.length === 11 && e.key !== 'Backspace') {
                        e.preventDefault();
                    }

                    if (value?.length === 18 && e.key !== 'Backspace') {
                        e.preventDefault();
                    }
                    console.log('e.currentTarget.value', e.currentTarget.value);
                    console.log('e.key', e.key);

                    if (isPhone) {
                        if (!pattern.test(e.key) && e.key !== 'Backspace' && e.key !== 'F12') {
                            e.preventDefault();
                        }
                    } else if (
                        !pattern.test(`${e.currentTarget.value}${e.key}`) &&
                        e.key !== 'Backspace' &&
                        e.key !== 'F12'
                    ) {
                        e.preventDefault();
                    }
                }}
            />
            <div className={style.input_clear}>
                <Icon
                    type="empty"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (inputRef.current) {
                            inputRef.current.value = '';
                            handleChange && handleChange('');
                        }
                    }}
                />
            </div>
        </div>
    );
};
export default NumberInput;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
