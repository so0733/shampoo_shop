import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";

import Header from './components/common/Header';
import MainPage from './components/views/MainPage';
import TopButton from './components/common/TopButton';
import Footer from './components/common/Footer';

import SignUpForm from './components/views/SignUpForm';
import LoginForm from './components/views/LoginForm';
import MyInfo from './components/views/info/MyInfo';
import Profile from './components/views/info/Profile';

import BrandPage from './components/views/navlink/BrandPage'; 
import StorePage from './components/views/navlink/StorePage';
import EventPage from './components/views/navlink/EventPage';
import DetailEventPage from './components/views/navlink/DetailEventPage';
import GamePage from './components/event/GamePage';
import NoticePage from './components/views/navlink/NoticePage';
import DetailNoticePage from './components/views/navlink/DetailNoticePage';

import SetPage from './components/store/SetPage';
import CarePage from './components/store/CarePage';
import EtcPage from './components/store/EtcPage';

import Cart from './components/cart/Cart';
import Order from './components/order/Order';

import AdminPage from './components/admin/AdminPage';

import DetailA from './components/store/detail/DetailA';
import DetailB from './components/store/detail/DetailB';
import DetailC from './components/store/detail/DetailC';
import DetailD from './components/store/detail/DetailD';
import DetailE from './components/store/detail/DetailE';
import DetailF from './components/store/detail/DetailF';
import DetailG from './components/store/detail/DetailG';
import DetailH from './components/store/detail/DetailH';
import DetailI from './components/store/detail/DetailI';
import OrderDetails from './components/views/info/OrderDetails';

function App() {
  return (
    <Routes>
      <Route path="/"
        element={
          <div>
            <Header />
            <MainPage />
            <TopButton />
            <Footer />
          </div>
        } /> 
        
      <Route path="/signup" element={<SignUpForm />} /> 
      <Route path="/login" element={<LoginForm />} />
      <Route path="/myinfo" element={<MyInfo />} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/orderdetails' element={<OrderDetails />} />
      
      <Route path="/brand" element={<BrandPage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/event/:eventId" element={<DetailEventPage />} />
      <Route path="/event/65d5d9430fb1a687b5afb5de" element={<GamePage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/notice/:noticeId" element={<DetailNoticePage />} />
      
      <Route path="/store/set" element={<SetPage />} />
      <Route path="/store/care" element={<CarePage />} />
      <Route path="/store/etc" element={<EtcPage />} />

      <Route path='/cart' element={<Cart />} />
      <Route path='/order' element={<Order />} />

      <Route path="/shampooshopadmin" element={<AdminPage />} />

      <Route path='/store/detail/a' element={<DetailA />} />
      <Route path='/store/detail/b' element={<DetailB />} />
      <Route path='/store/detail/c' element={<DetailC />} />
      <Route path='/store/detail/d' element={<DetailD />} />
      <Route path='/store/detail/e' element={<DetailE />} />
      <Route path='/store/detail/f' element={<DetailF />} />
      <Route path='/store/detail/g' element={<DetailG />} />
      <Route path='/store/detail/h' element={<DetailH />} />
      <Route path='/store/detail/i' element={<DetailI />} />
    </Routes>
  );
}

export default App;
