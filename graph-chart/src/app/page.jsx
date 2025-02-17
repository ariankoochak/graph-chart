"use client";

import Chart from "@/components/Chart/Chart";
import GetCsv from "@/components/GetCsv/GetCsv";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

export default function MainPage() {
    const handleNodeClicked = (nodeId) => {
        console.log(nodeId);
    };

    return (
        <Provider store={store}>
            <section>
                <div className="csv-management-container">
                    <GetCsv/>
                </div>
                <div className="graph-chart-container">
                    <Chart onNodeClicked={handleNodeClicked} />
                </div>
                <div className="node-details"></div>
            </section>
        </Provider>
    );
}
