/**
 * @file
 * @date 2022-01-06
 * @author
 * @lastModify  2022-01-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Col, Row } from "@datareachable/dr_front_componentlibrary";
import React from "react";
import styles from "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const CustomizeRow: React.VFC = () => {
    CustomizeRow.displayName = Row.displayName || Row.name;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.customizeRow_relative}>
            <Row className={styles.customizeRow_absolute}>
                <Col span={11}></Col>
            </Row>
            <Row className={styles.customizeRow_absolute} justify="right">
                <Col span={6}>Distribution Name</Col>
            </Row>
        </div>
    );
};
CustomizeRow.displayName = Row.displayName || Row.name;
export default CustomizeRow;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
