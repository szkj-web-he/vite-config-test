/**
 * @file
 * @date 2021-10-29
 * @author zhoubin
 * @lastModify zhoubin 2021-10-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { ReactNode } from 'react';
import style from './style.scss';
import SkeletonAvatar, { SkeletonAvatarProps } from './Components/SkeletonAvatar';
import SkeletonInput, { SkeletonInputProps } from './Components/SkeletonInput';
import SkeletonButton, { SkeletonButtonProps } from './Components/SkeletonButton';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface SkeletonParagraphProps {
    /** Set the row count of paragraph */
    rows?: number;
    /** Set the width of paragraph.*/
    width?: string;
    height?: string;
}
export interface SkeletonProps {
    /** Show animation effect */
    active?: boolean;
    /** Display the skeleton when true */
    loading?: boolean;
    /** Show paragraph placeholder */
    paragraph?: boolean | SkeletonParagraphProps;
    /** Show title placeholder */
    title?: boolean;
    /** style */
    style?: React.CSSProperties;
    row?: number;
    children?: ReactNode;
}

interface E extends React.FC<SkeletonProps> {
    Avatar: React.FC<SkeletonAvatarProps>;
    Input: React.FC<SkeletonInputProps>;
    Button: React.FC<SkeletonButtonProps>;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Skeleton: E = ({
    loading = true,
    paragraph = true,
    title = false,
    children,
    row,
    ...props
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const getParagraph = () => {
        let rows = row || 3;
        let width = '100%';
        let height = '3.6rem';
        if (typeof paragraph === 'boolean' && !paragraph) {
            rows = 0;
        }

        if (typeof paragraph === 'object') {
            rows = paragraph.rows ?? 3;
            width = paragraph.width ?? width;
            height = paragraph.height ?? height;
        }
        const rowList = [...Array(rows)].map((_, index) => {
            return <li key={index} style={{ width, height }}></li>;
        });
        return <ul className={style.skeleton_paragraph}>{rowList}</ul>;
    };
    if (!loading) {
        return <>{children}</>;
    }
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.skeleton_container} style={props.style}>
            {title && <h3 className={style.skeleton_title} style={{ width: '38%' }}></h3>}
            {getParagraph()}
        </div>
    );
};
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Button = SkeletonButton;
export default Skeleton;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
