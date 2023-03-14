/**
 * @file
 * @date 2022-03-11
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2022-03-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import upload_icon from "~/Assets/images/upload_icon.png";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface UploadProps {
    /**
     * width of this component
     */
    width?: string;
    /**
     * height of this component
     */
    height?: string;
    /**
     * placeholder
     */
    placeholder?: string;
    /**
     * upload Icon
     */
    icon?: React.ReactNode;

    /**
     * children
     */
    children?: React.ReactNode;
    /**
     * function will be called when the input of this component is changed
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * get input value
     */
    handleOnFileUpload?: (files?: FileList) => void;
    /**
     * custom class name
     */
    customClassName?: string;
    /**
     * Is global of input
     */
    isGlobal?: boolean;
    /**
     * link context
     */
    linkMsg?: string;
    /**
     * get input element
     */
    getInputEl?: (el: HTMLElement) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Upload: React.FC<UploadProps> = ({
    width = "9rem",
    height = "11rem",
    placeholder = "upload avatar",
    icon,
    children,
    onChange,
    isGlobal = true,
    handleOnFileUpload,
    customClassName,
    linkMsg = "1111",
    getInputEl,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const IptRef = useRef<null | HTMLInputElement>(null);
    const [visible, setVisible] = useState(() => isGlobal);

    useEffect(() => {
        setVisible(isGlobal);
    }, [isGlobal]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** handle link text */
    const handleLink = (text: string, link: string) => {
        const newStr = text.replaceAll(link, "<span style=color:#22A6B3>" + link + "</span>");
        return { __html: newStr };
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    /**
     * will be called when input changes
     * @param event event target
     */

    return (
        <div
            className={style.upload_container + (customClassName ? " " + customClassName : "")}
            style={{ width, height }}
            {...Object.assign(
                {},
                isGlobal === false
                    ? {
                          onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
                              e.stopPropagation();
                              e.preventDefault();
                              if (IptRef.current) {
                                  IptRef.current.value = "";
                              }
                              setVisible(true);
                          },
                      }
                    : {},
            )}
        >
            {
                <input
                    className={
                        style.upload_input +
                        (visible === false ? " " + style.upload_input_hidden : "")
                    }
                    ref={(el: HTMLInputElement) => {
                        getInputEl && getInputEl(el);
                        IptRef.current = el;
                    }}
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.persist();
                        onChange && onChange(e);
                        if (isGlobal === false) {
                            setVisible(false);
                        }
                        handleOnFileUpload && e.target.files && handleOnFileUpload(e.target.files);
                    }}
                />
            }
            <div className={style.upload_cover} style={{ width: "100%", height: "100%" }}>
                <div className={style.upload_coverContainer}>
                    <div className={style.upload_icon}>
                        {icon ? (
                            icon
                        ) : (
                            <img src={upload_icon} width="80px" />
                            // <Icon type="exportIcon" className={style.upload_defaultIcon} />
                        )}
                    </div>
                    <div
                        className={style.upload_text}
                        dangerouslySetInnerHTML={handleLink(placeholder, linkMsg)}
                    ></div>
                    {/* {linkMsg && (
                        <span
                            className={style.upload_linkMsg}
                            onClick={() => {
                                if (isGlobal === false) {
                                    IptRef.current && IptRef.current.click();
                                }
                            }}
                        >
                            {linkMsg}
                        </span>
                    )} */}
                    {children}
                </div>
            </div>
        </div>
    );
};
export default Upload;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
