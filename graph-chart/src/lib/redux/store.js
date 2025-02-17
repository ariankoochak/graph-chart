import { configureStore } from "@reduxjs/toolkit";
import csvSlice from "./slices/csvSlice";

export const store = configureStore({
    reducer: {
        csvSlice: csvSlice,
    },
});
