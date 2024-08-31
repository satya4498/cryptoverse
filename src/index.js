import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
// import 'antd/dist/antd.css'
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';
import store from './redux/store';
// import './index.css'
import { AuthProvider } from './api/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
