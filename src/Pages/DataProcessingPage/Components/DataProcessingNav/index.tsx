/**
 * @file Distribution Nav
 * @date 2021-09-24
 * @author Chaman
 * @lastModify  2021-09-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon, Popover } from '@datareachable/dr_front_componentlibrary';
import { FC } from 'react';
import style from './style.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import { RootState } from '~/Store/rootReducer';
// import { TaskReportingV2 } from '@datareachable/dr_front_taskreporting';
// import { jwtStr } from '~/Api/mainDomain';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface DistributionNavProps {
    step?: number;
    isDisable?: { step: number; content: string }[];
    handleStep?: (step: number) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const DistributionNav: FC<DistributionNavProps> = ({
    step = 1,
    handleStep,
    isDisable,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { t } = useTranslation();
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const { navData, currentRole, selectedTg } = useSelector(
    //     (state: RootState) => state.preparation,
    // );
    // const { currentOrg } = useSelector((state: RootState) => state.organizationState);
    // const { userInfo } = useSelector((state: RootState) => state.userState);
    // const [taskReportShow, setTaskReportShow] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** copy url */

    // const changeRole = (role: string) => {
    //     switch (role) {
    //         case 'Task Giver':
    //             return 'task_giver';

    //         default:
    //             return role?.toLocaleLowerCase();
    //     }
    // };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.dataProcessingNavcontainer}>
            <div
                className={style.dataProcessingNavleft}
                onClick={() => {
                    navigate('/home');
                    // dispatch(
                    //     updateDataProcAllAction({
                    //         isLoading: true,
                    //         total: 0,
                    //     }),
                    // );
                }}
            >
                <Icon type="nextArrow" />
                <span>{t('Common.Back')}</span>
            </div>
            <div className={style.dataProcessingNavmiddle}>
                <Popover
                    show={!isDisable?.find((v) => v.step === 1)?.content ? false : undefined}
                    root={
                        <div
                            className={
                                isDisable?.find((v) => v.step === 1)
                                    ? style.not_enter
                                    : step === 1
                                    ? style.bar_active
                                    : undefined
                            }
                            onClick={() => {
                                if (isDisable?.find((v) => v.step === 1)) return;
                                handleStep?.(1);
                            }}
                        >
                            <span>
                                <Icon type="documentEdit" />
                            </span>

                            <p>{t('PreparationPage.Preparation')}</p>
                        </div>
                    }
                >
                    {isDisable?.find((v) => v.step === 1)?.content}
                </Popover>
                <i className={step === 2 ? style.i_active : undefined}>......</i>
                <Popover
                    show={!isDisable?.find((v) => v.step === 2)?.content ? false : undefined}
                    root={
                        <div
                            className={
                                isDisable?.find((v) => v.step === 2)
                                    ? style.not_enter
                                    : step === 2
                                    ? style.bar_active
                                    : undefined
                            }
                            onClick={() => {
                                if (isDisable?.find((v) => v.step === 2)) return;
                                handleStep?.(2);
                            }}
                        >
                            <span>
                                <Icon type="dataProcessing" />
                            </span>

                            <p>{t('PreparationPage.DataProcessing')}</p>
                        </div>
                    }
                    placement="ct"
                    className={style.notEnter_popover}
                >
                    {isDisable?.find((v) => v.step === 2)?.content}
                </Popover>
                <i className={step === 3 ? style.i_active : undefined}>......</i>
                <Popover
                    show={!isDisable?.find((v) => v.step === 3)?.content ? false : undefined}
                    root={
                        <div
                            className={
                                isDisable?.find((v) => v.step === 3)
                                    ? style.not_enter
                                    : step === 3
                                    ? style.bar_active
                                    : undefined
                            }
                            onClick={() => {
                                if (isDisable?.find((v) => v.step === 3)) return;
                                handleStep?.(3);
                            }}
                        >
                            <span>
                                <Icon type="distribution" />
                            </span>

                            <p>{t('PreparationPage.DataBrief')}</p>
                        </div>
                    }
                    placement="ct"
                    className={style.notEnter_popover}
                >
                    {isDisable?.find((v) => v.step === 3)?.content}
                </Popover>
            </div>
            <div className={style.dataProcessingNavright}>
                {/* <Icon type="assign" onClick={() => setTaskReportShow(true)} /> */}
                <Icon type="assign" />
            </div>
            {/* <TaskReportingV2
                show={taskReportShow}
                role={changeRole(currentRole) as 'writer' | 'commenter' | 'task_giver'}
                talentGroup={selectedTg}
                storageKey={jwtStr}
                delivId={navData.deliverable_id ?? ''}
                org={{ logo: currentOrg.logo, name: currentOrg.name, id: currentOrg.id }}
                user={{ id: userInfo.id, avatar: userInfo.avatar, name: userInfo.name }}
                onClose={() => {
                    setTaskReportShow(false);
                }}
            /> */}
        </div>
    );
};
export default DistributionNav;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
