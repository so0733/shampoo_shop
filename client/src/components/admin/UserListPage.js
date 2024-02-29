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

const BolderFont = styled.h3`
    text-align: start;
    font-size: 24px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 20px;
`;

const UserTable = styled.table`
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

const IdTableCell = styled.td`
    border: 1px solid #ccc;
    padding: 8px;
    font-family: "pretendard";
    text-align: center;
    cursor: pointer;
`;

const TableCell = styled.td`
    border: 1px solid #ccc;
    padding: 8px;
    font-family: "pretendard";
    text-align: center;
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
    width: 300px;
    font-family: "pretendard";
`;

const DeleteButton = styled(Button)`
    font-size: 18px;
    color: #dc3545;
    border-color: #dc3545;
`;

const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
};

const formatBirthdate = (birthdate) => {
    const year = String(birthdate.year).padStart(2, '0');
    const month = String(birthdate.month).padStart(2, '0');
    const day = String(birthdate.day).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                
                const response = await axios.get('http://localhost:3001/api/admin/users', config);
                const formattedUsers = response.data.users.map(user => ({
                    ...user, phone: formatPhoneNumber(user.phone)
                }));
                setUsers(formattedUsers);
            } catch (error) {
                console.error('유저를 불러오는데 오류가 발생하였습니다.', error);
            }
        };
        
        fetchUsers();
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    const handleDeleteUser = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios.delete(`http://localhost:3001/api/admin/users/${selectedUser.username}`, config);
            
            // 사용자 삭제 후 사용자 목록을 다시 불러옴
            fetchUsers();
            
            setShowModal(false);
        } catch (error) {
            console.error('사용자를 삭제하는데 오류가 발생하였습니다.', error);
        }
    };
    
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            const response = await axios.get('http://localhost:3001/api/admin/users', config);
            const formattedUsers = response.data.users.map(user => ({
                ...user, phone: formatPhoneNumber(user.phone)
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error('유저를 불러오는데 오류가 발생하였습니다.', error);
        }
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    
    return (
        <Container>
            <BolderFont>회원 목록</BolderFont>
            
            <UserTable>
                <thead>
                    <tr>
                        <TableHeader>아이디</TableHeader>
                        <TableHeader>성별</TableHeader>
                        <TableHeader>생년월일</TableHeader>
                        <TableHeader>이메일</TableHeader>
                        <TableHeader>전화번호</TableHeader>
                    </tr>
                </thead>
                
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} onClick={() => handleUserClick(user)}>
                            <IdTableCell>{user.username}</IdTableCell>
                            <TableCell>{user.gender === 'male' ? '남' : '여'}</TableCell>
                            <TableCell>{formatBirthdate(user.birthdate)}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                        </tr>
                    ))}
                </tbody>
            </UserTable>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>회원 상세 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {selectedUser && (
                        <div>
                            <ModalContainer>
                                <Label>아이디</Label>
                                <Info>{selectedUser.username}</Info>
                            </ModalContainer>
                            
                            <ModalContainer>
                                <Label>이름</Label>
                                <Info>{selectedUser.name}</Info>
                            </ModalContainer>

                            <ModalContainer>
                                <Label>우편번호</Label>
                                <Info>{selectedUser.address.zipcode}</Info>
                            </ModalContainer>

                            <ModalContainer>
                                <Label>기본주소</Label>
                                <Info>{selectedUser.address.basicAddress}</Info>
                            </ModalContainer>
                            
                            <ModalContainer>
                                <Label>상세주소</Label>
                                <Info>{selectedUser.address.detailAddress}</Info>
                            </ModalContainer>
                            
                            <ModalContainer>
                                <Label>참고주소</Label>
                                <Info>{selectedUser.address.extraAddress}</Info>
                            </ModalContainer>

                            <ModalContainer>
                                <Label>이메일</Label>
                                <Info>{selectedUser.email}</Info>
                            </ModalContainer>

                            <ModalContainer>
                                <Label>휴대전화</Label>
                                <Info>{selectedUser.phone}</Info>
                            </ModalContainer>

                            <ModalContainer>
                                <Label>성별</Label>
                                <Info>{selectedUser.gender === 'male' ? '남성' : '여성'}</Info>
                            </ModalContainer>

                            <ModalContainer>
                                <Label>생년월일</Label>
                                <Info>{formatBirthdate(selectedUser.birthdate)}</Info>
                            </ModalContainer>

                            <ModalContainer>
                                <DeleteButton variant="outline-danger" onClick={handleDeleteUser}>회원 삭제</DeleteButton>
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
};

export default UserListPage;
