/**
 * @file sort file of QuestionnaireTable components
 * @date 2021-09-29
 * @author lidaoping
 * @lastModify lidaoping 2021-09-29
 */

const fieldSpecificSort = <T>(orderArray: string[], array: T[], key: keyof T): unknown[] => {
    // 快速创建二维数组时，不能删除 fill(0)
    const dyadicArray: unknown[][] = new Array(orderArray.length).fill(0).map(() => []);
    const add = <T>(flag: string, value: T, currentIndex: number, key: keyof T) => {
        if (flag === String(value[key])) {
            dyadicArray[currentIndex].push(value);
        }
    };
    array.forEach((value) => {
        orderArray.forEach((flag, index) => {
            add(flag, value, index, key);
        });
    });
    return dyadicArray.flat(Infinity);
};

const charCompare = (prevChar: string, nextChar: string, index: number) => {
    const prevCharCode = prevChar.codePointAt(index) || 0;
    const nextCharCode = nextChar.codePointAt(index) || 0;
    return prevCharCode - nextCharCode;
};

const alphabeticalOrder = (prev: string, next: string): number => {
    let prevTemp = prev;
    let nextTemp = next;
    let prevNumber: number;
    let nextNumber: number;
    const longestString = prev.length - next.length > 0 ? prev : next;
    let diff = 0;
    for (let i = 0; i < longestString.length; i++) {
        if (diff === 0) {
            prevNumber = parseFloat(prevTemp);
            nextNumber = parseFloat(nextTemp);
            if (!isNaN(prevNumber) && !isNaN(nextNumber)) {
                return prevNumber - nextNumber;
            } else if (!isNaN(prevNumber)) {
                return prevNumber;
            } else if (!isNaN(nextNumber)) {
                return -nextNumber;
            } else {
                diff = charCompare(prevTemp, nextTemp, 0);
            }
            prevTemp = prevTemp.substring(1, prevTemp.length);
            nextTemp = nextTemp.substring(1, nextTemp.length);
        } else {
            break;
        }
    }
    return diff;
};

const alphabeticalCompare = <T>(a: T, b: T, key: keyof T): number => {
    return alphabeticalOrder(String(a[key]), String(b[key]));
};

export { fieldSpecificSort, alphabeticalCompare };
