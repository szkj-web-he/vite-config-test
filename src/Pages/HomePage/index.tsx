/**
 * @file home page
 * @date 2021-03-02
 * @author Chaman
 * @lastModify  zhoubin 2021-04-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import style from './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedCategoryAction } from '~/Store/HomePage/actions';
import { RootState } from '~/Store/rootReducer';
import OrgAndFolderList, { FolderProps } from '~/Components/OrgAndFolderList';
import {
    updateCurrentOrgAction,
    setDefaultOrganization,
    getAllTalentGroupSaga,
} from '~/Store/OrganizationState/actions';
import { getUserInfo } from '~/Store/UserState/actions';
import {
    getJwtKey,
    NavigationBar,
    Row,
    Sidebar,
    useLoginStatus,
    Wrapper,
} from '@datareachable/dr_front_componentlibrary';
import Main from './Components/Main';
import Skeleton from '~/Components/Skeleton';
import { useEffect } from 'react';
import { redirectToSignOutPage } from '~/Api/redirectDomain';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const HomePage = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const loginState = useLoginStatus();
    const dispatch = useDispatch();
    const { currentOrg, defaultOrganizationId } = useSelector(
        (state: RootState) => state.organizationState,
    );
    const orgList = useSelector((state: RootState) => state.organizationState.organizationList);
    const { fileNumber, selectedCategory } = useSelector((state: RootState) => state.homePage);
    const { userInfo, userRole } = useSelector((state: RootState) => state.userState);
    const { isLoading } = useSelector(
        (state: RootState) => state.homePage.getDataProcAllDataRequest,
    );

    useEffect(() => {
        if (loginState.status) {
            dispatch(getUserInfo());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginState.status]);
    useEffect(() => {
        if (currentOrg.id) {
            dispatch(
                getAllTalentGroupSaga({
                    organization_id: currentOrg.id,
                }),
            );
        }
    }, [currentOrg, dispatch]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const list: FolderProps[] =
        userRole === 'client'
            ? [
                  {
                      iconType: 'all',
                      name: 'All',
                      count: fileNumber.data?.all ?? 0,
                  },

                  {
                      iconType: 'collection',
                      name: 'Starred',
                      count: fileNumber.data?.starred ?? 0,
                  },
                  {
                      iconType: 'projectRelated',
                      name: 'Project-related',
                      count: fileNumber.data?.project_related ?? 0,
                  },
                  {
                      iconType: 'notBound',
                      name: 'Not Bound',
                      count: fileNumber.data?.unbound ?? 0,
                  },
              ]
            : [
                  {
                      iconType: 'all',
                      name: 'All',
                      count: fileNumber.data?.all ?? 0,
                  },

                  {
                      iconType: 'collection',
                      name: 'Starred',
                      count: fileNumber.data?.starred ?? 0,
                  },
                  {
                      iconType: 'projectRelated',
                      name: 'Project-related',
                      count: fileNumber.data?.project_related ?? 0,
                  },
              ];
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** sign out  */
    const handSignOut = () => {
        window.localStorage.removeItem(getJwtKey());
        window.localStorage.removeItem('userInfo');
        window.location.replace(redirectToSignOutPage);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Wrapper>
            {/* <Header /> */}
            <NavigationBar
                userData={{ link: userInfo.avatar, name: userInfo.name, status: true }}
                handleSignOutClick={handSignOut}
            />
            <Sidebar>
                {isLoading ? (
                    <Skeleton title={false} paragraph={{ rows: 6 }} />
                ) : (
                    <OrgAndFolderList
                        folderList={list}
                        orgList={orgList}
                        defaultSelectOrg={currentOrg}
                        preferredOrgId={defaultOrganizationId}
                        defaultSelectFolderIndex={list.findIndex((item) => {
                            return item.name === selectedCategory;
                        })}
                        handleFolderChange={(index) => {
                            dispatch(
                                updateSelectedCategoryAction({
                                    name: list[index].name,
                                }),
                            );
                        }}
                        handleOrgChange={(index, orgDri) => {
                            orgDri;
                            dispatch(updateCurrentOrgAction({ currentOrg: orgList[index] }));
                        }}
                        handleChangeDefaultOrg={(id) => {
                            dispatch(setDefaultOrganization({ organization_id: id }));
                        }}
                    />
                )}
            </Sidebar>

            <Row className={style.grid_row}>
                <Main />
            </Row>
        </Wrapper>
    );
};
export default HomePage;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
