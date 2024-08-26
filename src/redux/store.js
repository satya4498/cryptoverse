import {configureStore} from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import { cryptoApi } from "../services/cryptoServices";
export default configureStore({
reducer:{
    [cryptoApi.reducerPath]: cryptoApi.reducer
},
middleware: ((getDefaultMiddleware) => getDefaultMiddleware().concat(thunk,logger,cryptoApi.middleware))
,
})

