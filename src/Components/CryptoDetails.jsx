import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Statistic, Divider, Tooltip } from 'antd'
import { useGetCryptoDataQuery, getCryptoCoinDetails, getCryptoCoinData } from '../services/cryptoServices'
import millify from 'millify'
import { ConsoleSqlOutlined } from '@ant-design/icons'


const CryptoDetails = (props) => {
  const [id, setId] = useState(null)
  const [currentCoin, setCurrentCoin] = useState({})
  const { data, isLoading, isError } = useGetCryptoDataQuery()
  useEffect(() => {
    let id = window?.location?.pathname.replace('/', '')
    let uuid = id.split('/')[1]
    if (id?.length > 1) {
      setId(uuid)
    }
    const getCoinData = async () => {
      if (uuid) {
        const response = await getCryptoCoinDetails(uuid)
        if (response) {
          setCurrentCoin(response.data)
        } else {
          const coinRes = await getCryptoCoinData(uuid)
          setCurrentCoin(coinRes)
          console.log(coinRes)
        }
      }
    }
    getCoinData()
  }, [data])
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