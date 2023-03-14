/* eslint-disable @typescript-eslint/no-unsafe-argument */
/**
 * @file ExportJobsFile
 * @date 2022-08-26
 * @author liaoli
 * @lastModify liaoli 2022-08-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Button, Tabs, RadioGroup, Radio } from '@datareachable/dr_front_componentlibrary';
import * as XLSX from 'xlsx';
import jsZip from 'jszip';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/Store/JobList/actions';
import { JobListType, JobQuestionExportType } from '~/Store/JobList/types';
import { RootState } from '~/Store/rootReducer';
import style from './style.scss';
import { CSVToArray } from '~/Utils/csvToArray';
import Message from '@datareachable/dr_front_componentlibrary/Components/Feedback/Message';
import ExportMessage from './Components/ExportMessage';
import { v4 as uuidv4 } from 'uuid';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const worker = new Worker(new URL('./export.ts', import.meta.url));

interface ExportJobsFileProps {
    job?: JobListType;
    show: boolean;
    handleClose?: () => void;
}
const ExportJobsFile: React.FC<ExportJobsFileProps> = ({ show, handleClose, job }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const dispatch = useDispatch();
    const tgId = useSelector((state: RootState) => state.preparation.navData.talent_group.id);

    // const worker = new Worker(new URL('./export.ts', import.meta.url));

    const [currentFileType, setCurrentFileType] = useState<'csv' | 'excel'>('csv');

    const [selectType, setSelectType] = useState<'number' | 'text'>('number');

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */

    const getSpanInner = (str: string) => {
        const res = str.match(/<span[^>]*>([\s\S]*?)<\/span>/);
        // return res ? res[1] : '选项1';
        return res ? res[1] : str ? str : '选项1';
    };

    const questionToCsv = (question: JobQuestionExportType[]) => {
        const arr: string[][] = [
            ['标签', '值', '编码'],
            ['答题状态', '逻辑跳过或其他情况下未显示', '0'],
            ['', '已回答', '1'],
            ['', '显示但未回答', '2'],
        ];
        question.forEach((v) => {
            arr.push([], [], [v.qid]);
            v.q_dimension[0].forEach((item, index) => {
                arr.push([
                    index === 0 ? getSpanInner(v.q_text) : '',
                    getSpanInner(item.option_text),
                    item.option_code,
                ]);
            });
        });
        return arr;
    };

    const resultToCsv = (
        question: JobQuestionExportType[],
        answer: string,
        type: 'number' | 'text',
    ) => {
        const obj = {};
        question.map((v) => {
            const isTwoD = v.q_dimension.length === 2;
            switch (v.q_type) {
                case 'Single':
                    if (isTwoD) {
                        const option: { [code: string]: string } = {};
                        v.q_dimension[1].forEach((item) => {
                            option[item.option_code] = getSpanInner(item.option_text);
                        });
                        obj[v.qid] = {
                            code: v.qid,
                            status: '答题状态',
                        };
                        v.q_dimension[0].map((item) => {
                            obj[`${v.qid}#${item.option_code}`] = {
                                code: `${v.qid}_${item.option_code}`,
                                name: `${getSpanInner(v.q_text)} - ${getSpanInner(
                                    item.option_text,
                                )}`,
                                option: (v: string) => {
                                    return option[v] || '';
                                },
                            };
                        });
                    } else {
                        const option: { [code: string]: string } = {};
                        v.q_dimension[0].forEach((item) => {
                            option[item.option_code] = getSpanInner(item.option_text);
                        });
                        obj[v.qid] = {
                            name: getSpanInner(v.q_text),
                            code: v.qid,
                            status: '答题状态',
                            option: (v: string) => {
                                return option[v] || '';
                            },
                        };
                    }
                    break;
                case 'Multi':
                    obj[v.qid] = {
                        code: v.qid,
                        status: '答题状态',
                    };
                    if (isTwoD) {
                        v.q_dimension[0].map((item) => {
                            const option = {};
                            v.q_dimension[1].forEach((items) => {
                                option[item.option_code] = getSpanInner(item.option_text);
                                obj[`${v.qid}#${item.option_code}_${items.option_code}`] = {
                                    code: `${v.qid}_${item.option_code}_${items.option_code}`,
                                    name: `${getSpanInner(v.q_text)} - ${getSpanInner(
                                        item.option_text,
                                    )} - ${getSpanInner(items.option_text)}`,
                                    option: (v: string) => {
                                        return v === '1' ? getSpanInner(items.option_text) : '';
                                    },
                                };
                            });
                        });
                    } else {
                        v.q_dimension[0].forEach((item) => {
                            obj[`${v.qid}#${item.option_code}`] = {
                                code: `${v.qid}_${item.option_code}`,
                                name: `${getSpanInner(v.q_text)} - ${getSpanInner(
                                    item.option_text,
                                )}`,
                                option: (v: string) => {
                                    return v === '1' ? getSpanInner(item.option_text) : '';
                                },
                            };
                        });
                    }
                    break;
                case 'OpenEnd':
                    obj[v.qid] = {
                        code: v.qid,
                        name: getSpanInner(v.q_text),
                        status: '答题状态',
                    };
                    if (isTwoD) {
                        v.q_dimension[0].map((item) => {
                            const option = {};
                            v.q_dimension[1].forEach((items) => {
                                option[item.option_code] = getSpanInner(item.option_text);
                                obj[`${v.qid}#${item.option_code}_${items.option_code}`] = {
                                    code: `${v.qid}_${item.option_code}_${items.option_code}`,
                                    name: `${getSpanInner(v.q_text)} - ${getSpanInner(
                                        item.option_text,
                                    )} - ${getSpanInner(items.option_text)}`,
                                    status: '答题状态',

                                    option: (v: string) => {
                                        return v;
                                    },
                                };
                            });
                        });
                    } else {
                        v.q_dimension[0].forEach((item) => {
                            obj[`${v.qid}#${item.option_code}`] = {
                                code: `${v.qid}_${item.option_code}`,
                                name: `${getSpanInner(v.q_text)} - ${getSpanInner(
                                    item.option_text,
                                )}`,
                                status: '答题状态',
                                option: (v: string) => {
                                    return v;
                                },
                            };
                        });
                    }
                    break;
                case 'Numeric':
                    obj[v.qid] = {
                        code: v.qid,
                        name: getSpanInner(v.q_text),
                        status: '答题状态',
                    };
                    if (isTwoD) {
                        v.q_dimension[0].map((item) => {
                            const option = {};
                            v.q_dimension[1].forEach((items) => {
                                option[item.option_code] = getSpanInner(item.option_text);
                                obj[`${v.qid}#${item.option_code}_${items.option_code}`] = {
                                    code: `${v.qid}_${item.option_code}_${items.option_code}`,
                                    name: `${getSpanInner(v.q_text)} - ${getSpanInner(
                                        item.option_text,
                                    )} - ${getSpanInner(items.option_text)}`,
                                    status: '答题状态',
                                    option: (v: string) => {
                                        return v;
                                    },
                                };
                            });
                        });
                    } else {
                        v.q_dimension[0].forEach((item) => {
                            obj[`${v.qid}#${item.option_code}`] = {
                                code: `${v.qid}_${item.option_code}`,
                                name: `${getSpanInner(v.q_text)} - ${getSpanInner(
                                    item.option_text,
                                )}`,
                                status: '答题状态',
                                option: (v: string) => {
                                    return v;
                                },
                            };
                        });
                    }
                    break;
                default:
                    break;
            }
        });
        const arr = CSVToArray(answer);
        arr.unshift([...arr[0]]);

        if (type === 'number') {
            arr[1].forEach((v, i) => {
                if (v && i >= 3) {
                    if (v.includes('question_status.')) {
                        arr[1][i] = '答题状态';
                        arr[0][i] = obj[v.split('question_status.')[1]].code as string;
                    } else {
                        arr[1][i] = obj[v].name as string;
                        arr[0][i] = obj[v].code as string;
                    }
                }
            });

            return arr;
        } else {
            const arr1 = arr[1].map((col, i) => arr.map((row) => row[i]));

            for (let i = 3; i < arr1.length; i++) {
                if (arr1[i]) {
                    arr1[i] = arr1[i].map((v, index) => {
                        if (arr1[i][0].includes('question_status.')) {
                            if (index === 0) {
                                return (obj[v.split('question_status.')[1]]?.code || v) as string;
                            } else if (index === 1) {
                                return (obj[v.split('question_status.')[1]]?.status || v) as string;
                            } else {
                                return v === '1'
                                    ? '已回答'
                                    : v === '2'
                                    ? '未回答'
                                    : v === '0'
                                    ? '已跳过'
                                    : v;
                            }
                        } else {
                            if (index === 0) {
                                return (obj[v]?.code || v) as string;
                            } else if (index === 1) {
                                return (obj[v]?.name || v) as string;
                            } else {
                                return obj[arr1[i][0]]?.option(v) as string;
                            }
                        }
                    });
                }
            }

            const arr2 = arr1[1].map((col, i) => arr1.map((row) => row[i]));
            return arr2;
        }
    };

    const exportJob = () => {
        const id = uuidv4();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const originalSetItem = window.sessionStorage.setItem;
        sessionStorage.setItem = function (key, newValue) {
            const setItemEvent = new Event('setItemEvent');
            setItemEvent[key] = newValue;
            window.dispatchEvent(setItemEvent);
            originalSetItem.apply(this, [key, newValue]);
        };
        const dataProcExport = JSON.parse(sessionStorage.getItem('data_proc_export') || '{}');

        sessionStorage.setItem(
            'data_proc_export',
            JSON.stringify({ ...dataProcExport, [id]: '1' }),
        );
        handleClose && handleClose();
        if (job && tgId) {
            void Promise.all([
                new Promise((resolve: (res: string) => void) => {
                    dispatch(
                        actions.exportJobSaga({
                            job_id: job.id,
                            talent_group_id: tgId,
                            callback(res) {
                                resolve(res);
                            },
                        }),
                    );
                }),
                new Promise((resolve: (res: JobQuestionExportType[]) => void) => {
                    dispatch(
                        actions.getJobQuestionSaga({
                            job_id: job.id,
                            talent_group_id: tgId,
                            isExport: true,
                            callback(res) {
                                resolve(res as unknown as JobQuestionExportType[]);
                            },
                        }),
                    );
                }),
            ]).then((res) => {
                Message.right({
                    content: <ExportMessage id={id} />,
                    persist: true,
                    type: 'none',
                });
                const question = questionToCsv(res[1]);
                const answer = resultToCsv(res[1], res[0], selectType);

                if (currentFileType === 'csv') {
                    if (selectType === 'number') {
                        const zip = new jsZip();
                        zip.file(
                            `${job.name}_answer.csv`,
                            '\uFEFF' +
                                answer
                                    .map((v) =>
                                        v
                                            .map((x) => (x ? `"${x.replace(/"/g, '""')}"` : x))
                                            .join(','),
                                    )
                                    .join('\n'),
                        );
                        zip.file(
                            `${job.name}_questionnaire.csv`,
                            '\uFEFF' +
                                question
                                    .map((v) =>
                                        v
                                            .map((x) => (x ? `"${x.replace(/"/g, '""')}"` : x))
                                            .join(','),
                                    )
                                    .join('\n'),
                        );
                        const a = document.createElementNS(
                            'http://www.w3.org/1999/xhtml',
                            'a',
                        ) as HTMLAnchorElement;
                        a.rel = 'noopener';
                        void zip.generateAsync({ type: 'blob' }).then((content) => {
                            const url = URL.createObjectURL(content);
                            // location.href = url;
                            a.href = url;
                            a.download = job.name;
                            setTimeout(() => {
                                URL.revokeObjectURL(url);
                            }, 4e4); // 40s
                            setTimeout(() => {
                                a.click();
                            }, 0);
                        });
                    } else {
                        const blob = new Blob(
                            [
                                '\uFEFF' +
                                    answer
                                        .map((v) =>
                                            v
                                                .map((x) => (x ? `"${x.replace(/"/g, '""')}"` : x))
                                                .join(','),
                                        )
                                        .join('\n'),
                            ],
                            { type: 'text/csv;charset=utf-8;' },
                        );
                        const a = document.createElementNS(
                            'http://www.w3.org/1999/xhtml',
                            'a',
                        ) as HTMLAnchorElement;

                        const href = URL.createObjectURL(blob);
                        a.href = href;
                        a.download = job.name;
                        setTimeout(() => {
                            URL.revokeObjectURL(href);
                        }, 4e4); // 40s
                        setTimeout(() => {
                            a.click();
                        }, 0);
                    }
                } else {
                    if (selectType === 'number') {
                        worker.postMessage({
                            data: [question, answer],
                        });
                        worker.onmessage = ({ data: { result } }) => {
                            console.log(result);
                            const book = XLSX.utils.book_new();

                            result.forEach((v) => {
                                XLSX.utils.book_append_sheet(book, v);
                            });

                            XLSX.writeFile(book, `${job.name}.xlsx`, {
                                bookType: 'xlsx',
                            });
                        };
                    } else {
                        worker.postMessage({
                            data: [answer],
                        });
                        worker.onmessage = ({ data: { result } }) => {
                            const book = XLSX.utils.book_new();

                            result.forEach((v) => {
                                XLSX.utils.book_append_sheet(book, v);
                            });

                            XLSX.writeFile(book, `${job.name}.xlsx`, {
                                bookType: 'xlsx',
                            });
                        };
                    }
                }
                const dataProcExport = JSON.parse(
                    sessionStorage.getItem('data_proc_export') || '{}',
                );
                sessionStorage.setItem(
                    'data_proc_export',
                    JSON.stringify({ ...dataProcExport, [id]: '2' }),
                );
                // sessionStorage.setItem('data_proc_export', '2');
            });
        }
    };

    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={show}
            custom={true}
            width="60rem"
            height="45.4rem"
            className={style.archiveJob_alert}
            changeStatus={handleClose}
        >
            <div className={style.exportFile_box}>
                <h2>导出工作</h2>
                <p className={style.exportFile_tips}>可选中一种格式来导出工作相关数据</p>
                <Tabs
                    defaultActiveKey={currentFileType}
                    onChange={(v) => {
                        setCurrentFileType(v as 'csv' | 'excel');
                    }}
                    items={[
                        {
                            children: (
                                <div className={style.exportFile_type}>
                                    <h2>CSV格式</h2>
                                    <p>这是一个csv文件,可以导入到其他程序中。</p>
                                </div>
                            ),
                            key: 'csv',
                            label: <span className={style.exportFile_typeName}>CSV格式</span>,
                        },
                        {
                            children: (
                                <div className={style.exportFile_type}>
                                    <h2>Excel格式</h2>
                                    <p>
                                        将数据导出为XLSX文件(一种Excel兼容的格式)。如果你有大量的样本数据,用Excel代替。
                                    </p>
                                </div>
                            ),
                            key: 'excel',
                            label: <span className={style.exportFile_typeName}>Excel格式</span>,
                        },
                    ]}
                    tabPosition="top"
                />

                <div className={style.exportFile_format}>
                    <h3>数字响应或实际文本</h3>
                    <RadioGroup
                        value={selectType}
                        onChange={(v) => setSelectType(v as 'number' | 'text')}
                    >
                        <Radio value="number" className={style.exportFile_formaRadio}>
                            <p>使用数值</p>
                        </Radio>
                        <Radio value="text" className={style.exportFile_formaRadio}>
                            <p>使用实际文本</p>
                        </Radio>
                    </RadioGroup>
                </div>

                <div className={style.exportFile_button}>
                    <Button
                        height="3.2rem"
                        label="取消"
                        size="big"
                        type="primary"
                        width="7.6rem"
                        onClick={() => {
                            handleClose && handleClose();
                        }}
                    />
                    <Button
                        disabled={!currentFileType}
                        width="6rem"
                        height="3.2rem"
                        label="导出"
                        size="normal"
                        type="primary"
                        onClick={() => {
                            exportJob();
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default ExportJobsFile;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
