import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BsXLg, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { FiPlus, FiMinus } from "react-icons/fi";

import DetailSelect from './DetailSelect';

const Container = styled.div`
    flex-direction: column;
    align-items: center;
`;

const BaseFontStyles = css`
    text-align: left;
    font-family: "pretendard";
`;

const Title = styled.h3`
    margin: 10px 0;
    ${BaseFontStyles}
    font-size: 26px;
    font-weight: bold;
    color: black;
    white-space: nowrap;
`;

const Title2 = styled.h3`
    margin: 10px 0;
    ${BaseFontStyles}
    font-size: 18px;
    color: #ccc;
`;

const Title3 = styled.p`
    display: inline-block;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    text-decoration: line-through;
    font-family: "gmarket_3_font";
    color: #ccc;
`;

const Title4 = styled.h3`
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
    font-size: 24px;
    font-family: "gmarket_2_font";
    color: black;
`;

const Title5 = styled.h3`
    margin-left: 10px;
    display: inline-block;
    text-align: left;
    font-weight: bold;
    font-size: 16px;
    font-family: "gmarket_2_font";
    color: red;
`;

const Title6 = styled.h3`
    margin-left: 10px;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    font-family: "pretendard";
    color: black;
`;

const DeliveryContainer = styled.div`
    columns: 2;
    display: flex;
    gap: 15px;
    line-height: 1;
`;

const LeftContainer = styled.div`
    padding-left: 20px;
`;

const LeftTitle = styled.h3`
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    font-family: "pretendard";
`;

const RightContainer = styled.div`
    padding-left: 30px;
`;

const RightTitle = styled.h3`
    text-align: left;
    font-size: 16px;
    font-family: "pretendard";
`;

const Line = styled.div`
    width: 410px;
    border-bottom: 1px solid #ccc;
    margin-left: 10px;
    margin-top: 10px;
`;

const OptionContainer = styled.div`
    width: 410px;
    height: 80px;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NameContainer = styled.div`
    width: 410px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const QuantityContainer = styled.div`
    width: 410px;
    height: 50px;
    display: flex;
    align-items: center;
`;

const OptionNameTitle = styled.h3`
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    font-family: "pretendard";
`;

const OptionPriceTitle = styled.h3`
    margin-left: auto;
    margin-right: 10px;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    font-family: "pretendard";
`;

const CloseButton = styled(BsXLg)`
    margin-right: 10px;
    background: none;
    border: none;
    cursor: pointer;
`;

const QuantityButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border: 1px solid #ccc;
    border-radius: 50%;
    background-color: white;
    color: #ccc;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: #8FB8B2; 
        color: #8FB8B2;
    }
`;

const QuantityNumber = styled.span`
    display: inline-block;
    padding: 5px 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    background-color: white;
    color: black;
    border-radius: 5px;
`;

const TotalContainer = styled.div`
    width: 400px;
    height: 60px;
    margin-left: 10px;
    display: flex;
    align-items: center;
`;

const TotalTitle = styled.h3`
    margin-left: auto;
    text-align: right;
    font-size: 16px;
    font-weight: bold;
    font-family: "pretendard";
`;

const TotalPriceTitle = styled.h3`
    margin-left: auto;
    text-align: right;
    font-size: 22px;
    font-weight: bold;
    font-family: "pretendard";
`;

const AddToCartButton = styled.button`
    display: inline-block;
    width: 150px;
    padding: 10px 20px 5px;
    margin: 0 10px 0 20px;
    border: 1px solid #ccc;
    background-color: white;
    color: #8FB8B2;
    font-size: 20px;
    font-family: "gmarket_2_font";
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;

  &:hover {
    background-color: #eee;
  }
`;

const BuyNowButton = styled.button`
    display: inline-block;
    width: 150px;
    padding: 10px 20px 5px 20px;
    margin: 0 10px;
    border: none;
    background-color: #8FB8B2;
    color: white;
    font-size: 20px;
    font-family: "gmarket_2_font";
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #007D80;
    }
`;

const InterestButton = styled.button`
    display: inline-block;
    width: 50px;
    padding: 10px 10px 5px 10px;
    margin: 0 10px;
    border: none;
    background-color: #8FB8B2;
    color: white;
    color: ${({ active }) => (active ? '#E06666' : 'white')};
    font-size: 20px;
    font-family: "gmarket_2_font";
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ active }) => (active ? '#8FB8B2' : '#007D80')};
    }
