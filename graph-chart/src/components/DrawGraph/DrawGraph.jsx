"use client";

import { useEffect, useRef } from "react";


import * as echarts from "echarts";

export default function DrawGraph({ graph,onNodeClick }) {
    const chartRef = useRef(null);
    
    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current, null, {
            renderer: "canvas",
        });
        
        const option = {
            title: { text: "" },
            animation: false,
            series: [
                {
                    type: "graph",
                    layout: "force",
                    force: { repulsion: 100},
                    roam: true,
                    data: graph.nodes,
                    links: graph.edges,
                },
            ],
        };

        chartInstance.setOption(option);

        chartInstance.on("click", function (params) {
            if (params.dataType === "node") {
                onNodeClick(params.data.name);
            }
        });

        return () => chartInstance.dispose();
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "93vh",borderRadius: '12px'}} />;
}
