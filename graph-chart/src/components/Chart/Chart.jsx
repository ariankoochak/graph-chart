"use client";

import prepareGraphForHighCharts from "@/actions/prepareGraphForHighCharts";

import { startTransition, useActionState, useEffect, useState } from "react";
import DrawGraph from "../DrawGraph/DrawGraph";


export default function Chart({ csv }) {
    const [warning, setWarning] = useState("");
    const [err, setErr] = useState("");

    const [graph, formAction, isPending] = useActionState(
        prepareGraphForHighCharts
    );
    useEffect(() => {
        if (csv.length > 0) {
            startTransition(() => {
                formAction(csv);
            });
        }
    }, [csv]);

    const [options, setOptions] = useState(null);
    const [Highcharts, setHighcharts] = useState(null);

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

    const initializeGraphObject = () => {
        try {
            if (graph) {
                prepareOptionForHighCharts(graph);
                setErr("");
                setWarning("");
            }
        } catch (error) {
            errorHandlingInInitializeGraphObject(error.status);
        }
    };

    const errorHandlingInInitializeGraphObject = (errorStatus) => {
        switch (errorStatus) {
            case 404:
                setWarning("فایل csvیی انتخاب نشده");
                break;
            case 422:
                setErr("لطفا فایل csv خود را با فرمت صحیح آپلود کنید");
                break;
            default:
                setErr("مشکلی پیش آمده - ارور نامشخص");
        }
    };

    const prepareOptionForHighCharts = (graph) => {
        if (Highcharts && graph) {
            setOptions({
                boost: {
                    useGPUTranslations: true,
                    usePreallocated: true,
                },
                chart: {
                    type: "networkgraph",
                    marginTop: 80,
                    height : '96.5%',
                },
                title: {
                    text: "Graph",
                },
                plotOptions: {
                    networkgraph: {
                        keys: ["from", "to"],
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
                        data: graph.edges.slice(0, 800),
                    },
                ],
            });
        }
    };

    useEffect(() => {
        initializeGraphObject();
    }, [graph]);

    if (err !== "") return <span className="error">{err}</span>;
    if (warning !== "") return <span className="warning">{warning}</span>;
    if (isPending) return <span className="success">در حال بارگذاری...</span>;
    if (graph) return <DrawGraph graph={graph}/>;
}
