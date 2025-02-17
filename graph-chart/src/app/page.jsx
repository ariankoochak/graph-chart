"use client";

import Chart from "@/components/Chart/Chart";
import GetCsv from "@/components/GetCsv/GetCsv";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

import React, { useState } from "react";

export default function MainPage() {
    const [csv, setCsv] = useState([]);
    const handlePrepareCsv = (csv) => {
        setCsv(csv);
    };

    const handleNodeClicked = (nodeId) => {
        console.log(nodeId);
    };

    return (
        <Provider store={store}>
            <section>
                <div className="csv-management-container">
                    <GetCsv onGetCsv={handlePrepareCsv} />
                </div>
                <div className="graph-chart-container">
                    <Chart csv={csv} onNodeClicked={handleNodeClicked} />
                </div>
                <div className="node-details"></div>
            </section>
        </Provider>
    );
}
