import { configureStore } from "@reduxjs/toolkit";
import csvSlice from "./slices/csvSlice";
import selectedNodeSlice from "./slices/selectedNodeSlice";

export const store = configureStore({
    reducer: {
        csvSlice: csvSlice,
        selectedNodeSlice : selectedNodeSlice,
    },
});
