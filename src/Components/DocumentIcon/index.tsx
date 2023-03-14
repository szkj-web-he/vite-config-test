/**
 * @file
 * @date 2022-04-22
 * @author zhuxiaojiao
 * @lastModify zhuxiaojiao 2022-04-22
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from "@datareachable/dr_front_componentlibrary";
import { documentIcon, documentIconColor } from "./utils";
import React from "react";
import { IconProps } from "@datareachable/dr_front_componentlibrary/Components/Icon";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface DocumentIconProps {
    fileName: string;
    style?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const DocumentIcon: React.FC<DocumentIconProps> = ({ fileName, style }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    const fontSizeSmallArr = ["graphicFile", "audioFile", "animationFile", "executableFile"];
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <span style={{ width: "3rem", zIndex: "2" }}>
            <Icon
                type={
                    documentIcon(
                        fileName.slice(fileName.lastIndexOf(".")).split(".")[1],
                    ) as IconProps["type"]
                }
                color={documentIconColor(
                    documentIcon(fileName.slice(fileName.lastIndexOf(".")).split(".")[1]),
                )}
                style={{
                    ...style,
                    fontSize: fontSizeSmallArr.includes(
                        documentIcon(fileName.slice(fileName.lastIndexOf(".")).split(".")[1]),
                    )
                        ? "1.6rem"
                        : "2rem",
                }}
                // style={style}
                // style={{
                //     zIndex: 2,
                //     margin: '0 0.8rem 0 1.6rem',
                // }}
            />
        </span>
    );
};
export default DocumentIcon;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
