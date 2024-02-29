import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
    width: ${props => {
        if (props.list) return '10%';
        if (props.list1) return '30%';
        if (props.list2 || props.list3 || props.list4) return '10%';
        return 'auto';
    }};
`;

const TableCell = styled.td`
    padding: 15px 0;
    font-family: "pretendard";
    text-align: ${props => props.title ? 'start' : 'center'};
    border-bottom: 1px solid #ccc;
    white-space: pre-line;
    cursor: pointer;
`;

const SelectCell = styled.td`
    padding: 10px;
    font-family: "pretendard";
    text-align: center;
`;

const Select = styled.select`
    width: 150px;
    padding: 5px;
    font-family: "pretendard";
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

const Line = styled.h3`
    width: 100%;
    border-bottom: 1px solid #ccc;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PageNumber = styled.div`
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: ${props => props.active ? '#8FB8B2' : 'white'};
    color: ${props => props.active ? 'white' : '#8FB8B2'};
    border: 1px solid #8FB8B2;
    border-radius: 5px;

    &:hover {
        background-color: #c6a8b4;
        color: white;
    }
`;

function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 7;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/payment/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const handleStatusChange = async (orderNumber, event) => {
        const newStatus = event.target.value;
        try {
            await fetch(`http://localhost:3001/api/payment/orders/${orderNumber}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            const response = await fetch('http://localhost:3001/api/payment/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleShowModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
    };

    const paginate = (array, page_number, page_size) => {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <BolderFont>주문 조회</BolderFont>

            <OrderTable>
                <thead>
                    <tr>
                        <TableHeader list>No</TableHeader>
                        <TableHeader list1>상품정보</TableHeader>
                        <TableHeader list2>결제일</TableHeader>
                        <TableHeader list3>결제금액</TableHeader>
                        <TableHeader list4>배송상태</TableHeader>
                    </tr>
                </thead>

                <tbody>
                    {paginate(orders, currentPage, ITEMS_PER_PAGE).map((order, index) => (
                        <tr key={order._id}>
                            <TableCell onClick={() => handleShowModal(order)}>{index + 1}</TableCell>
                            <TableCell title onClick={() => handleShowModal(order)}>{order.items.map(item => `${item.name} x${item.quantity}`).join('\n')}</TableCell>
                            <TableCell onClick={() => handleShowModal(order)}>{formatDate(order.createdAt)}</TableCell>
                            <TableCell onClick={() => handleShowModal(order)}>{order.totalPrice}</TableCell>
                            <TableCell>
                                <SelectCell>
                                    <Select value={order.status} onChange={(event) => handleStatusChange(order.orderNumber, event)}>
                                        <option value="주문접수">주문접수</option>
                                        <option value="결제완료">결제완료</option>
                                        <option value="배송준비중">배송준비중</option>
                                        <option value="배송중">배송중</option>
                                        <option value="배송완료">배송완료</option>
                                        <option value="취소요청">취소요청</option>
                                        <option value="취소완료">취소완료</option>
                                    </Select>
                                </SelectCell>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </OrderTable>

            <Pagination>
                {Array.from({ length: Math.ceil(orders.length / ITEMS_PER_PAGE) }, (_, i) => (
                    <PageNumber key={i} onClick={() => handlePageChange(i + 1)} active={currentPage === i + 1}>
                        {i + 1}
                    </PageNumber>
                ))}
            </Pagination>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>주문 상세 정보</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <div>
                        <ModalContainer>
                            <Label>주문번호</Label>
                            <Info>{selectedOrder && selectedOrder.orderNumber}</Info>
                        </ModalContainer>
                            
                        <Line />
                            
                        <ModalContainer>
                            <Label>상품정보</Label>
                            <Info>{selectedOrder && selectedOrder.items.map(item => `${item.name} x${item.quantity}`).join('\n')}</Info>
                        </ModalContainer>

                        <ModalContainer>
                            <Label>결제금액</Label>
                            <Info>{selectedOrder && selectedOrder.totalPrice}</Info>
                        </ModalContainer>

                        <ModalContainer>
                            <Label>결제일자</Label>
                            <Info>{selectedOrder && formatDate(selectedOrder.createdAt)}</Info>
                        </ModalContainer>

                        <Line />

                        <ModalContainer>
                            <Label>보내는 분</Label>
                            <Info>{selectedOrder && selectedOrder.customername}</Info>
                        </ModalContainer>
                        
                        <ModalContainer>
                            <Label>휴대폰</Label>
                            <Info>{selectedOrder && selectedOrder.phone}</Info>
                        </ModalContainer>
                        
                        <ModalContainer>
                            <Label>이메일</Label>
                            <Info>{selectedOrder && selectedOrder.email}</Info>
                        </ModalContainer>

                        <Line />

                        <ModalContainer>
                            <Label>배송주소</Label>
                            <Info>{selectedOrder && selectedOrder.deliveryAddress}</Info>
                        </ModalContainer>

                        <ModalContainer>
                            <Label>배송메모</Label>
                            <Info>{selectedOrder && selectedOrder.deliveryMemo}</Info>
                        </ModalContainer>
                    </div>
                </Modal.Body>
                
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <Button variant="outline-light" onClick={handleCloseModal} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 닫기 </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default OrderPage;
