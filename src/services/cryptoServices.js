import axios from "axios";
import { createApi,fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie"
const host = process.env.REACT_APP_HOST
let token = Cookie.get('token')
 const cryptoApiHeaders = {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': '3881f835b7mshcdc185d253e66b4p1381b6jsn94eb41fcf016'
        }
  const   params = {
            referenceCurrencyUuid: 'yhjMzLPhuIDl'
          }
const baseUrl = 'https://coinranking1.p.rapidapi.com'
const createRequest = (url)=> ({url,headers:cryptoApiHeaders, params})
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoData: builder.query({
            query: ()=> createRequest('/stats')
        })
      })
})
export const {useGetCryptoDataQuery} = cryptoApi

export const getExchanges = async ()=> {
  
try {
const requestoptions = {
    method: 'GET',
    url: `${host}/api/v1/Exchanges`,
    params: {},
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true
}
	const response = await axios.request(requestoptions);
    return response.data;
} catch (error) {
    return null;
}
}
export const getCryptoCoinDetails = async (uuid) => {
const options = {
  method: 'GET',
  url: `${host}/api/v1/crypto`,
  params: {
    coinId: uuid
  },
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  withCredentials: true
};

try {
	const response = await axios.request(options);
	// console.log(response.data);
    return response.data;
} catch (error) {
    return null
}
}

export const getCoinList = async () => {
  const options = {
    method: 'GET',
    url: `${host}/api/v1/list`,
    params: {},
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true
  };
  
  try {
    const response = await axios.request(options);
    // console.log(response.data);
      return response.data;
  } catch (error) {
      return null
  }
}
export const getCryptoCoinData = async(coinId)=> {
  const options = {
    method: 'GET',
    url: `https://coingecko.p.rapidapi.com/coins/${coinId}`,
    params: {
      localization: 'true',
      tickers: 'true',
      market_data: 'true',
      community_data: 'true',
      developer_data: 'true',
      sparkline: 'false'
    },
    headers: {
      'x-rapidapi-key': '3881f835b7mshcdc185d253e66b4p1381b6jsn94eb41fcf016',
      'x-rapidapi-host': 'coingecko.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}