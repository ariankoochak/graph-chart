"use client";

import { useEffect, useRef } from "react";

import * as echarts from "echarts";
import { useDispatch, useSelector } from "react-redux";
import { clickNode } from "@/lib/redux/slices/selectedNodeSlice";
import { addChangeNodeViewToChangeHistory } from "@/lib/redux/slices/editGraphSlice";

export default function DrawGraph({ graph }) {
    const editRequest = useSelector(
        (state) => state.editGraphSlice.changeNodeViewRequest
    );

    const dispatch = useDispatch();

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        chartInstance.current = echarts.init(chartRef.current, null, {
            renderer: "canvas",
        });

        const option = {
            title: { text: "" },
            animation: false,
            series: [
                {
                    type: "graph",
                    layout: "force",
                    force: { repulsion: 100 },
                    roam: true,
                    data: graph.nodes,
                    links: graph.edges,
                },
            ],
        };

        chartInstance.current.on("click", function (params) {
            if (params.dataType === "node") {
                dispatch(clickNode(params.data.name));
            }
        });

        chartInstance.current.setOption(option);

        return () => chartInstance.current.dispose();
    }, []);

    useEffect(() => {
        if (Object.keys(editRequest).length > 0) {
            const { nodeId, newColor, newIcon, isAllSameColorNode, oldColor } =
                editRequest;

            if (newColor) {
                let updatedNodes = chartInstance.current
                    .getOption()
                    .series[0].data.map((node) => {
                        if (isAllSameColorNode) {
                            if (node.itemStyle.color === oldColor) {
                                console.log(node);
                                dispatch(
                                    addChangeNodeViewToChangeHistory({
                                        nodeId: node.name,
                                        newColor,
                                        newIcon,
                                    })
                                );
                                return {
                                    ...node,
                                    itemStyle: { color: newColor },
                                };
                            }
                        } else {
                            if (node.name === nodeId) {
                                dispatch(
                                    addChangeNodeViewToChangeHistory({
                                        nodeId,
                                        newColor,
                                        newIcon,
                                    })
                                );
                                return {
                                    ...node,
                                    itemStyle: { color: newColor },
                                };
                            }
                        }
                        return node;
                    });

                chartInstance.current.setOption(
                    {
                        series: [{ data: updatedNodes }],
                    },
                    { notMerge: false }
                );
            } else if (newIcon) {
                let updatedNodes = chartInstance.current
                    .getOption()
                    .series[0].data.map((node) => {
                        if (node.name === nodeId) {
                            dispatch(
                                addChangeNodeViewToChangeHistory({
                                    nodeId,
                                    newColor,
                                    newIcon,
                                })
                            );
                            return {
                                ...node,
                                symbol: `image:///icons/${newIcon}`,
                            };
                        }

                        return node;
                    });

                chartInstance.current.setOption(
                    {
                        series: [{ data: updatedNodes }],
                    },
                    { notMerge: false }
                );
            }
        }
    }, [editRequest]);

    return (
        <div
            ref={chartRef}
            style={{ width: "100%", height: "93vh", borderRadius: "12px" }}
        />
    );
}
