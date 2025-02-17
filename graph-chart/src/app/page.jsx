"use client";

import Chart from "@/components/Chart/Chart";
import GetCsv from "@/components/GetCsv/GetCsv";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import NodeDetails from "@/components/NodeDetails/NodeDetails";

export default function MainPage() {
    return (
        <Provider store={store}>
            <section>
                <div className="csv-management-container">
                    <GetCsv/>
                </div>
                <div className="graph-chart-container">
                    <Chart/>
                </div>
                <div className="node-details">
                    <NodeDetails/>
                </div>
            </section>
        </Provider>
    );
}
