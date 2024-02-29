import React, { useState } from "react";
import styled, { css } from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AgreementText from '../member/agreement.js';
import PrivacyText from '../member/privacy.js';
import shampooLogo from '../../img/logo.png';

const FooterContainer = styled.footer`
  background-color: #393e46;
  padding: 20px;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #393e46;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const Column = styled.div`
  flex: 1;
  margin-right: 20px;

  &:nth-child(1) {
    flex: 2;
    margin-right: 40px;
  }

  &:nth-child(2) {
    flex: 1;
  }
  &:nth-child(3) {
    flex: 1;
  }
`;

const BaseFontStyles = css`
  font-family: "gmarket_2_font";
  color: white;
`;

const Title = styled.h3`
  font-size: 24px;
  ${BaseFontStyles}
`;

const Title2 = styled.h3`
  font-size: 14px;
  ${BaseFontStyles}
  letter-spacing: 0.05em;
  line-height: 1.5;
`;

const LinkButton = styled(Button)`
  text-decoration: none !important;
  color: white;
  &:hover {
    color: #8FB8B2;
  }
`;

const Logo = styled.img`
  max-width: 100%;
`;

function Footer() {
  const [show, setShow] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseSecondModal = () => setShowSecondModal(false);
  const handleShowSecondModal = () => setShowSecondModal(true);

  return (
    <FooterContainer>
      <FooterContent>
        <Column>
          <Title>Info</Title>

          <Title2>
            상호: 샴푸샵 주식회사 | 대표자: 홍길동 | 고객센터: 1588 - 0000 <br />
            개인정보 보호 책임자: 홍길동 (info@shampooshop.com) <br />
            사업자등록번호: 000-00-00000 <br />
            통신판매업신고번호: 2024-부산진구-0000 <br />
            주소: [00000] 부산 부산진구 당감로 00 <br /> <br />
            Copyright © 2024.샴푸샵 All Rights Reserved.
          </Title2>
        </Column>
        
        <Column>
          <Title>Guide</Title><br />

          <LinkButton variant="link" onClick={handleShow}> 이용약관 </LinkButton> <br />
        
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>이용약관 안내</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <AgreementText />
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>
              <Button variant="outline-light" onClick={handleClose} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 확인 </Button>
            </Modal.Footer>
          </Modal>

          <LinkButton variant="link" onClick={handleShowSecondModal}> 개인정보 처리방침 </LinkButton>
        
          <Modal show={showSecondModal} onHide={handleCloseSecondModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>개인정보 처리방침</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <PrivacyText />
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>
              <Button variant="outline-light" onClick={handleCloseSecondModal} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 확인 </Button>
            </Modal.Footer>
          </Modal>
        </Column>

        <Column>
          <Logo src={shampooLogo} alt="Shampoo Logo" />
        </Column>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
