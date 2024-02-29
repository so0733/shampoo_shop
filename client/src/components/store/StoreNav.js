import React from 'react';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';

const StyledNavLink = styled(Nav.Link)`
    color: #393e46;
    font-weight: 400;
    margin-right: 1rem;
    font-family: 'gmarket_2_font';

    &:hover {
        color: #8FB8B2;
    }
`;

function StoreNav() {
    return (
        <Nav  variant="underline" className="justify-content-center">
            <Nav.Item>
                <StyledNavLink href="/store"> 전체 상품 </StyledNavLink>
            </Nav.Item>
            <Nav.Item>
                <StyledNavLink href="/store/set"> 세트 </StyledNavLink>
            </Nav.Item>
            <Nav.Item>
                <StyledNavLink href="/store/care"> 헤어케어 </StyledNavLink>
            </Nav.Item>
            <Nav.Item>
                <StyledNavLink href="/store/etc"> 기타 </StyledNavLink>
            </Nav.Item>
        </Nav>
    );
};

export default StoreNav;
