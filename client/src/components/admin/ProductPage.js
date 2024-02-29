import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

const TabContainer = styled.div`
    display: flex;
    margin: 0 150px;
`;

const Tab = styled.button`
    padding: 10px 0;
    border: none;
    cursor: pointer;
    flex: 1;
    font-weight: 500;
    font-family: "pretendard";
    background-color: ${props => props.active ? '#8FB8B2' : 'initial'};
    color: ${props => props.active ? 'white' : 'initial'};
`;

const BolderFont = styled.h3`
    padding-top: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 20px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 0 0 150px;
`;

const List = styled.span`
    width: 150px;
    font-size: 16px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 300px;
    height: 45px;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    margin: 20px 310px 0;
    background-color: #c6a8b4;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #8FB8B2;
    }
`;

const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    border: 1px solid #ccc;
    padding: 8px;
    font-family: "pretendard";
    text-align: center;
    background-color: #eee;
`;

const TableCell = styled.td`
    border: 1px solid #ccc;
    padding: 8px;
    font-family: "pretendard";
    text-align: center;
`;

const UpdateButton = styled.button`
    width: 60px;
    height: 30px;
    margin-right: 10px;
    background-color: white;
    color: #61C0BF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #61C0BF;
        color: white;
    }
`;

const DeleteButton = styled.button`
    width: 60px;
    height: 30px;
    background-color: white;
    color: #FFB6B9;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #FFB6B9;
        color: white;
    }
`;

const ModalRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 0;
`;

const ModalList = styled.span`
    display: flex;
    width: 100px;
    margin-left: 35px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
`;

const ModalInput = styled.input`
    width: 300px;
    height: 45px;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const ModalButton = styled.button`
    width: 100px;
    height: 40px;
    margin: 0 180px;
    background-color: #61C0BF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;

    &:hover {
        background-color: #c6a8b4;
        color: white;
    }
`;

const ProductPage = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [productData, setProductData] = useState({
        productCode: '',
        productImageURL: '',
        productName: '',
        inventoryQuantity: 100,
        salesPrice: ''
    });

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = value.replace(/\D/g, '');
        if (value !== newValue) {
            alert('숫자만 입력할 수 있습니다.');
        }
        setProductData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3001/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
    
            if (response.ok) {
                const responseData = await response.json();
    
                if (responseData.message === '상품이 성공적으로 생성되었습니다.') {
                    alert('상품이 성공적으로 생성되었습니다.');
                    setProductData({
                        productCode: '',
                        productImageURL: '',
                        productName: '',
                        inventoryQuantity: 100,
                        salesPrice: ''
                    });
                } else {
                    alert('중복된 상품 코드입니다. 다른 상품 코드를 사용해주세요.');
                }
            } else {
                console.error('상품 생성 실패:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/admin/products');
                const data = response.data;

                setProducts(data.products);
            } catch (error) {
                console.error('상품 조회 실패:', error.message);
            }
        };
    
        if (activeTab === 'read') {
            fetchProducts();
        }
    }, [activeTab]);
    
    const handleUpdateButtonClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    const handleSubmitModal = async () => {
        try {
            const response = await axios.patch(`http://localhost:3001/api/admin/products/${selectedProduct.productId}`, {
                productCode: productData.productCode,
                productImageURL: productData.productImageURL,
                productName: productData.productName,
                inventoryQuantity: productData.inventoryQuantity,
                salesPrice: productData.salesPrice
            });
    
            if (response.status === 200) {
                alert('상품이 성공적으로 수정되었습니다.');
                setShowModal(false);
                window.location.reload();
            } else {
                alert('상품 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('상품 수정 실패:', error);
            alert('상품 수정에 실패했습니다.');
        }
    };
    
    const handleDeleteButton = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/admin/products/${productId}`);
    
            if (response.status === 200) {
                alert('상품이 성공적으로 삭제되었습니다.');
                window.location.reload();
            } else {
                alert('상품 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('상품 삭제 실패:', error);
            alert('상품 삭제에 실패했습니다.');
        }
    };
    
    return (
        <Container>
            <TabContainer>
                <Tab active={activeTab === 'create'} onClick={() => setActiveTab('create')}>상품 생성</Tab>
                <Tab active={activeTab === 'read'} onClick={() => setActiveTab('read')}>상품 조회</Tab>
            </TabContainer>
            
            {activeTab === 'create' && (
                <form onSubmit={handleSubmit}>
                    <BolderFont>상품 생성</BolderFont>

                    <Row>
                        <List>상품코드</List>
                        <Input type="text" name="productCode" value={productData.productCode} onChange={handleNameChange} required />
                    </Row>

                    <Row>
                        <List>상품명</List>
                        <Input type="text" name="productName" value={productData.productName} onChange={handleNameChange} required />
                    </Row>

                    <Row>
                        <List>상품 이미지 URL</List>
                        <Input type="text" name="productImageURL" value={productData.productImageURL} onChange={handleNameChange} required />
                    </Row>

                    <Row>
                        <List>재고 수량</List>
                        <Input type="text" name="inventoryQuantity" value={productData.inventoryQuantity} onChange={handleChange} required />
                    </Row>

                    <Row>
                        <List>판매가</List>
                        <Input type="text" name="salesPrice" value={productData.salesPrice} onChange={handleChange} required />
                    </Row>

                    <SubmitButton type="submit">상품 생성</SubmitButton>
                </form>
            )}
            
            {activeTab === 'read' && (
                <div>
                    <BolderFont>상품 조회</BolderFont>
                    
                    <ProductTable>
                        <thead>
                            <tr>
                                <TableHeader>상품코드</TableHeader>
                                <TableHeader>상품명</TableHeader>
                                <TableHeader>재고수량</TableHeader>
                                <TableHeader>판매가</TableHeader>
                                <TableHeader>비고</TableHeader>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product.productId}>
                                    <TableCell>{product.productCode}</TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>{product.inventoryQuantity}</TableCell>
                                    <TableCell>{product.salesPrice}</TableCell>
                                    <TableCell>
                                        <UpdateButton onClick={() => handleUpdateButtonClick(product)}>수정</UpdateButton>
                                        <DeleteButton onClick={() => handleDeleteButton(product.productId)}>삭제</DeleteButton>
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </ProductTable>
                    
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header>
                            <Modal.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>상품 정보 수정</Modal.Title>
                        </Modal.Header>

                        <Modal.Body >
                            <ModalRow>
                                <ModalList>상품코드</ModalList>
                                <ModalInput type="text" name="productCode" defaultValue={selectedProduct ? selectedProduct.productCode : ''} onChange={handleNameChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>이미지 URL</ModalList>
                                <ModalInput type="text" name="productImageURL" defaultValue={selectedProduct ? selectedProduct.productImageURL : ''} onChange={handleNameChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>상품명</ModalList>
                                <ModalInput type="text" name="productName" defaultValue={selectedProduct ? selectedProduct.productName : ''} onChange={handleNameChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>재고 수량</ModalList>
                                <ModalInput type="text" name="inventoryQuantity" defaultValue={selectedProduct ? selectedProduct.inventoryQuantity : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>판매가</ModalList>
                                <ModalInput type="text" name="salesPrice" defaultValue={selectedProduct ? selectedProduct.salesPrice : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalButton type="button" onClick={handleSubmitModal}>상품 수정</ModalButton>
                        </Modal.Body>

                        <Modal.Footer style={{ justifyContent: 'center' }}>
                            <Button variant="outline-light" onClick={handleCloseModal} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 닫기 </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </Container>
    );
};

export default ProductPage;
