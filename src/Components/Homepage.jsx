import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic, Divider,Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { getExchanges } from '../services/cryptoServices'
import { useGetCryptoDataQuery } from '../services/cryptoServices'
import { useDispatch,useSelector } from 'react-redux';
import {exchangeSlice} from '../redux/reducer'

const { Title } = Typography
const Homepage = () => {
  const [cryptoDetails, setCryptoDetails] = useState(null)
  const { data, isLoading, isError } = useGetCryptoDataQuery()
  const exchangesData = useSelector(state => state.exchange.exchanges)

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (data && !isLoading && !isError) {
      setCryptoDetails(data)
    }
  }, [data, isLoading, isError,dispatch])
  useEffect(()=> {
    const getExchangesHandler = async () => {
      if(exchangesData?.length){
        return;
      }
      const exchanges = await getExchanges();
      if(exchanges){
        dispatch(exchangeSlice.actions.setExchanges(exchanges));
      }
      }
      getExchangesHandler()
  },[dispatch,exchangesData])

  return (
    <div>
      <Title level={2} className='homepage text-white'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total cryptocurrencies" value={millify(cryptoDetails?.data?.totalCoins || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(cryptoDetails?.data?.totalExchanges || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(cryptoDetails?.data?.totalMarketCap || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24-hour Volume" value={millify(cryptoDetails?.data?.total24hVolume || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(cryptoDetails?.data?.totalMarkets || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="BTC Dominance" value={millify(cryptoDetails?.data?.btcDominance || 0)} />
        </Col>
      </Row>
      <Divider/>
      <Row>

        <Col span={12}>
          <Title level={4} style={{ color: 'Highlight' }}>Best Three Crypto Coins</Title>
          <Row>
            {
              cryptoDetails?.data?.bestCoins.map((eachCoins) => {
                return (
                  <Col span={6}>
                    <Link to={`/crypto/${eachCoins?.uuid}?coinId=${eachCoins?.uuid}`}>                      
                    <Tooltip placement="topLeft" color="#7ab5c2" zIndex={1} title={eachCoins?.name}>
                      <img alt={eachCoins?.name} src={eachCoins?.iconUrl} style={{ width: '20%' }} />
                        {/* <Typography.Text type="secondary">{eachCoins.symbol}</Typography.Text> */}
                        <Typography.Paragraph>{eachCoins.symbol}</Typography.Paragraph>
                      </Tooltip>
                    </Link>
                  </Col>
                )
              })
            }
          </Row>
        </Col>
        <Col span={12}>
          <Title level={4} style={{ color: 'Highlight' }}>Latest Crypto Currency</Title>
          <Row>
            {
              cryptoDetails?.data?.newestCoins?.map((eachCoins) => {
                return (
                  <Col span={6}>
                    <Link to={`/crypto/${eachCoins?.uuid}?coinId=${eachCoins?.uuid}`}>
                    <Tooltip placement="topLeft" zIndex={1} color="#7ab5c2" title={eachCoins?.name}>
                      <img alt={eachCoins?.name} src={eachCoins?.iconUrl} style={{ width: '20%' }} />
                      <Typography.Paragraph>{eachCoins.symbol}</Typography.Paragraph>
                      </Tooltip>
                    </Link>
                  </Col>
                )
              })
            }
          </Row>
        </Col>
      </Row>
      <Divider />

    </div>
  )
}

export default Homepage