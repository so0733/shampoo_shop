import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import img4 from '../../img/store/mainimg/d_serum.jpg';
import img5 from '../../img/store/mainimg/e_essence.jpg';

const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 150px 0 150px;
    align-items: center;
    justify-content: space-between;
`;

const Card = styled.div`
    width: 300px;
    height: auto;
    margin: 20px;
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
    width: 100%;
    height: 250px;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

const CardBody = styled.div`
    display: flex;
    width: 100%;
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

function MdPick () {
    return (
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
                    <Title5>15,900원</Title5>
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
                    <Title5>15,900원</Title5>
                    <Badge2>New</Badge2>
                </CardFooter>
            </Card>
    </Container>
    );
};

export default MdPick;
