import React from "react";
import styled, { css } from 'styled-components';
import contactUsImage from '../../img/contactus.jpg';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const ContactImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(80%);
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  width: 60%;
`;

const Column = styled.div`
  flex: 1;
  margin-right: 20px;

  &:nth-child(1) {
    flex: 0 0 auto;
  }

  &:nth-child(2) {
    flex: 0 0 auto;
  }

  &:nth-child(3) {
    flex: 0 0 auto;
  }
`;

const BaseFontStyles = css`
  font-family: "gmarket_2_font";
  color: white;
`;

const Title = styled.h3`
  font-size: 30px;
  ${BaseFontStyles}
`;

const Title2 = styled.h3`
  font-size: 30px;
  ${BaseFontStyles}
`;

const Title3 = styled.h3`
  font-size: 20px;
  ${BaseFontStyles}
`;

function ContactUs() {
  return (
    <Container>
      <ContactImg src={contactUsImage} alt="Contact Us" />
      
      <ContentContainer>  
        <Column>
          <Title>Contact us</Title>
        </Column>

        <Column>
          <Title2>고객센터 : 1588 - 0000</Title2>
        </Column>

        <Column>
          <Title3>상담 시간 : 10시 - 18시 <br /> 주말 공휴일 휴무</Title3>
        </Column>
      </ContentContainer>
    </Container>
  );
};

export default ContactUs;
