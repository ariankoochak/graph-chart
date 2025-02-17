"use server";

import AppError from "@/modules/AppError/AppError";
import Graph from "@/modules/Graph/Graph";

async function generateCsv(prevState, {csvDatas,editedNodes}) {
    try {
        const graph = new Graph(csvDatas);
        const newCsvDatas = graph.generateCsvDatas(editedNodes);
        const fileName = graph.generateCsvFile(newCsvDatas);
        return fileName;

    } catch (error) {
        throw new AppError("مشکلی در سرور پیش آمده", 500);
    }
}

export default generateCsv;
