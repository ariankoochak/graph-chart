"use client";

import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
    ssr: false,
});

export default function DrawGraph({ graph }) {
    const [Highcharts, setHighcharts] = useState(null);
    const [options,setOptions] = useState(null);

    const loadHighChartsLibs = () => {
        if (typeof window !== "undefined") {
            import("highcharts")
                .then((mod) => {
                    const HighchartsLib = mod.default || mod;
                    setHighcharts(HighchartsLib);
                    return import("highcharts/modules/networkgraph");
                })
                .then((netMod) => {
                    if (Highcharts) {
                        (netMod.default || netMod)(Highcharts);
                    }
                })
                .catch((err) =>
                    console.error("Error loading Highcharts modules:", err)
                );
        }
        if (typeof window !== "undefined") {
            import("highcharts")
                .then((mod) => {
                    const HighchartsLib = mod.default || mod;
                    setHighcharts(HighchartsLib);
                    return import("highcharts/modules/boost");
                })
                .then((boostMod) => {
                    if (Highcharts) {
                        (boostMod.default || boostMod)(Highcharts);
                    }
                })
                .catch((err) =>
                    console.error("Error loading Highcharts modules:", err)
                );
        }
    };
    useEffect(() => {
        loadHighChartsLibs();
    }, []);

    const [progress, setProgress] = useState(0);
    // const [currentEdges , setCurrentEdges] = useState([]);
    // const [currentNodes, setCurrentNodes] = useState(graph.nodes?.length ? [graph.nodes[0]] : []);
    const [loadIndex,setLoadIndex] = useState(10);
    const batchSize = 10;

    const prepareOptionForHighCharts = () => {
        if (Highcharts && graph) {
            setOptions({
                boost: { 
                    useGPUTranslations: true,
                    usePreallocated: true,
                },
                chart: {
                    type: "networkgraph",
                    marginTop: 80,
                    animation : false,
                    shadow : false,
                    zoomType: "xy",
                    height: "96.5%",
                    events: {
                        // render: handleRenderedChart,
                        // render: function () {
                        //     if (graph.nodes.length > loadIndex + 1) {
                        //         let increaseIndex =
                        //             graph.nodes.length - loadIndex < 10
                        //                 ? graph.nodes.length - loadIndex
                        //                 : 10;
                        //         setLoadIndex(loadIndex + increaseIndex);
                        //     }
                        // },
                        load: function () {
                            console.log('finish load!');
                            
                        }
                    },
                },
                title: {
                    text: "Graph",
                },
                plotOptions: {
                    networkgraph: {
                        keys: ["from", "to"],
                        layoutAlgorithm: {
                            enableSimulation: true,
                            maxIterations: 200,
                            initialPositions: "circle", 
                        },
                    },
                },
                series: [
                    {
                        marker: {
                            radius: 5,
                        },
                        dataLabels: {
                            enabled: true,
                            linkFormat: "",
                            allowOverlap: true,
                        },
                        data: graph.edges,
                        nodes: graph.nodes,
                    },
                ],
            });
        }
    };

    // const handleRenderedChart = () => {
        
    //     const currentNodeIndex = currentNodes.length;
    //     let increaseIndex =
    //         graph.nodes.length - 1 - currentNodeIndex < batchSize
    //             ? graph.nodes.length - currentNodeIndex
    //             : batchSize;
    //     // console.log("currentNodeIndex", currentNodeIndex);
    //     // console.log("newCurrentNode", [
    //     //     ...currentNodes,
    //     //     ...graph.nodes.slice(
    //     //         currentNodeIndex,
    //     //         currentNodeIndex + increaseIndex
    //     //     ),
    //     // ]);

    //     const newData = [
    //         ...currentNodes,
    //         ...graph.nodes.slice(
    //             currentNodeIndex,
    //             currentNodeIndex + increaseIndex
    //         ),
    //     ];

    //     setCurrentNodes(newData);
    // };

    // setTimeout(()=>{
        
    // },10000)

    useEffect(()=>{
        prepareOptionForHighCharts();
    },[graph,Highcharts])

    const chartRef = useRef(null);
    // useEffect(() => {
    //     if (chartRef.current) {
    //         console.log(chartRef.current.chart.series);
    //         chartRef.current.chart.series[0].update(
    //             { nodes: graph.nodes.slice(0, loadIndex) },
    //             true
    //         );
    //         if (graph.nodes.length > loadIndex + 1) {
    //             let increaseIndex = graph.nodes.length - loadIndex < 10 ? graph.nodes.length - loadIndex : 10;
    //             setLoadIndex(loadIndex + increaseIndex);
    //         }
    //     }
    //     setProgress(Math.floor((loadIndex * 100) / graph.nodes.length));
    // }, [loadIndex, chartRef.current]);




    // addNodesAndEdgesInBatches();
    
    return (<>
    <HighchartsReact ref={chartRef} highcharts={Highcharts} options={options} />
    </>);
}
