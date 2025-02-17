"use client";

import getNodeByNodeId from "@/actions/getNodeByNodeId";
import { useEffect, startTransition, useState, useActionState } from "react";
import { useSelector } from "react-redux";

export default function NodeDetails() {
    const [err, setErr] = useState("");

    const nodeId = useSelector(
        (state) => state.selectedNodeSlice.selectedNodeId
    );
    const csv = useSelector((state) => state.csvSlice.csvDatas);

    const [nodeData, formAction, isPending] = useActionState(
        getNodeByNodeId
    );

    useEffect(() => {
        try {
            if (csv.length > 0 && nodeId !== "") {
                startTransition(() => {
                    formAction({csv, nodeId});
                });
            }
        } catch (error) {
            setErr("مشکلی پیش آمده . لطفا مجددا صفحه را رفرش کنید");
        }
    }, [nodeId]);

    if (nodeId === "") return <></>;
    else if (isPending) return <span className="success">در حال بارگذاری...</span>
    else if(nodeData) return (
        <div className="node-datas">
            {console.log(nodeData.connections)}
            <div className="node-id">ID: {nodeData.id}</div>
            <div className="node-label">Label : {nodeData.label}</div>
            <div className="node-color">Color : {nodeData.color}</div>
            <div className="node-connections-container"></div>
        </div>
    );
}
