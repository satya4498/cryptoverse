import React,{useEffect,useState,useCallback} from 'react'
import { List, Card, Pagination, Typography, Button} from 'antd';
import {getCoinList} from '../services/cryptoServices'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {crypoCurrenciesSlice} from '../redux/reducer'

const Cryptocurrencies = () => {
  const [coinList,setCoinList] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const coinListData = useSelector(state=>state.coinList.coinLists)

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = coinList?.slice(startIndex, endIndex);

  const dispatch = useDispatch()

  const loadCoinList = useCallback(async()=> {
    if(coinListData?.length) {
      return;
    }; 
    const response = await getCoinList()
    setCoinList(response)
    if(response){
    dispatch(crypoCurrenciesSlice.actions.setCoinList(response))
    }
  },[dispatch,coinListData])
  useEffect(()=>{
    setCoinList(coinListData)
  },[coinListData])

  useEffect(()=> {
    loadCoinList()
    return ()=>{}
  },[loadCoinList])
  return (
    <div>
      <Typography.Title level={3} >Cryptocurrency</Typography.Title>

    <div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={currentData}
        renderItem={item => (
          <List.Item>
            <Card title={item.name}>
              <p><strong>ID:</strong> {item.id}</p>
              <p><strong>Symbol:</strong> {item.symbol}</p>
              <p><strong>Name:</strong> {item.name}</p>
              <Button type='primary'  onClick={()=>navigate(`/crypto/${item.id}`)}>Details</Button>
            </Card>
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={coinList?.length}
        onChange={handleChangePage}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
      />
      </div>
    </div>
  )
}

export default Cryptocurrencies