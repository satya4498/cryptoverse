import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    exchanges: [],
    coinLists:[]
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


export const crypoCurrenciesSlice = createSlice({
    name: 'coinLists',
    initialState,
    reducers: {
        setCoinList: (state,action) => {
            state.coinLists = action.payload
        }
    }

})