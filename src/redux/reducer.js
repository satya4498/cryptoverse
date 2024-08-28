import { createSlice } from "@reduxjs/toolkit";

let initialState ={
    exchanges: [],
}

export const exchangeSlice = createSlice({
    name: 'exchanges',
    initialState,
    reducers: {
        setExchanges: (state, action) => {
            state.exchanges = action.payload;
        },
    },
})