import AppError from "@/modules/AppError/AppError";

class Graph {
    #mainGraph = [];
    #nodes = [];
    #edges = [];
    #lastNodeIndex = -1;

    /**
     * @constructor
     * @param {Array<Object>} csvDatas Parsed csv file received from the user
     * @throws {Error} if csvDatas not an Array , returns error
     */
    constructor(csvDatas) {
        this.#validateCsvDatas(csvDatas);
        this.#mainGraph = csvDatas;

        this.#prepareLastNodeIndex();
        this.#prepareInitialDatas(csvDatas);
    }

    #validateCsvDatas(csvDatas) {
        if (!Array.isArray(csvDatas))
            throw new AppError("csv data not an array!", 422);

        if (csvDatas.length === 0)
            throw new AppError("csv data not valid - empty Array", 404);
    }

    #prepareInitialDatas() {
        const graphLength = this.#mainGraph.length;
        const lastNodeIndex = this.#lastNodeIndex;

        this.#nodes = this.#mainGraph.slice(0, lastNodeIndex);
        this.#edges = this.#mainGraph.slice(lastNodeIndex + 1, graphLength);
    }

    #prepareLastNodeIndex() {
        for (let i = 0; i < this.#mainGraph.length; i++) {
            console.log("finding last node...", this.#mainGraph[i]);
            if (this.#mainGraph[i].type !== "node") {
                this.#lastNodeIndex = --i;
                break;
            }
        }
    }

    /**
     * get nodes for use in highcharts data
     * @returns Array [{name : (node id) , itemStyle : {color: (hex) } },...]
     */
    getNodes() {
        const nodes = [];
        for (const node of this.#nodes) {
            nodes.push({ name: node.id, itemStyle: { color: node.color } });
        }
        return nodes;
    }

    /**
     * get edge for use in highcharts data
     * @returns Array [{ source: edge source name , target: edge target name },...]
     */
    getEdge() {
        const fromTo = [];

        for (const edge of this.#edges) {
            console.log(edge);
            fromTo.push({ source: edge.source, target: edge.target });
        }
        return fromTo;
    }

    getFullCsvArray() {
        return this.#mainGraph;
    }

    getCleanGraph() {
        return {
            nodes: this.getNodes(),
            edges: this.getEdge(),
        };
    }
}

export default Graph;