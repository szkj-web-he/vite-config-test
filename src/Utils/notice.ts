import Message from "@datareachable/dr_front_componentlibrary/Components/Feedback/Message";
import i18n from "~/Locales/i18n";

/** 错误提示 */
export const errorNotice = (op: { code: number; opera: string }) => {
    const { code, opera } = op;
    return Message.right({
        type: "error",
        title: i18n.t("Notice.Error"),
        content: i18n.t(`Notice.${opera}.${code}`),
        duration: 3000,
    });
};

/** 警告提示 */
export const warningNotice = (op: { code: number; opera: string }) => {
    const { code, opera } = op;
    return Message.right({
        type: "warning",
        title: i18n.t(`Notice.Warning`),
        content: i18n.t(`Notice.${opera}.${code}`),
        duration: 3000,
    });
};

/** 信息提示 */
export const infoNotice = (op: { code: number; opera: string }) => {
    const { code, opera } = op;
    return Message.right({
        type: "info",
        title: i18n.t(`Notice.Info`),
        content: i18n.t(`Notice.${opera}.${code}`),
    });
};

/** 成功提示 -- 底部 */
export const successNotice = (op: { code: number; opera: string }) => {
    const { code, opera } = op;
    Message.bottom({
        content: i18n.t(`Notice.${opera}.${code}`),
    });
};

/** 成功提示 -- 右上 */
export const successRightNotice = (op: { code: number; opera: string }) => {
    const { code, opera } = op;
    Message.right({
        type: "success",
        title: i18n.t("Notice.Success"),
        content: i18n.t(`Notice.${opera}.${code}`),
    });
};

/** 通用提示信息 */
export const commonNotice = (code: number) => {
    if (code === 401100) {
        Message.right({
            type: "warning",
            title: i18n.t("Notice.Warning"),
            content: i18n.t(`Notice.CommonCode.${code}`),
        });
    } else {
        Message.right({
            type: "error",
            title: i18n.t("Notice.Error"),
            content: i18n.t(`Notice.CommonCode.${code}`),
        });
    }
};
