/**
 * @file
 * @date 2021-04-16
 * @author zhoubin
 * @lastModify  2021-04-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from 'react';
import style from './style.scss';
import { Icon } from '@datareachable/dr_front_componentlibrary';
import { useDispatch, useSelector } from 'react-redux';
import * as HomePageAction from '~/Store/HomePage/actions';
import { RootState } from '~/Store/rootReducer';
import * as types from '~/Store/HomePage/types';
import { dataFormat } from '~/Utils/data';
import KeyWordsFix from '~/Components/KeyWordsFix';
import { useTranslation } from 'react-i18next';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface GridViewProps {
    survey: types.DataProcessingListType;
    dataProcessingShow: boolean;
    handleClickedEdit: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const GridView: React.FC<GridViewProps> = ({
    survey,
    dataProcessingShow,
    handleClickedEdit,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { selectedCategory, getOpenedDataProcessing } = useSelector(
        (state: RootState) => state.homePage,
    );
    const { currentTalentGroupId } = useSelector((state: RootState) => state.organizationState);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    /**
     * sets whether to edit the title
     */
    // const [rename, setRename] = useState(false);
    /**
     * sets current projectName
     */
    // const [projectName, setProjectName] = useState(survey.name);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * This function is used to rename projectName
     */
    // const handleProjectRename = function () {
    //     setRename(false);
    //     if (!projectName) {
    //         setProjectName(survey.name);
    //     }
    //     notice.success({
    //         title: "Rename success",
    //         description: "You have successfully renamed .",
    //     });
    // };
    const handleUpdateStared = (status) => {
        if (currentTalentGroupId !== '') {
            dispatch(
                HomePageAction.updateStarredSaga({
                    talent_group_id: currentTalentGroupId,
                    data_proc_id: survey.id,
                    star: status,
                }),
            );
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={`${style.gridView_container} ${
                survey.id === getOpenedDataProcessing.currDataProcessing?.id && dataProcessingShow
                    ? style.gridView_container_active
                    : ''
            }`}
            onClick={(e) => {
                e.stopPropagation();
                handleClickedEdit();
            }}
        >
            <div className={style.gridView_left}>
                {selectedCategory !== 'Not Bound' && survey.project?.id && (
                    <span>
                        {survey.starred ? (
                            <Icon
                                type="collected"
                                className={style.gridView_collection}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStared(false);
                                }}
                            />
                        ) : (
                            <Icon
                                type="collection"
                                className={style.gridView_unCollection}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStared(true);
                                }}
                            />
                        )}
                    </span>
                )}
            </div>
            <div className={style.gridView_right}>
                <div className={style.gridView_rightSectionOne}>
                    {/* {rename ? (
                        <div className={style.gridView_rename}>
                            <input
                                className={style.gridView_renameInput}
                                autoFocus
                                value={projectName}
                                onChange={(e) => {
                                    if (e.target.value.length <= 70) {
                                        setProjectName(e.target.value);
                                    }
                                }}
                                // onBlur={handleProjectRename}
                                onClick={(e) => e.stopPropagation()}
                                // onKeyDown={(e) => {
                                //     if (e.key === "Escape" || e.key === "Enter") {
                                //         handleProjectRename();
                                //     }
                                // }}
                            />
                            {projectName ? (
                                <Icon
                                    className={style.gridView_renameInputIcon}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setProjectName("");
                                    }}
                                    type="error"
                                    color="#bdbdbd"
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    ) : ( */}
                    {/* <span>{projectName}</span> */}
                    <span>{survey.name}</span>
                    {/* )} */}
                </div>
                <div className={style.gridView_rightSectionTwo}>
                    <KeyWordsFix keywords={survey.keywords} />
                </div>
                <div className={style.gridView_rightSectionThree}>
                    <span>
                        {t('HomePage.Main.DistributionItem.Created')} :{' '}
                        {/* {dateFormat2(survey.created_at)} */}
                        {dataFormat(survey.created_at, 'MM/DD/YYYY', '/')}
                    </span>
                    <span></span>
                    <span>
                        {t('HomePage.Main.DistributionItem.Creator')}: {survey.creator.name}
                    </span>
                </div>
            </div>
            {!survey.project?.id && (
                <span
                    className={style.notBound_tag}
                    style={i18n.language === 'en' ? { width: '7.3rem' } : {}}
                >
                    <span>{t('HomePage.Main.DistributionItem.NotBound')}</span>
                </span>
            )}
        </div>
    );
};
export default GridView;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
