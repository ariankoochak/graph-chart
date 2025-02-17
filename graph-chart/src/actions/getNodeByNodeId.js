"use server";

import AppError from "@/modules/AppError/AppError";
import Graph from "@/modules/Graph/Graph";

async function getNodeByNodeId(prevState, {csv,nodeId}) {
    try {
        const graph = new Graph(csv);
        
        return graph.getNode(nodeId);;
    } catch (error) {
        throw new AppError("مشکلی در سرور پیش آمده", 500);
    }
}

export default getNodeByNodeId;
