/**
 * @file
 * @date 2023-02-15
 * @author zhoubin
 * @lastModify zhoubin 2023-02-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobStageSaga } from '~/Store/JobStage/actions';
import { RootState } from '~/Store/rootReducer';
import TitleCard from '../../../CountScript/Components/TitleCard';
import NoticeParameterCard from '../NoticeParameterCard';
import ParameterCard from '../ParameterCard';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface ExceptionNoticeScriptProps {
    selectScript: string[];
    testStage: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ExceptionNoticeScript: FC<ExceptionNoticeScriptProps> = ({
    selectScript,
    testStage,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [values, setValues] = useState<string[]>(['', '', '']);

    const [telNum, setTelNum] = useState('');
    const tgId = useSelector((state: RootState) => state.preparation.selectedTg);
    const { stageId, stepId } = useSelector((state: RootState) => state.jobStage.currentStep);
    const currentJob = useSelector((state: RootState) => state.jobList.getCurrentJob);
    const getJobStage = useSelector((state: RootState) => state.jobStage.getJobStage);
    const dispatch = useDispatch();
    const currentStep = useMemo(() => {
        if (stageId && stageId && getJobStage) {
            return getJobStage.config
                .find((v) => v.id === stageId)
                ?.steps.after_stream.find((v) => v.id === stepId);
        }
    }, [getJobStage, stageId, stepId]);

    const isSelectScript = useMemo(() => {
        if (currentStep?.script) {
            return (
                selectScript[2] === currentStep.script.name &&
                selectScript[1] === currentStep.script.type
            );
        }
    }, [currentStep?.script, selectScript]);
    useEffect(() => {
        setValues(['', '', '']);
        setTelNum('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectScript]);
    useEffect(() => {
        if (isSelectScript && currentStep && currentStep.script && currentStep.script.args) {
            const args = currentStep.script.args;
            if (!Array.isArray(args)) {
                return;
            }
            const values: string[] = ['', '', ''];
            let num = '';
            if (args[0] && typeof args[0] === 'string') {
                values[0] = args[0];
            }
            if (args[1] && typeof args[1] === 'string') {
                values[1] = args[1];
            }
            if (args[2] && typeof args[2] === 'string') {
                values[2] = args[2];
            }
            setValues([...values]);
            if (args[3] && typeof args[3] === 'string') {
                num = args[3];
            }

            setTelNum(num);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep, isSelectScript]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const isEmail = selectScript[2] === '根据被访者变量发送邮箱警告';
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 输出列表
     */
    const getOutLabels = () => {
        if (!stageId || !getJobStage) {
            return [];
        }
        const vars = getJobStage.config.find((v) => v.id === stageId)?.r_vars;

        if (!vars) {
            return [];
        }
        const haveVars = vars?.filter((item) => {
            if (item.q_dimension.length > 1) {
                return false;
            }
            if (
                item.q_dimension[0] &&
                item.q_dimension[0].length === 1 &&
                item.q_type === 'Numeric'
            ) {
                return true;
            }
            return false;
        });
        return haveVars.map((v) => ({ id: v.qid, content: v.qid }));
    };

    const handleSave = (arg: string[], telNum: string) => {
        if (!currentJob || !isSelectScript) {
            return;
        }
        const stages = {
            status: 0,
            config: getJobStage.config.map((v) => {
                if (v.id === stageId) {
                    v.steps.after_stream = v.steps.after_stream.map((item) => {
                        if (item.id === stepId) {
                            const args = [...arg, telNum];
                            // args[1] = telNum;
                            return {
                                ...item,
                                script: {
                                    ...item.script,
                                    args,
                                },
                            };
                        }
                        return item;
                    });
                }
                return v;
            }),
        };
        dispatch(
            updateJobStageSaga({
                talent_group_id: tgId,
                job_id: currentJob.id,
                stages,
            }),
        );
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div>
            <TitleCard
                title={`${isEmail ? '邮件通知' : '短信通知'}-被访者变量`}
                label="通知类"
                description={`此脚本用于当输入参数触发预警规则时，将以手机短信的形式将预警内容发送给预设的手机号码。`}
            />
            <NoticeParameterCard
                testStage={testStage}
                parameters={[
                    {
                        name: '预警对象',
                        description: '请选择需要被预警的被访者变量作为此脚本的输入参数。',
                        labels: getOutLabels(),
                    },
                    {
                        name: '预警条件',
                        description: '请选择被预警的被访者变量的预警触发条件。',
                        labels: [
                            { id: '=', content: '等于' },
                            { id: '!=', content: '不等于' },
                            { id: '>', content: '大于' },
                            { id: '>=', content: '大于等于' },
                            { id: '<', content: '小于' },
                            { id: '<=', content: '小于等于' },
                        ],
                    },
                    {
                        name: '预警临界值',
                        description: '请输入一个数值作为被预警的被访者变量的预警临界值。',
                    },
                ]}
                values={values}
                handleChangeParameters={(values) => {
                    handleSave([...values], telNum);
                    setValues(values);
                }}
            />
            <ParameterCard
                type="template"
                testStage={testStage}
                parameterName={`${isEmail ? '邮件模板' : '短信模板'}`}
                parameterDescription={`编辑${
                    isEmail ? '邮件' : '短信'
                }的内容模板，其中可以插入全局变量的输出值。待全局变量统计完成后将向目标${
                    isEmail ? '电子邮箱' : '手机号码'
                }发送此${isEmail ? '邮件' : '短信'}。`}
                template={
                    <div className={style.exceptionNoticeScript_template}>
                        您好，您的数据处理工作 “jobxxxxxxxx002” 已经完成，被访者变量
                        {values[0] ? values[0] : <span>（被访者变量名称）</span>}
                        的值
                        {values[1] ? values[1] : <span>（脚本内选择的触发条件）</span>}
                        {values[2] ? values[2] : <span>（预警临界值）</span>}
                        ，请及时登录查看。
                    </div>
                }
            />
            <ParameterCard
                testStage={testStage}
                parameterName={`${isEmail ? '电子邮件' : '手机号码'}`}
                parameterDescription={`编辑需要发送${isEmail ? '邮件' : '短信'}短信的目标${
                    isEmail ? '电子邮箱' : '手机号码。'
                }`}
                isPhone={!isEmail}
                value={telNum}
                handleChangeValue={(value) => {
                    setTelNum(value);
                    handleSave([...values], value);
                }}
            />
        </div>
    );
};
export default ExceptionNoticeScript;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
