'use client'

import { clickNode } from "@/lib/redux/slices/selectedNodeSlice";
import { useDispatch } from "react-redux";

export default function RenderNodeConnections({connections,nodeId}) {
    const dispatch = useDispatch();
    
    const handleClickNode = (e)=>{
        const clickedNodeId = e.target.innerHTML;
        if(clickedNodeId !== nodeId){
            dispatch(clickNode(clickedNodeId))
        }
    }

    const render = ()=> {
        return connections.map((connection,index)=>{
            return (
                <div key={index} className="connection">
                    From : <button onClick={handleClickNode}>{connection.source}</button> --To--&gt;{" "}
                    <button onClick={handleClickNode}>{connection.target}</button>
                </div>
            );
        })
    }
  return (
    <div className="connection-container">{render()}</div>
  )
}
