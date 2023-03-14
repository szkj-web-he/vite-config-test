/**
 * @file
 * @date 2021-12-09
 * @author zhoubin
 * @lastModify zhoubin 2021-12-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface KeyWordsFixProps {
    keywords: Array<string>;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const KeyWordsFix: React.FC<KeyWordsFixProps> = ({ keywords }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const container = useRef<HTMLDivElement | null>(null);
    const [keys, setKeys] = useState<Array<string>>([]);
    const [elementReady, setElementReady] = useState(false);
    const [bodyWith, setBodyWidth] = useState(0);
    useEffect(() => {
        window.addEventListener('resize', handleBodyWidth);
        return () => {
            window.removeEventListener('resize', handleBodyWidth);
        };
    }, []);
    useEffect(() => {
        const node = container.current;
        if (node && elementReady) {
            const keySpan = node.querySelectorAll('span');
            const marginWidth = 8;
            let count = 0;
            let w = 0;
            for (let i = 0; i < keySpan?.length; i++) {
                w += marginWidth;
                w += (keySpan[i] as HTMLDivElement).offsetWidth;
                if (w < node.offsetWidth) {
                    count++;
                }
            }
            const contentText = [...(keywords || [])].slice(0, count);
            setKeys(contentText);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementReady, keywords, bodyWith]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** body width */
    const handleBodyWidth = () => {
        const width = document.body.offsetWidth;
        setBodyWidth(width);
    };
    const getKeyWords = useCallback(
        (isNone: boolean) => {
            if (!isNone) {
                return (
                    keywords &&
                    keywords.map((keyword, index) => (
                        <span
                            key={keyword}
                            className={style.keywords_none}
                            ref={() => {
                                if (index === keywords?.length - 1) {
                                    setElementReady(true);
                                } else {
                                    setElementReady(false);
                                }
                            }}
                        >
                            {keyword}
                        </span>
                    ))
                );
            } else {
                return (
                    keys &&
                    keys.map((keyword) => (
                        <span key={keyword} className={style.keywords_key}>
                            {keyword}
                        </span>
                    ))
                );
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [keys, keywords],
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.keywords_list} ref={container}>
            {keys?.length === 0 && keywords?.length !== 0 && getKeyWords(false)}
            {getKeyWords(true)}
            {keys?.length !== 0 && keys?.length < keywords?.length && (
                <span className={style.keywords_omit}>...</span>
            )}
        </div>
    );
};
export default KeyWordsFix;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
