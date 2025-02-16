'use server';

import AppError from "@/modules/AppError/AppError";
import Graph from "@/modules/Graph/Graph";

async function prepareGraphForHighCharts(prevState,csvDatas) {
    try {
        const initialGraphObject = new Graph(csvDatas);
        console.log(initialGraphObject.getCleanGraph());
        return initialGraphObject.getCleanGraph();
    } catch (error) {
        throw new AppError('مشکلی در سرور پیش آمده',500)
        
    }
}

export default prepareGraphForHighCharts;