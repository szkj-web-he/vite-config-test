/**
 * @file
 * @date 2021-09-28
 * @author zhoubin
 * @lastModify zhoubin 2021-09-28
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Avatar,
    Icon,
    QuestionIcon,
    ScrollComponent,
} from '@datareachable/dr_front_componentlibrary';
import { useState } from 'react';
import style from './style.scss';
import { RootState } from '~/Store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectAction } from '~/Store/ProjectState/actions';
import { useTranslation } from 'react-i18next';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ProjectList = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * project list
     */
    const projects = useSelector((state: RootState) => state.projectState.projects);
    /**
     * current project
     */
    const currentProject = useSelector((state: RootState) => state.projectState.project);
    /**
     * is follow
     */
    const [projectListShow, setProjectListShow] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div>
            <div className={style.projectList_projects}>
                <div className={style.projectList_selectProject}>
                    <div>
                        <div
                            tabIndex={-1}
                            className={style.projectList_selectProjectInfo}
                            onClick={() => {
                                setProjectListShow(!projectListShow);
                            }}
                            onBlur={() => {
                                setProjectListShow(false);
                            }}
                        >
                            <div
                                style={{
                                    transform: `rotate(${projectListShow ? '180' : '0'}deg)`,
                                }}
                            >
                                <Icon type="dropdown" />
                            </div>
                            <span>{currentProject?.project.name}</span>
                        </div>
                        <QuestionIcon
                            content={t('HomePage.Main.DistributionItem.SelectProject')}
                            position="right"
                            width="21.6rem"
                        />
                    </div>
                    <div className={style.projectList_selectProjectOrganization}>
                        <Avatar content={currentProject?.organization.name} type="org" size="20" />
                        <span>{currentProject?.organization.name}</span>
                    </div>
                </div>
                <div
                    className={style.projectList_selectProjectList}
                    style={{ display: projectListShow ? 'block' : 'none' }}
                >
                    <ScrollComponent defaultScrollTop={0} width="44.8rem">
                        {projects.map((item) => (
                            <li
                                key={item.project.id}
                                className={style.projectList_selectProjectItem}
                                onMouseDown={() => {
                                    setProjectListShow(false);
                                    dispatch(updateProjectAction({ ...item }));
                                }}
                            >
                                <span
                                    className={
                                        currentProject?.project.id === item?.project.id
                                            ? style.projectList_selectProjectItem__active
                                            : ''
                                    }
                                >
                                    {item.project.name}
                                </span>
                                <div>
                                    <Avatar content={item.organization.name} type="org" size="20" />
                                    <span>{item.organization.name}</span>
                                </div>
                            </li>
                        ))}
                    </ScrollComponent>
                </div>
            </div>
        </div>
    );
};
export default ProjectList;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
