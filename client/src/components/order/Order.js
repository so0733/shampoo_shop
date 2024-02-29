import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../common/Header';
import Footer from '../common/Footer';

const Container = styled.div`
    display: flex;
    width: 1200px;
    height: auto;
    margin: 0 auto;
    padding: 0 20px;
`;

const ContentContainer = styled.div`
    display: inline-block;
    width: 100%;
`;

const BolderFont = styled.h3`
    margin: 10px 0 20px 0;
    font-size: 26px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    text-align: start;
`;

const OrderTable = styled.table`
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

const LargeCheckbox = styled.input`
    transform: scale(1.5);
`;

const TotalContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
    align-items: flex-end;
    justify-content: flex-end;
`;

const TotalFont = styled.h3`
    margin: 0 5px;
    font-size: 16px;
    font-family: 300;
    font-family: "pretendard";
    color: #ccc;
`;

const Total2Font = styled.h3`
    margin: 0 5px;
    font-size: 18px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
`;

const CancelButton = styled.button`
    font-size: 18px;
    font-family: "pretendard";
    color: #8FB8B2;
    background-color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    top: -25px;
`;

const InputContainer = styled.div`
    width: 100%;
    height: 600px;
    display: flex;
`;

const LeftContainer = styled.div`
    display: inline-block;
    width: 50%;
    padding: 30px;
    font-size: 18px;
    font-family: "pretendard";
`;

const RightContainer = styled.div`
    display: inline-block;
    width: 50%;
    margin-left: 200px;
    padding: 30px;
    font-size: 18px;
    font-family: "pretendard";
`;

const ListFont = styled.h3`
    width: 100%;
    margin: 10px 0 20px 0;
    padding: 5px;
    font-size: 24px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    text-align: start;
    border-bottom: 1px solid black;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const List = styled.p`
    display: flex;
    width: 120px;
    height: 30px;
    font-size: 16px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    align-items: center;
    justify-content: start;
`;

const DeliveryInput = styled.textarea`
    width: 300px;
    height: 90px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    resize: none;
`;

const DeliveryMemoSelect = styled.select`
    width: 300px;
    height: 45px;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Input = styled.input`
    width: 300px;
    height: 30px;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    pointer-events: none;
`;

const LeftBox = styled.div`
    display: flex;
    width: 120px;
    margin-left: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    font-family: 300;
    font-family: "pretendard";
    color: #ccc;
    align-items: start;
`;

const RightBox = styled.div`
  width: 300px;
  font-size: 18px;
  padding-right: 10px;
  font-weight: bold;
  font-family: "pretendard";
  text-align: end;
  color: #393e46;
`;

const PaymentBox = styled.div`
  display: flex;
  padding: 10px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const OrderLeftBox = styled.div`
    display: flex;
    width: 120px;
    font-size: 18px;
    font-weight: bold;
    font-family: "pretendard";
    color: #ccc;
    align-items: center;
    justify-content: center;
`;

const OrderRightBox = styled.div`
    width: 300px;
    font-size: 20px;
    font-weight: bold;
    font-family: "pretendard";
    text-align: end;
    color: #393e46;
`;

const PaymentButton = styled.label`
    display: inline-block;
    width: 130px;
    padding: 10px;
    margin-right: 10px;
    font-size: 16px;
    font-family: "pretendard";
    text-align: center;
    color: ${props => (props.active ? 'white' : '#393e46')};
    background-color: ${props => (props.active ? '#007D80' : 'transparent')};
    border: 1px solid #eee;
    border-radius: 5px;
    cursor: pointer;
`;

const SubmitButton = styled.button`
    width: 420px;
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

