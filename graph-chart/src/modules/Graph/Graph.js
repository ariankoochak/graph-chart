import AppError from "@/modules/AppError/AppError";

import { Parser } from "json2csv";
import fs from "fs";
import path from "path";

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
            // console.log("finding last node...", this.#mainGraph[i]);
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
            nodes.push({
                name: node.id,
                itemStyle: { color: node.color },
                symbol: node.icon ? `image:///icons/${node.icon}` : "",
                symbolSize: 20,
            });
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
            // console.log(edge);
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

    /**
     *
     * @param {string} nodeId node id
     * @returns {object} node data - if not found node returns {}
     * @throws {Error} if nodeId not defined , throw Error
     */
    getNode(nodeId) {        
        if (!nodeId) {
            throw new AppError("node id not passed!", 412);
        }
        
        for (const node of this.#nodes) {
            if (node.id == nodeId) {
                const nodeConnections = this.#getNodeConnections(nodeId);
                console.log("nodeConnections", nodeConnections);
                
                return { ...node ,connections : nodeConnections};
            }
        }

        return {};
    }

    /**
     *
     * @param {string} nodeId node id
     * @returns {Array} node connections - if not found any connection returns []
     * @throws {Error} if nodeId not defined , throw Error
     */
    #getNodeConnections(nodeId) {
        if (!nodeId) {
            throw new AppError("node id not passed!", 412);
        }
        
        const connections = [];
        for(const edge of this.#edges){
            if(edge.target == nodeId || edge.source == nodeId){
                connections.push({
                    source: edge.source,
                    target: edge.target,
                    weight: edge.weight,
                });
            }
        }

        return connections;
    }

    generateCsvDatas(editGraphRows){
        for(let i = 0;i < this.#mainGraph;i++){
            console.log(this.#mainGraph[i]);
            
            if(this.#mainGraph[i].type === 'edge'){
                break;
            }

            for(const editedNode of editGraphRows){
                if (editedNode.nodeId === this.#mainGraph[i].id) {
                    if (editedNode.newIcon !== '')
                        this.#mainGraph[i].icon = editedNode.newIcon;
                    if(editedNode.newColor !== undefined)
                        this.#mainGraph[i].color = editedNode.newColor;
                }
            }
        }
        return this.#mainGraph
    }

    generateCsvFile(data){
        try {
            const fileName = Date.now()+'.csv'
            const fields = Object.keys(data[0]); 
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(data);

            const filePath = path.join(process.cwd(), "public", fileName);
            fs.writeFileSync(filePath, csv); 

            return "/"+fileName;
        } catch (error) {
            console.error("Error generating CSV:", error);
            return null;
        }
    }
}

export default Graph;