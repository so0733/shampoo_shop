import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import StoreNav from './StoreNav';
import Header from '../common/Header';
import Footer from '../common/Footer';

import img1 from '../../img/store/mainimg/a_shampoo.jpg';
import img2 from '../../img/store/mainimg/b_treatment.jpg';
import img3 from '../../img/store/mainimg/c_tonic.jpg';
import img4 from '../../img/store/mainimg/d_serum.jpg';
import img5 from '../../img/store/mainimg/e_essence.jpg';

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

function CarePage() {
  return (
    <div>
        <Header />
        
        <NavTitle>상품 유형별</NavTitle>
        <StoreNav />
        
        <Container>
          <Card>
            <StyledLink to="/store/detail/a">
              <Image src={img1} alt="Image1" />
              <CardBody>
                <Title>샴푸샵 두피케어 샴푸 720ml</Title>
                <Title2>건강한 두피를 위한 완벽한 케어</Title2>
              </CardBody>
            </StyledLink>
            <CardFooter>
              <Title3>25,900원</Title3>
              <Title4>27%</Title4>
              <Title5>18,900원</Title5> <br/>
              <Badge>Hot</Badge>
              <Badge3>Best</Badge3>
            </CardFooter>
          </Card>
          <Card>
            <StyledLink to="/store/detail/b">
              <Image src={img2} alt="Image2" />
              <CardBody>
                <Title>샴푸샵 두피케어 트리트먼트 720ml</Title>
                <Title2>깊은 영양과 보습으로 두피 케어 완성</Title2>
              </CardBody>
            </StyledLink>
            <CardFooter>
              <Title3>26,900원</Title3>
              <Title4>26%</Title4>
              <Title5>19,900원</Title5> <br/>
              <Badge>Hot</Badge>
              <Badge3>Best</Badge3>
            </CardFooter>
          </Card>
          <Card>
            <StyledLink to="/store/detail/c">
              <Image src={img3} alt="Image3" />
              <CardBody>
                <Title>샴푸샵 두피진정 헤어토닉 50ml</Title>
                <Title2>민감한 두피를 진정시켜주는 특별한 케어</Title2>
              </CardBody>
            </StyledLink>
            <CardFooter>
              <Title3>22,900원</Title3>
              <Title4>24%</Title4>
              <Title5>17,400원</Title5> <br/>
              <Badge>Hot</Badge>
            </CardFooter>
          </Card>
        </Container>
        
        <Container>
          <Card>
            <StyledLink to="/store/detail/d">
              <Image src={img4} alt="Image4" />
              <CardBody>
                <Title>샴푸샵 헤어 모이스처 세럼 70ml</Title>
                <Title2>건강하고 화려한 머릿결을 위한 완벽한 선택</Title2>
              </CardBody>
            </StyledLink>
            <CardFooter>
              <Title3>19,900원</Title3>
              <Title4>20%</Title4>
              <Title5>15,900원</Title5> <br/>
              <Badge>Hot</Badge>
            </CardFooter>
          </Card>
          <Card>
            <StyledLink to="/store/detail/e">
              <Image src={img5} alt="Image5" />
              <CardBody>
                <Title>샴푸샵 두피청정 헤어에센스 70ml</Title>
                <Title2>깨끗하고 상쾌한 두피로 건강한 머리결을 위해</Title2>
              </CardBody>
            </StyledLink>
            <CardFooter>
              <Title3>19,900원</Title3>
              <Title4>20%</Title4>
              <Title5>15,900원</Title5> <br/>
              <Badge2>New</Badge2>
            </CardFooter>
          </Card>
          <NonCard />
        </Container>

        <EmptyContainer />
        
        <Footer />
    </div>
  );
};

export default CarePage;
