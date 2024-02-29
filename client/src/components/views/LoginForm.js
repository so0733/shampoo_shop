import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  width: 100%;
  height: 100vh;
`;

const BaseFontStyles = css`
  font-family: "pretendard";
  color: #393e46;
`;

const LogoFont = styled.h3`
  padding-bottom: 10px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  ${BaseFontStyles}
  cursor: pointer;
  text-decoration: none;
`;

const BolderFont = styled.h3`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  ${BaseFontStyles}
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  border: 1px solid #bebebe;
  border-radius: 4px;
  display: flex;
  align-items: center;

  &::placeholder {
    font-size: 16px;
    font-weight: bold;
  }
`;

const Button = styled.button`
  width: 280px;
  padding: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #c6a8b4;
  background-color: white;
  border: 1px solid #c6a8b4;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #8FB8B2;
    color: white;
  }
`;

const Button2 = styled(Link)`
  width: 280px;
  padding: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  background-color: #c6a8b4;
  border: 1px solid #c6a8b4;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #8FB8B2;
    color: white;
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const Navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('빈칸없이 입력해주세요');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { username, password });
  
      if (response && response.data) {
        const { token, user } = response.data;
        
        // 로그인 성공 시 토큰 저장
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user.username);
  
        console.log('로그인 성공');
        
        // 사용자 역할 확인
        if (user.role === 1) {
          // 관리자 페이지로 이동
          Navigate('/shampooshopadmin');
        } else {
          // 일반 사용자 페이지로 이동
          Navigate('/');
        }
      } else {
      setErrorMessage('로그인 실패: 응답 또는 응답 데이터가 없습니다.');
    }
    } catch (error) {
      // console.error('로그인 실패:', error.message);
      setErrorMessage(`${error.message}`);
    }
  };  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container>
      <LogoFont as={Link} to="/">SHAMPOO #</LogoFont>
      
      <BolderFont>로그인</BolderFont>
      
      <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='아이디' onKeyPress={handleKeyPress} />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='비밀번호' onKeyPress={handleKeyPress} />
      
      {errorMessage && <div style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</div>}

      <Button onClick={handleLogin}>로그인</Button>
      <Button2  to="/signup">회원가입</Button2>
    </Container>
  );
};

export default LoginForm;
