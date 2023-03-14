import {
  COMMENT_NODE_KINDS,
  CONTAINER_NODE,
  DISPLAY_NODES,
  EXECUTE_NODES,
  NodeKinds,
} from './constance';
import {
  Node,
  QuestionNode,
  BlockNode,
  LoopNode,
  ExecutionNode,
  MarkNode,
  QuotaNode,
  ExitNode,
  DisplayNode,
} from '@possie-engine/dr_front_surveyconfig/Class/Node/NodeClass';
import {
  CommentNodeType,
  ContainerNodeType,
  DisplayNodeType,
  ExecuteNodeType,
} from './type';
import {
  HtmlItem,
  OptionItem,
  OptionList,
  ScriptContent,
} from '@possie-engine/dr_front_surveyconfig';

/**
 * 判断是否是question node
 */
const isQuestionNode = function (node: Node): node is QuestionNode {
  return node.kind === NodeKinds.QUESTION_NODE;
};

/**
 * 判断是否是block node
 */
const isBlockNode = function (node: Node): node is BlockNode {
  return node.kind === NodeKinds.BLOCK_NODE;
};
/**
 * 判断是否是loop node
 */
const isLoopNode = function (node: Node): node is LoopNode {
  return node.kind === NodeKinds.LOOP_NODE;
};
/**
 * 判断是否是execution node
 */
const isExecutionNode = function (node: Node): node is ExecutionNode {
  return node.kind === NodeKinds.EXECUTION_NODE;
};
/**
 * 判断是否是market node
 */
const isMarkNode = function (node: Node): node is MarkNode {
  return node.kind === NodeKinds.MARK_NODE;
};
/**
 * 判断是否是quota node
 */
const isQuotaNode = function (node: Node): node is QuotaNode {
  return node.kind === NodeKinds.QUOTA_NODE;
};
/**
 * 判断是否是display node
 */
const isDisplayNode = function (node: Node): node is DisplayNode {
  return node.kind === NodeKinds.DISPLAY_NODE;
};
/**
 * 判断是否是exit node
 */
const isExitNode = function (node: Node): node is ExitNode {
  return node.kind === NodeKinds.EXIT_NODE;
};
/**
 * 判断是否是容器节点[BlockNode,LoopNode]
 */
const isContainerNode = function (node: Node): node is ContainerNodeType {
  return CONTAINER_NODE.includes(node.kind);
};
/**
 * 判断是否是普通节点
 */
const isCommentNode = function (node: Node): node is CommentNodeType {
  return COMMENT_NODE_KINDS.includes(node.kind);
};
/**
 * 判断是否是执行节点(logic使用)
 */
const isExecuteNode = function (node: Node): node is ExecuteNodeType {
  return EXECUTE_NODES.includes(node.kind);
};
/**
 * 判断是否是显示节点(logic使用)
 */
const isDisplaysNode = function (node: Node): node is DisplayNodeType {
  return DISPLAY_NODES.includes(node.kind);
};
/**
 * 判断是否是option item
 */
const isOptionItem = function (
  item: OptionList | OptionItem
): item is OptionItem {
  return item.kind === 'OptionItem';
};
/**
 * 判断是否是option list
 */
const isOptionList = function (
  item: OptionList | OptionItem
): item is OptionList {
  return item.kind === 'OptionList';
};
/**
 * 判断是否是html element
 */
const isHtmlElement = function (
  item: HtmlItem | ScriptContent
): item is HtmlItem {
  return item.kind === 'HtmlItem';
};

/**
 * 判断是否是script content
 */
const isScriptContent = function (
  item: HtmlItem | ScriptContent
): item is ScriptContent {
  return item.kind === 'ScriptContent';
};
export {
  isQuestionNode,
  isBlockNode,
  isLoopNode,
  isExecutionNode,
  isMarkNode,
  isQuotaNode,
  isDisplayNode,
  isExitNode,
  isContainerNode,
  isCommentNode,
  isOptionItem,
  isOptionList,
  isHtmlElement,
  isScriptContent,
  isExecuteNode,
  isDisplaysNode,
};
