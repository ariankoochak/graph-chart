import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    graph: [],
};

export const graphSlice = createSlice({
    name: "graphSlice",
    initialState,
    reducers: {
        addToGraph: (state, action) => {    // Test Function
            state.graph = [...action.payload];
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addToGraph,
} = graphSlice.actions;

export default graphSlice.reducer;
