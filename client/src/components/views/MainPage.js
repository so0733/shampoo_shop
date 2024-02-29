import React from 'react';
import styled from 'styled-components';

import MainCarousel from '../main/MainCarousel';
import BestProduct from '../main/BestProduct';
import MdPick from '../main/MdPick';
import BestReview from '../main/BestReview';
import ContactUs from '../main/ContactUs';

const Title = styled.h3`
  padding: 0 20px 0 20px;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  font-family: 'gmarket_2_font';
  color: #393e46;
`;

const MainPage = () => {
  return (
    <div>
      <MainCarousel />
      <Title>베스트 상품</Title>
      <BestProduct />
      <Title>MD's P!CK</Title>
      <MdPick />
      <Title>BEST REVIEW</Title>
      <BestReview />
      
      <ContactUs />
    </div>
  );
};

export default MainPage;
