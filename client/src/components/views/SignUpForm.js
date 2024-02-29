import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import AddressSearch from '../AddressSearch/AddressSearch';
import AgreementText from '../member/agreement';
import PrivacyText from '../member/privacy';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const DetailContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin: 5px auto 0;
`;

const FontContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  flex: 1;
  margin-left: 30%;
`;

const ButtonContainer = styled.div`
  flex: 1;
`;

const BaseFontStyles = css`
  font-family: "pretendard";
  color: #393e46;
`;

const LogoFont = styled.h3`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  font-size: 36px;
  font-weight: bold;
  ${BaseFontStyles}
  cursor: pointer;
`;

const BolderFont = styled.h3`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  ${BaseFontStyles}
`;

const ListFont = styled.h3`
  margin-top: 0.75rem;
  padding-left: 100px;
  font-size: 14px;
  font-weight: bold;
  ${BaseFontStyles}
  white-space: nowrap;
`;

const Asterisk = styled.h3`
  margin-top: 0.5rem;
  padding-left: 5px;
  font-size: 14px;
  font-weight: bold;
  font-family: "pretendard";
  color: red;
  white-space: nowrap;
`;

const Input = styled.input`
  width: 350px;
  margin-left: 10px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #bebebe;
  border-radius: 4px;

  &::placeholder {
    font-size: 13px;
  }
`;

const CheckButton = styled.button`
  padding: 6px 10px;
  margin: 2px 0 0 4px;
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

const ErrorMessage = styled.p`
  color: red;
  margin: 2px 0 0 10px;
  font-size: 12px;
`;

const RequiredLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  ${BaseFontStyles}
  justify-content: end;
  white-space: nowrap;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 130px 10px 10px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-top: 10px;
  font-size: 14px;
  ${BaseFontStyles}
`;

const RadioButton = styled.input`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 10px;
  padding: 0.5rem;
`;

const SelectContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const Select = styled.select`
  width: 100px;
  margin-right: 10px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #bebebe;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 10px;
  padding: 0.5rem;
`;

const CheckboxContainer = styled.div`
  width: 350px;
  margin: 10px 0 0 10px;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  ${BaseFontStyles}
  margin-bottom: 10px;
`;

const CheckboxText = styled.span`
  margin-left: 5px;
`;

const AgreementButton = styled.button`
  margin: 2px 0 0 auto;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  color: inherit;
  cursor: pointer;

  &:hover {
    background-color: #393e46;
    color: white;
  }
`;

