import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

import maincarousel1 from '../../img/maincarousel/carousel1.png';
import maincarousel2 from '../../img/maincarousel/carousel2.png';
import maincarousel3 from '../../img/maincarousel/carousel3.png';
import maincarousel4 from '../../img/maincarousel/carousel4.png';

const Image = styled.img`
  width: 100%;
  height: 600px;
  padding-bottom: 20px;
`;

function MainCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} controls={false} variant="dark" >
      <Carousel.Item>
        <Image src={maincarousel1} alt="maincarousel1" />
      </Carousel.Item>

      <Carousel.Item>
        <Image src={maincarousel2} alt="maincarousel2" />
      </Carousel.Item>

      <Carousel.Item>
        <Image src={maincarousel3} alt="maincarousel3" />
      </Carousel.Item>

      <Carousel.Item>
        <Image src={maincarousel4} alt="maincarousel4" />
      </Carousel.Item>
      
    </Carousel>
  );
};

export default MainCarousel;
