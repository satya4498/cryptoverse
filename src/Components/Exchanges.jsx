import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { Card, Avatar, Row, Col, Typography, Tag } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import './exchanges.css'
import { getExchanges } from '../services/cryptoServices'
import { useDispatch } from 'react-redux';
import {exchangeSlice} from '../redux/reducer'
import { useAuth } from '../api/AuthContext';
const { Title, Text } = Typography;

const Exchanges = () => {
  const [exchangeData,setExchangeData] = useState([])
  const exchangesData = useSelector(state => state.exchange.exchanges)
  const dispatch = useDispatch()
  const { token } = useAuth();

  useEffect(() => {
    if(exchangesData){
      setExchangeData(exchangesData)
    }
  }, [exchangesData])
  useEffect(()=> {
    const getExchangesHandler = async () => {
      if(exchangesData?.length){
        return;
      }
      const exchanges = await getExchanges(token);
      if(exchanges){
        dispatch(exchangeSlice?.actions?.setExchanges(exchanges));
      }
      }
      getExchangesHandler()
  },[dispatch,exchangesData,token])
  return (
    <div className="Exchanges-Container"> 
    <Typography.Title style={{color:"green"}} level={2}>Exchanges</Typography.Title>
    {
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: 50 }}>
      {exchangeData && exchangeData.map((exchange) => (
        <Col key={exchange.id}>
          <Card
            hoverable
            style={{ width: 300, height: 270 }}
            // cover={<img style={{width:200,height:100}}  alt={exchange.name} src={exchange.image} />}
          >
            <Card.Meta
              avatar={<Avatar src={exchange.image} />}
              title={exchange.name}
              description={exchange.country}
            />
            <div style={{ marginTop: 16 }}>
              <Title level={5}>Trust Score: {exchange.trust_score}</Title>
              <Text>Rank: #{exchange.trust_score_rank}</Text>
              <br />
              <Text>
                24h Volume (BTC): {exchange.trade_volume_24h_btc.toFixed(2)}
              </Text>
              <br />
              <Text>
                Normalized Volume (BTC):{' '}
                {exchange.trade_volume_24h_btc_normalized.toFixed(2)}
              </Text>
              <br />
              {exchange.has_trading_incentive && (
                <Tag color="green">Trading Incentive Available</Tag>
              )}
              <br />
              <Text>Year Established: {exchange.year_established}</Text>
              <br />
              <a href={exchange.url} target="_blank" rel="noopener noreferrer">
                <LinkOutlined /> Visit Exchange
              </a>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
    }
    </div>
  )
}

export default Exchanges