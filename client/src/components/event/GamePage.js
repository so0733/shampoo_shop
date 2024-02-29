import React from 'react';
import styled from 'styled-components';

import Header from '../common/Header';
import Footer from '../common/Footer';

import CardComponent from './CardComponent';

const Container = styled.div`
    display: flex;
    margin: 0 auto;
    padding: 0 20px 0 20px;
    width: 1200px;
    align-items: center;  
    justify-content: center;
`;

const Image = styled.img`
    width: 600px; /* 원하는 너비 */
    height: 500px; /* 원하는 높이 */
`;

const BodyContainer = styled.div`
    display: flex;
    width: 1200px;
    height: 600px;
    align-items: center;  
    justify-content: center;
`;

const GameContainer = styled.div`
    display: flex;
    width: 600px;
    height: 500px;
    align-items: center;  
    justify-content: center;
    background-color: #FF6F6F;
`;

function GamePage() {
    return (
        <div>
            <Header />

            <Container>
                <BodyContainer>
                    <Image src="https://github.com/so0733/imgfile/blob/main/EventDetails3.png?raw=true" alt="Event Details" />
                </BodyContainer>
                <GameContainer>
                    <CardComponent />
                </GameContainer>
                
            </Container>
            
            <Footer />
        </div>
    );
};

export default GamePage;
