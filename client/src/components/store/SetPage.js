import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import StoreNav from '../store/StoreNav';
import Header from '../common/Header';
import Footer from '../common/Footer';

import img7 from '../../img/store/mainimg/g_setA.jpg';
import img8 from '../../img/store/mainimg/h_setB.jpg';
import img9 from '../../img/store/mainimg/i_setC.jpg';

const Container = styled.div`
  display: flex;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const Card = styled.div`
  width: 300px;
  height: 460px;
  margin: 20px 10px;
  padding: 20px;
  border-radius: 4px;
  transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
    background-color: white;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Image = styled.img`
  width: 260px;
  height: 250px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardBody = styled.div`
  display: flex;
  width: 260px;
  flex-direction: column;
  justify-content: space-between;
`;

const BaseFontStyles = css`
  text-align: center;
  font-family: "pretendard";
`;

const NavTitle = styled.h3`
  text-align: center;
  font-weight: 600;
  font-size: 26px;
  font-family: "pretendard";
  white-space: nowrap;
`;

const Title = styled.h3`
  margin: 10px 0 10px 0;
  font-weight: bold;
  font-size: 20px;
  ${BaseFontStyles}
  color: #393e46;
  white-space: nowrap;
`;

const Title2 = styled.h3`
  margin: 10px 0 10px 0;
  font-size: 14px;
  ${BaseFontStyles}
  color: #ccc;
`;

const CardFooter = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const Title3 = styled.h3`
  text-align: left;
  font-size: 14px;
  text-decoration: line-through;
  font-family: "gmarket_2_font";
  color: #ccc;
`;

const Title4 = styled.h3`
  display: inline-block;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  font-family: "gmarket_2_font";
  color: red;
`;

const Title5 = styled.h3`
  display: inline-block;
  margin-left: 10px;
  font-weight: bold;
  font-size: 16px;
  font-family: "gmarket_2_font";
  color: black;
`;

const Badge = styled.div`
  display: inline-block;
  margin-right: 5px;
  padding: 5px;
  width: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  font-family: "gmarket_2_font";
  background-color: #FF6969;
  color: white;
`;

const Badge3 = styled.div`
  display: inline-block;
  margin-right: 5px;
  padding: 5px;
  width: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  font-family: "gmarket_2_font";
  background-color: #A6D0DD;
  color: white;
`;

const EmptyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 0 20px;
  align-items: flex-start; 
  justify-content: space-between;
`;

function StorePage() {
  return (
    <div>
        <Header />
        
        <NavTitle>상품 유형별</NavTitle>
        <StoreNav />

        <Container>
          <Card>
            <StyledLink to="/store/detail/g">
              <Image src={img7} alt="Image7" />
              <CardBody>
                <Title>샴푸샵 두피 케어 세트 (2종)</Title>
                <Title2>특별한 두피 케어로 건강한 머릿결 완성</Title2>
              </CardBody>
            </StyledLink>
            <CardFooter>
              <Title3>52,800원</Title3>
              <Title4>30%</Title4>
              <Title5>36,900원</Title5> <br/>
              <Badge>Hot</Badge>
            </CardFooter>
          </Card>
          <Card>
            <StyledLink to="/store/detail/h">
              <Image src={img8} alt="Image8" />
              <CardBody>
                <Title>샴푸샵 감사 세트 (3종)</Title>
                <Title2>소중한 사람에게 감사의 마음을 전하는 세트</Title2>
              </CardBody>
            </StyledLink>
            <CardFooter>
              <Title3>71,700원</Title3>
              <Title4>26%</Title4>
              <Title5>53,000원</Title5> <br/>
              <Badge>Hot</Badge>
            </CardFooter>
          </Card>
          <Card>
            <StyledLink to="/store/detail/i">
              <Image src={img9} alt="Image9" />
              <CardBody>
                <Title>샴푸샵 종합 세트 (6종)</Title>
                <Title2>모든 머리결 고민을 해결하는 완벽한 종합 세트</Title2>
              </CardBody>
            </StyledLink>
            <CardFooter>
              <Title3>134,400원</Title3>
              <Title4>30%</Title4>
              <Title5>94,000원</Title5> <br/>
              <Badge>Hot</Badge>
              <Badge3>Best</Badge3>
            </CardFooter>
          </Card>
        </Container>

        <EmptyContainer />
        <EmptyContainer />
        
        <Footer />
    </div>
  );
};

export default StorePage;