`;

function DetailDChoice() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isInterest, setIsInterest] = useState(false);

    const navigate = useNavigate();

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setQuantity(1);
    };

    const handleClose = () => {
        setSelectedOption(null);
        setQuantity(1);
    };

    const handleIncreaseQuantity = () => {
        if (quantity < 10) {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else {
            alert("최대 주문 가능한 수량은 10개 입니다. 양해부탁드립니다.");
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity === 1) {
            alert("1개 이상 구매할 수 있는 상품입니다.");
        } else {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (!selectedOption) {
            alert("옵션을 선택해주세요");
        } else {
            try {
                // 현재 장바구니에 있는 상품 수 조회
                const { data } = await axios.get('http://localhost:3001/api/cart/shoppingbasket');
                const currentItemCount = data.cartItems.length;
    
                // 만약 현재 상품 수가 6개를 초과한다면 알림창을 띄움
                if (currentItemCount >= 6) {
                    alert("장바구니에 더 이상 상품을 추가할 수 없습니다.");
                } else {
                    // 장바구니에 추가할 내용
                    const cartItem = {
                        productId: selectedOption.productId,
                        productName: selectedOption.name,
                        productImageURL: selectedOption.productImageURL,
                        quantity: quantity,
                        price: selectedOption.price,
                    };
    
                    // API를 호출하여 장바구니에 상품 추가
                    await axios.post('http://localhost:3001/api/cart/add', cartItem);
                    navigate('/cart');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert("장바구니에 상품을 추가하는데 오류가 발생했습니다.");
            }
        }
    };

    const handleBuyNow = () => {
        const isLoggedIn = localStorage.getItem('username');
        
        if (isLoggedIn) {
            if (selectedOption) {
                navigate('/order', { state: { selectedItems: [selectedOption], quantity: quantity } });
            } else {
                alert("옵션을 선택해주세요.");
            }
        } else {
            alert("로그인이 필요합니다.");
            navigate('/login');
        }
    };
    
    const handleInterest = () => {
        setIsInterest(prevInterest => !prevInterest);
    };

    return (
        <div>
            <Container>
                <Title>샴푸샵 헤어 모이스처 세럼 70ml</Title>
                <Title2>건강하고 화려한 머릿결을 위한 완벽한 선택</Title2>
                <Title3>19,900원</Title3>
                <Title4>15,900원</Title4>
                <Title5>20%</Title5>
            </Container>

            <Container>
                <Title6>배송정보</Title6>

                <DeliveryContainer>
                    <LeftContainer>
                        <LeftTitle>국내·해외배송</LeftTitle>
                        <LeftTitle>배송방법</LeftTitle>
                        <LeftTitle>배송비</LeftTitle>
                    </LeftContainer>
                    <RightContainer>
                        <RightTitle>국내배송</RightTitle>
                        <RightTitle>택배</RightTitle>
                        <RightTitle>3,000원 (50,000원 이상 구매 시 무료)</RightTitle>
                    </RightContainer>
                </DeliveryContainer>
            </Container>

            <Line />

            <Container>
                <Title6>옵션선택</Title6>
                <DetailSelect onSelectOption={handleOptionSelect} />
            </Container>

            <Line />

            <Container>
                {selectedOption && (
                    <OptionContainer>
                        <NameContainer>
                            <OptionNameTitle>{selectedOption.name}</OptionNameTitle>
                            <CloseButton onClick={handleClose} />
                        </NameContainer>
                        <QuantityContainer>
                            <QuantityButton onClick={handleDecreaseQuantity}><FiMinus /></QuantityButton>
                            <QuantityNumber>{quantity}</QuantityNumber>
                            <QuantityButton onClick={handleIncreaseQuantity}><FiPlus /></QuantityButton>
                            <OptionPriceTitle>{(selectedOption.price * quantity).toLocaleString()}원</OptionPriceTitle>
                        </QuantityContainer>
                        <Line />
                    </OptionContainer>
                )}
            </Container>

            <TotalContainer>
                <TotalTitle>총 상품 금액 :</TotalTitle>
                <TotalPriceTitle>{selectedOption ? (selectedOption.price * quantity).toLocaleString() : "0"}원</TotalPriceTitle>
            </TotalContainer>

            <Container>
                <AddToCartButton onClick={handleAddToCart}>장바구니</AddToCartButton>
                <BuyNowButton onClick={handleBuyNow}>구매하기</BuyNowButton>
                <InterestButton active={isInterest} onClick={handleInterest}>
                    {isInterest ? <BsSuitHeartFill /> : <BsSuitHeart />}
                </InterestButton>
            </Container>
        </div>
    );
};

export default DetailDChoice;
