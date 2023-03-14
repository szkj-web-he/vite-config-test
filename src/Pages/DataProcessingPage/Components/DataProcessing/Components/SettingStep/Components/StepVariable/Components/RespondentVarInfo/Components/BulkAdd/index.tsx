/**
 * @file
 * @date 2022-10-21
 * @author zhoubin
 * @lastModify zhoubin 2022-10-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Button, ScrollComponent, Alert } from '@datareachable/dr_front_componentlibrary';
import AutoText from './Components/AutoText';
import { useState } from 'react';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BulkAddProps {
    type: string
    handleClose: () => void
    handleBatchAdd: (list: string[], type: string) => void
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// const BulkAdd: React.FC<BulkAddProps> = ({ addDim, handleCancel }): JSX.Element => {
const BulkAdd: React.FC<BulkAddProps> = ({ type, handleClose, handleBatchAdd }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * 列表
     */
    const [list, setList] = useState<string[]>([]);
    /**
     * 是否是第一次打开
     */
    const [first, setFirst] = useState(true);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 添加行
     */
    const handleAddLine = (index: number) => {
        if (index === list.length - 1) {
            list.splice(index, 0, '');
            setList([...list]);
        }
        setTimeout(() => {
            const elements = document.getElementsByClassName('bulkAdd_item');
            const nextElement = elements[index + 1];
            if (nextElement) {
                const textArea = nextElement.querySelector('.autoText_textArea');
                textArea && (textArea as HTMLTextAreaElement).focus();
            }
        });
    };

    /**
     * 修改value
     */
    const handleChangeValue = (value: string, index: number) => {
        list[index] = value;
        setList([...list]);
    };

    /**
     * first click
     */
    const handleFirstClick = () => {
        setFirst(false);
        setList(['']);
        setTimeout(() => {
            const elements = document.getElementsByClassName('bulkAdd_item');
            const nextElement = elements[elements.length - 1];
            if (nextElement) {
                const textArea = nextElement.querySelector('.autoText_textArea');
                textArea && (textArea as HTMLTextAreaElement).focus();
            }
        });
    };
    /**
     * 删除行
     */
    const handleDelete = (index: number) => {
        if (list.length === 1) {
            setFirst(true);
        }
        list.splice(index, 1);
        setList([...list]);

        setTimeout(() => {
            const elements = document.getElementsByClassName('bulkAdd_item');
            const frontElement = elements[index - 1];
            if (frontElement) {
                const textArea = frontElement.querySelector('.autoText_textArea');
                textArea && (textArea as HTMLTextAreaElement).focus();
            }
        });
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            custom
            status={true}
            width="60rem"
            height="45rem"
            className={style.bulkAdd_alert}
            changeStatus={() => {
                handleClose();
            }}
        >
            <div
                className={style.bulkAdd_container}
            >
                <h2 className={style.bulkAdd_title}>批量添加选项</h2>
                <p className={style.bulkAdd_tips}>每行代表一个选项，回车键换行</p>
                <h3 className={style.bulkAdd_row}>选项（{type === '1' ? '行' : '列'}）内容</h3>
                <div className={style.bulkAdd_content}>
                    <div className={style.bulkAdd_content_bulkContent}>
                        {first ? (
                            <div className={style.bulkAdd_first} onClick={handleFirstClick}>
                                <div className={style.bulkAdd_no}>1</div>
                                <div className={style.bulkAdd_click}>点击此处输入内容</div>
                            </div>
                        ) : (
                            <ScrollComponent
                                defaultScrollTop={0}
                                height="auto"
                                width="auto"
                                style={{ maxHeight: '23rem' }}
                            >
                                {list.map((item, index) => (
                                    <div key={index} className={style.bulkAdd_item}>
                                        <div className={style.bulkAdd_no}>{index + 1}</div>
                                        <AutoText
                                            handleEnterKey={() => handleAddLine(index)}
                                            handleChange={(value) => handleChangeValue(value, index)}
                                            handleDelete={() => handleDelete(index)}
                                        />
                                    </div>
                                ))}
                            </ScrollComponent>
                        )}
                    </div>
                </div>
                <div className={style.bulkAdd_button}>
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
                        width="6rem"
                        height="3.2rem"
                        label="确定"
                        size="normal"
                        type="primary"
                        disabled={!list.length}
                        onClick={() => handleBatchAdd(list, type)}
                    />
                </div>
            </div>
        </Alert>
    );
};
export { BulkAdd };
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
