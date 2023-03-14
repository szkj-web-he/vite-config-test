import { faRemoveFormat } from "@fortawesome/free-solid-svg-icons";
import { SyntheticEvent, createElement, ReactElement } from "react";
import { toolBarFunction } from "../../util/toolBarFunction";
import { Icon } from "@datareachable/dr_front_componentlibrary";

interface StyleBarSetProps {
    title: string;
    icon: ReactElement;
    subMenu: boolean;
    func: (e: SyntheticEvent) => void;
    subMenuSet: {
        title: string;
        icon: ReactElement;
        func: (e: SyntheticEvent) => void;
    }[];
}

interface FontColorSetProps {
    title: string;
    icon: ReactElement;
    subMenuSet: {
        color: string;
        title: string;
        customered: boolean;
        icon: ReactElement;
        func: (e: SyntheticEvent) => void;
    }[];
}

interface FilledColorSetProps {
    title: string;
    icon: ReactElement;
    subMenuSet: {
        color: string;
        title: string;
        customered: boolean;
        icon: ReactElement;
        func: (e: SyntheticEvent) => void;
    }[];
}

export const styleBarSet: StyleBarSetProps[] = [
    {
        title: "Font Size",
        subMenu: true,
        icon: createElement(Icon, {
            type: "fontSize",
        }),
        func: () => {
            console.log("Font Size");
        },
        subMenuSet: [
            {
                title: "Xsmall",
                icon: createElement(Icon, {
                    type: "fontSize",
                }),
                func: (e: SyntheticEvent) => {
                    toolBarFunction.fontSize(e, "1");
                },
            },
            {
                title: "Small",
                icon: createElement(Icon, {
                    type: "fontSize",
                }),
                func: (e: SyntheticEvent) => {
                    toolBarFunction.fontSize(e, "2");
                },
            },
            {
                title: "Middile",
                icon: createElement(Icon, {
                    type: "fontSize",
                }),
                func: (e: SyntheticEvent) => {
                    toolBarFunction.fontSize(e, "3");
                },
            },
            {
                title: "Large",
                icon: createElement(Icon, {
                    type: "fontSize",
                }),
                func: (e: SyntheticEvent) => {
                    toolBarFunction.fontSize(e, "4");
                },
            },
            {
                title: "Xlarge",
                icon: createElement(Icon, {
                    type: "fontSize",
                }),
                func: (e: SyntheticEvent) => {
                    toolBarFunction.fontSize(e, "5");
                },
            },
        ],
    },
    {
        title: "Bold",
        subMenu: false,
        func: (e: SyntheticEvent) => {
            toolBarFunction.bold(e);
        },
        icon: createElement(Icon, {
            type: "bold",
        }),
        subMenuSet: [],
    },
    {
        title: "Italic",
        subMenu: false,
        func: (e: SyntheticEvent) => {
            toolBarFunction.italic(e);
        },
        icon: createElement(Icon, {
            type: "incline",
        }),
        subMenuSet: [],
    },
    {
        title: "Underline",
        subMenu: false,
        func: (e: SyntheticEvent) => {
            toolBarFunction.underLine(e);
        },
        icon: createElement(Icon, {
            type: "underline",
        }),
        subMenuSet: [],
    },
    {
        title: "Crossline",
        subMenu: false,
        func: (e: SyntheticEvent) => {
            toolBarFunction.crossLine(e);
        },
        icon: createElement(Icon, {
            type: "lineThrough",
        }),
        subMenuSet: [],
    },
];

