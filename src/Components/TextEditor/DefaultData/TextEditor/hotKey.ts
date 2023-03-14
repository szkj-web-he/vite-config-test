import { faFileCode, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { addScript } from "../../util/hotKeyFunction";
export const defaultSelections = [
    {
        label: "Script",
        func: (range: Range) => {
            addScript(range);
        },
        content: "Add a script file and start",
        icon: faFileCode,
    },
    {
        label: "Link",
        func: () => {
            ("");
        },
        content: "Link to other files",
        icon: faCommentDots,
    },
];
