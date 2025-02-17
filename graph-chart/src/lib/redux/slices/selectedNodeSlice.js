import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedNodeId: '',
};

export const selectedNodeSlice = createSlice({
    name: "selectedNodeSlice",
    initialState,
    reducers: {
        clickNode: (state, action) => {
            state.selectedNodeId = action.payload;
        },
    },
});

export const { clickNode } = selectedNodeSlice.actions;

export default selectedNodeSlice.reducer;
