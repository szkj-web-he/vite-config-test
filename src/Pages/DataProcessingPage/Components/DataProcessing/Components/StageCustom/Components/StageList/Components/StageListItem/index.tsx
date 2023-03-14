/**
 * @file StageListItem
 * @date 2022-11-11
 * @author liaoli
 * @lastModify liaoli 2022-11-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import type { CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@datareachable/dr_front_componentlibrary/Components/Icon';
import style from './style.scss';
import { StageType } from '~/Store/JobStage/types';
import { updateCurrentStepAction } from '~/Store/JobStage/actions';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface StageListItemProps {
    stageTest: boolean;
    isParams: boolean;
    item: {
        id: string;
        name: string;
        script?:
            | {
                  name: string;
                  args: string[];
              }
            | undefined;
    };
    type: string;
    stage?: StageType;
    isSetScript: boolean;
    isShowDrop?: boolean;
    index: number;
}
const StageListItem: React.FC<StageListItemProps> = ({
    item,
    stage,
    type,
    isSetScript,
    stageTest,
    isParams,
    isShowDrop,
    index,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();

    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    });

    const styles: CSSProperties = {
        opacity: isDragging ? 0.4 : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
    };

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div ref={setNodeRef} className={style.stageList_content__item} style={styles}>
            <div>
                <div {...attributes} {...listeners}>
                    <Icon type="move" style={isShowDrop ? { opacity: 0, cursor: 'auto' } : {}} />
                </div>
                <i>{index}</i>
                <p>{item.name}</p>
                <span className={isSetScript ? style.stageItem_setScript : ''}>
                    {isSetScript ? '已设脚本' : '未设脚本'}
                </span>
                {stageTest &&
                    (isParams ? (
                        <Icon type="success" className={style.stageList_success} />
                    ) : (
                        <Icon type="Wrong" className={style.stageList_error} />
                    ))}
            </div>
            <div
                onClick={() => {
                    if (item.id && stage?.id) {
                        dispatch(
                            updateCurrentStepAction({
                                stageId: stage.id,
                                stepId: item.id,
                                type,
                            }),
                        );
                    }
                }}
            >
                <Icon type="enter" />
                <p>设置步骤 </p>
            </div>
        </div>
    );
};
export default StageListItem;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
