import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import AddressSearch from '../../AddressSearch/AddressSearch';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BolderFont = styled.h3`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  font-family: "pretendard";
  color: #393e46;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;

const List = styled.span`
  width: 150px;
  font-size: 16px;
  font-weight: bold;
  font-family: "pretendard";
  color: #393e46;
  margin-bottom: 5px;
`;

const Asterisk = styled.span`
  font-size: 14px;
  font-weight: bold;
  font-family: "pretendard";
  color: red;
`;

const AsteriskContents = styled.span`
  margin: 0 160px 10px 0;
  font-size: 14px;
  font-family: "pretendard";
  font-weight: bold;
  color:black;
  align-self: flex-end;
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

const Button = styled.button`
  width: 130px;
  height: 45px;
  margin-left: 20px;
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

const Select = styled.select`
  width: 90px;
  margin-right: 15px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #bebebe;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  margin: 20px 220px 0;
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

const LoadingMessage = styled.p`
  font-size: 16px;
  font-family: "pretendard";
  color: #393e46;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState({});
  const [basicAddress, setBasicAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');

  const [isAddressModified, setIsAddressModified] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data.user);
        setBasicAddress(response.data.user.address.basicAddress);
        setDetailAddress(response.data.user.address.detailAddress);
        setExtraAddress(response.data.user.address.extraAddress);
      } catch (error) {
        console.error('프로필 정보를 가져오는 중에 오류가 발생했습니다.', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (user && (basicAddress !== user.address.basicAddress || detailAddress !== user.address.detailAddress || extraAddress !== user.address.extraAddress)) {
      setIsAddressModified(true);
    } else {
      setIsAddressModified(false);
    }
  }, [basicAddress, detailAddress, extraAddress, user]);

  const handlePasswordChange = async () => {
    try {
      const response = await axios.put(
        'http://localhost:3001/api/user/profile/password',
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
          newPasswordConfirm: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('비밀번호 변경 중에 오류가 발생했습니다.', error);
      alert('비밀번호 변경 중에 오류가 발생했습니다.');
    }
  };

  const handleOpenAddressModal = () => {
    setShowAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
  };

  const handleAddressSelect = (addressData) => {
    setSelectedAddress(addressData);
    setShowAddressModal(false);
    setBasicAddress(addressData.basicAddress);
    setExtraAddress(addressData.extraAddress);
  };

  const handleBasicAddressChange = (e) => {
    setBasicAddress(e.target.value);
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(
        'http://localhost:3001/api/user/profile',
        {
          zipcode: selectedAddress.zipcode || user.address.zipcode, // 우편번호를 선택된 값 또는 기존 값으로 설정
          basicAddress: basicAddress,
          detailAddress: detailAddress,
          extraAddress: extraAddress,
          email: user.email,
          phoneNumber: user.phone,
          birthdate: user.birthdate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('회원정보 수정 중에 오류가 발생했습니다.', error);
      alert('회원정보 수정 중에 오류가 발생했습니다.');
    }
  };
  
  return (
    <Container>
      {user ? (
        <InfoContainer>
          <BolderFont>회원정보</BolderFont>
          <AsteriskContents><Asterisk>*</Asterisk>&ensp;변경가능사항</AsteriskContents>
          <Row>
            <List>아이디</List>
            <Input type="text" value={user.username} disabled />
          </Row>

          <Row>
            <List>현재 비밀번호</List>
            <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </Row>

          <Row>
            <List>새 비밀번호</List>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </Row>

          <Row>
            <List>새 비밀번호 확인</List>
            <Input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            <Button onClick={handlePasswordChange}>비밀번호 변경</Button>
          </Row>

          <Row>
            <List>이름</List>
            <Input type="text" value={user.name} disabled />
          </Row>

          <Row>
            <List>우편번호<Asterisk> *</Asterisk></List>
            <Input type="text" value={selectedAddress.zipcode || user.address.zipcode} />
            <Button onClick={handleOpenAddressModal}>주소 검색</Button>
          </Row>

          {showAddressModal && (
            <AddressSearch
              onClose={handleCloseAddressModal}
              onAddressSelect={handleAddressSelect}
            />
          )}

          <Row>
            <List>기본주소<Asterisk> *</Asterisk></List>
            <Input type="text" value={basicAddress} onChange={handleBasicAddressChange} />
          </Row>

          <Row>
            <List>상세주소<Asterisk> *</Asterisk></List>
            <Input type="text" value={detailAddress} onChange={handleDetailAddressChange} />
          </Row>

          <Row>
          <List>참고주소<Asterisk> *</Asterisk></List>
          <Input type="text" value={extraAddress} onChange={(e) => setExtraAddress(e.target.value)} />
        </Row>
        
          <Row>
            <List>이메일<Asterisk> *</Asterisk></List>
            <Input type="email" value={user.email}  onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </Row>

          <Row>
            <List>휴대전화<Asterisk> *</Asterisk></List>
            <Input type="tel" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
          </Row>

          <Row>
            <List>성별</List>
            <Input type="text" value={user.gender === 'male' ? '남성' : '여성'} disabled/>
          </Row>

          <Row>
            <List>생년월일<Asterisk> *</Asterisk></List>
            
            <Select value={user.birthdate.year} onChange={(e) => setUser({ ...user, birthdate: { ...user.birthdate, year: e.target.value } })}>
              <option value="">년도</option>
              {Array.from({ length: 120 }, (_, index) => (
                <option key={index} value={new Date().getFullYear() - index}>
                  {new Date().getFullYear() - index}
                </option>
              ))}
            </Select>
            
            <Select value={user.birthdate.month} onChange={(e) => setUser({ ...user, birthdate: { ...user.birthdate, month: e.target.value } })}>
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Select>

            <Select value={user.birthdate.day} onChange={(e) => setUser({ ...user, birthdate: { ...user.birthdate, day: e.target.value } })}>
              <option value="">일</option>
              {Array.from({ length: 31 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Select>
          </Row>

          <SubmitButton onClick={handleProfileUpdate}>수정하기</SubmitButton>

        </InfoContainer>
      ) : (
        <LoadingMessage>회원 정보를 불러오는 중...</LoadingMessage>
      )}
    </Container>
  );
};

export default Profile;
