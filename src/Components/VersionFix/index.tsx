/**
 * @file
 * @date 2021-12-09
 * @author zhoubin
 * @lastModify zhoubin 2021-12-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface VersionFixProps {
    version: Array<number | string>;
    className?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const VersionFix: React.FC<VersionFixProps> = ({ version, className }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const container = useRef<HTMLDivElement | null>(null);
    // const [node, setNode] = useState<HTMLDivElement | null>();
    const [keys, setKeys] = useState<Array<number | string>>([]);
    // console.log(node);
    const [elementReady, setElementReady] = useState(false);
    /** container width */
    const [containerWidth, setContainerWidth] = useState<number>();
    useEffect(() => {
        handleContainerWidth();
        window.addEventListener('resize', handleContainerWidth);
        return () => {
            window.removeEventListener('resize', handleContainerWidth);
        };
    });

    useEffect(() => {
        const node = container.current;
        if (node && elementReady) {
            handleKeyword(node);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerWidth, elementReady]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** get keyword */
    const handleKeyword = (node: HTMLDivElement) => {
        let count = 0;
        let w = 0;
        if (node && containerWidth) {
            const omit = node.querySelector('.version_omit');
            const marginWidth = 13;
            const keySpan = node.querySelectorAll('span[class*=version_none]');
            for (let i = 0; i < keySpan.length; i++) {
                w += marginWidth;
                w += (keySpan[i] as HTMLDivElement).offsetWidth;
                if (omit && w < containerWidth - omit.clientWidth) {
                    count++;
                }
            }
        }
        const contentText = [...version].slice(0, count);
        setKeys(contentText);
    };
    const getVersion = (isNone: boolean) => {
        if (!isNone) {
            return version?.map((item, index) => (
                <span
                    key={item}
                    className={style.version_none}
                    ref={() => {
                        if (index === version?.length - 1) {
                            setElementReady(true);
                        } else {
                            setElementReady(false);
                        }
                    }}
                >
                    V{item}
                </span>
            ));
        } else {
            return keys?.map((item) => (
                <span key={item} className={style.version_key}>
                    V{item}
                </span>
            ));
        }
    };
    /** handle container width */
    const handleContainerWidth = () => {
        const node = container.current;
        if (node) {
            setContainerWidth(node.offsetWidth);
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={[style.version_list, className].join(' ')} ref={container}>
            {keys?.length === 0 && version?.length !== 0 && getVersion(false)}
            {getVersion(true)}
            {keys?.length < version?.length && <span className={style.version_omit}>...</span>}
        </div>
    );
};
export default VersionFix;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
