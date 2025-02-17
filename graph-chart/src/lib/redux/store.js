import { configureStore } from "@reduxjs/toolkit";
import graphSlice from "./slices/graphSlice";

export const store = configureStore({
    reducer: {
        graphSlice: graphSlice,
    },
});
