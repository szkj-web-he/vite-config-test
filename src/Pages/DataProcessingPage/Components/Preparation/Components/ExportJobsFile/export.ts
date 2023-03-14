import * as XLSX from 'xlsx';

export {};

self.onmessage = ({ data: { data } }) => {
    console.log(data, 'data');

    const arr: any = [];
    data.forEach((v) => {
        arr.push(
            XLSX.utils.json_to_sheet(v as [], {
                skipHeader: true,
            }),
        );
    });
    self.postMessage({
        result: arr,
    });
};
