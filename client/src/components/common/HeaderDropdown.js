import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BsPerson, BsPersonCircle, BsPencilSquare } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";

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

const LogoutButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const HeaderDropdown = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
        setIsLoggedIn(false);
        navigate('/');
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const usernameFromToken = decodedToken.username;
            setUsername(usernameFromToken);
            
            setIsLoggedIn(true);

            const timeout = setTimeout(() => {
                handleLogout();
                alert('세션이 만료되었습니다. 자동 로그아웃되었습니다.');
            }, 60 * 60 * 1000);

            return () => clearTimeout(timeout);
        } else {
            setUsername('');
            setIsLoggedIn(false);
        }
    }, [handleLogout]);

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
                <BsPerson size={35} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {isLoggedIn ? (
                    <div>
                        <Dropdown.Item>
                            <BsPersonCircle size={20} style={{ marginRight: '8px' }} />&nbsp;&nbsp;
                            {username}님
                        </Dropdown.Item>
                        <CustomDropdownItem href="/myinfo">
                            <BsPencilSquare size={20} style={{ marginRight: '8px' }} />&nbsp;
                            회원정보변경
                        </CustomDropdownItem>
                        <CustomDropdownItem>
                            <IoLogOutOutline size={24} style={{ marginRight: '8px' }} />
                            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                        </CustomDropdownItem>
                    </div>
                ) : (
                    <div>
                        <Dropdown.Item href="/login">로그인</Dropdown.Item>
                        <Dropdown.Item href="/signup">회원가입</Dropdown.Item>
                    </div>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default HeaderDropdown;