function Order() {
    const location = useLocation();
    const { selectedItems, quantity } = location.state;

    const [checkedItems, setCheckedItems] = useState([]);
    const [isCancelVisible, setCancelVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [deliveryMemo, setDeliveryMemo] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const navigate = useNavigate();

    const handleCheckboxChange = (index) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(item => item !== index));
            setCancelVisible(false);
        } else {
            setCheckedItems([...checkedItems, index]);
            setCancelVisible(true);
        }
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        selectedItems.forEach((item, index) => {
            if (checkedItems.includes(index)) {
                totalPrice += parseInt(item.price) * quantity;
            }
        });
        return totalPrice;
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/user/profile', {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(response.data.user);
            } catch (error) {
                console.error('프로필 정보를 가져오는 중에 오류가 발생했습니다', error);
            }
        };

        fetchUserInfo();
    }, []);

    const deliveryMemoOptions = [
        { value: '', label: '배송 메모를 선택해 주세요' },
        { value: '부재시 문앞에 놓아주세요', label: '부재시 문앞에 놓아주세요' },
        { value: '부재시 경비실에 맡겨 주세요', label: '부재시 경비실에 맡겨 주세요' },
        { value: '문 앞에 놓아주세요', label: '문 앞에 놓아주세요' },
        { value: '부재 시 연락 부탁드려요', label: '부재 시 연락 부탁드려요' },
        { value: '배송 전 미리 연락해주세요', label: '배송 전 미리 연락해주세요' },
    ];
    
    const handlePaymentMethodSelect = (paymentMethod) => {
        if (paymentMethod === '무통장 입금') {
            setSelectedPaymentMethod('무통장 입금');
        } else {
            setSelectedPaymentMethod(null);
            alert('준비중입니다');
        }
    };
    
    const handleCancelOrder = () => {
        navigate(-1);
    };

    const handlePayment = async () => {
        try {
            const paymentInfo = {
                orderInfo: {
                    orderNumber: 'SHAMPOOSHOP' + Math.floor(100000000000 + Math.random() * 900000000000).toString().substring(0, 12),
                    items: selectedItems.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: quantity
                    })),
                    totalPrice: calculateTotalPrice(),
                    shippingFee: calculateTotalPrice() >= 50000 ? 0 : 3000,
                    username: user.username,
                    customername: user.name,
                    phone: user.phone,
                    email: user.email,
                    deliveryAddress: `${user.address.zipcode} ${user.address.basicAddress} ${user.address.detailAddress} ${user.address.extraAddress}`,
                    deliveryMemo: deliveryMemo,
                    paymentMethod: selectedPaymentMethod
                }
            };
    
            await axios.post('http://localhost:3001/api/payment/orders', paymentInfo, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('결제가 완료되었습니다.');
            
            navigate('/');
        } catch (error) {
            console.error('결제 과정에서 오류가 발생했습니다:', error);
            alert('결제 과정에서 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };
    
    
    return (
        <div>
            <Header />
            
            <Container>
                <ContentContainer>
                    <BolderFont>주문 상품</BolderFont>
                    
                    <OrderTable>
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
                            {selectedItems.map((item, index) => (
                                <tr key={index}>
                                    <TableCell>
                                        <LargeCheckbox type="checkbox" onChange={() => handleCheckboxChange(index)} />
                                    </TableCell>
                                    <TableCell>
                                        <img src={item.productImageURL} alt="Product" style={{ width: '60px', height: '60px' }} />
                                    </TableCell>
                                    <TableCell title>{item.name}</TableCell>
                                    <TableCell>{parseInt(item.price).toLocaleString()}</TableCell>
                                    <TableCell>{quantity}</TableCell>
                                    <TableCell>{parseInt(item.price) * quantity >= 50000 ? '0' : '3,000'}</TableCell>
                                    <TableCell>{(parseInt(item.price) * quantity + (parseInt(item.price) * quantity >= 50000 ? 0 : 3000)).toLocaleString()}</TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </OrderTable>
                    
                    <TotalContainer>
                        <TotalFont>상품 구매 금액</TotalFont>
                        <Total2Font>{calculateTotalPrice().toLocaleString()}원</Total2Font>
                        <TotalFont> + 배송비</TotalFont>
                        <Total2Font>{calculateTotalPrice() >= 50000 ? 0 : 3000}원</Total2Font>
                        <TotalFont> = 합계</TotalFont>
                        <Total2Font>{(calculateTotalPrice() + (calculateTotalPrice() >= 50000 ? 0 : 3000)).toLocaleString()}원</Total2Font>
                    </TotalContainer>

                    {isCancelVisible && (
                        <CancelButton onClick={handleCancelOrder}>주문 취소</CancelButton>
                    )}

                    <InputContainer>
                        <LeftContainer>
                            <ListFont>주문자 정보</ListFont>

                            <Row>
                                <List>보내는 분</List>
                                <Input type="text" value={user ? user.name : ''} />
                            </Row>

                            <Row>
                                <List>휴대폰</List>
                                <Input type="text" value={user ? user.phone : ''} />
                            </Row>
                            
                            <Row>
                                <List>이메일</List>
                                <Input type="text" value={user ? user.email : ''} />
                            </Row> <br />

                            <ListFont>배송 정보</ListFont>

                            <Row>
                                <List>배송지</List>
                                <DeliveryInput 
                                    value={user ? `${user.address.zipcode}\n ${user.address.basicAddress}\n ${user.address.detailAddress} ${user.address.extraAddress}` : ''} 
                                    rows={4} 
                                />
                            </Row>

                            <Row>
                                <List>배송 요청사항</List>
                                <DeliveryMemoSelect value={deliveryMemo} onChange={(e) => setDeliveryMemo(e.target.value)}>
                                    {deliveryMemoOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </DeliveryMemoSelect>
                            </Row>

                        </LeftContainer>

                        <RightContainer>
                            <ListFont>결제 수단</ListFont>
                             <Row>
                                <PaymentButton active={selectedPaymentMethod === '신용카드'} onClick={() => handlePaymentMethodSelect('신용카드')}>
                                    신용카드
                                </PaymentButton>
                                <PaymentButton active={selectedPaymentMethod === '휴대폰 결제'} onClick={() => handlePaymentMethodSelect('휴대폰 결제')}>
                                    휴대폰 결제
                                </PaymentButton>
                                <PaymentButton active={selectedPaymentMethod === '무통장 입금'} onClick={() => handlePaymentMethodSelect('무통장 입금')}>
                                    무통장 입금
                                </PaymentButton>
                            </Row>

                            <ListFont>결제 금액</ListFont>

                            <Row>
                                <LeftBox>상품 구매 금액</LeftBox>
                                <RightBox>{calculateTotalPrice().toLocaleString()}원</RightBox>
                            </Row>

                            <Row>
                               <LeftBox>배송비</LeftBox>
                                <RightBox>{calculateTotalPrice() >= 50000 ? 0 : 3000}원</RightBox>
                            </Row>

                            <Row>
                                <PaymentBox>
                                    <OrderLeftBox>최종 결제 금액</OrderLeftBox>
                                    <OrderRightBox>{(calculateTotalPrice() + (calculateTotalPrice() >= 50000 ? 0 : 3000)).toLocaleString()}원</OrderRightBox>
                                </PaymentBox>
                            </Row>

                            <SubmitButton onClick={handlePayment}>결제하기</SubmitButton>
                        </RightContainer>
                    </InputContainer>
                </ContentContainer>
            </Container>
            
            <Footer />
        </div>
    );
}

export default Order;
