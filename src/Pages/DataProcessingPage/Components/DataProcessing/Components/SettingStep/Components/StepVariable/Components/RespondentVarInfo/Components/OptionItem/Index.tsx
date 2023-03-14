/**
 * @file OptionItem
 * @date 2022-11-24
 * @author liaoli
 * @lastModify liaoli 2022-11-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from '@datareachable/dr_front_componentlibrary/Components/Icon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { CSSProperties } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OptionItemProps {
    item: {
        code: string;
        text: string;
    };
    index: number;
    handleBlur?: () => void;
    handleChange?: (v: string, index: number) => void;
    handleAdd?: (index: number) => void;
    handleDel?: (index: number) => void;
}
const OptionItem: React.FC<OptionItemProps> = ({
    item,
    index,
    handleBlur,
    handleChange,
    handleDel,
    handleAdd,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.code,
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
        <div className={style.respondentVarInfo_option} ref={setNodeRef} style={styles}>
            <div className={style.respondentVarInfo_optionSet}>
                <Icon type="addition01" onClick={() => handleAdd && handleAdd(index)} />
                <div {...attributes} {...listeners}>
                    <Icon type="Draggable" />
                </div>
                <Icon type="Minus" onClick={() => handleDel && handleDel(index)} />
            </div>
            <div className={style.respondentVarInfo_index}>{index + 1}</div>
            <input
                type="text"
                className={style.respondentVarInfo_content}
                onBlur={handleBlur}
                onChange={(e) => handleChange && handleChange(e.target.value, index)}
                value={item.text}
            />
        </div>
    );
};
export default OptionItem;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
