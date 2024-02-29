import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import HeaderDropdown from './HeaderDropdown';
import { BsCart4, BsBasket2, BsClipboard } from "react-icons/bs";

const CustomContainer = styled(Container)`
    height: 90px;
    width: 1200px;
    max-width: 100%;
`;

const StyledBrand = styled(Navbar.Brand)`
    font-family: "chosunbg";
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 2px;
    text-decoration: none;
    color: #393e46;
    margin-right: 5rem;

    &:hover {
        color: #8FB8B2;
    }
`;

const StyledNavLink = styled(Nav.Link)`
    color: #393e46;
    font-family: 'gmarket_2_font';

    &:hover {
        color: #8FB8B2;
    }
`;

const StyledBsCart4 = styled(BsCart4)`
    margin-left: 10px;
    color: #393e46;
`;

const CustomToggle = styled.div`
    display: flex;
    align-items: center;

    &::after {
        display: none !important;
    }
`;

const CustomDropdownItem = styled(Dropdown.Item)`
    &:hover {
        background-color: #8FB8B2;
    }
`;

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 토큰의 존재 여부를 확인하여 사용자가 로그인했는지 확인
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);
    
    return (
        <Navbar bg="light" expand="lg">
            <CustomContainer fluid>
                <StyledBrand href="/">SHAMPOO #</StyledBrand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <StyledNavLink href="/brand">브랜드</StyledNavLink>
                        <StyledNavLink href="/store">스토어</StyledNavLink>
                        <StyledNavLink href="/event">이벤트</StyledNavLink>
                        <StyledNavLink href="/notice">공지사항</StyledNavLink>
                    </Nav>
                    <Nav>
                        <HeaderDropdown />

                        {isLoggedIn ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="cart-dropdown" as={CustomToggle}>
                                    <StyledBsCart4 size={35} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                <CustomDropdownItem href="/cart">
                                    <BsBasket2 size={20} style={{ marginRight: '8px' }} />&nbsp;
                                    장바구니
                                </CustomDropdownItem>

                                <CustomDropdownItem href="/myinfo">
                                    <BsClipboard size={20} style={{ marginRight: '8px' }} />&nbsp;
                                    주문내역
                                </CustomDropdownItem>

                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <StyledBsCart4 size={35} />
                        )}
                    </Nav>
                </Navbar.Collapse>
            </CustomContainer>
        </Navbar>
    );
}

export default Header;
