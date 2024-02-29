import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import StoreNav from '../store/StoreNav';
import Header from '../common/Header';
import Footer from '../common/Footer';

import img6 from '../../img/store/mainimg/f_pomade.jpg';

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

const Badge2 = styled.div`
  display: inline-block;
  margin-right: 5px;
  padding: 5px;
  width: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  font-family: "gmarket_2_font";
  background-color: #F7D060;
  color: white;
`;

const NonCard = styled.div`
  width: 300px;
  height: 460px;
  margin: 20px;
  padding: 20px;
  border-radius: 4px;
  transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
  pointer-events: none;
  
  &:hover {
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
    background-color: white;
  }
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

function EtcPage() {
  return (
    <div>
        <Header />
        
        <NavTitle>상품 유형별</NavTitle>
        <StoreNav />

        <Container>
        <Card>
            <StyledLink to="/store/detail/f">
              <Image src={img6} alt="Image6" />
              <CardBody>
                <Title>샴푸샵 스타일링 포마드</Title>
                <Title2>완벽한 스타일링을 위한 필수 아이템</Title2>
              </CardBody>
            </StyledLink>
            <CardFooter>
              <Title3>18,900원</Title3>
              <Title4>13%</Title4>
              <Title5>16,400원</Title5> <br/>
              <Badge2>New</Badge2>
            </CardFooter>
          </Card>
          <NonCard />
          <NonCard />
        </Container>

        <EmptyContainer />
        <EmptyContainer />
        
        <Footer />
    </div>
  );
};

export default EtcPage;
