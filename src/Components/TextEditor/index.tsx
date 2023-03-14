/**
 * @file TextEditor main file
 * @date 2020-10-22
 * @author Frank
 * @lastModify Andy Jiang 2020-12-1
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import ReactDOM from 'react-dom';
import React, { useState, useEffect, SyntheticEvent, useRef } from 'react';
// style
import style from './style.module.scss';
// components
import commandStyle from './Components/HotKeyCommand/style.module.scss';
import { ToolBar } from './Components/ToolBar';
import { HotKeyCommand } from './Components/HotKeyCommand';
// utilities
import { getSelectionCoords } from './util/cursorPosition';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
// type
import {
    styleBarSet,
    settingBarSet,
    fontColorSet,
    filledColorSet,
} from './DefaultData/TextEditor/textEditor';
import { defaultSelections } from './DefaultData/TextEditor/hotKey';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TextEditorProps {
    /**
     * id of this component
     */
    id: string;
    /**
     * text area width
     */
    width?: string;
    /**
     * test area height
     */
    height?: string;
    /**
     *can user add script or not, default is true
     */
    allowScript?: boolean;
    /**
     * placeholder
     */
    placeholder?: string;
    /**
     *handle script add event
     */
    onScriptAdd?: (event: SyntheticEvent) => void;
    /**
     *handle script delete event
     */
    onScriptDelete?: (event: SyntheticEvent) => void;
    /**
     *handle input change event
     */
    onInputChange?: (event: SyntheticEvent) => void;
    /**
     *handle input change event
     */
    onBlur?: (html: string, stop: boolean) => void;
    /**
     *handle input change event with id
     */
    onBlurWithId?: (id: string, stop: boolean) => void;
    /**
     *handle DOM change event
     */
    onDOMChange?: (root: HTMLElement | null) => void;
    /**
     * default styleBarSet
     */
    defaultStyleBarSet?: typeof styleBarSet;
    /**
     * default settingBarSet
     */
    defaultSettingBarSet?: typeof settingBarSet;
    /**
     * default fontColorSet
     */
    defaultFontColorSet?: typeof fontColorSet;
    /**
     * default filledColorSet
     */
    defaultFilledColorSet?: typeof filledColorSet;
    /**
     * default scriptLabelSet
     */
    defaultScriptLabelSet?: Array<string>;
    /**
     * label name
     */
    label?: string;
    /**
     * selection list of this component
     */
    selectionList?: typeof defaultSelections;
    /**
     * add a new script
     */
    handleAddScript?: (textEditorId: string, event: SyntheticEvent) => void;
    /**
     * delete all
     */
    handleDeleteAll?: () => void;
    /**
     * className
     */
    className?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TextEditor: React.FC<TextEditorProps> = ({
    width = '81.6rem',
    height = '12.8rem',
    allowScript = false,
    placeholder = 'Type here',
    className,
    ...props
}: TextEditorProps): JSX.Element => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * set the tool bar position x
     */
    const [positionX, setPositionX] = useState(0);
    /**
     * set the tool bar position y
     */
    const [positionY, setPositionY] = useState(0);
    /**
     * set the tool bar display
     */
    const [toolBarDisplay, setToolBarDisplay] = useState('none');
    /**
     * set the  command display
     */
    const [commandDisplay, setCommandDisplay] = useState('none');
    /**
     *  set the check click area boolean
     */
    const [inClickArea, setInClickArea] = useState(false);
    /**
     * index of option in command
     */
    const [optionIndex, setOptionIndex] = useState(0);
    /**
     * allow to add script or not
     */
    const [editable, setEditable] = useState(true);
    /**
     * need to call dispatch to save value or not
     */
    const [stop, setStop] = useState(false);
    /**
     * need to call dispatch to save value or not
     */
    const [currentRange, setCurrentRange] = useState<undefined | Range>(undefined);
    /**
     * wrapper ref
     */
    const ref = useRef(null);
    const barRef = useRef<HTMLDivElement | null>(null);
    /**
     * timer
     */
    const timer = useRef<number | null>(null);

    // console.log(barRef?.current?.offsetWidth);
    // useEffect(() => {
    //     // console.log(container?.clientWidth);
    //     const barWidth = barRef.current?.offsetWidth;
    //     console.log(positionX);
    //     if (container && barWidth && positionX) {
    //         const containerWidth = container.clientWidth;

    //         if (positionX + barWidth > containerWidth) {
    //             setPositionX(positionX + (containerWidth - positionX - barWidth));
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [positionX]);
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const container = document.querySelector('.textEditor_wrapper');
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */

    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * this function wll check whether to display the tool bar and set the position of the tool bar
     */
    const handleSetToolBarPositionAndCheckDisplay = () => {
        const selection = window.getSelection();
        const editorAreaDom = document.getElementById(props.id);
        const editorAreaDomLeft = editorAreaDom?.getBoundingClientRect().left;
        const editorAreaDomTop = editorAreaDom?.getBoundingClientRect().top;
        if (inClickArea && editable) {
            if (selection?.isCollapsed) {
                setToolBarDisplay('none');
            } else {
                setToolBarDisplay('block');
                if (editorAreaDomLeft && editorAreaDomTop) {
                    if (
                        barRef.current?.offsetWidth &&
                        container &&
                        getSelectionCoords().x -
                            editorAreaDomLeft -
                            2 +
                            barRef.current?.offsetWidth >
                            container.clientWidth
                    ) {
                        setPositionX(barRef.current.clientWidth);
                    } else {
                        setPositionX(getSelectionCoords().x - editorAreaDomLeft - 2);
                    }

                    setPositionY(getSelectionCoords().y - editorAreaDomTop - 30);
                }
            }
        }
    };

    /**
     * this function will check whether to display the tool bar when mouse click
     * @param e event target
     */
    const handleClickCheckDisplay = (e: SyntheticEvent) => {
        e.nativeEvent.stopImmediatePropagation();
        setToolBarDisplay('none');
        setCommandDisplay('none');
        setInClickArea(true);
    };

    /**
     * this function will add window click check function to the window when component loader
     */
    const handleSetOurRange = () => {
        setToolBarDisplay('none');
        setInClickArea(false);
    };

    /**
     * handle script onclick event
     * @param event event object
     */
    const handleModifyLabel = (event: SyntheticEvent) => {
        (event.currentTarget as HTMLElement).focus();
        setEditable(false);
        (event.currentTarget as HTMLElement).style.cursor = 'text';
        event.stopPropagation();
    };

    /**
     * handle textEditor content on blur
     */
    const handleInputOnBlur = (): void => {
        if (props.onBlur !== undefined) {
            const root = document.getElementById(`${props.id}`);
            if (root !== null) {
                props.onBlur(root.innerHTML, stop);
            }
        }
        if (props.onBlurWithId !== undefined) {
            props.onBlurWithId(`${props.id}`, stop);
        }
    };
    /**
     * handle script modify finish event
     */
    const handleModifyEnd = (event: SyntheticEvent) => {
        setEditable(true);
        const inputs = document.getElementsByClassName(style.textEditor_scriptText);
        for (let i = 0; i < inputs.length; i++) {
            (inputs[i] as HTMLElement).style.cursor = 'pointer';
        }
        event.stopPropagation();
    };

    /**
     * this function is used to observe the change of DOM, and reset the dom at the proper time
     * @param record changes between old and new DOM
     */
    const handleObserve = () => {
        if (props.onDOMChange !== undefined) {
            props.onDOMChange(document.getElementById(props.id));
        }

        const root = document.getElementById(props.id);
        if (root !== null) {
            if (
                root.innerHTML === '' ||
                root.innerHTML === '<br>' ||
                root.innerHTML === '<div></div>'
            ) {
                root.innerHTML = '<div><br></div>';
            }
            root?.childNodes.forEach((node) => {
                if ((node as HTMLElement).innerHTML === '') {
                    (node as HTMLElement).innerHTML = '<br>';
                }
            });
        }

        // get selection and range object
        if (window.getSelection() !== null && root) {
            // if the current innerHTML is none, reset it and reset the cursor as well
            // create content in a script item
            const icon = (content: string, code: string) => (
                <div
                    style={{
                        display: 'inline-block',
                        userSelect: 'none',
                    }}
                >
                    &nbsp;
                    <div className={style.textEditor_icon}>
                        <div
                            className={style.textEditor_innerScript}
                            onClick={(event) => {
                                if (props.onBlurWithId !== undefined) {
                                    props.onBlurWithId(`${props.id}`, false);
                                }
                                if (props.handleAddScript !== undefined) {
                                    props.handleAddScript(props.id, event);
                                }
                            }}
                        >
                            <div className={style.textEditor_fileIcon}>
                                <FontAwesomeIcon icon={faFile as IconProp} />
                            </div>
                            {code === '#' ? (
                                <FontAwesomeIcon icon={faPlusCircle as IconProp} />
                            ) : (
                                code
                            )}
                        </div>

                        <textarea
                            onClick={handleModifyLabel}
                            onBlur={handleModifyEnd}
                            maxLength={200000}
                            onMouseOver={() => {
                                setStop(true);
                            }}
                            onMouseEnter={() => {
                                setStop(true);
                            }}
                            onMouseLeave={() => {
                                setStop(false);
                            }}
                            placeholder={'Type instruction here'}
                            className={style.textEditor_scriptText}
                            defaultValue={content}
                        />
                    </div>
                    &nbsp;
                </div>
            );
            const nodeSet = root.getElementsByClassName(style.textEditor_script);
            // render all script items

            for (let i = 0; i < nodeSet.length; i++) {
                if (nodeSet[i].innerHTML === '') {
                    ReactDOM.render(
                        icon('', nodeSet[i].getAttribute('code') as string),
                        nodeSet[i],
                    );
                } else if (
                    nodeSet[i].getElementsByClassName(style.textEditor_scriptText).length === 0
                ) {
                    let contentValue = nodeSet[i].innerHTML;
                    contentValue = contentValue.replaceAll('<br>', '\n');
                    ReactDOM.render(
                        icon(contentValue, nodeSet[i].getAttribute('code') as string),
                        nodeSet[i],
                    );
                }
            }
        }
    };

    /**
     * this effect will add handleSetOurRange to the window and remove it when component unmount
     */
    useEffect(() => {
        window.addEventListener('mousedown', handleSetOurRange);
        // get the innerHTML of root of the editor

        const root = document.getElementById(props.id);
        const observer = new MutationObserver(handleObserve);

        if (root !== null) {
            // init the root
            if (root) {
                if (
                    root.innerHTML === '' ||
                    root.innerHTML === '<br>' ||
                    root.innerHTML === '<div></div>'
                ) {
                    root.innerHTML = '<div><br></div>';
                }
            }
            // init observer configuration
            const config = {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true,
            };
            // init the observer

            // run the observer of the root element

            observer.observe(root, config);
        }
        // if (insertId !== '') ReactDOM.render(icon, document.getElementById(insertId));

        return () => {
            window.removeEventListener('mousedown', handleSetOurRange);
            observer.disconnect();
            timer.current && window.clearTimeout(timer.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    /**
     * this function will stop propagation and prevent default action from the window
     */
    const handleStopPropagationAndDefault = (e: SyntheticEvent) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
    };

    /**
     * handle command options switch
     * @param event event object
     */
    const preventCommandHide = (event: SyntheticEvent, needSwitch: boolean): boolean => {
        const options = (document.getElementById(`${props.id}hotKeyCommand`) as HTMLElement)
            .childNodes;

        switch ((event.nativeEvent as KeyboardEvent).key) {
            case 'ArrowUp': {
                // prevent default actions
                event.preventDefault();
                // change selected item
                if (needSwitch) {
                    for (let i = 0; i < options.length; i++) {
                        if (i === (optionIndex + 1) % options.length) {
                            (options[i] as HTMLElement).className =
                                commandStyle.HKC_selectionItem__selected;
                            setOptionIndex(i);
                        } else {
                            (options[i] as HTMLElement).className = commandStyle.HKC_selectionItem;
                        }
                    }
                }
                return true;
            }
            case 'ArrowDown': {
                event.preventDefault();
                if (needSwitch) {
                    for (let i = 0; i < options.length; i++) {
                        if (i === (optionIndex + (options.length - 1)) % options.length) {
                            (options[i] as HTMLElement).className =
                                commandStyle.HKC_selectionItem__selected;
                            setOptionIndex(i);
                        } else {
                            (options[i] as HTMLElement).className = commandStyle.HKC_selectionItem;
                        }
                    }
                }
                return true;
            }
            case 'Enter': {
                event.preventDefault();
                // add script file at the range
                if (needSwitch) {
                    (options[optionIndex] as HTMLElement).click();
                    (options[optionIndex] as HTMLElement).className =
                        commandStyle.HKC_selectionItem;
                    setCommandDisplay('none');
                }
                return true;
            }
        }
        return false;
    };

    /**
     * this function is to handle on key down
     * @param event event object
     */
    let prePressed: string;
    const handleOnKeyDown = (event: SyntheticEvent) => {
        if ((event.nativeEvent as KeyboardEvent).ctrlKey) {
            if ((event.nativeEvent as KeyboardEvent).code === 'KeyA') {
                document.execCommand('copy');
                return;
            }
        }
        // do the delete operation
        const code = (event.nativeEvent as KeyboardEvent).code;

        if (code === 'Space' || code === 'Backspace' || code === 'Delete') {
            prePressed = (event.nativeEvent as KeyboardEvent).code;
            // if the delete operation is in the script, do nothing and return
            if ((event.target as HTMLElement).tagName === 'TEXTAREA') {
                return;
            }
            // get the current range object
            const range = window.getSelection()?.getRangeAt(0);
            if (range) {
                // if range is not collapsed, prevent delete operation and return
                // if (range.endContainer !== range.startContainer) {
                //     event.preventDefault();
                //     return;
                // }
                // // if range is not collapsed, prevent delete operation and return
                // if (
                //     range.endContainer === range.startContainer &&
                //     range.endOffset !== range.startOffset
                // ) {
                //     event.preventDefault();
                //     return;
                // }

                if (!range.collapsed) {
                    const content = range.cloneContents();
                    const scriptsIncluded = content.querySelectorAll('textarea');
                    timer.current && window.clearTimeout(timer.current);
                    if (scriptsIncluded.length > 0) {
                        const res = window.confirm(`include script file, confirm to delete?`);
                        if (res) {
                            range.deleteContents();
                            if (code === 'Delete') {
                                timer.current = window.setTimeout(() => {
                                    if (
                                        ref.current &&
                                        (ref.current as HTMLElement).innerText === '\n'
                                    ) {
                                        props.handleDeleteAll && props.handleDeleteAll();
                                    }
                                }, 0);
                            }
                        }
                        event.preventDefault();
                        return;
                    }

                    if (code === 'Delete') {
                        timer.current = window.setTimeout(() => {
                            if (ref.current && (ref.current as HTMLElement).innerText === '\n') {
                                props.handleDeleteAll && props.handleDeleteAll();
                            }
                        }, 0);
                    }
                    return;
                }

                if (
                    code === 'Delete' &&
                    ref.current &&
                    (ref.current as HTMLElement).innerText === '\n'
                ) {
                    props.handleDeleteAll && props.handleDeleteAll();
                    return;
                }
                if (range.startContainer.nodeType !== 3) {
                    // current range is in a text node or not
                    if (range.startOffset !== 0) {
                        // get the offset of the range
                        let offset = range.endOffset;

                        // if the range is not in the first line
                        range.endContainer.childNodes.forEach((item, index) => {
                            if (item.nodeType !== 3) {
                                if (index < range.endOffset) offset = index;
                            } else if (item.nodeValue !== '' && index < range.endOffset) {
                                offset = range.endOffset;
                            }
                        });

                        // alert user
                        if (offset !== range.endOffset) {
                            setStop(true);

                            const res = window.confirm(`include script file, confirm to delete?`);
                            if (res) {
                                // prevent default delete operation
                                event.preventDefault();
                                // get range after delete
                                const newRange = document.createRange();
                                newRange.setStart(range.startContainer, offset);
                                newRange.setEnd(range.endContainer, range.endOffset);
                                newRange.deleteContents();
                                // set new range
                                document.getSelection()?.removeAllRanges();
                                document.getSelection()?.addRange(newRange);
                            } else {
                                // cancel delete operation
                                (event.currentTarget as HTMLElement).focus();
                                event.preventDefault();
                            }
                        }
                    }
                } else {
                    if (range.startOffset === 0) {
                        if ((range.startContainer as HTMLElement).previousElementSibling !== null) {
                            const res = window.confirm(`include script file, confirm to delete?`);
                            if (!res) {
                                event.preventDefault();
                            }
                        }
                    }
                }
            }
        } else {
            if (prePressed === 'MetaLeft' || prePressed === 'MetaRight') {
                console.log(11111, (event.nativeEvent as KeyboardEvent).code);
                if ((event.nativeEvent as KeyboardEvent).code !== 'KeyC') {
                    prePressed = (event.nativeEvent as KeyboardEvent).code;
                    const range = window.getSelection()?.getRangeAt(0);
                    if (range) {
                        if (range.endContainer !== range.startContainer) {
                            event.preventDefault();
                            return;
                        }
                        if (
                            range.endContainer === range.startContainer &&
                            range.endOffset !== range.startOffset
                        ) {
                            event.preventDefault();
                            return;
                        }
                    }
                }
            } else {
                prePressed = (event.nativeEvent as KeyboardEvent).code;
                const range = window.getSelection()?.getRangeAt(0);
                if (range) {
                    if (range.endContainer !== range.startContainer) {
                        event.preventDefault();
                        return;
                    }
                    if (
                        range.endContainer === range.startContainer &&
                        range.endOffset !== range.startOffset
                    ) {
                        event.preventDefault();
                        return;
                    }
                }
            }
        }

        if (commandDisplay !== 'none') {
            // prevent default actions when arrow up and arrow down
            preventCommandHide(event, true);
        }
    };

    /**
     * judge is the command need to display or not
     * @param event event object
     */
    const handleCheckCommandDisplay = (event: SyntheticEvent) => {
        // lister '/' event and allow user to add script
        if ((event.nativeEvent as KeyboardEvent).key === '/' && allowScript) {
            const selection = window.getSelection();
            setCurrentRange(selection?.getRangeAt(0).cloneRange());

            const editorAreaDom = document.getElementById(props.id);
            const editorAreaDomLeft = editorAreaDom?.getBoundingClientRect().left;
            const editorAreaDomTop = editorAreaDom?.getBoundingClientRect().top;
            if (inClickArea && editable) {
                if (!selection?.isCollapsed) {
                    setCommandDisplay('none');
                } else {
                    setCommandDisplay('block');
                    setOptionIndex(0);
                    if (editorAreaDomLeft && editorAreaDomTop) {
                        setPositionX(getSelectionCoords().x - editorAreaDomLeft);
                        setPositionY(getSelectionCoords().y - editorAreaDomTop + 24);
                    }

                    // init command component show the first element is selected
                    const options = (
                        document.getElementById(`${props.id}hotKeyCommand`) as HTMLElement
                    ).childNodes;

                    (options[0] as HTMLElement).className =
                        commandStyle.HKC_selectionItem__selected;
                }
            }
        } else {
            if (!preventCommandHide(event, false)) {
                setCommandDisplay('none');
            }
        }
    };

    /**
     * filter paste content, text only
     * @param event event target
     */
    const handleOnPaste = (event: SyntheticEvent) => {
        event.preventDefault();

        if (document.execCommand) {
            document.execCommand(
                'insertText',
                false,
                (event.nativeEvent as ClipboardEvent).clipboardData?.getData('text'),
            );
        }
    };

    /**
     * handle textEditor content on change
     */ const handleInputOnChange = (event: SyntheticEvent): void => {
        setInClickArea(true);
        if (props.onInputChange !== undefined) {
            props.onInputChange(event);
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.textEditor_root + (className ? ' ' + className : '')}>
            {/* {console.log(positionX)}
            {console.log(positionY)} */}
            <div
                ref={barRef}
                className={style.textEditor_toolBarWrapper}
                style={{
                    left: `${positionX}px`,
                    top: `${positionY}px`,
                    display: toolBarDisplay,
                }}
                onMouseOver={() => {
                    setStop(true);
                }}
                onMouseEnter={() => {
                    setStop(true);
                }}
                onMouseLeave={() => {
                    setStop(false);
                }}
                onClick={() => {
                    setStop(false);
                }}
            >
                <ToolBar
                    defaultFilledColorSet={props.defaultFilledColorSet}
                    defaultFontColorSet={props.defaultFontColorSet}
                    defaultScriptLabelSet={props.defaultScriptLabelSet}
                    defaultSettingBarSet={props.defaultSettingBarSet}
                    defaultStyleBarSet={props.defaultStyleBarSet}
                    onCopy={() => {
                        document.execCommand('copy');
                    }}
                />
            </div>
            <div
                className={style.textEditor_toolBarWrapper}
                onClick={() => {
                    setCommandDisplay('none');
                    setStop(false);
                }}
                onMouseOver={() => {
                    setStop(true);
                }}
                onMouseEnter={() => {
                    setStop(true);
                }}
                onMouseLeave={() => {
                    setStop(false);
                }}
                style={{
                    left: `${positionX}px`,
                    top: `${positionY}px`,
                    display: commandDisplay,
                }}
            >
                <HotKeyCommand
                    id={`${props.id}hotKeyCommand`}
                    label={props.label}
                    currentRange={currentRange}
                    selectionList={props.selectionList}
                />
            </div>
            <div
                id={props.id}
                key={props.id}
                ref={ref}
                placeholder={placeholder}
                contentEditable={true}
                className={style.textEditor_wrapper}
                style={{ width: width, height: height }}
                onMouseMove={handleSetToolBarPositionAndCheckDisplay}
                onMouseDown={(e) => {
                    handleClickCheckDisplay(e);
                }}
                onClick={(e) => {
                    handleStopPropagationAndDefault(e);
                }}
                onKeyUp={(event) => {
                    handleSetToolBarPositionAndCheckDisplay();
                    handleCheckCommandDisplay(event);
                }}
                onCopy={() => console.log(123)}
                onInput={handleInputOnChange}
                onKeyDownCapture={handleOnKeyDown}
                onPasteCapture={handleOnPaste}
                onBlur={handleInputOnBlur}
                onFocus={() => setStop(false)}
            ></div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
