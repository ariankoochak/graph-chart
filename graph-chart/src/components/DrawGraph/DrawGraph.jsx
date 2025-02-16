"use client";

import { useEffect, useRef } from "react";


import * as echarts from "echarts";

export default function DrawGraph({ graph }) {
    const chartRef = useRef(null);


    console.log('edges',graph.edges);
    console.log('nodes',graph.nodes);
    
    
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
                alert(`Clicked on: ${params.data.name}`);
                console.log("Node Data:", params.data);
            }
        });

        return () => chartInstance.dispose();
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "93vh",borderRadius: '12px'}} />;
}
