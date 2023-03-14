/**
 * @file
 * @date 2021-07-21
 * @author zhoubin
 * @lastModify zhoubin 2021-08-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { NavigationBar, getJwtKey, useLoginStatus } from '@datareachable/dr_front_componentlibrary';
import { redirectToSignOutPage } from '~/Api/redirectDomain';
import { useSelector } from 'react-redux';
import { RootState } from '~/Store/rootReducer';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const DashboardHeader = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /** user info */
    const userInfo = useSelector((state: RootState) => state.userState.userInfo);
    /** login state */
    const loginState = useLoginStatus().status;
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handSignOut = () => {
        window.localStorage.removeItem(getJwtKey());
        window.localStorage.removeItem('userInfo');
        window.location.replace(redirectToSignOutPage);
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <NavigationBar
            userData={{
                link: userInfo.avatar,
                name: userInfo.name,
                status: loginState,
            }}
            handleSignOutClick={handSignOut}
        />
    );
};
export default DashboardHeader;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
