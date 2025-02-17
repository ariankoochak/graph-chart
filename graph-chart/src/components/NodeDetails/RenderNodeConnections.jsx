"use client";

import { clickNode } from "@/lib/redux/slices/selectedNodeSlice";
import { useDispatch } from "react-redux";

export default function RenderNodeConnections({
    connections,
    nodeId,
    selectedNodeColor,
}) {
    const dispatch = useDispatch();

    const handleClickNode = (e) => {
        const clickedNodeId = e.target.innerHTML;
        if (clickedNodeId !== nodeId) {
            dispatch(clickNode(clickedNodeId));
        }
    };

    const render = () => {
        return connections.map((connection, index) => {
            return (
                <div key={index} className="connection">
                    From :{" "}
                    <button
                        onClick={handleClickNode}
                        className={
                            nodeId === connection.source ? `opened-node` : ""
                        }
                        style={
                            nodeId === connection.source
                                ? { background: selectedNodeColor, cursor:'default' }
                                : {}
                        }
                    >
                        {connection.source}
                    </button>{" "}
                    --To--&gt;{" "}
                    <button
                        onClick={handleClickNode}
                        className={
                            nodeId === connection.target ? `opened-node` : ""
                        }
                        style={
                            nodeId === connection.target
                                ? { background: selectedNodeColor , cursor:'default'}
                                : {}
                        }
                    >
                        {connection.target}
                    </button>
                </div>
            );
        });
    };
    return <div className="connection-container">{render()}</div>;
}
