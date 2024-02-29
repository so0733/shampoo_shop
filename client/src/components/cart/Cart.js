import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Header from '../common/Header';
import Footer from '../common/Footer';

const Container = styled.div`
  display: flex;
  width: 1200px;
  height: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContentContainer = styled.div`
  display: inline-block;
  width: 800px;
  padding: 0 10px;
`;

const BolderFont = styled.h3`
  margin: 50px 0 50px 10px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  font-family: "gmarket_2_font";
  color: #393e46;
`;

const AllSelectContainer = styled.div`
  width: auto;
  padding: 0 20px;
  display: flex;
  align-items: baseline;
`;

const CartContainer = styled.div`
  display: flex;
  height: 603px;
  align-items: baseline;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const LargeCheckbox = styled.input`
  transform: scale(1.5);
`;

const SelectFont = styled.h3`
  font-size: 18px;
  font-family: "pretendard";
  color: #393e46;
`;

const Select2Font = styled.h3`
  font-size: 18px;
  margin-left: 10px;
  font-family: "pretendard";
  color: #ccc;
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 15px 0;
  font-family: "pretendard";
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #ccc;
  width: ${props => props.title ? '50%' : 'auto'};
`;

const TableCell = styled.td`
  padding: 15px 0;
  font-family: "pretendard";
  text-align: ${props => props.title ? 'start' : 'center'}; 
  border-bottom: 1px solid #ccc;
`;

const TotalContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const TotalFont = styled.h3`
  font-size: 16px;
  font-family: 300;
  margin: 0 5px;
  font-family: "pretendard";
  color: #ccc;
`;

const Total2Font = styled.h3`
  font-size: 18px;
  margin: 0 5px;
  font-weight: bold;
  font-family: "pretendard";
  color: #393e46;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-family: "pretendard";
  color: #393e46;
`;

const ListContainer = styled.div`
  display: inline-block;
  width: 400px;
  padding: 0 20px;
`;

const EmptyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 170px;
`;

const ListBoxContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: 500px;
  border: 1px solid black;
`;

const BoxBolderFont = styled.h3`
  margin: 30px 15px;
  text-align: start;
  font-size: 28px;
  font-weight: bold;
  font-family: "pretendard";
  color: #393e46;
`;

const OrderBox = styled.div`
  display: flex;
  margin: 10px 15px;
  padding: 10px 0 20px;
`;

const LeftBox = styled.div`
  width: 30%;
  font-size: 18px;
  color: #ccc;
  font-family: "pretendard";
`;

const RightBox = styled.div`
  width: 70%;
  font-size: 18px;
  font-weight: bold;
  font-family: "pretendard";
  text-align: end;
  color: #393e46;
`;

const PaymentBox = styled.div`
  display: flex;
  margin: 10px 15px;
  padding: 20px 0 20px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const OrderLeftBox = styled.div`
  width: 50%;
  font-size: 22px;
  font-weight: bold;
  font-family: "pretendard";
`;

const OrderRightBox = styled.div`
  width: 50%;
  font-size: 20px;
  font-weight: bold;
  font-family: "pretendard";
  text-align: end;
  color: #393e46;
`;

const SubmitButton = styled.button`
  display: block;
  width: 90%;
  padding: 10px 0 10px;
  margin: 30px auto 10px;
  font-size: 18px;
  font-family: "pretendard";
  color: white;
  background-color: #007D80;
  border: none;
  border-radius: 5px;
  cursor: pointer;  
`;

const SubmitButton2 = styled.button`
  display: block;
  width: 90%;
  padding: 10px 0 10px;
  margin: 30px auto 10px;
  font-size: 18px;
  font-family: "pretendard";
  color: #8FB8B2;
  background-color: white;
  border: 1px solid #8FB8B2;
  border-radius: 5px;
  cursor: pointer;  
