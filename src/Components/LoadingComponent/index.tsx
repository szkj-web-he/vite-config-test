/**
 * @file loading component
 * @date 2021-07-08
 * @author xuejie.he
 * @lastModify xuejie.he 2021-07-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { otherToRGB } from "@datareachable/dr_front_componentlibrary/Components/DataDisplay/ColorPicker/Unit/colorConversion";
import React, { useEffect, useState } from "react";

import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface LoadingComponentProps {
    /**
     * color of this component
     */
    color?: string;
    /**
     * height of this component
     */
    height?: string;
    /**
     * width of this component
     */
    width?: string;
    /**
     * delay timer
     */
    delay?: number;

    type?:
        | "blank"
        | "bars"
        | "bubbles"
        | "cubes"
        | "cylon"
        | "spin"
        | "spinningBubbles"
        // | "dualRing"
        | "rice"
        | "roller"
        | "spokes";
    /**
     * custom className
     */
    className?: string;
    style?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const LoadingComponent: React.VFC<LoadingComponentProps> = ({
    color = "#000",
    height = "6.4rem",
    width = "6.4rem",
    delay = 0,
    type = "spin",
    className,
    style,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [delayed, setDelayed] = useState(delay > 0);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        let timeout: null | number = null;
        let isEnd = false;
        if (delayed) {
            timeout = window.setTimeout(() => {
                if (isEnd) {
                    return;
                }
                setDelayed(false);
                timeout && clearTimeout(timeout);
                timeout = null;
            }, delay);
        }
        return () => {
            timeout && clearTimeout(timeout);
            timeout = null;
            isEnd = true;
        };
    }, [delay, delayed]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const contentElement = () => {
        const arr: string[] = [];
        className && arr.push(className);
        switch (type) {
            case "blank":
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    />
                );
            case "bars":
                arr.push(styles.loading_bars);
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    >
                        {[0, 0, 0, 0, 0].map((_, n) => {
                            return (
                                <div
                                    className={styles.loading_barItem}
                                    key={`bar${n}`}
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            case "bubbles":
                arr.push(styles.loading_bubbles);
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    >
                        {[0, 0, 0, 0].map((_, n) => {
                            return (
                                <div
                                    className={styles.loading_bubblesItem}
                                    key={`bubbles${n}`}
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            case "cubes":
                arr.push(styles.loading_cubes);
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    >
                        {[0, 0, 0, 0].map((_, n) => {
                            return (
                                <div
                                    className={styles.loading_cubesItem}
                                    key={`cubes${n}`}
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            case "cylon":
                arr.push(styles.loading_cylon);
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    >
                        {[0, 0, 0].map((_, n) => {
                            return (
                                <div
                                    className={styles.loading_cylonItem}
                                    key={`cylon${n}`}
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            case "spin":
                arr.push(styles.loading_spin);
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                            borderWidth: `calc(${width} * 0.125)`,
                            borderColor: `rgba(${otherToRGB(color).toString()},0.25)`,
                        }}
                    >
                        <div
                            className={styles.loading_spinCircle}
                            style={{
                                top: `calc(-${height} * 0.125)`,
                                left: `calc(-${width} * 0.125)`,
                                width: `calc(${width} / 2)`,
                                height: `calc(${height} / 2)`,
                            }}
                        >
                            <div
                                className={styles.loading_spinCircleBar}
                                style={{
                                    width,
                                    height,
                                    borderWidth: `calc(${width} * 0.125)`,
                                    borderColor: color,
                                }}
                            />
                        </div>
                    </div>
                );
            case "spinningBubbles":
                arr.push(styles.loading_spinningBubbles);
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    >
                        {[0, 0, 0, 0, 0, 0, 0, 0].map((_, n) => {
                            return (
                                <div
                                    className={styles.loading_spinningBubblesItem}
                                    key={`spinning_bubbles${n}`}
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            case "rice":
                arr.push(styles.loading_rice);
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    >
                        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, n) => {
                            return (
                                <div className={styles.loading_riceItem} key={`rice${n}`}>
                                    <div
                                        className={styles.loading_riceItemContent}
                                        style={{
                                            backgroundColor: color,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            case "roller":
                arr.push(styles.loading_roller);
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    >
                        {[0, 0, 0, 0, 0, 0, 0, 0].map((_, n) => {
                            return (
                                <div className={styles.loading_rollerItem} key={`roller${n}`}>
                                    <div
                                        className={styles.loading_rollerItemContent}
                                        style={{
                                            backgroundColor: color,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            case "spokes":
                arr.push(styles.loading_spokes);
                return (
                    <div
                        className={arr.join(" ")}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    >
                        {[0, 0, 0, 0, 0, 0, 0, 0].map((_, n) => {
                            return (
                                <div className={styles.loading_spokesItem} key={`roller${n}`}>
                                    <div
                                        className={styles.loading_spokesItemContent}
                                        style={{
                                            backgroundColor: color,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return contentElement();
    // <div
    //     style={{
    //         fill: color,
    //         height: height,
    //         width: width,
    //     }}
    //     className={className ?? ""}
    // >
    // </div>
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
