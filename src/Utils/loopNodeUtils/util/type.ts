import { OptionList, ScriptItem } from '@possie-engine/dr_front_surveyconfig';
import {
    QuestionNode,
    BlockNode,
    LoopNode,
    ExecutionNode,
    MarkNode,
    QuotaNode,
    ExitNode,
    DisplayNode,
} from '@possie-engine/dr_front_surveyconfig/Class/Node/NodeClass';

// 容器Node
type ContainerNodeType = BlockNode | LoopNode;
// 普通Node
type CommentNodeType = QuestionNode | ExecutionNode | MarkNode | QuotaNode | ExitNode | DisplayNode;
// 执行Node
type ExecuteNodeType = BlockNode | ExecutionNode | MarkNode | QuotaNode;
// 显示Node
type DisplayNodeType = DisplayNode | ExitNode;
// question type
type QuestionType = QuestionNode['structure']['content']['content']['type'];
// nodes type
type NodesType = 'intervieweeNodes' | 'interviewerNodes';
type nodeType = {
    id: string;
    kind: string;
    // type?: QuestionType;
    code: string;
    parent?: string;
    fold: boolean;
    children: Array<string>;
};
type MemberType = {
    id: string;
    code: string;
    options: {
        [key: string]: {
            code: string;
        };
    };
    title: {
        text: string;
        script: null | string;
    };
    groupColor: string;
    order: {
        recordedFormat: string;
        script: string | null;
        predefined: Array<string>;
    };
};

type MembersType = {
    [key: string]: MemberType;
};

type ReusableListType = { [key: string]: { name: string; data: OptionList } };

type ProcOptionType = {
    oe: null;
    option_code: string;
    option_text: string;
};

type LoopNodeType = {
    type: 'loopNode';
    labels: { id: string; content: string }[];
};

type ProcItemValType = {
    qid: string;
    q_text: Array<string | LoopNodeType>;
    q_type: string;
    is_extra: boolean | null;
    is_loop: boolean;
    q_dimension: Array<Array<ProcOptionType>>;
    q_label_name: string;
};

type ProcTextItemValType = {
    qid: string;
    q_text: string;
    q_type: string;
    is_extra: boolean | null;
    is_loop: boolean;
    q_dimension: Array<Array<ProcOptionType>>;
    q_label_name: string;
};

type ProcListValType = Array<ProcItemValType>;
type ProcTextListValType = Array<ProcTextItemValType>;

type ScriptsType = {
    [key: string]: { name: string; data: ScriptItem };
};

export type {
    ContainerNodeType,
    CommentNodeType,
    QuestionType,
    nodeType,
    MemberType,
    MembersType,
    ExecuteNodeType,
    DisplayNodeType,
    ReusableListType,
    NodesType,
    ProcListValType,
    ProcOptionType,
    LoopNodeType,
    ScriptsType,
    ProcTextItemValType,
    ProcTextListValType,
};
