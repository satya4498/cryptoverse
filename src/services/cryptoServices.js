import axios from "axios";
import { createApi,fetchBaseQuery, } from "@reduxjs/toolkit/query/react";

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
        }),
        // getCryptoDetils: builder.query({
        //     query: '/exchanges',
        //     headers: cryptoApiHeaders
        // })
    
})
})
export const {useGetCryptoDataQuery} = cryptoApi

export const getCryptoDetils = async (params) => {
    try {
       
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin');
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto details:', error);
        return null;
    }
}

export const getCryptoCoinDetails = async (uuid) => {

const options = {
  method: 'GET',
  url: `https://coinranking1.p.rapidapi.com/coin/${uuid}`,
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    // uuid: uuid
  },
  headers: {
    'x-rapidapi-key': '3881f835b7mshcdc185d253e66b4p1381b6jsn94eb41fcf016',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	// console.log(response.data);
    return response.data;
} catch (error) {
	console.error(error);
    return null
}
}