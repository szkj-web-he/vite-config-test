/**
 * @file weight keyword
 * @date 2021-11-30
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2021-11-30
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const keywordWeight = (str: string, weightFont: string) => {
    const newStr = str.replaceAll(weightFont, '<b class="weight">' + weightFont + "</b>");
    return { __html: newStr };
};
