interface Document
    extends Node,
        DocumentAndElementEventHandlers,
        DocumentOrShadowRoot,
        GlobalEventHandlers,
        NonElementParentNode,
        ParentNode,
        XPathEvaluatorBase {
    selection: any;
}
