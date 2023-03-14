/**
 * @file useScrollHook
 * @date 2021-10-22
 * @author xuejie.he
 * @lastModify xuejie.he 2021-10-22
 */

import { useEffect, useState } from 'react';

type DefaultFn = (
    res: MessageEvent<{
        type: string;
        data: unknown;
    }>,
) => void;

/**
 *
 * Monitor Warpper's scroll event
 * @param {DefaultFn} defaultFn
 * @returns {React.Dispatch<React.SetStateAction<DefaultFn>>}
 */
export const useScrollHook = (
    defaultFn: DefaultFn,
): React.Dispatch<React.SetStateAction<DefaultFn>> => {
    const [fn, setFn] = useState(() => {
        return defaultFn;
    });

    useEffect(() => {
        let timer: null | number = null;
        const handleMessage = (res: MessageEvent) => {
            timer && window.cancelAnimationFrame(timer);
            timer = window.requestAnimationFrame(() => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                fn(res);
            });
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
            timer && window.cancelAnimationFrame(timer);
        };
    }, [fn]);
    return setFn;
};
