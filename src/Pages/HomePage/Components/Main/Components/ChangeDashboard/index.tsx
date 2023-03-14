/**
 * @file
 * @date 2021-12-14
 * @author zhoubin
 * @lastModify zhoubin 2021-12-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import style from './style.scss';
import {
    redirectToProjectManager,
    redirectToPlugInEditor,
    redirectToSurveyDistribution,
    redirectToSurveyAnalysisReport,
    redirectToQeditorDashBoard,
} from '~/Api/redirectDomain';
import { DropDownListV2 } from '@datareachable/dr_front_componentlibrary';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface ChangeDashboardProps {
    options: { id: string; content: string }[];
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ChangeDashboard: React.FC<ChangeDashboardProps> = ({ options }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** switch dashboard */
    const handSwitchDashboard = (id) => {
        let path = '';
        if (id !== '4') {
            switch (id) {
                case '1':
                    path = redirectToProjectManager;
                    break;
                case '2':
                    path = redirectToQeditorDashBoard;
                    break;
                case '3':
                    path = redirectToSurveyDistribution;
                    break;
                case '4':
                    path = redirectToSurveyAnalysisReport;
                    break;
                case '5':
                    path = redirectToPlugInEditor;
            }

            window.location.assign(path);
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div>
            <DropDownListV2
                className={style.main_distributions}
                height="3.6rem"
                defaultValue="4"
                labels={options}
                floatingClassName={style.dropDown_list}
                handleValueChange={(id: number | string) => handSwitchDashboard(id)}
            />
        </div>
    );
};
export default ChangeDashboard;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
