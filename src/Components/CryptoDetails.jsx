import React, { useState, useEffect,useCallback } from 'react'
import { Typography, Divider} from 'antd'
import { getCryptoCoinDetails} from '../services/cryptoServices'
import millify from 'millify'
import { useAuth } from '../api/AuthContext';


const CryptoDetails = (props) => {
  const [currentCoin, setCurrentCoin] = useState({})
  const { token } = useAuth();

  const getCoinData = useCallback(async (uuid,token) => {
    if (uuid) {
      const response = await getCryptoCoinDetails(uuid,token)
      if (response?.data) {
        setCurrentCoin(response?.data)
      }else{
        setCurrentCoin(response)
      }
    }
  },[])
  useEffect(() => {
    let id = window?.location?.pathname.replace('/', '')
    let uuid = id.split('/')[1]
    if (id?.length > 1) {
      getCoinData(uuid,token)
    }

  }, [getCoinData,token])
  return (
    <div style={{ color: "darkgoldenrod" }}>
      <Typography.Title level={3}>Crypto Details</Typography.Title>
      <Divider />
      {<>
        <img alt={currentCoin?.coin?.name} src={currentCoin?.coin?currentCoin?.coin?.iconUrl:currentCoin?.image?.small} style={{ width: '40px' }} />
        <Typography.Paragraph style={{ fontWeight: '600' }}>{currentCoin?.coin?currentCoin?.coin?.symbol:currentCoin?.symbol}</Typography.Paragraph>
        <Typography.Paragraph style={{ fontWeight: '600' }}>Description: {currentCoin?.coin?currentCoin?.coin?.description:currentCoin?.description?.en || 'Not Availavle'}</Typography.Paragraph>
        <Typography.Paragraph style={{ fontWeight: '600' }}>Price: {millify(currentCoin?.coin?currentCoin?.coin?.price:currentCoin?.market_data?.current_price?.usd || 0.00)} $USD</Typography.Paragraph>
        <Typography.Paragraph style={{ fontWeight: '600' }}>Market Cap: {millify(currentCoin?.coin?currentCoin?.coin?.marketCap:currentCoin?.market_data?.market_cap?.usd || 0.00)}</Typography.Paragraph>
      </>}
    </div>
  )
}

export default CryptoDetails