/**
 * @file
 * @date 2021-12-25
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2021-12-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    CalendarInput,
    DatePicker,
    Icon,
    Kite,
    ScrollComponent,
} from '@datareachable/dr_front_componentlibrary';
import React, { FC, useState } from 'react';

import { useEffect } from 'react';
import style from './style.scss';
import { useTranslation } from 'react-i18next';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface MultiplyRefProps {
    blur: () => void;
    focus: () => void;
}
interface MultiplyInputProps {
    folderIndex?: number;
    currentOrgId?: string;
    dropList: Array<string>;
    searchTypeIndex: number;
    associationList?: string[];
    associationHeight?: string;
    associationOffset?: { x?: number; y?: number };
    handleChangeSearchTypeIndex?: (index: number) => void;
    handleSearch?: (condition: {
        index: number;
        value?: string;
        startTime?: string;
        endTime?: string;
    }) => void;
    handleGetAssociationList?(index: number, value: string);
    onChange?: (index: number, str: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line react/display-name
const MultiplyInput: FC<MultiplyInputProps> = ({
    folderIndex,
    currentOrgId,
    dropList,
    searchTypeIndex,
    associationList,
    associationHeight = '17.6rem',
    associationOffset,
    handleChangeSearchTypeIndex,
    handleSearch,
    handleGetAssociationList,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    /** search input drop down is show */
    const [dropDownShow, setDropDownShow] = useState(false);
    const [value, setValue] = useState('');
    /** distribution search time */
    const [searchTime, setSearchTime] = useState({
        startTime: '',
        endTime: '',
    });
    /**whether the calendar is null*/
    const [isNull, setIsNull] = useState({
        startTime: false,
        endTime: false,
    });
    /** selected drop list id */
    const [selectItem, setSelectItem] = useState(dropList[searchTypeIndex]);
    const [onBlur, setOnBlur] = useState(false);
    /** box border show */
    const [inputBorder, setInputBorder] = useState(false);
    /** search distributor association */
    const [associationShow, setAssociationShow] = useState(false);
    /** select box ref */
    const [selectBoxRef, setSelectBoxRef] = useState<HTMLDivElement | null>(null);
    /** input ref */
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

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
    useEffect(() => {
        setSelectItem(dropList[0]);
        setSearchTime({ startTime: '', endTime: '' });
        setValue('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [folderIndex, currentOrgId]);
    useEffect(() => {
        setSearchTime({ startTime: '', endTime: '' });
        setValue('');
    }, [selectItem]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    // const selectItem = useMemo(() => dropList[select], [dropList, select]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 加粗字符串中的某一个字符串
     */
    const keywordWeight = (str: string) => {
        const newStr = str.replaceAll(value, '<b class="weight">' + value + '</b>');
        return { __html: newStr };
    };
    /** handle key down  */
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const code = e.key;
        if (code === 'Escape' || code === 'Enter') {
            const value = e.currentTarget.value;
            (e.target as HTMLInputElement).blur();
            handleSearch?.({ index: dropList.indexOf(selectItem), value });
        }
    };
    /** handle time */
    // const handleTimeSearch = (str: string) => {
    //     // const reg = "\btime\b|\bdate\b-i";
    //     const reg = "[^Time]+";
    //     return str.match(reg);
    // };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={style.search_wrap}
            tabIndex={-1}
            style={{
                borderColor: inputBorder ? '#67CDD6' : '',
                width: selectItem && selectItem.includes('Time') ? '41.2rem' : '30.5rem',
                outline: 'none',
            }}
            onFocus={() => setInputBorder(true)}
            onBlur={() => {
                setInputBorder(false);
                if (!associationShow) {
                    setDropDownShow(false);
                }
            }}
        >
            <div
                className={style.search_dropDownWrap}
                onMouseDown={() => {
                    if (associationShow) {
                        setDropDownShow(true);
                        return;
                    }
                    setDropDownShow(!dropDownShow);
                }}
            >
                <Kite
                    show={dropDownShow && dropList.length > 1}
                    offset={{
                        x: 64 - (selectBoxRef?.offsetWidth ?? 0) / 2,
                        y: 10,
                    }}
                    root={
                        <div className={style.search_selected} ref={(e) => e && setSelectBoxRef(e)}>
                            <span>{t(`HomePage.Main.SearchDistribution.${selectItem}`)}</span>
                            {dropList.length > 1 && (
                                <Icon
                                    type="dropdown"
                                    fontSize="1rem"
                                    style={{
                                        transform: dropDownShow ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}
                                />
                            )}

                            <i></i>
                        </div>
                    }
                >
                    <div className={style.search_dropDownList}>
                        {dropList.map((item, index) => {
                            return (
                                <p
                                    key={item}
                                    className={`${style.dropDownList_item} ${
                                        selectItem === item ? style.dropDownList_item_active : ''
                                    }`}
                                    onMouseDown={() => {
                                        setSelectItem(item);
                                        setValue('');
                                        setDropDownShow(false);
                                        handleChangeSearchTypeIndex?.(index);
                                    }}
                                >
                                    {t(`HomePage.Main.SearchDistribution.${item}`)}
                                </p>
                            );
                        })}
                    </div>
                </Kite>
            </div>
            {selectItem && selectItem.includes('Time') ? (
                <div tabIndex={0} className={style.searchTime_wrap}>
                    <div style={{ height: '3.2rem' }}>
                        <div className={style.calendarContainer_subContainer} tabIndex={-1}>
                            <DatePicker
                                maxTime={
                                    searchTime.endTime ? new Date(searchTime.endTime) : new Date()
                                }
                                type="date"
                                value={searchTime.startTime}
                                handleTimeChange={(res) => {
                                    if (!res) {
                                        setIsNull({ ...isNull, startTime: true });
                                        setSearchTime({
                                            ...searchTime,
                                            startTime: '',
                                        });
                                        if (!searchTime.endTime) {
                                            handleSearch?.({
                                                index: dropList.indexOf(selectItem),
                                            });
                                        }
                                    }
                                }}
                            >
                                <CalendarInput
                                    style={{ width: '11rem', height: '3.2rem', border: 'none' }}
                                    placeholder={t('HomePage.Main.SearchDistribution.StartTime')}
                                    handleValueChange={(res) => {
                                        setIsNull({ ...isNull, startTime: false });
                                        setSearchTime({
                                            ...searchTime,
                                            startTime: res.trim(),
                                        });
                                    }}
                                    valueFormat="yyyy-MM-dd"
                                />
                            </DatePicker>
                        </div>
                    </div>
                    <span className={style.calendarContainer_line}></span>
                    <div className={style.calendarContainer_subContainer} tabIndex={-1}>
                        <DatePicker
                            maxTime={new Date()}
                            minTime={
                                new Date(
                                    new Date(searchTime.startTime).getTime() - 24 * 60 * 60 * 1000,
                                )
                            }
                            type="date"
                            value={searchTime.endTime}
                            handleTimeChange={(res) => {
                                if (!res) {
                                    setIsNull({ ...isNull, endTime: true });
                                    setSearchTime({
                                        ...searchTime,
                                        endTime: '',
                                    });
                                    if (!searchTime.startTime) {
                                        handleSearch?.({ index: dropList.indexOf(selectItem) });
                                    }
                                }
                            }}
                        >
                            <CalendarInput
                                style={{ width: '11rem', height: '3.2rem', border: 'none' }}
                                placeholder={t('HomePage.Main.SearchDistribution.EndTime')}
                                handleValueChange={(res) => {
                                    setIsNull({ ...isNull, endTime: false });
                                    setSearchTime({
                                        ...searchTime,
                                        endTime: res.trim(),
                                    });
                                }}
                                valueFormat="yyyy-MM-dd"
                            />
                        </DatePicker>
                    </div>
                </div>
            ) : (
                <>
                    <Kite
                        show={true}
                        offset={{
                            x: -(inputRef?.clientWidth ?? 0) / 2 - 5,
                            y: associationOffset?.y || (inputRef?.clientHeight ?? 0) * 2 + 10,
                        }}
                        // offset={{
                        //     x: -90,
                        //     y: 78,
                        // }}
                        root={
                            <input
                                type="text"
                                value={value}
                                ref={(e) => e && setInputRef(e)}
                                className={style.searchInput_wrap}
                                placeholder={t('HomePage.Main.SearchDistribution.Placeholder')}
                                onChange={(e) => {
                                    const value = e.currentTarget.value;
                                    setValue(value);
                                    handleGetAssociationList?.(dropList.indexOf(selectItem), value);
                                    if (!value.trim()) {
                                        setAssociationShow(false);
                                        handleGetAssociationList?.(0, '');
                                        handleSearch?.({ index: 0, value: '' });
                                    }
                                }}
                                onKeyDown={handleOnKeyDown}
                                onFocus={() => {
                                    setOnBlur(false);
                                    if (value) {
                                        handleGetAssociationList?.(
                                            dropList.indexOf(selectItem),
                                            value,
                                        );
                                    }
                                }}
                                onBlur={() => setOnBlur(true)}
                            />
                        }
                    >
                        {associationShow ? (
                            <ScrollComponent
                                defaultScrollTop={0}
                                width={`${(inputRef?.clientWidth ?? 0) + 15}px`}
                                height={associationHeight}
                                className={style.searchInputTwo_dropDown}
                                hidden={{ x: true, y: false }}
                            >
                                {selectItem !== 'Created Time' &&
                                    associationList &&
                                    associationList.map((item, index) => {
                                        return selectItem === 'Keywords' ? (
                                            <p
                                                key={index}
                                                className={style.searchInputTwo_keyword}
                                                onMouseDown={() => {
                                                    handleSearch?.({
                                                        index: dropList.indexOf(selectItem),
                                                        value: item,
                                                    });
                                                    setValue(item);
                                                }}
                                            >
                                                <span
                                                    dangerouslySetInnerHTML={keywordWeight(item)}
                                                ></span>
                                            </p>
                                        ) : (
                                            <p
                                                key={index}
                                                className={style.searchInputTwo_association}
                                                onMouseDown={() => {
                                                    handleSearch?.({
                                                        index: dropList.indexOf(selectItem),
                                                        value: item,
                                                    });
                                                    setValue(item);
                                                }}
                                                dangerouslySetInnerHTML={keywordWeight(item)}
                                            ></p>
                                        );
                                    })}
                            </ScrollComponent>
                        ) : (
                            ''
                        )}
                    </Kite>
                </>
            )}
            <div
                className={style.distribution_searchIcon}
                onClick={(e) => {
                    e.preventDefault();
                    if (selectItem && selectItem.includes('Time')) {
                        handleSearch?.({
                            index: dropList.indexOf(selectItem),
                            startTime: searchTime.startTime,
                            endTime: searchTime.endTime,
                        });
                    } else {
                        handleSearch?.({ index: dropList.indexOf(selectItem), value });
                    }
                }}
            >
                <Icon type="search" />
            </div>
        </div>
    );
};
export default MultiplyInput;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