`;

function Cart() {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cart/shoppingbasket');
        const data = response.data;

        setCart(data.cartItems);
      } catch (error) {
        console.error('장바구니 목록 조회 실패:', error.message);
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckboxChange = (index) => {
    const selectedIndex = selectedItems.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, index]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== index));
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allIndexes = cart.map((_, index) => index);
      setSelectedItems(allIndexes);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = async () => {
    try {
      console.log("Selected items:", selectedItems); // 추가
      await Promise.all(selectedItems.map(async (index) => {
        console.log("Deleting item:", cart[index]); // 추가
        await axios.delete(`http://localhost:3001/api/cart/remove/${cart[index]._id}`);
      }));
      setCart(cart.filter((_, index) => !selectedItems.includes(index)));
      setSelectedItems([]);
      setSelectAll(false);
    } catch (error) {
      console.error('선택된 상품 삭제 실패:', error.message);
    }
  };
  
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item, index) => {
      if (selectedItems.includes(index)) {
        totalPrice += parseInt(item.price) * item.quantity;
      }
    });
    return totalPrice;
  };

  const handleOrderAllItems = () => {
    const isLoggedIn = localStorage.getItem('username');

    if (isLoggedIn) {
    const itemsToOrder = cart.map(item => ({
      productImageURL: item.productImageURL,
      name: item.productName,
      price: item.price
    }));
    
    navigate('/order', { state: { selectedItems: itemsToOrder, quantity: 1 } });
    } else {
      alert('로그인 후에 사용 가능합니다.');
    }
  };

  const handleOrderSelectedItems = () => {
    const isLoggedIn = localStorage.getItem('username');

    if (isLoggedIn) {
      const selectedItemsToOrder = selectedItems.map(index => ({
        productImageURL: cart[index].productImageURL,
        name: cart[index].productName,
        price: cart[index].price
      }));
      
      navigate('/order', { state: { selectedItems: selectedItemsToOrder, quantity: 1 } });
    } else {
      alert('로그인 후에 사용 가능합니다.');
    }
  };
  
  
  return (
    <div>
      <Header />

      <Container>
        <ContentContainer>
          <BolderFont>장바구니</BolderFont>
          
          <AllSelectContainer>
            <LargeCheckbox type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            <SelectFont>&emsp;전체선택</SelectFont>
            <Select2Font>|</Select2Font>
            <Button onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>선택삭제</Button>
          </AllSelectContainer>

          <CartContainer>
            <CartTable>
              <thead>
                <tr>
                  <TableHeader>선택</TableHeader>
                  <TableHeader>이미지</TableHeader>
                  <TableHeader title>상품정보</TableHeader>
                  <TableHeader>판매가</TableHeader>
                  <TableHeader>수량</TableHeader>
                  <TableHeader>배송비</TableHeader>
                  <TableHeader>합계</TableHeader>
                </tr>
              </thead>

              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <TableCell colSpan="7" style={{ textAlign: 'center', padding: '200px', fontSize: '20px', color: '#ccc',fontFamily: 'pretendard' }}>
                      장바구니에 담긴 상품이 없습니다.
                    </TableCell>
                  </tr>
                ) : (
                  cart.slice(0, 6).map((item, index) => (
                    <tr key={index}>
                      <TableCell>
                        <LargeCheckbox  
                          type="checkbox" 
                          checked={selectedItems.includes(index)} 
                          onChange={() => handleCheckboxChange(index)} 
                        />
                      </TableCell>
                      <TableCell><img src={item.productImageURL} alt="Product" style={{ width: '60px', height: '60px' }} /></TableCell>
                      <TableCell title>{item.productName}</TableCell>
                      <TableCell>{parseInt(item.price).toLocaleString()}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{parseInt(item.price) * item.quantity >= 50000 ? '0' : '3,000'}</TableCell>
                      <TableCell>{(parseInt(item.price) * item.quantity + (parseInt(item.price) * item.quantity >= 50000 ? 0 : 3000)).toLocaleString()}</TableCell>
                    </tr>
                  ))
                )}
              </tbody>
            </CartTable>
          </CartContainer>

          <TotalContainer>
            <TotalFont>상품 구매 금액</TotalFont>
            <Total2Font>{calculateTotalPrice().toLocaleString()}원</Total2Font>
            <TotalFont> + 배송비</TotalFont>
            <Total2Font>{calculateTotalPrice() >= 50000? 0: 3000}원</Total2Font>
            <TotalFont> = 합계</TotalFont>
            <Total2Font>{(calculateTotalPrice() + (calculateTotalPrice() >= 50000 ? 0 : 3000)).toLocaleString()}원</Total2Font>
          </TotalContainer>
        </ContentContainer>

        <ListContainer>
          <EmptyContainer />
          <ListBoxContainer>
            <BoxBolderFont>결제 금액</BoxBolderFont>
            
            <OrderBox>
              <LeftBox> 총 주문 금액 </LeftBox>
              <RightBox>
                {calculateTotalPrice().toLocaleString()}원
              </RightBox>
            </OrderBox>

            <OrderBox>
              <LeftBox> 배송비 </LeftBox>
              <RightBox>
                {calculateTotalPrice() >= 50000? 0: 3000}원
              </RightBox>
            </OrderBox>
            
            <PaymentBox>
              <OrderLeftBox>결제 예정 금액</OrderLeftBox>
              <OrderRightBox>
                {(calculateTotalPrice() + (calculateTotalPrice() >= 50000 ? 0 : 3000)).toLocaleString()}원
              </OrderRightBox>
            </PaymentBox>

            <SubmitButton onClick={handleOrderAllItems}>전체 상품 주문</SubmitButton>
            <SubmitButton2 onClick={handleOrderSelectedItems}>선택 상품 주문</SubmitButton2>
          </ListBoxContainer>
        </ListContainer>
      </Container>

      <Footer />
    </div>
  )
};

export default Cart;
