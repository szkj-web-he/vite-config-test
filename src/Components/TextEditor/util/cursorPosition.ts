/**
 * @file this file will get the position of x and y for the cursor
 * @date 2020-10-23
 * @author Frank
 * @lastModify Frank 2020-10-23
 */
export function getSelectionCoords(): { x: number; y: number } {
    let x = 0,
        y = 0;
    if (window.getSelection) {
        const sel = window.getSelection() as Selection;
        if (sel.rangeCount) {
            const range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                if (range.getClientRects().length > 0) {
                    const rect = range.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                }
            }
            // Fall back to inserting a temporary element
            if (x === 0 && y === 0) {
                const span = document.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild(document.createTextNode("\u200b"));
                    range.insertNode(span);
                    const rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    const spanParent = span.parentNode;
                    spanParent?.removeChild(span);

                    // Glue any broken text nodes back together
                    spanParent?.normalize();
                }
            }
        }
    }
    return { x: x, y: y };
}
