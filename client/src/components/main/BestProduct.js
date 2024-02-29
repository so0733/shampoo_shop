import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import img1 from '../../img/store/mainimg/a_shampoo.jpg';
import img2 from '../../img/store/mainimg/b_treatment.jpg';
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

function BestProduct () {
    return(
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
                <StyledLink to="/store/detail/i">
                    <Image src={img9} alt="Image9" />
                    <CardBody>
                        <Title>샴푸샵 종합 세트(6종)</Title>
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
    );
};

export default BestProduct;
