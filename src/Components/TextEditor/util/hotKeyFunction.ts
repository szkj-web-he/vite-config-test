import style from "../style.module.scss";
export const addScript = (range: Range) => {
    if (document.getSelection() !== null) {
        // get the selection and range object
        const sel = document.getSelection() as Selection;
        if (
            !(
                range.endContainer.parentElement !== null &&
                range.endContainer.parentElement.className === style.textEditor_scriptText
            )
        ) {
            // init new node need to insert
            const newNode = document.createElement("div");
            newNode.id = `script${Math.random()}`;

            newNode.setAttribute("code", "#");
            newNode.setAttribute("contentEditable", "false");
            newNode.setAttribute("userSelect", "none");
            newNode.className = style.textEditor_script;

            // if current container is <div></br></div>
            // need to remove </br>
            const childNode = range.endContainer.lastChild;
            if (childNode != null && (childNode as HTMLElement).tagName === "BR") {
                range.endContainer.removeChild(childNode);
            }

            // clone range as a newRange and this newRange will replace the old range
            // after insert action
            const newRange = range.cloneRange();

            newRange.setStart(range.startContainer, range.startOffset - 1);
            newRange.setEnd(range.endContainer, range.endOffset);
            newRange.deleteContents();

            //newRange.setStart(range.startContainer, range.startOffset - 1);

            // get content of current container

            // insert the newNode into the newRange
            newRange.insertNode(newNode);
            // set the position of cursor after the newNode
            newRange.setStartAfter(newNode);
            // collapse the range
            newRange.collapse(true);

            // remove old range and add the newRange
            sel.removeAllRanges();
            sel.addRange(newRange);
        }
    }
};
