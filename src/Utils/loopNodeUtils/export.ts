import { ProcOptionType, ProcTextListValType, ScriptsType } from './util/type';
import { Questionnaire, Node, TextContent, LoopNode } from '@possie-engine/dr_front_surveyconfig';
import {
    isContainerNode,
    isHtmlElement,
    isLoopNode,
    isOptionItem,
    isQuestionNode,
    isScriptContent,
} from './util/typeCheck';
class QExport {
    public list: Node[];
    public interviewList: Node[];
    public scripts: ScriptsType;
    public builtinScripts: ScriptsType;
    public nodes: ProcTextListValType = [];
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
    private convertTitle(textContent: TextContent, loopNodes: Array<LoopNode> = [], code = '') {
        let text = '';
        const list = textContent.content.list.list;

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (isHtmlElement(item)) {
                text += item.data.html;
            }

            if (isScriptContent(item)) {
                const { id, arguments: args } = item.content.execution;
                const script = this.builtinScripts[id];
                if (script && script.name === 'fetchLoopItem' && args['loopNodeCode']) {
                    const loopNodeCode = args['loopNodeCode'].value;
                    if (typeof loopNodeCode !== 'string') {
                        text += ' ${script} ';
                        continue;
                    }
                    const codeArr = code.split('_');
                    if (codeArr.length === 1 && codeArr[0] === '') {
                        text += ' ${script} ';
                        continue;
                    }
                    const index = loopNodes.findIndex(
                        (item) => item.structure.code === loopNodeCode,
                    );

                    if (index === -1 || !codeArr[index]) {
                        text += ' ${script} ';
                        continue;
                    }
                    const options = loopNodes[index].structure.content.content.options.list;

                    const optionItem = options.find((item) => item.data.code === codeArr[index]);
                    if (!optionItem) {
                        text += ' ${script} ';
                        continue;
                    }
                    // const a = optionItem.data.text['ZH-CN'];
                    text += this.convertTitle(
                        optionItem.data.text['ZH-CN'] as unknown as TextContent,
                        [],
                        '',
                    );
                    continue;
                }
                text += ' ${script} ';
            }
        }
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText;
    }
    private initNodes(list: Array<Node>, isLoop = false, loopNodes: LoopNode[] = []) {
        const nodes: ProcTextListValType = [];
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
                            const option_text = this.convertTitle(item.data.text['ZH-CN']);
                            procOption.push({ oe, option_code, option_text });
                        }
                    });
                    if (procOption.length > 0) {
                        q_dimension.push(procOption);
                    }
                });
                if (isLoop && loopNodes.length >= 1) {
                    const codes: string[][] = [];
                    for (let i = 0; i < loopNodes.length; i++) {
                        codes.push([]);
                        loopNodes[
                            loopNodes.length - i - 1
                        ].structure.content.content.options.list.forEach((item) => {
                            if (i === 0) {
                                codes[i].push(item.data.code);
                            } else {
                                codes[i - 1].forEach((code) => {
                                    codes[i].push(`${item.data.code}_${code}`);
                                });
                            }
                        });
                    }
                    if (codes[codes.length - 1]) {
                        codes[codes.length - 1].forEach((code) => {
                            nodes.push({
                                qid: `${qid}_${code}`,
                                q_text: this.convertTitle(
                                    item.structure.text['ZH-CN'],
                                    loopNodes,
                                    code,
                                ),
                                q_type,
                                is_extra,
                                is_loop: true,
                                q_dimension,
                                q_label_name,
                            });
                        });
                    }
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return nodes;
    }
}

export { QExport };
