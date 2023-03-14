/**
 * @file SetRefreshTime
 * @date 2022-08-26
 * @author liaoli
 * @lastModify liaoli 2022-08-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Alert, Switch, Button, Kite, Icon, ScrollComponent } from '@datareachable/dr_front_componentlibrary';
import React, { useEffect, useMemo, useState } from 'react';
import { refreshTimeList } from '~/DefaultData/Jobs';
import { JobListType } from '~/Store/JobList/types';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
interface SetRefreshTimeProps {
    job?: JobListType;
    show: boolean;
    defaultState: boolean;
    handleClose?: () => void;
    handleSetReTime: (id: string, value: number, isOpen: boolean) => void;
}

const SetRefreshTime: React.FC<SetRefreshTimeProps> = ({
    job,
    show,
    handleClose,
    handleSetReTime,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [isUpdateSource, setIsUpdateSource] = useState<boolean>(false);

    /** 选择时间 */
    const [showSelect, setShowSelect] = useState(false);

    /** 当前选择的单位 */
    const [currentCompany, setCurrentCompany] = useState('24小时');

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    useEffect(() => {
        if (job) {
            setIsUpdateSource(job.refresh_interval > 0)
            setCurrentCompany(refreshTimeList.find(v => v.time === job.refresh_interval)?.title || '24小时')
        }
    }, [job])

    const isDisable = useMemo(() => {
        if (job) {
            if (job.refresh_interval <= 0) {
                return isUpdateSource
            } else {
                return !isUpdateSource || !(refreshTimeList.find(v => v.time === job.refresh_interval)?.title === currentCompany)
            }
        }
    }, [job, isUpdateSource, currentCompany])
    /************* This section will include this component general function *************/
    console.log(isDisable);

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Alert
            status={show}
            custom={true}
            width="60rem"
            height="33.1rem"
            className={style.refreshTime_alert}
            changeStatus={handleClose}
        >
            <div className={style.refreshTime_box}>
                <h2>设置刷新时间</h2>
                <p>设置刷新数据源的时间</p>
                <div className={style.updateSource_header}>
                    <h3>更新数据源</h3>
                    <Switch
                        width="4rem"
                        height="2rem"
                        defaultValue={isUpdateSource}
                        handleChange={(v) => {
                            setIsUpdateSource(v);
                        }}
                    />
                </div>
                {isUpdateSource && (
                    <div className={style.setRefreshTime}>
                        <p>刷新时间</p>
                        <Kite
                            show={showSelect}
                            placement="cb"
                            style={{ zIndex: 100 }}
                            className={style.setRefreshTime_kiteBox}
                            offset={{ y: 4 }}
                            handleGlobalClick={(v) => {
                                if (!v.isBtn && !v.isMenu) {
                                    setShowSelect(false)
                                }
                            }}
                            root={
                                <div
                                    className={style.setRefreshTime_company}
                                    style={
                                        showSelect
                                            ? {
                                                borderColor: '#22A6B3',
                                                boxShadow: ' 0 0 0.2rem #3CBBC7',
                                            }
                                            : {}
                                    }
                                    onClick={() => {
                                        setShowSelect(!showSelect);
                                    }}
                                >
                                    <p>{currentCompany}</p>
                                    <Icon
                                        type="dropdown"
                                        style={
                                            showSelect ? { transform: 'rotate(180deg)' } : {}
                                        }
                                    />
                                </div>
                            }
                        >
                            <ScrollComponent
                                bodyClassName={style.setRefreshTime_kite}
                            >
                                <ul>
                                    {refreshTimeList.map((item) => {
                                        return (
                                            <li
                                                key={item.title}
                                                onClick={() => {
                                                    setCurrentCompany(item.title);
                                                    setShowSelect(false);
                                                }}
                                                style={
                                                    currentCompany === item.title
                                                        ? { color: '#22A6B3' }
                                                        : {}
                                                }
                                            >
                                                {item.title}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </ScrollComponent>
                        </Kite>
                        <span>(默认刷新时间为24小时)</span>
                    </div>
                )}
                <div className={style.recruitment_button}>
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
                        label="保存"
                        size="normal"
                        type="primary"
                        disabled={!isDisable}
                        onClick={() => {
                            if (job) {
                                handleSetReTime(job.id, refreshTimeList.find(v => v.title === currentCompany)?.time || 1440, isUpdateSource)
                            }
                            handleClose && handleClose();
                        }}
                    />
                </div>
            </div>
        </Alert>
    );
};
export default SetRefreshTime;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
