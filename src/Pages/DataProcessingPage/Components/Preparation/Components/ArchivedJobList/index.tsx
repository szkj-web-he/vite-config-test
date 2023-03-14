/**
 * @file ArchivedJobList
 * @date 2022-08-26
 * @author liaoli
 * @lastModify liaoli 2022-08-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Alert,
    Kite,
    ScrollComponent,
    Popover,
    Icon,
} from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '~/Store/JobList/actions';
import style from './style.scss';
// import { jobList, JobListType } from '~/DefaultData/Jobs';
import { RootState } from '~/Store/rootReducer';
import { JobListType } from '~/Store/JobList/types';
import Skeleton from '~/Components/Skeleton';
import emptyImg from '~/Assets/images/icon_questionnaire.png';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface ArchivedJobListProps {
    show: boolean;
    isTaskGiver: boolean;
    handleClose?: () => void;
    getJobList: () => void;
}
const ArchivedJobList: React.FC<ArchivedJobListProps> = ({
    show,
    isTaskGiver,
    handleClose,
    getJobList,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */

    const dispatch = useDispatch();

    const tgId = useSelector((state: RootState) => state.preparation.navData.talent_group.id);

    /** 已归档的数据 */
    const { data: archivedJobList, isLoading } = useSelector(
        (state: RootState) => state.jobList.getArchiveJobList,
    );

    /** 搜索框值 */
    const [searchInputValue, setSearchInputValue] = useState('');

    /** 是否显示模糊查询的列表 */
    const [showSearchList, setShowSearchList] = useState(false);

    /** 显示的列表 */
    const [showList, setShowList] = useState<JobListType[]>([]);

    /** 搜索框 */
    const searchInputRef = useRef<HTMLInputElement>(null);

    /** 搜索列表 */
    const [searchList, setSearchList] = useState<{ key: string; value: string }[]>([]);
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    useEffect(() => {
        if (archivedJobList) {
            if (searchInputValue) {
                setShowList(archivedJobList.filter((item) => item.name.includes(searchInputValue)));
            } else {
                setShowList(archivedJobList);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [archivedJobList]);
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */

    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */

    const setSearchListFn = (value: string) => {
        const arr: {
            value: string;
            key: string;
        }[] = [];
        if (!archivedJobList) {
            return;
        }
        archivedJobList.forEach((item) => {
            if (!item.name.includes(value)) {
                return false;
            } else {
                const __html = item.name.replaceAll(
                    value,
                    `<span style="color:#212121;">${value}</span>`,
                );
                arr.push({
                    key: item.id,
                    value: __html,
                });
            }
        });
        setSearchList(arr);
    };
    const showListFn = (arr: string[]) => {
        const arr1: JobListType[] = [];
        arr.forEach((item) => {
            const job = archivedJobList?.find((items) => items.id === item);
            if (job) {
                arr1.push(job);
            }
        });
        setShowList(arr1);
    };

    /** 恢复归档 */
    const handleRestoreArchived = (id: string) => {
        if (tgId && id) {
            dispatch(
                actions.restoreArchivedJobSaga({
                    talent_group_id: tgId,
                    job_id: id,
                    callback: () => {
                        getJobList();
                    },
                }),
            );
        }
    };

    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={show}
            custom={true}
            width="80rem"
            height="56.8rem"
            className={style.archivedList_alert}
            changeStatus={handleClose}
        >
            <div className={style.archivedList_box}>
                <h2>归档的工作</h2>
                <div className={style.archivedList_search}>
                    <Kite
                        offset={{
                            y: 4,
                        }}
                        show={showSearchList && searchList.length > 0}
                        style={{ zIndex: 100 }}
                        root={
                            <div className={style.archivedList_searchBox}>
                                <input
                                    value={searchInputValue}
                                    ref={searchInputRef}
                                    onChange={(e) => {
                                        setSearchInputValue(e.target.value);
                                        setSearchListFn(e.target.value);
                                        if (e.target.value === '') {
                                            setShowList([...(archivedJobList || [])]);
                                        }
                                    }}
                                    onBlur={() => {
                                        setShowSearchList(false);
                                    }}
                                    onFocus={() => {
                                        setShowSearchList(true);
                                        setSearchListFn(searchInputValue);
                                    }}
                                    placeholder="可用工作名称进行搜索..."
                                    className={style.archivedList_searchInpt}
                                    type="text"
                                />
                                <div className={style.searchIcon_box}>
                                    <Icon
                                        onClick={() => {
                                            showListFn(searchList.map((item) => item.key));
                                        }}
                                        className={style.archivedList_searchIcon}
                                        type="search"
                                    />
                                </div>
                            </div>
                        }
                    >
                        <ScrollComponent className={style.archivedList_scroll}>
                            <ul className={style.archivedList_searchList}>
                                {searchList.map((item) => {
                                    return (
                                        <li
                                            key={item.key}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                            }}
                                            onClick={() => {
                                                showListFn([item.key]);
                                                setSearchInputValue(
                                                    archivedJobList?.find(
                                                        (items) => items.id === item.key,
                                                    )?.name || '',
                                                );
                                                searchInputRef.current?.blur();
                                                setShowSearchList(false);
                                            }}
                                            dangerouslySetInnerHTML={{ __html: item.value }}
                                        ></li>
                                    );
                                })}
                            </ul>
                        </ScrollComponent>
                    </Kite>
                </div>
                <ScrollComponent>
                    {isLoading ? (
                        <Skeleton row={7} style={{ padding: ' 0 1.6rem' }} />
                    ) : !showList.length ? (
                        <div className={style.archived_empty}>
                            <img src={emptyImg} />
                            <div>暂无已归档工作</div>
                        </div>
                    ) : (
                        <ul className={style.archivedList}>
                            {showList?.map((item, index) => {
                                return (
                                    <li
                                        className={`${style.archivedItem} ${
                                            isTaskGiver ? style.archivedList_hover : ''
                                        }`}
                                        key={index}
                                    >
                                        <div className={style.archivedItem_info}>
                                            <Icon
                                                type="weblink"
                                                className={style.archivedItem_linkIcon}
                                            />
                                            <p className={style.archivedItem_name}>{item.name}</p>
                                            {item.source_type === 1 ? (
                                                <p className={style.archivedItem_source}>
                                                    {item.source_job.name}
                                                </p>
                                            ) : (
                                                <React.Fragment>
                                                    <p className={style.archivedItem_source}>
                                                        {item.survey_version.number}
                                                    </p>
                                                    <span className={style.archivedItem_version}>
                                                        {item.survey_version.number}
                                                    </span>
                                                </React.Fragment>
                                            )}
                                        </div>
                                        {isTaskGiver && (
                                            <Popover
                                                root={
                                                    <Icon
                                                        className={style.archivedItem_restore}
                                                        type="restore"
                                                        onClick={() => {
                                                            handleRestoreArchived(item.id);
                                                        }}
                                                    />
                                                }
                                                className={style.restore_popover}
                                                placement="ct"
                                                offset={{
                                                    y: -6,
                                                }}
                                            >
                                                恢复
                                            </Popover>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </ScrollComponent>
            </div>
        </Alert>
    );
};
export default ArchivedJobList;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
