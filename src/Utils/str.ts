/**
 * @file
 * @date 2021-12-14
 * @author zhoubin
 * @lastModify zhoubin 2021-12-14
 */

type labeSetTypes = Array<{ id: number; content: string }>;
/**
 * 复制文本
 * @param {String} text
 */
const copyText = (text: string): Promise<void> => {
    try {
        return navigator.clipboard
            .writeText(text)
            .then(() => {
                return Promise.resolve();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    } catch (e) {
        const input = document.createElement("input");
        document.body.appendChild(input);
        input.value = text;
        input.focus();
        input.select();
        try {
            const result = document.execCommand("copy");
            document.body.removeChild(input);
            if (!result) {
                return Promise.reject("复制失败");
            } else {
                return Promise.resolve();
            }
        } catch (e) {
            document.body.removeChild(input);
            return Promise.reject("当前浏览器不支持复制功能，请检查更新或更换其他浏览器操作");
        }
    }
};
/**
 * get label set
 * @param labels Array<string>
 * @returns labeSetTypes
 */
const getLabelSet = (labels: Array<string>): labeSetTypes => {
    const labelSet: labeSetTypes = [];
    for (let i = 0; i < labels.length; i++) {
        labelSet.push({ id: i, content: labels[i] });
    }
    return labelSet;
};
export { copyText, getLabelSet };
