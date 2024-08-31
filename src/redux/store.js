import {configureStore} from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import { cryptoApi } from "../services/cryptoServices";
import {exchangeSlice,crypoCurrenciesSlice} from "./reducer"
export default configureStore({
reducer:{
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    exchange: exchangeSlice.reducer,
    coinList:crypoCurrenciesSlice.reducer
},
middleware: ((getDefaultMiddleware) => getDefaultMiddleware().concat(thunk,logger,cryptoApi.middleware))
,
})

