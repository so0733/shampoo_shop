import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    max-width: 800px;
    height: 600px;
    margin: 0 auto;
    padding: 20px;
`;

const BolderFont = styled.h3`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
`;

const BoxContainer = styled.div`
    padding: 0 20px;
`;

const ContentFont = styled.h3`
    text-align: center;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 20px;
`;

const Box2Container = styled.div`
    border: 1px solid black;
    padding: 0 10px;
`;

const NotesContainer = styled.div`
    max-width: 800px;
    padding: 0 60px;
`;

const Content2Font = styled.h3`
    padding: 20px 0;
    text-align: start;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
`;

const CheckBoxContainer = styled.div`
    max-width: 800px;
    padding: 0 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const CheckBoxInput = styled.input`
    margin-right: 10px;
`;

const ButtonContainer = styled.div`
    max-width: 800px;
    padding: 10px 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const SubmitButton = styled.button`
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

const DeleteProfile = () => {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleDeleteProfile = async () => {
        if (isChecked) {
            try {
                // 회원 탈퇴 요청 보내기
                const response = await axios.delete('http://localhost:3001/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    alert('회원 탈퇴가 완료되었습니다.');
                    navigate('/');
                }
            } catch (error) {
                console.error('회원 탈퇴 오류:', error);
                alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        } else {
            alert('회원 탈퇴를 위해서는 안내사항에 동의해야 합니다.');
        }
    };


    return (
        <Container>
            <BolderFont>회원 탈퇴</BolderFont>
            
            <BoxContainer>
                <ContentFont>
                    고객님께서 회원 탈퇴를 원하신다니 저희 쇼핑몰의 서비스가 많이 부족하고 미흡했나 봅니다. <br />
                    고객님의 소중한 의견을 듣고 미래의 서비스 품질 향상을 위해 최선을 다하겠습니다. <br />
                    회원 탈퇴 이유를 자세히 알려주시면 더 나은 서비스를 제공하는 데 도움이 될 것입니다.
                </ContentFont>
            </BoxContainer>
            
            <NotesContainer>
                <Box2Container>
                    <Content2Font>
                        회원 탈퇴 시의 아래 사항을 숙지하시기 바랍니다. <br /><br /> 
                        1. 회원 탈퇴시 고객님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서의 소비자 보호에 관한 법률에 의거한 고객정보 보호정책에 따라 철저히 보호됩니다.<br /><br />
                        2. 회원 탈퇴 시 쇼핑몰에서 제공하는 서비스와 혜택을 더 이상 이용하실 수 없게 됩니다. 이 점을 참고하시어 불편함 없으시길 바랍니다.
                    </Content2Font>
                </Box2Container>
            </NotesContainer> <br />
            
            <ContentFont>
                다시 한번 저희 쇼핑몰을 이용해 주셔서 감사합니다. <br />
                앞으로 더 나은 서비스를 제공하기 위해 노력하겠습니다. <br />
                문의사항이 있으시면 언제든지 연락 주시기 바랍니다.          
            </ContentFont>

            <CheckBoxContainer>
                <CheckBoxInput type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <span>안내사항을 모두 확인하였으며, 이에 동의합니다.</span>
            </CheckBoxContainer>

            <ButtonContainer>
            <SubmitButton onClick={handleDeleteProfile}>회원 탈퇴</SubmitButton>
            </ButtonContainer>
        </Container>
    );
};

export default DeleteProfile;
