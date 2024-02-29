import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from '../../common/Header';
import Footer from '../../common/Footer';

import OrderDetails from './OrderDetails';
import Profile from './Profile';
import DeleteProfile from './DeleteProfile';
import CheckPassword from './CheckPassword';

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

const MyInfo = () => {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            setIsPasswordChecked(false);
        }
    }, []);

      
    const handleButtonClick = (index) => {
        setSelectedButtonIndex(index);
    };
  
    const handlePasswordCheckSuccess = () => {
        setIsPasswordChecked(true);
    };

    return (
        <div>
            <Header />

            <Container>
                <MenuContainer>
                    <Button onClick={() => handleButtonClick(0)}>주문/배송 조회</Button>
                    <Button onClick={() => handleButtonClick(1)}>회원정보 변경</Button>
                    <Button onClick={() => handleButtonClick(2)}>회원탈퇴</Button>
                </MenuContainer>
                <InfoContainer>
                    {selectedButtonIndex === 0 && (
                        <div>
                            <ContentsFont>주문/배송 조회</ContentsFont>

                            <OrderDetails />
                        </div>
                    )}

                    {selectedButtonIndex === 1 &&
                        <div>
                            <ContentsFont>회원정보 변경</ContentsFont>

                            {!isPasswordChecked ? (
                                <CheckPassword onSuccess={handlePasswordCheckSuccess} />
                            ) : (
                                <Profile />
                            )}
                        </div>
                    }

                    {selectedButtonIndex === 2 &&
                        <div>
                            <ContentsFont>회원탈퇴</ContentsFont>

                            {!isPasswordChecked ? (
                                <CheckPassword onSuccess={handlePasswordCheckSuccess} />
                            ) : (
                                <DeleteProfile />
                            )}
                        </div>
                    }
                </InfoContainer>

            </Container>

            <Footer />
        </div>
    );
};

export default MyInfo;
