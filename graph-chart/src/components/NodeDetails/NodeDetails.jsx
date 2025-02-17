"use client";

import getNodeByNodeId from "@/actions/getNodeByNodeId";
import { useEffect, startTransition, useState, useActionState } from "react";
import { useSelector } from "react-redux";
import RenderNodeConnections from "./RenderNodeConnections";
import SeparatorLine from "../SeparatorLine/SeparatorLine";
import ChangeColorInput from "./ChangeColorInput";

export default function NodeDetails() {
    const [err, setErr] = useState("");

    const nodeId = useSelector(
        (state) => state.selectedNodeSlice.selectedNodeId
    );
    const csv = useSelector((state) => state.csvSlice.csvDatas);

    const changeNodeViewHistory = useSelector(
        (state) => state.editGraphSlice.ChangesHistory
    );

    const [nodeData, formAction, isPending] = useActionState(getNodeByNodeId);

    useEffect(() => {
        try {
            if (csv.length > 0 && nodeId !== "") {
                startTransition(() => {
                    formAction({ csv, nodeId });
                });
            }
        } catch (error) {
            setErr("مشکلی پیش آمده . لطفا مجددا صفحه را رفرش کنید");
        }
    }, [nodeId]);

    const getNodeView = (reqView)=>{
        console.log(changeNodeViewHistory);
        
        for (const row of changeNodeViewHistory) {
            if (row.nodeId === nodeId) {
                return reqView === 'color' ? row.newColor : row.newIcon;
            }
        }
        return reqView === "color" ? nodeData.color : nodeData.icon;
    }

    if (nodeId === "") return <></>;
    else if (isPending)
        return <span className="success">در حال بارگذاری...</span>;
    else if (nodeData)
        return (
            <div className="node-datas">
                <div
                    className="node-color"
                    style={{ background: getNodeView('color')}}
                />
                <div className="node-id">ID: {nodeData.id}</div>
                <div className="node-label">Label : {nodeData.label}</div>
                <SeparatorLine />
                <div className="node-connections-container">
                    <RenderNodeConnections
                        connections={nodeData.connections}
                        nodeId={nodeId}
                        selectedNodeColor={getNodeView('color')}
                    />
                </div>
                <SeparatorLine />
                <div className="change-color-input-container">
                    <ChangeColorInput
                        nodeId={nodeId}
                        nodeColor={getNodeView('color')}
                    />
                </div>
                <SeparatorLine />
            </div>
        );
}
