import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from '../common/Header';
import Footer from '../common/Footer';

import UserListPage from './UserListPage';
import ProductPage from './ProductPage';
import NoticePage from './NoticePage';
import EventPage from './EventPage';
import OrderPage from './OrderPage';

const Container = styled.div`
    display: flex;
    width: 1200px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
`;

const MenuContainer = styled.div`
    width: 250px;
    height: 1000px;
    padding: 10px 0;
`;

const InfoContainer = styled.div`
    width: 900px;
    height: 1000px;
`;

const Button = styled.button`
    display: block;
    width: 200px;
    margin-left: 20px;
    padding: 10px;
    background-color: white;
    border: 1px solid #ccc;
    color: black;
    font-size: 16px;
    font-weight: bold;
    font-family: "pretendard";
    cursor: pointer;
    border-radius: 5px;
`;

const ContentsFont = styled.h3`
    font-size: 14px;
    font-family: "pretendard";
    color:#ccc;
    text-align: end;
`;

const StockContainer = styled.div`
    display: flex;
    width: 250px;
    height: 500px;
    margin-top: 30px;
    padding: 10px 0;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    font-size: 12px;
    text-align: center;
    font-family: "pretendard";
`;

const TableCell = styled.td`
    font-size: 10px;
    text-align: center;
    font-family: "pretendard";
`;

const TableButton = styled.button`
    width: 20px;
    margin: 0 5px;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-family: "pretendard";
    cursor: pointer;

    &:hover {
        background-color: #61C0BF;
    }
`;

const AdminPage = () => {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [products, setProducts] = useState([]);

    const handleButtonClick = (index) => {
        setSelectedButtonIndex(index);
    };

    // 상품 데이터를 서버에서 가져오는 함수
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/admin/products');
            const data = response.data;
            setProducts(data.products);
        } catch (error) {
            console.error('상품 조회 실패:', error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 상품 수량 증가 함수
    const increaseQuantity = async (productId) => {
        try {
            await axios.patch(`http://localhost:3001/api/admin/products/${productId}/increase`, { inventoryQuantity: 1 });
            // 증가 요청 후 상품 재고 다시 불러오기
            fetchProducts();
        } catch (error) {
            console.error('수량 증가 실패:', error.message);
        }
    };

    // 상품 수량 감소 함수
    const decreaseQuantity = async (productId) => {
        try {
            await axios.patch(`http://localhost:3001/api/admin/products/${productId}/decrease`, { inventoryQuantity: 1 });
            // 감소 요청 후 상품 재고 다시 불러오기
            fetchProducts();
        } catch (error) {
            console.error('수량 감소 실패:', error.message);
        }
    };


    return (
        <div>
            <Header />

            <Container>
                <MenuContainer>
                    <Button onClick={() => handleButtonClick(0)}>회원 관리</Button>
                    <Button onClick={() => handleButtonClick(1)}>재고 관리</Button>
                    <Button onClick={() => handleButtonClick(2)}>주문 관리</Button>
                    <Button onClick={() => handleButtonClick(3)}>이벤트 게시물 관리</Button>
                    <Button onClick={() => handleButtonClick(4)}>공지 게시물 관리</Button>

                    {selectedButtonIndex === 2 &&
                        <StockContainer>
                                <Table>
                                    <thead>
                                        <tr>
                                            <TableHeader>상품명</TableHeader>
                                            <TableHeader>재고량</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <tr key={index}>
                                                <TableCell>{product.productName}</TableCell>
                                                <TableCell>
                                                    <TableButton onClick={() => decreaseQuantity(product.productId)}>-</TableButton>
                                                    {product.inventoryQuantity}
                                                    <TableButton onClick={() => increaseQuantity(product.productId)}>+</TableButton>
                                                </TableCell>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                        </StockContainer>
                    }
                </MenuContainer>

                <InfoContainer>
                    {selectedButtonIndex === 0 && (
                        <div>
                            <ContentsFont>회원 관리</ContentsFont>
                            <UserListPage />
                        </div>
                    )}

                    {selectedButtonIndex === 1 &&
                        <div>
                            <ContentsFont>재고 관리</ContentsFont>
                            <ProductPage />
                        </div>
                    }

                    {selectedButtonIndex === 2 &&
                        <div>
                            <ContentsFont>주문 관리</ContentsFont>
                            <OrderPage />
                        </div>
                    }

                    {selectedButtonIndex === 3 &&
                        <div>
                            <ContentsFont>이벤트 게시물 관리</ContentsFont>
                            <EventPage />
                        </div>
                    }
                    
                    {selectedButtonIndex === 4 &&
                        <div>
                            <ContentsFont>공지사항 게시물 관리</ContentsFont>
                            <NoticePage />
                        </div>
                    }
                </InfoContainer>

            </Container>

            <Footer />
        </div>
    );
};

export default AdminPage;