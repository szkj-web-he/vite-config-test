/**
 * @file text area component
 * @date 2020-10-20
 * @author Andy Jiang
 * @lastModify Andy Jiang 2020-10-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { SyntheticEvent } from "react";
import style from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * width of this component, default is 23rem
     */
    width?: string;
    /**
     * height of this component, default is 8.7rem
     */
    height?: string;
    /**
     * placeholder in this component
     */
    placeholder?: string;
    /**
     * enable resize
     */
    resize?: boolean;
    /**
     * hide border
     */
    border?: boolean;

    /**
     * get input value
     */
    handleInputOnChange?: (value: string) => void;
    /**
     * is hover or not
     */
    isHover?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TextArea: React.FC<TextAreaProps> = ({
    width = "23rem",
    resize = false,
    border = true,
    height = "8.7rem",
    placeholder = "put placeholder here",
    isHover,
    handleInputOnChange = undefined,
    ...props
}): JSX.Element => {
    /* <------------------------------------ **** FUNCTIONS START **** ------------------------------------ */
    /**
     * will be called when input changes
     * @param event event target
     */
    const handleInput = (event: SyntheticEvent) => {
        handleInputOnChange && handleInputOnChange((event.target as HTMLInputElement).value);
    };

    /* <------------------------------------ **** FUNCTIONS END **** ------------------------------------ */

    return (
        <div>
            <textarea
                className={style.textArea_textarea}
                style={
                    Object.assign(
                        { resize: resize ? "both" : "none" },
                        {
                            width,
                            height,
                            borderColor: isHover ? "#478da5" : "#bdbdbd",
                        },
                        border ? undefined : { border: "none" },
                    ) as React.CSSProperties | undefined
                }
                placeholder={placeholder}
                onChange={handleInput}
                value={13123}
                {...props}
            ></textarea>
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
