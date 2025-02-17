import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    csvDatas: [],
};

export const csvSlice = createSlice({
    name: "csvSlice",
    initialState,
    reducers: {
        addCsvDatas: (state, action) => {
            state.csvDatas = [...action.payload];
        },
    },
});

export const {
    addCsvDatas,
} = csvSlice.actions;

export default csvSlice.reducer;
