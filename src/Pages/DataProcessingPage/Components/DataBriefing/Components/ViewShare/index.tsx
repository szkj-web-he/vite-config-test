/**
 * @file ViewShare
 * @date 2022-09-01
 * @author liaoli
 * @lastModify liaoli 2022-09-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    Alert,
    Radio,
    RadioGroup,
    Button,
    Check,
    CheckGroup,
} from '@datareachable/dr_front_componentlibrary';
import React, { useRef, useState } from 'react';
import { JobListType } from '~/Store/JobList/types';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ViewShareProps {
    show: boolean;
    job?: JobListType;
    viewId: string;
    handleClose?: () => void;
    handleShareView: (viewId: string, role: string[]) => void;
}
const ViewShare: React.FC<ViewShareProps> = ({
    handleClose,
    show,
    job,
    viewId,
    handleShareView,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const roleList = useRef([
        { id: 'writer', value: '可编辑' },
        { id: 'task_giver', value: '可分配任务' },
        { id: 'commenter', value: '可评论' },
    ]);

    const [selectRoleType, setSelectRoleType] = useState<'all' | 'customRole'>('all');

    const [selectRoleList, setSelectRoleList] = useState<string[]>();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            className={style.shareView_alert}
            width="60rem"
            height="33.3 rem"
            custom
            status={show}
            changeStatus={handleClose}
        >
            <div className={style.shareView_container}>
                <h2 className={style.shareView_title}>复制链接</h2>
                <p className={style.shareView_tips}>将此视角下的数据展示分享给其他人</p>

                <RadioGroup
                    value={selectRoleType}
                    onChange={(v) => {
                        if (v === 'all') {
                            setSelectRoleList([]);
                        }
                        setSelectRoleType(v as 'all' | 'customRole');
                    }}
                >
                    <Radio value={'all'}>所有获得此链接的人都可以打开</Radio>
                    <Radio value={'customRole'}>获得此链接，同时具有以下权限的人可以打开</Radio>
                </RadioGroup>
                <CheckGroup
                    onChange={(v) => {
                        setSelectRoleList(Object.assign([], v));
                    }}
                    value={selectRoleList}
                >
                    <div
                        className={`${style.shareView_checkBox} ${
                            selectRoleType === 'customRole' ? style.shareView_checkBox_hover : ''
                        }`}
                    >
                        {roleList.current.map((item) => {
                            return (
                                <Check
                                    value={item.id}
                                    type="solid"
                                    disabled={selectRoleType === 'all'}
                                    key={item.id}
                                >
                                    {item.value}
                                </Check>
                            );
                        })}
                    </div>
                </CheckGroup>
                <div className={style.shareView_button}>
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
                        label="复制"
                        size="normal"
                        type="primary"
                        disabled={selectRoleType === 'customRole' && !selectRoleList?.length}
                        onClick={() => {
                            if (job) {
                                if (selectRoleType === 'all') {
                                    handleShareView(viewId, []);
                                } else {
                                    handleShareView(viewId, selectRoleList as string[]);
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default ViewShare;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
