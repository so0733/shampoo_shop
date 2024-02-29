import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import TopButton from '../../common/TopButton';
import TranslucentImg3 from '../../../img/TranslucentImg3.png';
import TranslucentImg4 from '../../../img/TranslucentImg4.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    margin: 100px;
`;

const SectionContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 300px;
    margin-bottom: 40px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s, transform 0.5s;
`;

const Img3Container = styled(Container)`
    background-image: url(${TranslucentImg3});
    background-size: cover;
`;

const Img4Container = styled(Container)`
    background-image: url(${TranslucentImg4});
    background-size: cover;
`;

const BaseFontStyles = css`
    text-align: center;
    font-weight: bold;
    color: #393e46;
`;

const Title = styled.h3`
    ${BaseFontStyles}
    font-size: 48px;
    font-family: "thefaceshop";
`;

const Title2 = styled.h3`
    ${BaseFontStyles}
    font-size: 24px;
    font-family: "gmarket_2_font";
`;

const Title3 = styled.h3`
    ${BaseFontStyles}
    font-size: 18px;
    line-height: 1.5;
    font-family: "gmarket_3_font";
`;

const CardTitle = styled.h3`
    margin-bottom: 10px;
    font-family: "gmarket_1_font";
    font-size: 20px;
    font-weight: bold;
`;

const CardSubtitle = styled.h3`
    margin-bottom: 15px;
    font-family: "gmarket_2_font";
    font-size: 16px;
    font-weight: bold;
    color: #393e46;
`;

const CardContent = styled.p`
    font-family: "pretendard";
    color: #393e46;
`;

const LeftSection = styled.div`
    flex: 1;
    margin: 0 10px 0 100px;
    padding: 20px;
    background-color: #eee;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RightSection = styled.div`
    flex: 1;
    margin: 0 100px 0 10px;
    padding: 20px;
    background-color: #ccc;
    border-radius: 10px;    
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmptyLeft = styled.div`
    flex: 1;
    margin: 0 10px 0 100px;
    padding: 20px;
    border-radius: 10px;
`;

const EmptyRight = styled.div`
    flex: 1;
    margin: 0 100px 0 10px;
    padding: 20px;
    border-radius: 10px;    
`;

const CardContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
`;

const handleScrollEffects = () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;
        if (sectionPosition < screenPosition) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

function BrandPage() {

    useEffect(() => {
        window.addEventListener('scroll', handleScrollEffects);

        return () => {
            window.removeEventListener('scroll', handleScrollEffects);
        };
    }, []);

    return (
        <div>
            <Header />
            
            <Container>
                <Title> 샴푸샵 브랜드 스토리 </Title> <br />
                <Title2> 샴푸샵(shampoo #)은 2024년 리액트를 활용한 웹페이지 구현을 위해 만든 개인 프로젝트입니다. </Title2> <br /><br /><br />
                <Title3>
                    shampoo는 '씻다'라는 뜻을 가진 힌디어 단어인 참포(Champo)에서 유래했으며 19세기경 현재의 머리를 감는다는 뜻으로 널리 사용되기 사작하였습니다.<br />
                    샴푸는 머리를 감을 때에는 작은 거품이 마찰을 줄여 머리카락끼리의 마찰을 막고 단백질과 지방을 분해하는 물질이 염기성인 수산화나트륨과 중성을 이루어 손상을 막아줍니다.<br />
                    내로라는 제품을 사용해도 두피의 문제가 해결되지 않는다면 두피 상태를 다시 살펴보아야 합니다.
                </Title3> <br/>
            </Container>

            <Img4Container>
                <Title>
                    당신의 두피, 건강하십니까? <br /><br />
                    두피도 소중한 당신의 피부입니다.
                </Title>
            </Img4Container>

            <SectionContainer className="section">
                <LeftSection>
                    <CardContainer>
                        <CardTitle>'건성'</CardTitle>
                        <CardSubtitle>유·수분 균형을 맞춰야 하는 '건성'</CardSubtitle>
                        <CardContent>
                            &#60;두피의 유·수분 밸런스 조절&#62; <br />
                            두피와 모발에 풍부한 수분을 공급하는 모이스처 라인의 제품으로 보습력을 높여주고, 트리트먼트나 천연 두피 팩으로 윤기를 더해 두피의 유·수분 균형을 맞추는 것이 중요합니다.
                        </CardContent>
                    </CardContainer>
                </LeftSection>
                <EmptyRight />
            </SectionContainer>

            <SectionContainer className="section">
                <EmptyLeft />
                <RightSection>
                    <CardContainer>
                        <CardTitle>'지성'</CardTitle>
                        <CardSubtitle>청결한 두피 관리가 중요한 '지성'</CardSubtitle>
                        <CardContent>
                            &#60;피지와 각종 오염 물질 제거&#62; <br />
                            지성 두피는 과다한 피지 분비로 인해 각질, 먼지 등 각종 오염 물질이 쌓여 세균이 쉽게 번식할 수 있습니다. 피지 분비 조절을 돕는 제품이나 두피 전용 딥 클렌저를 사용하는 것이 좋습니다.
                        </CardContent>
                    </CardContainer>
                </RightSection>
            </SectionContainer>

            <SectionContainer className="section">
                <LeftSection>
                    <CardContainer>
                        <CardTitle>'민감성'</CardTitle>
                        <CardSubtitle>자극으로 민감해진 두피를 진정시켜야 하는 '민감성'</CardSubtitle>
                        <CardContent>
                            &#60;외부 자극을 최소화하는 두피 케어&#62; <br />
                            약한 자극에도 두피가 쉽게 붉어지고 트러블이 발생하는 민감성 두피. 자극을 최소화하기 위해 청결 유지가 중요하며, 진정 및 쿨링 효과가 있는 제품으로 예민해진 두피를 케어해 줄 수 있습니다.
                        </CardContent>
                    </CardContainer>
                </LeftSection>
                <EmptyRight />
            </SectionContainer>

            <SectionContainer className="section">
                <EmptyLeft />
                <RightSection>
                    <CardContainer>
                        <CardTitle>'탈모'</CardTitle>
                        <CardSubtitle>모근과 모발에 집중 케어가 필요한 '탈모'</CardSubtitle>
                        <CardContent>
                            &#60;모근과 모발에 에너지 공급&#62; <br />
                            탈모의 원인은 다양하지만 머리카락이 자라는 모근에 충분한 영양소를 공급해주는 것이 중요하다. 모근에 영양을 공급해줄 집중 앰풀 및 세럼은 현재의 모량을 유지시켜 탈모 예방에 도움을 준다.
                        </CardContent>
                    </CardContainer>
                </RightSection>
            </SectionContainer>

            <Img3Container>
                <Title>
                    샴푸샵을 이용한다는 건 <br /><br />
                    두피 건강을 좀 안다는 것!
                </Title>
            </Img3Container>
            <TopButton />
            <Footer />
        </div>
    );
};


export default BrandPage;
