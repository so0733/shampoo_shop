import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 10px 0 10px 20px;
  padding: 0 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #8FB8B2;
  }
`;

const DropdownButton = styled.span`
  position: absolute;
  right: 10px;
`;

const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 210px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 5px;
  z-index: 1;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  img {
    width: 50px;
    height: 60px;
    margin-right: 10px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h3`
  text-align: left;
  font-size: 14px;
  font-family: "pretendard";
`;

const Title2 = styled.h3`
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  font-family: "pretendard";
`;

function DetailSelect({ onSelectOption }) {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cart/products');
        const data = response.data;
        
        setProducts(data.products);
      } catch (error) {
        console.error('상품 조회 실패:', error.message);
      }
    };
    
    fetchProducts();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onSelectOption(option);
    setIsOpen(false);
  };

  return (
    <Container>
      <DropdownContainer onClick={toggleDropdown}>
        [필수] 상품을 선택해주세요
        <DropdownButton>
          {isOpen ? <BsChevronUp /> : <BsChevronDown />}
        </DropdownButton>
      </DropdownContainer>

      {isOpen && (
        <DropdownOptions>
          {products.map(product => (
            <Option key={product.productId} onClick={() => handleOptionSelect({ productId: product.productId, name: product.productName, productImageURL: product.productImageURL, price: product.salesPrice })}>
              <img src={product.productImageURL} alt={product.productName} />
              <TitleContainer>
                <Title>{product.productName}</Title>
                <Title2>{product.salesPrice}원</Title2>
              </TitleContainer>
            </Option>
          ))}
        </DropdownOptions>
      )}

    </Container>
  );
};

export default DetailSelect;
