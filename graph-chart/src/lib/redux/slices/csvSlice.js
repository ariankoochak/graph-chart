import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    csvDatas: [],
};

export const csvSlice = createSlice({
    name: "csvSlice",
    initialState,
    reducers: {
        addCsvDatas: (state, action) => {    // Test Function
            state.csvDatas = [...action.payload];
        },
    },
});

export const {
    addCsvDatas,
} = csvSlice.actions;

export default csvSlice.reducer;
