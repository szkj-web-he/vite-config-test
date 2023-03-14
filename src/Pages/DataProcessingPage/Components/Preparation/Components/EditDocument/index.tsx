/**
 * @file
 * @date 2022-03-09
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2022-03-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Icon, ScrollComponent } from '@datareachable/dr_front_componentlibrary';
import React, { useState } from 'react';
import style from './style.scss';
import { useTranslation } from 'react-i18next';
import Upload from '~/Components/Upload';
import { Canceler } from 'axios';
import DocumentIcon from '~/Components/DocumentIcon';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface UploadFile {
    id: string;
    name: string;
    type: string;
    size: number;
    progress: string;
    // complete: boolean;
    fail: boolean;
    onCancel?: Canceler;
}
interface EditDocumentProps {
    show: boolean;
    uploadQueue: UploadFile[];
    closeIcon?: React.ReactNode;
    className?: string;
    title: string;
    isAdd?: boolean;
    // uploadComplete?: boolean;
    handleClose: () => void;
    handleUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDownload?: (id: string, name: string) => void;
    handleDelete?: (id: string) => void;
    handleRename?: (id: string, name: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const EditDocument: React.FC<EditDocumentProps> = ({
    show,
    uploadQueue,
    title,
    isAdd = true,
    closeIcon,
    className,
    // uploadComplete = true,
    handleClose,
    handleUpload,
    handleDownload,
    handleDelete,
    handleRename,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    /** hover document item */
    const [hoverDocumentItem, setHoverDocumentItem] = useState(-1);
    /** edit file name input index */
    const [editFileNameIndex, setEditFileNameIndex] = useState(-1);

    /** input value */
    const [inputValue, setInputValue] = useState('');
    /** document upload fail */
    // const [documentUploadFail, setDocumentUploadFail] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /** handle file size */
    const handleFileSize = (size: number): string => {
        if (size >= 1024 * 1024 * 1024) {
            const num = size / (1024 * 1024 * 1024);
            return `${Math.round(num * 100) / 100} G`;
        } else if (size >= 1024 * 1024) {
            const num = size / (1024 * 1024);
            return `${Math.round(num * 100) / 100} M`;
        } else {
            const num = size / 1024;
            return `${Math.round(num * 100) / 100} KB`;
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert status={show} custom width="60rem" height="54.2rem" className={style.upload_alert}>
            <div className={[style.editDocuments_container, className].join(' ')}>
                <h1>{title}</h1>
                {closeIcon ? (
                    closeIcon
                ) : (
                    <Icon type="shrink" className={style.shrink_icon} onClick={handleClose} />
                )}
                <p>{t('PreparationPage.UploadAttachment.Message')}</p>
                <div>
                    <div style={{ margin: '0 2.4rem', position: 'relative' }}>
                        <Upload
                            width="20.9rem"
                            height="39rem"
                            placeholder={t('PreparationPage.UploadAttachment.UploadTip')}
                            linkMsg={
                                isAdd ? t('PreparationPage.UploadAttachment.LinkMsg') : undefined
                            }
                            onChange={handleUpload}
                        />
                        {!isAdd && <div className={style.upload_mask}></div>}
                    </div>
                    <div className={style.document_content}>
                        <h3>{t('PreparationPage.UploadAttachment.UploadFiles')}</h3>
                        <ul className={style.upload_list}>
                            <ScrollComponent height="35.6rem">
                                {uploadQueue &&
                                    uploadQueue.map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                onMouseMove={() => setHoverDocumentItem(index)}
                                                onMouseLeave={() => setHoverDocumentItem(-1)}
                                                style={
                                                    editFileNameIndex !== index
                                                        ? { backgroundColor: '#F9FBFB' }
                                                        : {}
                                                }
                                                // style={{
                                                //     backgroundColor:
                                                //         editFileNameIndex !== index ||
                                                //         item.progress === '100%'
                                                //             ? '#FAFAFA'
                                                //             : '',
                                                // }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    if (item.progress === '100%') {
                                                        handleDownload?.(item.id, item.name);
                                                        // dispatch(
                                                        //     OverViewV2Actions.downloadFileActionSaga({
                                                        //         project_id: projectId,
                                                        //         file_id: item.id,
                                                        //     }),
                                                        // );
                                                    }
                                                }}
                                            >
                                                <DocumentIcon
                                                    fileName={item.name}
                                                    style={{
                                                        zIndex: 2,
                                                    }}
                                                />
                                                {editFileNameIndex === index ? (
                                                    <div className={style.editFile_name}>
                                                        <input
                                                            type="text"
                                                            value={inputValue}
                                                            autoFocus
                                                            maxLength={
                                                                72 -
                                                                item.name.substring(
                                                                    item.name.lastIndexOf('.'),
                                                                ).length
                                                            }
                                                            onChange={(e) => {
                                                                setInputValue(
                                                                    e.currentTarget.value,
                                                                );
                                                            }}
                                                            onBlur={(e) => {
                                                                e.defaultPrevented;
                                                                setEditFileNameIndex(-1);
                                                                const name =
                                                                    inputValue +
                                                                    item.name.substring(
                                                                        item.name.lastIndexOf('.'),
                                                                    );
                                                                if (
                                                                    !inputValue ||
                                                                    name === item.name
                                                                ) {
                                                                    return;
                                                                }
                                                                handleRename?.(item.id, name);
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (
                                                                    e.key === 'Enter' ||
                                                                    e.key === 'Escape'
                                                                ) {
                                                                    setEditFileNameIndex(-1);
                                                                    const name =
                                                                        inputValue +
                                                                        item.name.substring(
                                                                            item.name.lastIndexOf(
                                                                                '.',
                                                                            ),
                                                                        );
                                                                    if (
                                                                        !inputValue ||
                                                                        name === item.name
                                                                    ) {
                                                                        return;
                                                                    }
                                                                    handleRename?.(item.id, name);
                                                                }
                                                            }}
                                                        />
                                                        {/* <div className={style.edit_btnWrap}>
                                                        <Icon
                                                            type="right"
                                                            className={style.right_icon}
                                                            onMouseDown={(e) => {
                                                                e.preventDefault();
                                                                // handleUpdateDocumentName(
                                                                //     item.name,
                                                                //     item.id,
                                                                // );
                                                            }}
                                                        />
                                                        <Icon
                                                            type="close"
                                                            className={style.close_icon}
                                                            onMouseDown={(e) => {
                                                                e.preventDefault();
                                                                setEditFileNameIndex(-1);
                                                            }}
                                                        />
                                                    </div> */}
                                                        <span>
                                                            {item.name.substring(
                                                                item.name.lastIndexOf('.'),
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            color:
                                                                item.progress !== '100%'
                                                                    ? '#757575'
                                                                    : '',
                                                        }}
                                                    >
                                                        <p>{item.name}</p>
                                                        <div className={style.icon_wrap}>
                                                            {item.progress !== '100%' ? (
                                                                <Icon
                                                                    type="close"
                                                                    fontSize="1.2rem"
                                                                    className={style.close_icon}
                                                                />
                                                            ) : hoverDocumentItem !== index ||
                                                              !isAdd ? (
                                                                <span>
                                                                    {handleFileSize(item.size)}
                                                                </span>
                                                            ) : (
                                                                <div
                                                                    className={style.edit_document}
                                                                >
                                                                    <Icon
                                                                        type="edit"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setEditFileNameIndex(
                                                                                index,
                                                                            );
                                                                            setInputValue(
                                                                                item.name.substring(
                                                                                    0,
                                                                                    item.name.lastIndexOf(
                                                                                        '.',
                                                                                    ),
                                                                                ),
                                                                            );
                                                                        }}
                                                                    />
                                                                    <Icon
                                                                        type="close"
                                                                        className={style.close_icon}
                                                                        style={{
                                                                            marginRight: 'unset',
                                                                        }}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            e.preventDefault();
                                                                            handleDelete?.(item.id);
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {/* {console.log(uploadComplete)} */}
                                                <div
                                                    className={style.upload_progress}
                                                    style={{
                                                        width: item.progress,
                                                        backgroundColor: item.fail
                                                            ? '#fef4f5'
                                                            : item.progress !== '100%'
                                                            ? '#E9F7F8'
                                                            : '',
                                                    }}
                                                ></div>
                                            </li>
                                        );
                                    })}
                            </ScrollComponent>
                        </ul>
                    </div>
                </div>
            </div>
        </Alert>
    );
};
export default EditDocument;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