export const fontColorSet: FontColorSetProps = {
    title: "Font Color",
    icon: createElement(Icon, {
        type: "fontColor",
    }),
    subMenuSet: [
        {
            color: "#262626",
            title: "Default",
            customered: false,
            icon: createElement(Icon, {
                type: "fontColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.fortColor(e, "#262626");
            },
        },
        {
            color: "#BDBDBD",
            title: "Gray",
            customered: false,
            icon: createElement(Icon, {
                type: "fontColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.fortColor(e, "#BDBDBD");
            },
        },
        {
            color: "#EB5757",
            title: "Red",
            customered: false,
            icon: createElement(Icon, {
                type: "fontColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.fortColor(e, "#EB5757");
            },
        },
        {
            color: "#F2994A",
            title: "Orange",
            customered: false,
            icon: createElement(Icon, {
                type: "fontColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.fortColor(e, "#F2994A");
            },
        },
        {
            color: "#F2C94C",
            title: "Yellow",
            customered: false,
            icon: createElement(Icon, {
                type: "fontColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.fortColor(e, "#F2C94C");
            },
        },
        {
            color: "#219653",
            title: "Green",
            customered: false,
            icon: createElement(Icon, {
                type: "fontColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.fortColor(e, "#219653");
            },
        },
        {
            color: "#2D9CDB",
            title: "Blue",
            customered: false,
            icon: createElement(Icon, {
                type: "fontColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.fortColor(e, "#2D9CDB");
            },
        },
        {
            color: "#BB6BD9",
            title: "Purple",
            customered: false,
            icon: createElement(Icon, {
                type: "fontColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.fortColor(e, "#BB6BD9");
            },
        },
        {
            color: "#828282",
            title: "Customize",
            customered: true,
            icon: createElement(Icon, {
                type: "fontColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.fortColor(e, "#828282");
            },
        },
    ],
};

export const filledColorSet: FilledColorSetProps = {
    title: "Filled",
    icon: createElement(Icon, {
        type: "chooseColor",
    }),
    subMenuSet: [
        {
            color: "#8c8c8c",
            title: "Default",
            customered: false,
            icon: createElement(Icon, {
                type: "chooseColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.filledColor(e, "#ffffff");
            },
        },
        {
            color: "#BDBDBD",
            title: "Gray",
            customered: false,
            icon: createElement(Icon, {
                type: "chooseColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.filledColor(e, "#BDBDBD");
            },
        },
        {
            color: "#EB5757",
            title: "Red",
            customered: false,
            icon: createElement(Icon, {
                type: "chooseColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.filledColor(e, "#EB5757");
            },
        },
        {
            color: "#F2994A",
            title: "Orange",
            customered: false,
            icon: createElement(Icon, {
                type: "chooseColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.filledColor(e, "#F2994A");
            },
        },
        {
            color: "#F2C94C",
            title: "Yellow",
            customered: false,
            icon: createElement(Icon, {
                type: "chooseColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.filledColor(e, "#F2C94C");
            },
        },
        {
            color: "#219653",
            title: "Green",
            customered: false,
            icon: createElement(Icon, {
                type: "chooseColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.filledColor(e, "#219653");
            },
        },
        {
            color: "#2D9CDB",
            title: "Blue",
            customered: false,
            icon: createElement(Icon, {
                type: "chooseColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.filledColor(e, "#2D9CDB");
            },
        },
        {
            color: "#BB6BD9",
            title: "Purple",
            customered: false,
            icon: createElement(Icon, {
                type: "chooseColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.filledColor(e, "#BB6BD9");
            },
        },
        {
            color: "#828282",
            title: "Customize",
            customered: true,
            icon: createElement(Icon, {
                type: "chooseColor",
            }),
            func: (e: SyntheticEvent) => {
                toolBarFunction.filledColor(e, "#828282");
            },
        },
    ],
};
export const settingBarSet = [
    {
        title: "Remove",
        icon: faRemoveFormat,
        func: (e: SyntheticEvent) => {
            toolBarFunction.removeStyle(e);
        },
    },
];

export const handleChangeIntoComment = () => {
    return;
};

export const alignSet = [
    {
        title: "Align Left",
        icon: createElement(Icon, {
            type: "textLeft",
        }),
        func: (e: SyntheticEvent) => {
            toolBarFunction.alignLeft(e);
        },
    },
    {
        title: "Align Center",
        icon: createElement(Icon, {
            type: "textCenter",
        }),
        func: (e: SyntheticEvent) => {
            toolBarFunction.alignCenter(e);
        },
    },
    {
        title: "Align Right",
        icon: createElement(Icon, {
            type: "textRight",
        }),
        func: (e: SyntheticEvent) => {
            toolBarFunction.alignRight(e);
        },
    },
];
