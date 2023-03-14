/**
 * @file
 * @date 2021-08-26
 * @author zhoubin
 * @lastModify zhoubin 2021-08-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from 'react';
import style from './style.scss';
import {
    Col,
    Icon,
    NavTool,
    PaginationV2,
    Row,
    ScrollComponent,
} from '@datareachable/dr_front_componentlibrary';
import ListView from './Components/ListView';
import GridView from './Components/GridView';
import ProjectList from './Components/ProjectList';
import DistributionInfoWindow from './Components/DataProcessingInfoWindow';
import { useDispatch, useSelector } from 'react-redux';
import * as HomePageAction from '~/Store/HomePage/actions';
import * as projectAction from '~/Store/ProjectState/actions';
import * as userAction from '~/Store/UserState/actions';
import { RootState } from '~/Store/rootReducer';
import icon_questionnaire from '~/Assets/images/icon_questionnaire.png';
import {
    GetDataProcessingSagaType,
    sortType,
    DataProcessingListType,
} from '~/Store/HomePage/types';
import ChangeDashboard from './Components/ChangeDashboard';
import ViewButton from '~/Components/ViewButton';
import DataProcessingDetail from './Components/DataProcessingDetail';
import RoleAndGroup from './Components/RoleAndGroup';
import MultiplyInput from './Components/MultiplyInput';
import { useTranslation } from 'react-i18next';
import HomeLoading from '../HomeLoading';
import Skeleton from '~/Components/Skeleton';
import { updateCurrentTalentGroupAction } from '~/Store/OrganizationState/actions';
import { TalentGroupType } from '~/Store/OrganizationState/types';
import { useWindowSize } from '~/Utils/windowSize';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Main: React.VFC = (): JSX.Element => {
    Main.displayName = Row.displayName || Row.name;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /** current organizations */
    const org_id = useSelector((state: RootState) => state.organizationState.currentOrg.id);

    /** talent group */
    const {
        talentGroupList,
        currentTalentGroupId: tg_id,
        currentOrg,
    } = useSelector((state: RootState) => state.organizationState);

    /** role */
    const role = useSelector((state: RootState) => state.userState.userRole);
    /** project dri */
    const project_id = useSelector((state: RootState) => state.projectState.project?.project.id);
    /** survey distribution list */
    const { getDataProcNotBoundDataRequest, associateList, fileNumber, getOpenedDataProcessing } =
        useSelector((state: RootState) => state.homePage);
    /** category */
    const selectedCategory = useSelector((state: RootState) => state.homePage.selectedCategory);
    const { isLoading: mainLoading, data_proc: surveyDisAllData } = useSelector(
        (state: RootState) => state.homePage.getDataProcAllDataRequest,
    );

    /**  dispatch */
    const dispatch = useDispatch();
    const { t } = useTranslation();
    /** 当前 selectedCategory 所要展示的所有 survey distribution list */
    const [dataProcessingList, setDataProcessingList] = useState<DataProcessingListType[]>([]);
    /** template Type state  false:card  true:list */
    const [templateType, setTemplateType] = useState(false);
    /** current project */
    const currentProject = useSelector((state: RootState) => state.projectState.project);
    /** pageNumber number */
    const [pageNumber, setPageNumber] = useState(1);
    /** open visible */
    const [openVisible, setOpenVisible] = useState(false);
    /** is loading */
    // const [isLoading, setIsLoading] = useState(true);
    // /** distribution detail page show */
    const [dataProcessingShow, setDataProcessingShow] = useState(false);
    /** up is increase,down is descending */
    const [upOrDown, setUpOrDown] = useState(true);
    /** body width */
    // const [bodyWidth, setBodyWidth] = useState(document.body.offsetWidth);
    /** is animation */
    const [isAnimation, setIsAnimation] = useState(false);
    /** search drop list */
    const [searchDropDown, setSearchDropDown] = useState<string[]>([
        'Name',
        'Project Name',
        'Created Time',
        'Keywords',
    ]);
    /** search type index */
    const [searchTypeIndex, setSearchTypeIndex] = useState(0);
    /** search distribution loading */
    const [searchDis, setSearchDis] = useState(false);
    /** 监听页面宽度大小的变化 监听中间部分高度变化 */
    const bodyWidth = useWindowSize()[0];

    /** 页面宽度发送变化时，控制distribution侧边详情的展示与隐藏 */
    useEffect(() => {
        window.removeEventListener('click', handleWindowClick);
        // if (dataProcessingShow) {
        //     handleResetDetail();
        // }
        if (bodyWidth >= 1440) {
            setDataProcessingShow(true);
        } else {
            if (!getOpenedDataProcessing.currDataProcessing) {
                setDataProcessingShow(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bodyWidth]);
    /** 鼠标点击，distribution侧边详情模块消失 */
    useEffect(() => {
        window.addEventListener('click', handleWindowClick);
        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    });

    // 根据org_id获取文件夹数量
    useEffect(() => {
        if (org_id) {
            dispatch(
                HomePageAction.getFileNumberSaga({
                    org_id,
                    type: 'client',
                }),
            );
        }
    }, [dispatch, org_id]);
    /** 切换组织，清空数据 */
    useEffect(() => {
        dispatch(
            HomePageAction.updateFileNumberAction({
                fileNumber: {
                    isLoading: true,
                },
            }),
        );
        dispatch(HomePageAction.updateSelectedCategoryAction({ name: 'All' }));
        dispatch(projectAction.updateProjectsAction([]));
        dispatch(projectAction.updateProjectAction(null));
    }, [currentOrg, dispatch]);
    // 获取all data
    useEffect(() => {
        if (tg_id && fileNumber.data && selectedCategory !== 'Project-related') {
            handleGetList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, tg_id, selectedCategory, role, fileNumber.data]);
    // 获取 project list
    useEffect(() => {
        if (tg_id && selectedCategory === 'Project-related') {
            setSearchDis(true);

            if (!project_id) {
                dispatch(
                    projectAction.getProjectsSaga({
                        tg_id,
                        type: 1,
                        scope: role,
                        callback: () => {
                            setSearchDis(false);
                        },
                    }),
                );
            } else {
                handleGetList(project_id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, role, selectedCategory, project_id]);

    /** 切换文件夹、展示模式、页码时，更新当前的列表 */
    useEffect(() => {
        handleProcListShowNumber();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedCategory,
        surveyDisAllData,
        getDataProcNotBoundDataRequest,
        templateType,
        pageNumber,
    ]);
    useEffect(() => {
        setPageNumber(1);
        const list =
            selectedCategory === 'Project-related'
                ? projectDropList
                : selectedCategory === 'Not Bound'
                ? notBoundDropList
                : searchDropList;
        setSearchDropDown(list);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, templateType]);
    useEffect(() => {
        if (!fileNumber.data?.starred) {
            return;
        }
        if (
            (templateType && fileNumber.data?.starred % 10 === 0) ||
            (!templateType && fileNumber.data?.starred % 5 === 0)
        ) {
            if (pageNumber !== 1 && selectedCategory === 'Starred') {
                setPageNumber(pageNumber - 1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileNumber.data?.starred]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const folderList = ['All', 'Starred', 'Project-related', 'Not Bound'];
    /** search drop list */
    const searchDropList = ['Name', 'Project Name', 'Created Time', 'Keywords'];
    const projectDropList = ['Name', 'Created Time', 'Keywords'];
    const notBoundDropList = ['Name', 'Created Time'];

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** window click */
    const handleWindowClick = () => {
        if (!dataProcessingShow) {
            setIsAnimation(false);
            return;
        }
        handleResetDetail();
    };
    /**
     * 处理distribution
     * 列表模式 每页展示10条数据
     * 卡片模式 每页展示5条数据
     */
    const handleProcListShowNumber = () => {
        let list: DataProcessingListType[] = [];
        console.log('list', list);
        if (selectedCategory === 'Not Bound') {
            list = getDataProcNotBoundDataRequest.data_processing ?? [];

            // setDataProcessingList(getDataProcNotBoundDataRequest.distributions);
        } else {
            list = surveyDisAllData ?? [];
        }
        if (!templateType) {
            setDataProcessingList(list?.slice((pageNumber - 1) * 5, pageNumber * 5));
        } else {
            setDataProcessingList(list?.slice((pageNumber - 1) * 10, pageNumber * 10));
        }
    };
    /**
     * change view type
     */
    const handleChangeViewType = function (viewType: boolean) {
        setPageNumber(1);
        setTemplateType(viewType);
    };
    const handleUpdateCurrentTalentGroup = (id: string) => {
        dispatch(
            updateCurrentTalentGroupAction({
                currentTalentGroupId: id,
            }),
        );
    };

    /** handle last pageNumber */
    const handleLastPage = () => {
        const total = dataProcessingList?.length || 0;
        setPageNumber(Math.ceil(total / 5));
    };
    /** 获取distribution列表 */
    const handleGetList = (projectId?: string) => {
        setSearchDis(true);
        const baseParams: GetDataProcessingSagaType = {
            talent_group_id: tg_id,
            offset: 0,
            limit: fileNumber.data?.all || undefined,
            sort_updated: upOrDown ? 'DESC' : 'ASC',
            type: role,
            // page_size: fileNumber.data?.all,
            callback: () => {
                setSearchDis(false);
            },
        };
        let condition: GetDataProcessingSagaType = {};
        // 根据文件夹，整理参数
        switch (selectedCategory) {
            case 'All':
                condition = Object.assign(baseParams, {
                    unbound: true,
                });
                break;
            case 'Starred':
                condition = Object.assign(baseParams, { starred: true });
                break;
            case 'Project-related':
                condition = Object.assign(baseParams, { project_id: projectId });
                break;
            case 'Not Bound':
                break;
            default:
                break;
        }
        // 根据文件夹，调用不同接口
        if (selectedCategory === 'Not Bound') {
            dispatch(
                HomePageAction.getDataProcNotBoundDataSaga({
                    org_id,
                    offset: pageNumber - 1,
                    limit: fileNumber.data?.unbound || undefined,
                    callback: () => {
                        setSearchDis(false);
                    },
                }),
            );
        }
        // else if (selectedCategory === "All" || selectedCategory === "Starred") {
        //     dispatch(HomePageAction.getDataProcAllDataSaga(condition));
        // } else if (selectedCategory === "Project-related") {
        //     dispatch(HomePageAction.getDataProcAllDataSaga(condition));
        // }
        else {
            dispatch(HomePageAction.getDataProcAllDataSaga(condition));
        }
    };
    const handleGetFileNumber = (type: 'client' | 'supplier', talent_group_id) => {
        if (talent_group_id && type) {
            dispatch(HomePageAction.getFileNumberSaga({ talent_group_id, type }));
        }
    };

    /**
     * change role
     */
    const handleChangeRoleAndTG = (role: string, talentGroup: TalentGroupType) => {
        setPageNumber(1);
        handleUpdateCurrentTalentGroup(talentGroup.id);
        dispatch(userAction.updateUserRoleAction(role));
        dispatch(projectAction.updateProjectsAction([]));
        dispatch(projectAction.updateProjectAction(null));
        handleGetFileNumber(role as 'client' | 'supplier', talentGroup.id);
    };
    /**
     * distributions sort
     */
    useEffect(() => {
        setSearchDis(true);
        const time = setTimeout(() => {
            if (!surveyDisAllData) {
                return;
            }
            if (selectedCategory !== 'Not Bound') {
                console.log('aa', surveyDisAllData);

                dispatch(
                    HomePageAction.updateDataProcAllAction({
                        isLoading: false,
                        total: surveyDisAllData?.length ?? 0,
                        data_proc: surveyDisAllData?.reverse(),
                    }),
                );
            } else {
                console.log('cc', surveyDisAllData);
                dispatch(
                    HomePageAction.updateDataProcNotBoundAction({
                        isLoading: false,
                        total: getDataProcNotBoundDataRequest.total,
                        data_proc: getDataProcNotBoundDataRequest.data_processing?.reverse(),
                    }),
                );
            }

            handleProcListShowNumber();
            // setDataProcessingList(dataProcessingList.reverse());
            setSearchDis(false);
        }, 500);
        return () => {
            clearTimeout(time);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [upOrDown]);
    const handleDistributionsSort = () => {
        setUpOrDown(!upOrDown);

        // handleSearch({ index: searchTypeIndex, sort: !upOrDown });
    };
    /** 重置 distribution detail */
    const handleResetDetail = () => {
        setDataProcessingShow(false);
        handleSelectDataProcessing();
    };
    // 处理根据搜索
    const handleSearch = (options: {
        index: number;
        value?: string;
        startTime?: string;
        endTime?: string;
    }) => {
        setSearchDis(true);
        setPageNumber(1);
        const { index, value, startTime, endTime } = options;

        const baseCondition = {
            talent_group_id: tg_id,
            type: role,
            sort_updated: (upOrDown ? 'DESC' : 'ASC') as sortType,
            callback: () => {
                setSearchDis(false);
            },
        };
        const searchCondition = Object.assign(
            {},
            searchDropDown[index] === 'Name' && { name: value },
            searchDropDown[index] === 'Project Name' && { project_name: value },
            searchDropDown[index] === 'Keywords' && { keyword: value },
            searchDropDown[index] === 'Created Time' && {
                start: startTime ? `${startTime}T00:00:00.000Z` : undefined,
                end: endTime ? `${endTime}T23:59:59.999Z` : undefined,
            },
            !value && { type: role },
        );
        let condition: {
            talent_group_id: string;
            type?: string;
            limit?: number;
            offset?: number;
            name?: string;
            project_id?: string;
            keyword?: string;
            project_name?: string;
            unbound?: boolean;
            starred?: boolean;
            sort_updated?: 'DESC' | 'ASC';
            callback?: () => void;
        };
        if (!value && !startTime && !endTime) {
            condition = baseCondition;
        } else {
            condition = Object.assign(baseCondition, searchCondition);
        }
        if (selectedCategory === 'All') {
            dispatch(
                HomePageAction.getDataProcAllDataSaga(
                    Object.assign(condition, {
                        unbound: searchDropDown[index] === 'Project Name' ? false : true,
                        limit: fileNumber.data?.all || undefined,
                    }),
                ),
            );
        } else if (selectedCategory === 'Starred') {
            dispatch(
                HomePageAction.getDataProcAllDataSaga(
                    Object.assign(condition, {
                        starred: true,
                        limit: fileNumber.data?.starred || undefined,
                    }),
                ),
            );
        } else if (selectedCategory === 'Not Bound') {
            let condition: {
                org_id: string;
                limit?: number;
                offset?: number;
                sort_updated?: sortType;
                name?: string;
                start?: string;
                end?: string;
                callback?: () => void;
            };
            if (!value && !startTime && !endTime) {
                condition = {
                    org_id,
                    limit: fileNumber.data?.unbound,
                    sort_updated: upOrDown ? 'DESC' : 'ASC',
                    callback: () => {
                        setSearchDis(false);
                    },
                };
            } else {
                condition = Object.assign(
                    {
                        org_id,
                        limit: fileNumber.data?.unbound || undefined,
                        offset: 0,
                        sort_updated: (upOrDown ? 'DESC' : 'ASC') as sortType,
                    },
                    searchDropDown[index] === 'Name' && { name: value },
                    searchDropDown[index] === 'Created Time' && {
                        start: startTime ? `${startTime}T00:00:00.000Z` : undefined,
                        end: endTime ? `${endTime}T23:59:59.999Z` : undefined,
                    },
                    {
                        callback: () => {
                            setSearchDis(false);
                        },
                    },
                );
            }
            dispatch(HomePageAction.getDataProcNotBoundDataSaga(condition));
        } else if (selectedCategory === 'Project-related') {
            dispatch(
                HomePageAction.getDataProcAllDataSaga(
                    Object.assign(condition, {
                        project_id,
                        limit: fileNumber.data?.project_related || undefined,
                    }),
                ),
            );
        }
    };
    /** handle get association list */
    const handleGetAssociationList = (index: number, value: string) => {
        dispatch(
            HomePageAction.getMatchList({
                name: searchDropDown[index] === 'Name' ? value : undefined,
                project_name: searchDropDown[index] === 'Project Name' ? value : undefined,
                keyword: searchDropDown[index] === 'Keywords' ? value : undefined,
                project_id,
            }),
        );
    };

    /** 当前选择的distribution */
    const handleSelectDataProcessing = (curDis?: DataProcessingListType) => {
        dispatch(
            HomePageAction.updateCurrDataProc({
                getOpenedDataProcessing: {
                    isLoading: false,
                    currDataProcessing: curDis,
                },
            }),
        );
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <Col
                span={templateType ? 12 : bodyWidth >= 1440 ? 8 : 12}
                className={style.main_container}
            >
                <NavTool mode="fixed" />
                {mainLoading ? (
                    <HomeLoading />
                ) : (
                    <div
                        className={style.main_sectionTwoRight}
                        style={{
                            marginRight: templateType ? '0' : '',
                        }}
                    >
                        <div className={style.main_sectionTwoRightHeader}>
                            <div>
                                <ChangeDashboard
                                    options={[
                                        {
                                            id: '1',
                                            content: t(
                                                'HomePage.Main.ChangeDashboard.Project Manager',
                                            ),
                                        },
                                        {
                                            id: '2',
                                            content: t(
                                                'HomePage.Main.ChangeDashboard.Questionnaire Editor',
                                            ),
                                        },
                                        {
                                            id: '3',
                                            content: t(
                                                'HomePage.Main.ChangeDashboard.Questionnaire Distribution',
                                            ),
                                        },
                                        {
                                            id: '4',
                                            content: t(
                                                'HomePage.Main.ChangeDashboard.Analysis & Report',
                                            ),
                                        },
                                        {
                                            id: '5',
                                            content: t(
                                                'HomePage.Main.ChangeDashboard.Plug-In Editor',
                                            ),
                                        },
                                    ]}
                                />
                            </div>
                            <div className={style.main_roleAndGroup}>
                                <RoleAndGroup
                                    talentGroupList={talentGroupList}
                                    handleChangeRoleAndTG={handleChangeRoleAndTG}
                                />
                            </div>
                            <div className={style.main_HeaderBottom}>
                                <div className={style.main_viewTrigger}>
                                    <ViewButton
                                        viewType={templateType}
                                        handleChangeView={handleChangeViewType}
                                    />
                                </div>

                                <div>
                                    <MultiplyInput
                                        folderIndex={folderList.indexOf(selectedCategory)}
                                        currentOrgId={org_id}
                                        dropList={searchDropDown}
                                        searchTypeIndex={searchTypeIndex}
                                        associationList={associateList}
                                        handleChangeSearchTypeIndex={(index: number) => {
                                            setSearchTypeIndex(index);
                                        }}
                                        handleSearch={handleSearch}
                                        handleGetAssociationList={handleGetAssociationList}
                                    />
                                    <span
                                        className={style.main_HeaderBottom_sort}
                                        onClick={() => {
                                            handleDistributionsSort();
                                        }}
                                    >
                                        <Icon
                                            type={upOrDown ? 'ascendingOrder' : 'descendingOrder'}
                                            fontSize="2.2rem"
                                            color="#22A6B3"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div>
                                {selectedCategory === 'Project-related' &&
                                    currentProject?.project.id && <ProjectList />}
                            </div>
                        </div>
                        {searchDis ? (
                            // <Skeleton title={false} paragraph={{ rows: 5 }} />
                            <Skeleton
                                title={false}
                                paragraph={{ rows: 10 }}
                                style={{ padding: '0 2.4rem' }}
                            />
                        ) : // <LoadingComponent
                        //     type="spinningBubbles"
                        //     className={style.main_sectionTwoRightBody_loading}
                        // />
                        dataProcessingList.length === 0 ? (
                            <div className={style.main_contentEmpty}>
                                <img src={icon_questionnaire} alt="" />
                                <span>{t('HomePage.Main.DistributionItem.NoData')}</span>
                            </div>
                        ) : (
                            <div
                                className={style.main_sectionTwoRightBody}
                                style={{
                                    height:
                                        selectedCategory === 'Project-related'
                                            ? 'calc(100% - 22.5rem)'
                                            : '',
                                    minHeight:
                                        selectedCategory === 'Project-related' ? 'unset' : '',
                                }}
                            >
                                <ScrollComponent>
                                    <div className={style.content_scroll}>
                                        {templateType ? (
                                            <ListView
                                                dataProcessingList={dataProcessingList ?? []}
                                                changeOpen={() => setOpenVisible(true)}
                                                handleClickedEdit={(
                                                    curDis: DataProcessingListType,
                                                ) => {
                                                    handleSelectDataProcessing(curDis);
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className={style.main_gridView}
                                                style={{
                                                    height: '100%',
                                                }}
                                            >
                                                {(selectedCategory === 'Starred'
                                                    ? dataProcessingList?.filter(
                                                          (i) => i.starred,
                                                      ) ?? []
                                                    : dataProcessingList ?? []
                                                ).map((item) => {
                                                    return (
                                                        <GridView
                                                            key={item.id}
                                                            survey={item}
                                                            dataProcessingShow={dataProcessingShow}
                                                            handleClickedEdit={() => {
                                                                handleSelectDataProcessing(item);
                                                                setDataProcessingShow(true);
                                                                setIsAnimation(true);
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        )}
                                        <div className={style.main_pagination}>
                                            <PaginationV2
                                                total={
                                                    selectedCategory === 'Not Bound'
                                                        ? getDataProcNotBoundDataRequest.total
                                                        : surveyDisAllData?.length
                                                }
                                                defaultCurrentPage={pageNumber}
                                                rows={templateType ? 10 : 5}
                                                handleChange={(res) => {
                                                    setPageNumber(res);
                                                }}
                                                handleNextGroupClick={handleLastPage}
                                            />
                                        </div>
                                    </div>
                                </ScrollComponent>
                            </div>
                        )}
                        {openVisible && (
                            <DistributionInfoWindow
                                currDataProcessing={getOpenedDataProcessing?.currDataProcessing}
                                handleClose={() => {
                                    handleResetDetail();
                                    setOpenVisible(false);
                                }}
                                openVisible={openVisible}
                            />
                        )}
                    </div>
                )}
            </Col>

            <Col
                className={`${style.grid_col} ${bodyWidth < 1440 ? style.grid_col_float : ''}`}
                style={{
                    animation:
                        bodyWidth < 1440
                            ? dataProcessingShow
                                ? 'show 0.5s ease forwards'
                                : isAnimation
                                ? 'close 0.5s ease forwards'
                                : ''
                            : '',
                }}
                span={templateType ? 0 : bodyWidth >= 1440 ? 4 : 6}
            >
                <div className={style.main_distribution}>
                    {mainLoading ? (
                        <Skeleton title={false} paragraph={{ rows: 13 }} />
                    ) : (
                        <DataProcessingDetail
                            dataProcessing={getOpenedDataProcessing.currDataProcessing}
                            bodyWidth={bodyWidth}
                            changeOpen={() => {
                                setOpenVisible(true);
                            }}
                            handleDataProcShow={() => {
                                setDataProcessingShow(false);
                            }}
                        />
                    )}
                </div>
            </Col>
        </>
    );
};
Main.displayName = Row.displayName || Row.name;
export default Main;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
