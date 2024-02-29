import React, { useState } from "react";
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';

import img1 from '../../img/review/review1.jpg';
import img2 from '../../img/review/review2.jpg';
import img3 from '../../img/review/review3.jpg';
import img4 from '../../img/review/review4.jpg';
import img5 from '../../img/review/review5.jpg';
import img6 from '../../img/review/review6.jpg';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 0 20px;
`;

const Card = styled.div`
    flex: 1;
    height: 500px;
    margin: 20px;
    padding: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;

    &:hover {
        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
        background-color: white;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
`;

const CardBody = styled.div`
    display: flex;
    width: 100%;
    height: 200px;
    flex-direction: column;
    justify-content: space-between;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Title = styled.h3`
    margin: 10px 0;
    font-size: 24px;
    font-family: "gmarket_2_font";
    color: black;
`;

const Title2 = styled.h3`
    margin: 10px 0;
    font-size: 26px;
    line-height: 1.2;
    font-family: "thefaceshop";
    color: #393e46;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Identifier = styled.h3`
    padding-top: 25px;
    text-align: end;
    font-size: 16px;
    line-height: 1.5;
    font-family: "gmarket_3_font";
    color: #393e46; 
`;

const CardFooter = styled.div`
    width: 100%;
    height: 50px;
    padding-right: 10px;
`;

function BestReview() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Container>
            <Carousel activeIndex={index} onSelect={handleSelect} controls={false} variant="dark">
                <Carousel.Item>
                    <div className="d-flex">
                        <Card>
                            <Image src={img1} alt="Image1" />
                            <CardBody>
                                <TitleContainer>
                                    <Title>최고의 샴푸로 머리 볼륨 UP!</Title>
                                    <Title2>샴푸를 쓰고 나서 제 머릿결을 완전히 변화시켰어요! 머리카락이 부드럽고 가볍게 느껴져서 매일 만족스럽게 사용하고 있어요. 풍성하고 윤기 있는 머리카락을 얻을 수 있었고, 향도 너무 좋아요. 다른 제품들과는 비교할 수 없는 퀄리티에요!</Title2>
                                </TitleContainer>
                            </CardBody>
                            <CardFooter>
                                <Identifier>young****</Identifier>
                            </CardFooter>
                        </Card>
                        <Card>
                            <Image src={img2} alt="Image2" />
                            <CardBody>
                                <TitleContainer>
                                    <Title>사용하면서 기분 좋은 샴푸!</Title>
                                    <Title2>이 샴푸를 사용한 후에는 머리가 깨끗하고 건강해진 느낌이 들었습니다. 머리카락이 부드러워지고 탄력이 생겨서 정말 좋았어요. 헤어 스타일링도 더욱 쉬워지고, 머리카락이 빠지는 것도 줄어들었습니다. 정말 최고의 샴푸라고 생각해요!</Title2>
                                </TitleContainer>                                
                            </CardBody>
                            <CardFooter>
                                <Identifier>hyeon****</Identifier>
                            </CardFooter>
                        </Card>
                        <Card>
                            <Image src={img3} alt="Image3" />
                            <CardBody>
                                <TitleContainer>
                                    <Title>놓치지 마세요. 빛나는 머릿결!</Title>
                                    <Title2>샴푸를 사용한 후에 머리카락이 거칠고 힘 없던 상태에서 환상적으로 변해버렸어요. 탄력 있고 부드러운 머리카락으로 변신할 수 있었고, 머리카락이 깨끗하고 건강해진 느낌이 들었습니다!</Title2>
                                </TitleContainer>
                            </CardBody>
                            <CardFooter>
                                <Identifier>sua97****</Identifier>
                            </CardFooter>
                        </Card>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="d-flex">
                        <Card>
                            <Image src={img4} alt="Image4" />
                            <CardBody>
                                <TitleContainer>
                                    <Title>머릿결을 환상적으로 채워줘요!</Title>
                                    <Title2>지금까지 이런 샴푸 본 적이 없는 것 같아요. 헤어 컨디션이 개선되고 머리카락이 건강하고 윤기 있게 변했습니다. 후회 없이 선택할 수 있는 최고의 샴푸라고 자신있게 추천합니다!</Title2>
                                </TitleContainer>
                            </CardBody>
                            <CardFooter>
                                <Identifier>lee37****</Identifier>
                            </CardFooter>
                        </Card>
                        <Card>
                            <Image src={img5} alt="Image5" />
                            <CardBody>
                                <TitleContainer>
                                    <Title>샴푸 한 번으로 건강한 머릿결을!</Title>
                                    <Title2>머리카락이 건강하고 매끄러워지면서 더욱 아름다워진 느낌이 들었고, 향기도 상쾌하고 일상에 활력을 불어넣어주었습니다. 최고의 선택이라고 자신있게 추천합니다!</Title2>
                                </TitleContainer>
                            </CardBody>
                            <CardFooter>
                                <Identifier>jeong****</Identifier>
                            </CardFooter>
                        </Card>
                        <Card>
                            <Image src={img6} alt="Image6" />
                            <CardBody>
                                <TitleContainer>
                                    <Title>건강한 두피를 위한 최고의 세럼!</Title>
                                    <Title2>세럼을 사용하고 난 후 머리카락이 탄력적이고 강하게 느껴지고 깨끗한 느낌을 주는 제품이에요! 강력 추천합니다.</Title2>
                                </TitleContainer>
                            </CardBody>
                            <CardFooter>
                                <Identifier>leedh****</Identifier>
                            </CardFooter>
                        </Card>
                    </div>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
};

export default BestReview;