const SubmitButton = styled.button`
  background-color: #c6a8b4;
  color: white;
  padding: 15px 85px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #8FB8B2;
  }
`;

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    address: {
      zipcode: '',
      basicAddress: '',
      detailAddress: '',
      extraAddress: '',
    },
    phone: '',
    role: 0,
    gender: '',
    birthdate: '',
    termsAgreement: {
      terms: false,
      privacyPolicy: false,
    }
  });

  const [usernameError, setUsernameError] = useState('');

  const validateUsername = (username) => {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z0-9]{4,16}$/;
    if (!regex.test(username)) {
      setUsernameError('4자 이상 16자 이하의 소문자와 숫자 조합');
    } else {
      setUsernameError('');
    }
  };

  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,16}$/;
    if (!regex.test(password)) {
      setPasswordError('영문 대소문자, 숫자, 특수문자 조합, 10자 이상 16자 이하');
    } else {
      setPasswordError('');
    }
  };

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordChecked, setPasswordChecked] = useState(false);
  
  const [showAddressModal, setShowAddressModal] = useState(false);

  const currentYear = new Date().getFullYear();
  const minBirthYear = 1940;
  const maxBirthYear = currentYear;
  const years = Array.from({ length: maxBirthYear - minBirthYear + 1 }, (_, index) => maxBirthYear - index);
  
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  
  const [showModal, setShowModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const Navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // 주소 관련 필드를 처리
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]; // 필드명 추출
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      // 주소 이외의 다른 필드를 처리
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // 아이디 또는 비밀번호가 변경될 때마다 에러 메시지 초기화
      if (name === 'username') {
        setUsernameError('');
      } else if (name === 'password') {
        setPasswordError('');
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmedPassword = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      confirmPassword: confirmedPassword,
    }));
  };

  const handlePasswordCheck = () => {
    const passwordsMatch = formData.password === formData.confirmPassword;
  
    if (passwordsMatch) {
      setPasswordMatch(true);
      alert('비밀번호가 일치합니다.');
      setPasswordChecked(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      termsAgreement: {
        ...prevData.termsAgreement,
        [name]: checked,
      },
    }));
  };

  const handleOpenAddressModal = () => {
    setShowAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
  };

  const handleAddressSelect = (addressData) => {
    // 주소 정보를 받아온 후 처리
    setFormData((prevData) => ({
      ...prevData,
      address: {
        zipcode: addressData.zipcode,
        basicAddress: addressData.basicAddress,
        detailAddress: '',
        extraAddress: addressData.extraAddress,
      },
    }));
  };
  const handleAllAgreementChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      termsAgreement: {
        terms: checked,
        privacyPolicy: checked,
      },
    }));
  };

  const handleBirthdateChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'birthYear' || name === 'birthMonth' || name === 'birthDay') {
      const updatedFormData = { ...formData };
  
      if (name === 'birthYear') {
        updatedFormData.birthdate = `${value}-${formData.birthMonth || '01'}-${formData.birthDay || '01'}`;
        updatedFormData.birthYear = value;
      } else if (name === 'birthMonth') {
        updatedFormData.birthdate = `${formData.birthYear || '2000'}-${value}-${formData.birthDay || '01'}`;
        updatedFormData.birthMonth = value;
      } else if (name === 'birthDay') {
        updatedFormData.birthdate = `${formData.birthYear || '2000'}-${formData.birthMonth || '01'}-${value || '01'}`;
        updatedFormData.birthDay = value;
      }
  
      setFormData(updatedFormData);
    }
  };

  const CustomModal = ({ onClose }) => {
    return (
      <Modal show={true} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>이용약관(필수)</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <AgreementText />
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="outline-light" onClick={onClose} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 확인 </Button>
        </Modal.Footer>
      </Modal>
    );
  };  

  const CustomPrivacyModal = ({ onClose }) => {
    return (
      <Modal show={true} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>개인 정보 수집 및 이용동의 (필수)</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <PrivacyText />
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="outline-dark" onClick={onClose} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 확인 </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordChecked(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          birthdate: {
            year: formData.birthYear,
            month: formData.birthMonth,
            day: formData.birthDay,
          },
        }),
      });

      if (response.ok) {
        alert('회원가입이 완료되었습니다.');
        Navigate('/');
      } else {
        alert('회원가입에 실패하였습니다.');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <LogoFont as={Link} to="/">SHAMPOO #</LogoFont>

      <BolderFont>회원가입</BolderFont>

      <RequiredLabel>
        <Asterisk>*</Asterisk>&ensp;필수입력사항
      </RequiredLabel>

      <form onSubmit={handleSubmit}>
        <DetailContainer>
          <FontContainer>
            <ListFont>아이디</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="text" name="username" value={formData.username} onChange={handleChange} onBlur={(e) => validateUsername(e.target.value)} required placeholder='영문 소문자/숫자 조합, 4~16자' />
              {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
          </InputContainer>
        </DetailContainer>
  
        <DetailContainer>
          <FontContainer>
            <ListFont>비밀번호</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} onBlur={(e) => validatePassword(e.target.value)} required placeholder='비밀번호를 입력해주세요.' />
              {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </InputContainer>
        </DetailContainer>

        <DetailContainer>
          <FontContainer>
            <ListFont>비밀번호 확인</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleConfirmPasswordChange} required placeholder='비밀번호를 한번 더 입력해주세요.' />
          </InputContainer>
          <ButtonContainer>
            <CheckButton type="button" onClick={handlePasswordCheck}>비밀번호 확인</CheckButton>
              {!passwordMatch && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
          </ButtonContainer>
        </DetailContainer>

        <DetailContainer>
          <FontContainer>
            <ListFont>이름</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder='이름을 입력해 주세요.' />
          </InputContainer>
        </DetailContainer>

        <DetailContainer>
          <FontContainer>
            <ListFont>우편번호</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="text" name="address.zipcode" value={formData.address.zipcode} onChange={handleChange} required />
          </InputContainer>
          <ButtonContainer>
            <CheckButton type="button" onClick={handleOpenAddressModal}>주소 검색</CheckButton>
          </ButtonContainer>
        </DetailContainer>

        {showAddressModal && (
        <AddressSearch
          onClose={handleCloseAddressModal}
          onAddressSelect={handleAddressSelect}
        />
      )}
      
        <DetailContainer>
          <FontContainer>
            <ListFont>기본주소</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="text" name="address.basicAddress" value={formData.address.basicAddress} onChange={handleChange} required />
          </InputContainer>
        </DetailContainer>
      
        <DetailContainer>
          <FontContainer>
            <ListFont>상세주소</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="text" name="address.detailAddress" value={formData.address.detailAddress} onChange={handleChange} required placeholder='상세주소를 입력해 주세요.' />
          </InputContainer>
        </DetailContainer>

        <DetailContainer>
          <FontContainer>
            <ListFont>주소 참고항목</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="text" name="address.extraAddress" value={formData.address.extraAddress} onChange={handleChange} required />
          </InputContainer>
        </DetailContainer>

        <DetailContainer>
          <FontContainer>
            <ListFont>이메일</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder='예: shampooshop@naver.com' />
          </InputContainer>
        </DetailContainer>

        <DetailContainer>
          <FontContainer>
            <ListFont>휴대전화</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>
          <InputContainer>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder='숫자만 입력해주세요.' />
          </InputContainer>
        </DetailContainer>

        <DetailContainer>
          <FontContainer>
            <ListFont>성별</ListFont>          
          </FontContainer>
          <InputContainer>
            <RadioContainer>
              <RadioLabel>
                <RadioButton type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> 남성
              </RadioLabel>
              <RadioLabel>
                <RadioButton type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> 여성
              </RadioLabel>
            </RadioContainer>
          </InputContainer>
        </DetailContainer>

        <DetailContainer>
          <FontContainer>
            <ListFont>생년월일</ListFont>          
          </FontContainer>
          <InputContainer>
            <SelectContainer>
              <Select name="birthYear" value={formData.birthYear} onChange={handleBirthdateChange} defaultValue="">
                <option value="" disabled> YYYY </option>
                {years.map((year) => ( <option key={year} value={year}> {year}년 </option> ))}
              </Select>
              <Select name="birthMonth" value={formData.birthMonth} onChange={handleBirthdateChange} defaultValue="">
                <option value="" disabled> MM </option>
                {months.map((month) => ( <option key={month} value={month}> {month}월 </option> ))}
              </Select>
              <Select name="birthDay" value={formData.birthDay} onChange={handleBirthdateChange} defaultValue="">
                <option value="" disabled> DD </option>
                {days.map((day) => ( <option key={day} value={day}> {day}일 </option> ))}
              </Select>
            </SelectContainer>
          </InputContainer>
        </DetailContainer>

        <DetailContainer>
          <FontContainer>
            <ListFont>이용약관 동의</ListFont>
            <Asterisk>*</Asterisk>
          </FontContainer>

          <InputContainer>
            <CheckboxContainer>
              <CheckboxLabel>
                <Checkbox type="checkbox" name="allAgreement" checked={formData.termsAgreement.terms && formData.termsAgreement.privacyPolicy} onChange={handleAllAgreementChange} />
                <CheckboxText>전체 동의</CheckboxText>
              </CheckboxLabel>

              <CheckboxLabel>
                <Checkbox type="checkbox" name="terms" checked={formData.termsAgreement.terms} onChange={handleCheckboxChange} required />
                <CheckboxText>[필수] 이용약관 동의 </CheckboxText>

                <AgreementButton type="button" onClick={() => setShowModal(true)}>약관보기</AgreementButton>
                  {showModal && <CustomModal onClose={() => setShowModal(false)} />}
              </CheckboxLabel>

              <CheckboxLabel>
                <Checkbox type="checkbox" name="privacyPolicy" checked={formData.termsAgreement.privacyPolicy} onChange={handleCheckboxChange} required />
                <CheckboxText> [필수] 개인 정보 수집 및 이용동의 </CheckboxText>

                <AgreementButton type="button" onClick={() => setShowPrivacyModal(true)}>약관보기</AgreementButton>
                  {showPrivacyModal && <CustomPrivacyModal onClose={() => setShowPrivacyModal(false)} />}
              </CheckboxLabel>
            </CheckboxContainer>
          </InputContainer>
        </DetailContainer>
        
        {!passwordChecked && (
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <ErrorMessage>비밀번호 입력 후 확인 버튼을 눌러주세요.</ErrorMessage>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <SubmitButton type="submit" disabled={!passwordChecked}>
            가입하기
          </SubmitButton>
        </div>

      </form>
    </Container>
  );
};

export default SignUpForm;
