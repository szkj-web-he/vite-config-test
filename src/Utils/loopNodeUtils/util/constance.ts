/**
 *  类型常量
 */
const QUESTION_NODE = 'QuestionNode';
const BLOCK_NODE = 'BlockNode';
const LOOP_NODE = 'LoopNode';
const EXECUTION_NODE = 'ExecutionNode';
const MARK_NODE = 'MarkNode';
const QUOTA_NODE = 'QuotaNode';
const EXIT_NODE = 'ExitNode';
const DISPLAY_NODE = 'DisplayNode';
/**
 * 所有node类型
 */
const NodeKinds = {
  QUESTION_NODE,
  BLOCK_NODE,
  LOOP_NODE,
  EXECUTION_NODE,
  MARK_NODE,
  QUOTA_NODE,
  EXIT_NODE,
  DISPLAY_NODE,
};
/**
 * 普通node类型(没有子节点的类型)
 */
const COMMENT_NODE_KINDS = [
  QUESTION_NODE,
  EXECUTION_NODE,
  MARK_NODE,
  QUOTA_NODE,
  EXIT_NODE,
  DISPLAY_NODE,
];
/**
 * 容器node类型(有子节点的类型)
 */
const CONTAINER_NODE = [BLOCK_NODE, LOOP_NODE];
/**
 * 执行node类型logic使用
 */
const EXECUTE_NODES = [BLOCK_NODE, EXECUTION_NODE, MARK_NODE, QUOTA_NODE];
/**
 * 显示node类型logic使用
 */
const DISPLAY_NODES = [DISPLAY_NODE, EXIT_NODE];
/**
 * 隐藏的退出节点
 */
const HIDE_EXIT_NODE = [
  'default_complete',
  'default_quota_full',
  'default_screened_out',
];
export {
  NodeKinds,
  COMMENT_NODE_KINDS,
  CONTAINER_NODE,
  EXECUTE_NODES,
  DISPLAY_NODES,
  HIDE_EXIT_NODE,
};
