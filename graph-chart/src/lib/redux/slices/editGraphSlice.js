import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    changeNodeViewRequest: {},
    ChangesHistory : []
};

export const editGraphSlice = createSlice({
    name: "editGraphSlice",
    initialState,
    reducers: {
        addChangeNodeViewRequest: (state, action) => {
            state.changeNodeViewRequest = { ...action.payload };
        },
        doneChangeNodeViewRequest : (state)=>{
            state.changeNodeViewRequest = {};
        },
        addChangeNodeViewToChangeHistory : (state,action) =>{
            let isFindInLoop = false
            for(let i = 0;i < state.ChangesHistory.length;i++){
                if(state.ChangesHistory[i].nodeId == action.payload.nodeId){
                    isFindInLoop = true
                    state.ChangesHistory[i].newColor = action.payload.newColor;
                    state.ChangesHistory[i].newIcon = action.payload.newIcon;
                }
            }
            if(!isFindInLoop){
                state.ChangesHistory.push({...action.payload});
            }
        }
    },
});

export const {
    addChangeNodeViewRequest,
    doneChangeNodeViewRequest,
    addChangeNodeViewToChangeHistory,
} = editGraphSlice.actions;

export default editGraphSlice.reducer;
