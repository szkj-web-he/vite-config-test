import { Questionnaire, Node, TextContent, LoopNode } from '@possie-engine/dr_front_surveyconfig';
import { LoopNodeType, ProcListValType, ProcOptionType, ScriptsType } from './util/type';

import {
    isContainerNode,
    isHtmlElement,
    isLoopNode,
    isOptionItem,
    isQuestionNode,
    isScriptContent,
} from './util/typeCheck';

class QList {
    public list: Node[];
    public interviewList: Node[];
    public scripts: ScriptsType;
    public builtinScripts: ScriptsType;
    public nodes: ProcListValType = [];
    /**
     * 构造函数
     * @param config 问卷配置
     */
    constructor(config: Questionnaire) {
        this.list = config.list;
        this.interviewList = config.interviewList;
        this.scripts = config.meta.scripts;
        this.builtinScripts = config.meta.builtin_scripts as unknown as ScriptsType;
        this.init();
    }

    private init() {
        this.nodes = this.initNodes(this.list);
    }
    private convertTitle(textContent: TextContent, loopNodes: Array<LoopNode> = []) {
        const text: Array<string | LoopNodeType> = [];
        const list = textContent.content.list.list;

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (isHtmlElement(item)) {
                text.push(item.data.html);
            }

            if (isScriptContent(item)) {
                const { id, arguments: args } = item.content.execution;
                const script = this.builtinScripts[id];
                if (script && script.name === 'fetchLoopItem' && args['loopNodeCode']) {
                    const loopNodeCode = args['loopNodeCode'].value;
                    if (typeof loopNodeCode !== 'string') {
                        text.push('${script}');
                        continue;
                    }
                    const index = loopNodes.findIndex(
                        (item) => item.structure.code === loopNodeCode,
                    );

                    if (index === -1) {
                        text.push('${script}');
                        continue;
                    }
                    const options = loopNodes[index].structure.content.content.options.list;
                    const labels: { id: string; content: string }[] = [];
                    options.forEach((option) => {
                        const text = this.convertOption(
                            option.data.text['ZH-CN'] as unknown as TextContent,
                        );
                        labels.push({ id: option.data.code, content: text });
                    });
                    text.push({ type: 'loopNode', labels });
                    continue;
                }
                text.push('${script}');
            }
        }
        return text;
    }

    private convertOption(textContent: TextContent) {
        let text = '';
        const list = textContent.content.list.list;

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (isHtmlElement(item)) {
                text += item.data.html;
            }
        }
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText;
    }

    private initNodes(list: Array<Node>, isLoop = false, loopNodes: LoopNode[] = []) {
        const nodes: ProcListValType = [];
        list.forEach((item) => {
            if (isQuestionNode(item)) {
                // 问题题干
                const qid = item.structure.code;
                const q_text = this.convertTitle(item.structure.text['ZH-CN']);
                const q_type = item.structure.content.content.type;
                const is_extra = null;
                const q_label_name = '';
                const q_dimension: Array<Array<ProcOptionType>> = [];
                const options = item.structure.content.content.options;
                options.forEach((items) => {
                    const procOption: Array<ProcOptionType> = [];
                    items.forEach((item) => {
                        if (isOptionItem(item)) {
                            const oe = null;
                            const option_code = item.data.code;
                            const option_text = this.convertOption(item.data.text['ZH-CN']);
                            procOption.push({ oe, option_code, option_text });
                        }
                    });
                    if (procOption.length > 0) {
                        q_dimension.push(procOption);
                    }
                });
                if (isLoop && loopNodes.length >= 1) {
                    nodes.push({
                        qid,
                        q_text: this.convertTitle(item.structure.text['ZH-CN'], loopNodes),
                        q_type,
                        is_extra,
                        is_loop: true,
                        q_dimension,
                        q_label_name,
                    });
                } else {
                    nodes.push({
                        qid,
                        q_text,
                        q_type,
                        is_extra,
                        is_loop: false,
                        q_dimension,
                        q_label_name,
                    });
                }
            }
            if (isContainerNode(item)) {
                const list = item.structure.content.content.list;
                const isLoop = isLoopNode(item);
                const newLoopNodes = [...loopNodes];
                if (isLoopNode(item)) {
                    if (newLoopNodes.length < 2) {
                        newLoopNodes.push(item as unknown as LoopNode);
                    }
                }

                const _nodes = this.initNodes(list, isLoop, newLoopNodes);
                nodes.push(..._nodes);
            }
        });
        return nodes;
    }
    static getText(list: Array<string | LoopNodeType> | string) {
        let text = '';
        if (typeof list === 'string') {
            text += list;
        }
        if (Array.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                if (typeof item === 'string') {
                    text += item;
                    continue;
                }
                if (item.type === 'loopNode') {
                    text += '{循环项目}';
                }
            }
        }

        const div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText;
    }
}

export { QList };
