/**
 * @file  Modal component
 * @date 2021-1-13
 * @author Jack
 * @lastModify  2021-1-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { ReactElement, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import style from "./style.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ModalProps {
    /**
     * Is show the right-top close icon or not (optional)
     */
    closable?: boolean;
    /**
     * Is  the  mask click can close the modal or not (optional)
     */
    maskClosable?: boolean;
    /**
     * Is show the modal or not
     */
    showModal: boolean;
    /**
     * modal contents
     */
    children: ReactElement;
    /**
     * Optional right-top close icon click handler
     */
    onClose?: () => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Modal: React.FC<ModalProps> = ({ showModal, closable, maskClosable, children, onClose }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     *  avoid scrolling in the mask
     */
    //get the body original overflow
    const bodyOverflow = useRef(window.getComputedStyle(document.body).overflow);
    useEffect(() => {
        // change the body overflow by showModal
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = bodyOverflow.current;
        }
    }, [showModal]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * handle close the pup
     */
    const handleModalClose = () => {
        onClose && onClose();
    };

    /**
     * node element
     */
    const node = (
        <div
            className={style.modal_popMask}
            onClick={() => {
                maskClosable && handleModalClose();
            }}
        >
            <div
                className={style.modal_popContainer}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {closable && (
                    <span
                        className={style.modal_popClose}
                        onClick={() => {
                            closable && handleModalClose();
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes as IconProp} />
                    </span>
                )}

                {children}
            </div>
        </div>
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return showModal ? ReactDOM.createPortal(node, document.body) : null;
};

export default Modal;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
