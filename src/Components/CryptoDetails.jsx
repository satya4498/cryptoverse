import React,{useState,useEffect} from 'react'
import { Typography, Row, Col, Statistic, Divider,Tooltip } from 'antd'
import { useGetCryptoDataQuery,getCryptoCoinDetails } from '../services/cryptoServices'
import millify from 'millify'


const CryptoDetails = (props) => {
  const [id,setId] = useState(null)
  const [currentCoin,setCurrentCoin] = useState({})
  const { data, isLoading, isError } = useGetCryptoDataQuery()
  useEffect(() =>{
    let id = window?.location?.pathname.replace('/','')
    let uuid = id.split('/')[1]
    if(id?.length > 1){
      setId(uuid)    
    }
    const getCoinData = async ()=> {
      if(uuid){
        const response = await getCryptoCoinDetails(uuid)
        setCurrentCoin(response.data)
        console.log('crypto coin',response)
      }
    }
    getCoinData()
  },[data])
  return (
    <div style={{color:"darkgoldenrod"}}>
      <Typography.Title level={3}>Crypto Details</Typography.Title>
      <Divider/>
      <img alt={currentCoin?.coin?.name} src={currentCoin?.coin?.iconUrl} style={{ width: '40px' }} />
      <Typography.Paragraph style={{fontWeight:'600'}}>{currentCoin?.coin?.symbol}</Typography.Paragraph>
      <Typography.Paragraph style={{fontWeight:'600'}}>Description: {currentCoin?.coin?.description || 'Not Availavle'}</Typography.Paragraph>
      <Typography.Paragraph style={{fontWeight:'600'}}>Price: {millify(currentCoin?.coin?.price || 0.00)}</Typography.Paragraph>
      <Typography.Paragraph style={{fontWeight:'600'}}>Market Cap: {millify(currentCoin?.coin?.marketCap || 0.00)}</Typography.Paragraph>
    </div>
  )
}

export default CryptoDetails