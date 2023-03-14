/**
 * @file
 * @date 2022-07-08
 * @author zhoubin
 * @lastModify zhoubin 2022-07-08
 */

/**
 *
 * @param classNames classnames
 * @returns class
 */
const getClassNames = (classNames: { [key: string]: boolean }) => {
    const cls: Array<string> = [];
    Object.keys(classNames).map((item) => {
        if (classNames[item]) {
            cls.push(item);
        }
    });
    return cls.join(' ');
};

export default getClassNames;
