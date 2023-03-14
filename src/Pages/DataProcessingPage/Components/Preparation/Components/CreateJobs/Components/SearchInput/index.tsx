/**
 * @file SearchInput
 * @date 2022-08-24
 * @author liaoli
 * @lastModify liaoli 2022-08-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, Kite, ScrollComponent } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface SearchInputProps {
    height: string;
    width: string;
    placeholder?: string;
    disable?: boolean;
    dataList?: Array<{
        key: string;
        value: string;
    }>;
    currentKey?: string;
    handleOptionClick?: (key: string) => void;
    handleOnBlur?: (e: React.FocusEvent) => void;
    handleOnFocus?: (e: React.FocusEvent) => void;
    handleOnChange?: (e: React.ChangeEvent) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
    height,
    width,
    placeholder,
    dataList,
    disable,
    currentKey,
    handleOptionClick,
    handleOnBlur,
    handleOnFocus,
    handleOnChange,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [showList, setShowList] = useState<
        {
            value: string;
            key: string;
        }[]
    >();

    const [showAll, setShowAll] = useState<boolean>(false);
    const [showSelect, setShowSelect] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isShow = useMemo(() => {
        return showAll || showSelect
    }, [showAll, showSelect]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */

    const setShowListFn = (value: string, isAll?: boolean) => {
        const arr: {
            value: string;
            key: string;
        }[] = [];
        if (!dataList) {
            return;
        }
        dataList.forEach((item) => {
            if (!item.value.includes(value)) {
                if (isAll) {
                    arr.push({
                        key: item.key,
                        value: `<span>${item.value}</span>`,
                    });
                }
                return false;
            } else {
                if (item.key === currentKey) {
                    arr.unshift({
                        key: item.key,
                        value: `<span style="color:#22A6B3;">${item.value}</span>`,
                    });
                } else {
                    const __html = item.value.replaceAll(
                        value,
                        `<span class='selectText'>${value}</span>`,
                    );
                    arr.push({
                        key: item.key,
                        value: __html,
                    });
                }
            }
        });
        setShowList(arr);
    };

    const setValue = (key) => {
        if (inputRef.current) {
            const value = dataList?.find((item) => item.key == key)?.value;
            inputRef.current.value = value || '';
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            if (currentKey) {
                inputRef.current.value =
                    dataList?.find((item) => item.key === currentKey)?.value || '';
            } else {
                inputRef.current.value = '';
            }
        }
    }, [currentKey, dataList]);

    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <Kite
                show={isShow}
                offset={{
                    y: 4,
                }}
                style={{ zIndex: 100 }}
                handleGlobalClick={(res) => {
                    if (!res.isBtn && !res.isMenu) {
                        setShowSelect(false);
                    }
                }}
                root={
                    <div className={style.search_container}>
                        <input
                            ref={inputRef}
                            className={style.search_input}
                            style={{ width, height }}
                            type="text"
                            placeholder={placeholder}
                            disabled={disable}
                            onBlur={(e) => {
                                if (currentKey) {
                                    e.target.value =
                                        dataList?.find((item) => item.key === currentKey)?.value ||
                                        '';
                                }
                                handleOnBlur && handleOnBlur(e);
                            }}
                            onFocus={(e) => {
                                setShowSelect(true);
                                if (e.target.value === '') {
                                    setShowListFn(e.target.value, true);
                                } else {
                                    setShowListFn(e.target.value);
                                }
                                handleOnFocus && handleOnFocus(e);
                            }}
                            onChange={(e) => {
                                if (disable) return
                                handleOnChange && handleOnChange(e);
                                // if (!e.target.value.trim()) {
                                //     setShowList([]);
                                //     return;
                                // }
                                setShowListFn(e.target.value);
                                setShowSelect(true);
                            }}
                        />
                        <Icon
                            className={style.dropdownIcon}
                            style={
                                isShow
                                    ? { transform: 'translateY(-50%) rotate(180deg)' }
                                    : { transform: 'translateY(-50%)' }
                            }
                            type="dropdown"
                            onClick={() => {
                                if (disable) return

                                if (showSelect) {
                                    setShowSelect(false);
                                    return;
                                }

                                setShowSelect(true);
                                setShowListFn(inputRef.current?.value || '', true);
                            }}
                        />
                    </div>
                }
            >
                <div>
                    <ScrollComponent width={width} className={style.search_scrollWarp} style={showList &&
                        showList.length === 0 ? { padding: '1rem' } : {}}>
                        {showSelect &&
                            showList &&
                            showList.length > 0 &&
                            showList.map((item) => {
                                return (
                                    <div
                                        className={style.listItme}
                                        key={item.key}
                                        onClick={() => {
                                            if (disable) return
                                            handleOptionClick && handleOptionClick(item.key);
                                            setValue(item.key);
                                            setShowAll(false);
                                            setShowSelect(false);
                                        }}
                                        dangerouslySetInnerHTML={{ __html: item.value }}
                                    ></div>
                                );
                            })}
                    </ScrollComponent>
                </div>
            </Kite>
        </>
    );
};
export default SearchInput;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
