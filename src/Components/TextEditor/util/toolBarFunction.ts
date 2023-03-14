import { SyntheticEvent } from "react";

/**
 * this function will hanld all the normal text style change
 * @param {}
 */
const commonStyleFucntion = (e: SyntheticEvent, type: string): void => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    document.execCommand(type, false, undefined);
};
/**
 * this function will handle all the fontsize style change
 */
const handleFontSizeChange = (e: SyntheticEvent, size: string): void => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    document.execCommand("fontSize", false, size);
    // if (window.getSelection()?.anchorNode?.parentElement) {
    //     const fontElements = window.getSelection()?.anchorNode?.parentElement;
    //     if (fontElements) {
    //         fontElements.removeAttribute('size');
    //         fontElements.style.fontSize = size;
    //     }
    // }
    // const root = document.getElementById('textEditorRoot');
    // const getTagFont = root?.getElementsByTagName('font');
    // if (getTagFont) {
    //     for (let i = 0; i < getTagFont?.length; i++) {
    //         getTagFont[i].removeAttribute('size');
    //     }
    // }
};
/**
 * this function will handle all the font color style change
 */
const handleFontColorChange = (e: SyntheticEvent, color: string): void => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    document.execCommand("foreColor", false, color);
};
/**
 * this function will handle all the fill color style change
 */
const handleHiliteColorChange = (e: SyntheticEvent, color: string): void => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    document.execCommand("hiliteColor", false, color);
};
/**
 * this function will handle clearn all the style
 */
const handleClearnStyle = (e: SyntheticEvent): void => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    document.execCommand("removeFormat", false);
    document.execCommand("removeFormat", false);
};

const handleAlignLeft = (e: SyntheticEvent): void => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    document.execCommand("justifyLeft", false);
    // document.execCommand("removeFormat", false);
};

const handleAlignCenter = (e: SyntheticEvent): void => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    document.execCommand("justifyCenter", false);
    // document.execCommand("removeFormat", false);
};

const handleAlignRight = (e: SyntheticEvent): void => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    document.execCommand("justifyRight", false);
    // document.execCommand("removeFormat", false);
};

export const toolBarFunction = {
    bold: (e: SyntheticEvent): void => {
        commonStyleFucntion(e, "bold");
    },
    italic: (e: SyntheticEvent): void => {
        commonStyleFucntion(e, "italic");
    },
    underLine: (e: SyntheticEvent): void => {
        commonStyleFucntion(e, "underline");
    },
    crossLine: (e: SyntheticEvent): void => {
        commonStyleFucntion(e, "strikeThrough");
    },
    fontSize: (e: SyntheticEvent, size: string): void => {
        handleFontSizeChange(e, size);
    },
    fortColor: (e: SyntheticEvent, color: string): void => {
        handleFontColorChange(e, color);
    },
    filledColor: (e: SyntheticEvent, color: string): void => {
        handleHiliteColorChange(e, color);
    },
    removeStyle: (e: SyntheticEvent): void => {
        handleClearnStyle(e);
    },
    alignLeft: (e: SyntheticEvent): void => {
        handleAlignLeft(e);
    },
    alignRight: (e: SyntheticEvent): void => {
        handleAlignRight(e);
    },
    alignCenter: (e: SyntheticEvent): void => {
        handleAlignCenter(e);
    },
};
