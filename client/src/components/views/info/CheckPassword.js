import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BolderFont = styled.h3`
  font-size: 24px;
  font-weight: bold;
  font-family: "pretendard";
  color: #393e46;
  text-align: center;
`;

const NoteFont = styled.h3`
  font-size: 16px;
  padding-bottom: 20px;
  font-family: "pretendard";
  color: #393e46;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PasswordInput = styled.input`
  width: 250px;
  height: 40px;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  background-color: #8FB8B2;
  color: white;
  font-size: 18px;
  font-family: "pretendard";
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007D80;
  }
`;

const CheckPassword = ({ onSuccess }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckPassword = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:3001/api/auth/check-password', { password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSuccess();

    } catch (error) {
      console.error('비밀번호가 일치하지 않습니다.:', error);
    }
  };

  return (
    <Container>
      <BolderFont>비밀번호 재확인</BolderFont>
      <NoteFont>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</NoteFont>
      
      <InputContainer>
        <PasswordInput type="password" value={password} onChange={handlePasswordChange} />
        <Button onClick={handleCheckPassword}>확인</Button>
      </InputContainer>
    </Container>
  );
};

export default CheckPassword;
