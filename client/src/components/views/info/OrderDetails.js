import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ReviewModal from '../info/Review';

const Container = styled.div`
    display: inline-block;
    width: 800px;
    height: 950px;
    margin: 0 auto;
    padding: 20px;
`;

const BolderFont = styled.h3`
    margin: 10px 0 20px 0;
    font-size: 26px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    text-align: start;
`;

const SubTitleFont = styled.h3`
    text-align: center;
    font-size: 18px;
    font-family: "pretendard";
    color: #ccc;
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
    width: ${props => props.title ? '40%' : 'auto'};
`;

const TableCell = styled.td`
    padding: 15px 0;
    font-family: "pretendard";
    text-align: ${props => props.title ? 'start' : 'center'};
    border-bottom: 1px solid #ccc;
    white-space: pre-line;
`;

const ModalContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const Label = styled.div`
    width: 100px;
    font-family: "pretendard";
    font-weight: bold;
`;

const Info = styled.div`
    width: 350px;
    font-family: "pretendard";
    white-space: pre-line;
`;

const Info2 = styled.div`
    width: 320px;
    margin-left: 100px;
    font-family: "pretendard";
    white-space: pre-line;
`;

const Line = styled.h3`
    width: 100%;
    border-bottom: 1px solid #ccc;
`;

const DeleteButton = styled(Button)`
    font-size: 18px;
    color: #dc3545;
    border-color: #dc3545;
`;

const ReviewButton = styled(Button)`
    font-size: 18px;
    font-family: "pretendard";
    color: white;
    background-color: #8FB8B2;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #007D80;
    }
`;


function OrderDetails() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/payment/orders/user/${username}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (username) {
            fetchOrders();
        }
    }, [username]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const handleProductInfoClick = (order) => {
        if (order.status !== '취소요청') {
            setSelectedOrder(order);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
    };

    const handleCancelOrder = async () => {
        try {
            await axios.put(`http://localhost:3001/api/payment/orders/${selectedOrder.orderNumber}/cancel`);
            
            // 주문 취소 후 상태 업데이트
            setOrders(prevOrders => prevOrders.map(order => {
                if (order.orderNumber === selectedOrder.orderNumber) {
                    return { ...order, status: '취소 요청' };
                }
                return order;
            }));

            handleCloseModal();
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    const handleReviewButtonClick = (order) => {
        setSelectedOrder(order);
        setShowReviewModal(true);
    };
    
    return (
        <Container>
            <BolderFont>주문 조회</BolderFont>
    
            {orders.length === 0 ? (
                <SubTitleFont>주문 내역이 없습니다.</SubTitleFont>
            ) : (
                <OrderTable>
                    <thead>
                        <tr>
                            <TableHeader>No</TableHeader>
                            <TableHeader title>상품정보</TableHeader>
                            <TableHeader>결제일</TableHeader>
                            <TableHeader>결제금액</TableHeader>
                            <TableHeader>배송상태</TableHeader>
                            <TableHeader>비고</TableHeader>
                        </tr>
                    </thead>
    
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell title clickable onClick={() => handleProductInfoClick(order)}>{order.items.map(item => `${item.name} x${item.quantity}`).join('\n')}</TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>{order.totalPrice}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <ReviewModal show={showReviewModal} handleClose={() => setShowReviewModal(false)} productInfo={selectedOrder && selectedOrder.items.map(item => `${item.name}`).join('\n')} />
                                    {order.status === "배송완료" && (
                                        <ReviewButton onClick={() => handleReviewButtonClick(order)}>리뷰쓰기</ReviewButton>
                                    )}
                                </TableCell>
                            </tr>
                        ))}

                    </tbody>
                </OrderTable>
            )}
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>주문 상세 정보</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {selectedOrder && (
                        <div>
                            <ModalContainer>
                                <Label>주문번호</Label>
                                <Info>{selectedOrder.orderNumber}</Info>
                            </ModalContainer>
                            
                            <Line />
                            
                            <ModalContainer>
                                <Label>상품정보</Label>
                                <Info>{selectedOrder.items.map(item => `${item.name} x ${item.quantity}`).join('\n')}</Info>
                            </ModalContainer>
                            
                            <ModalContainer>
                                <Label>결제금액</Label>
                                <Info>{selectedOrder.totalPrice}</Info>
                            </ModalContainer>

                            <ModalContainer>
                                <Label>결제일자</Label>
                                <Info>{formatDate(selectedOrder.createdAt)}</Info>
                            </ModalContainer>

                            <Line />

                            <ModalContainer>
                                <Label>결제수단</Label>
                                <Info>{selectedOrder.paymentMethod}</Info>
                            </ModalContainer>
                            
                            <ModalContainer>
                                <Info2>
                                    샴푸은행 : 123 - 456 - 789100 <br />
                                    예금주 : 샴푸샵 <br /><br />
                                    ※ 무통장 입금 구매 시 ※<br />"보내시는 분" 과 "입금자"의 이름을 같게 해주시기 바랍니다. <br />
                                    문의사항 :  1588 - 0000 (샴푸샵)
                                </Info2>
                            </ModalContainer>

                            <Line />

                            <ModalContainer>
                                <Label>보내는 분</Label>
                                <Info>{selectedOrder.customername}</Info>
                            </ModalContainer>
                            
                            <ModalContainer>
                                <Label>휴대폰</Label>
                                <Info>{selectedOrder.phone}</Info>
                            </ModalContainer>
                            
                            <ModalContainer>
                                <Label>이메일</Label>
                                <Info>{selectedOrder.email}</Info>
                            </ModalContainer>

                            <Line />

                            <ModalContainer>
                                <Label>배송주소</Label>
                                <Info>{selectedOrder.deliveryAddress}</Info>
                            </ModalContainer>
                            <ModalContainer>
                                <Label>배송메모</Label>
                                <Info>{selectedOrder.deliveryMemo}</Info>
                            </ModalContainer>
            
                            <ModalContainer>
                                {selectedOrder.status !== "배송완료" && (
                                    <DeleteButton variant="outline-danger" onClick={handleCancelOrder}>주문 취소</DeleteButton>
                                )}
                            </ModalContainer>
                        </div>
                    )}
                </Modal.Body>
                
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <Button variant="outline-light" onClick={handleCloseModal} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 닫기 </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );    
}

export default OrderDetails;