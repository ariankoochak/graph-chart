"use client";

import prepareGraphForHighCharts from "@/actions/prepareGraphForHighCharts";

import { startTransition, useActionState, useEffect, useState } from "react";
import DrawGraph from "../DrawGraph/DrawGraph";
import { useSelector } from "react-redux";


export default function Chart() {
    const csv = useSelector((state) => state.csvSlice.csvDatas); 

    const [warning, setWarning] = useState("");
    const [err, setErr] = useState("");

    const [graph, formAction, isPending] = useActionState(
        prepareGraphForHighCharts
    );
    useEffect(() => {
        try {
            if (csv.length > 0) {
                startTransition(() => {
                    formAction(csv);
                });
            }
        } catch (error) {
            errorHandlingForGraph(error.status);
        }
        
    }, [csv]);

     const errorHandlingForGraph = (errorStatus) => {
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

    if (err !== "") return <span className="error">{err}</span>;
    if (warning !== "") return <span className="warning">{warning}</span>;
    if (isPending) return <span className="success">در حال بارگذاری...</span>;
    if (graph) return <DrawGraph graph={graph}/>;
}
