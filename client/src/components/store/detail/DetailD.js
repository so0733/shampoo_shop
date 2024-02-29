import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../../common/Header';
import Footer from '../../common/Footer';

import DetailDSlider from '../detailslider/DetailDSlider';
import DetailDChoice from '../detailchoice/DetailDChoice';

import UserReviews from '../UserReviews';

import d_serum from '../../../img/store/detailcontent/d_serum.png';
import TopButton from '../../common/TopButton';

const Container = styled.div`
    display: flex;
    columns: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 0 20px;
    align-items: center;
    justify-content: space-between;
`;

const InformationDiv = styled.div`
    height: 600px;
    width: 600px;
`;

const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const ToggleButton = styled.button`
    width: 410px;
    height: 50px;
    margin: 0 20px;
    background-color: white;
    color: black;
    font-size: 16px;
    font-weight: bold;
    font-family: "pretendard";
    
    border: none;
    &:hover {
    border-bottom: 2px solid black;
  }
`;

const InformationBox = styled.div`
    display: inline-block;
    justify-content: center;
    align-items: center;
`;

const InformationContainer = styled.div`
    display: flex;
    width: 1200px;
    height: auto;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-top: 2px solid black;
`;

const SectionFont = styled.p`
    margin: 50px 0 50px 10px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    font-family: "gmarket_2_font";
    color: #393e46;
`;

const ReviewContainer = styled.div`
    width: 1200px;
    height: auto;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-top: 2px solid black;
`;

function DetailD() {
    const [showInformation, setShowInformation] = useState(true);
    const [showReviews, setShowReviews] = useState(false);

    const toggleInformation = () => {
        setShowInformation(!showInformation);
        setShowReviews(false);
    };

    const toggleReviews = () => {
        setShowReviews(!showReviews);
        setShowInformation(false);
    };

    return (
        <div>
            <Header />

            <Container>
                <InformationDiv>
                    <DetailDSlider /> 
                </InformationDiv>

                <InformationDiv>
                    <DetailDChoice />
                </InformationDiv>
            </Container>

            <ToggleContainer>
                <ToggleButton onClick={toggleInformation}> 상품상세정보 </ToggleButton>
                <ToggleButton onClick={toggleReviews}> 상품사용후기 </ToggleButton>
            </ToggleContainer>

            <Container>
                {showInformation &&
                    <InformationBox>
                        <InformationContainer>
                            <img src={d_serum} alt="d_serum" />
                            <TopButton />
                        </InformationContainer>

                        <SectionFont>상품사용후기</SectionFont>
                        <UserReviews />  
                    </InformationBox>
                }

                {showReviews &&
                    <ReviewContainer>
                        <UserReviews />    
                    </ReviewContainer>
                }
            </Container>
            
            <Footer />
        </div>
    );
};

export default DetailD;
