import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/redux-store';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/movie-search-app/' element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
