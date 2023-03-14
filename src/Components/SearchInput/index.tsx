/**
 * @file
 * @date 2022-03-12
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2022-03-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, Kite, ScrollComponent } from "@datareachable/dr_front_componentlibrary";
import React, { FC, useState } from "react";

import { useEffect } from "react";
import { keywordWeight } from "~/Utils/weightFont";
import style from "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface MultiplyRefProps {
    blur: () => void;
    focus: () => void;
}
interface SearchInputProps {
    width?: string;
    placeholder?: string;
    associationList?: string[];
    defaultValue?: string;
    deliverableTypeIndex?: number;
    handleSearch?: (value: string) => void;
    handleGetAssociationList?(value: string);
    onChange?: (str: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line react/display-name
const SearchInput: FC<SearchInputProps> = ({
    placeholder = "Search...",
    associationList,
    defaultValue,
    deliverableTypeIndex,
    handleSearch,
    handleGetAssociationList,
    onChange,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [value, setValue] = useState("");
    const [onBlur, setOnBlur] = useState(false);
    /** box border show */
    const [inputBorder, setInputBorder] = useState(false);
    /** search distributor association */
    const [associationShow, setAssociationShow] = useState(false);

    /** 控制联想建议列表是否展示 */
    useEffect(() => {
        if (value) {
            if (associationList && associationList.length > 0 && !onBlur) {
                setAssociationShow(true);
            } else {
                setAssociationShow(false);
            }
        }
    }, [associationList, onBlur, value]);

    /** 切换deliverable类型时，输入框内容置空  */
    useEffect(() => {
        setValue("");
    }, [deliverableTypeIndex]);

    useEffect(() => {
        setValue(defaultValue ?? "");
    }, [defaultValue]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    // const selectItem = useMemo(() => dropList[select], [dropList, select]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** handle key down  */
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const code = e.key;
        if (code === "Escape" || code === "Enter") {
            const value = e.currentTarget.value;
            (e.target as HTMLInputElement).blur();
            handleSearch?.(value);
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={style.searchInput_wrap}
            tabIndex={-1}
            style={{
                borderColor: inputBorder ? "#67CDD6" : "",
                width: "30.5rem",
                outline: "none",
            }}
            onFocus={() => setInputBorder(true)}
            onBlur={() => {
                setInputBorder(false);
            }}
        >
            <Kite
                show={true}
                offset={{
                    x: -152,
                    y: 118,
                }}
                style={{ zIndex: 100 }}
                root={
                    <input
                        type="text"
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => {
                            const value = e.currentTarget.value;
                            setValue(value);
                            handleGetAssociationList?.(value);
                            if (!value.trim()) {
                                setAssociationShow(false);
                                handleGetAssociationList?.("");
                                handleSearch?.("");
                            }
                            onChange?.(value);
                        }}
                        onKeyDown={handleOnKeyDown}
                        onFocus={() => {
                            setOnBlur(false);
                            if (value) {
                                handleGetAssociationList?.(value);
                            }
                        }}
                        onBlur={() => setOnBlur(true)}
                    />
                }
            >
                {associationShow ? (
                    <ScrollComponent
                        defaultScrollTop={0}
                        width="30.5rem"
                        height="21.6rem"
                        className={style.searchInput_dropDown}
                        hidden={{ x: true, y: false }}
                    >
                        {associationList &&
                            associationList.map((item, index) => {
                                return (
                                    <p
                                        key={index}
                                        className={style.searchInput_association}
                                        onMouseDown={() => {
                                            handleSearch?.(item);
                                            setValue(item);
                                        }}
                                        dangerouslySetInnerHTML={keywordWeight(item, value)}
                                    ></p>
                                );
                            })}
                    </ScrollComponent>
                ) : (
                    ""
                )}
            </Kite>
            <span className={style.search_icon}>
                <Icon
                    type="search"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSearch?.(value);
                    }}
                />
            </span>
        </div>
    );
};
export default SearchInput;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
