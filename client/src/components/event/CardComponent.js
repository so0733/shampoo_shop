import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PiShootingStar } from "react-icons/pi";

const BoardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 330px;
`;

const CardContainer = styled.div`
    width: 100px;
    height: 150px;
    margin: 5px;
    perspective: 1000px;
`;

const Card = styled.div`
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const Front = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background-color: ${props => props.color};
    align-items: center;
    justify-content: center;
`;

const Back = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    font-weight: bold;
    font-family: "pretendard";
    backface-visibility: hidden;
    background-color: #C6C6FD;
    align-items: center;
    justify-content: center;
    transform: rotateY(180deg);
`;

const CardComponent = () => {
    const [flippedCardIndex, setFlippedCardIndex] = useState(null);
    const [contents, setContents] = useState([]);
    const backgrounds = [
        'linear-gradient(120deg, #ffe4b5 0%, #ffc0cb 100%)',
        'linear-gradient(120deg, #ffe4b5 0%, #ffc0cb 100%)',
        'linear-gradient(120deg, #ffe4b5 0%, #ffc0cb 100%)',
        'linear-gradient(120deg, #ffe4b5 0%, #ffc0cb 100%)',
        'linear-gradient(120deg, #ffe4b5 0%, #ffc0cb 100%)',
        'linear-gradient(120deg, #ffe4b5 0%, #ffc0cb 100%)',
        'linear-gradient(120deg, #ffe4b5 0%, #ffc0cb 100%)',
        'linear-gradient(120deg, #ffe4b5 0%, #ffc0cb 100%)',
        'linear-gradient(120deg, #ffe4b5 0%, #ffc0cb 100%)'
        ];
    
    useEffect(() => {
        const shuffledContents = shuffleArray([
            '1등',
            '2등',
            '3등',
            '참가상',
            '참가상',
            '참가상',
            '참가상',
            '참가상',
            '꽝'
        ]);
        setContents(shuffledContents);
    }, []);
    
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleClick = index => {
        if (flippedCardIndex === null) {
            const newFlippedCardIndex = index;
            setFlippedCardIndex(newFlippedCardIndex);
        }
    };

    return (
        <BoardContainer>
            {backgrounds.map((background, index) => (
                <CardContainer key={index}>
                    <Card flipped={index === flippedCardIndex} onClick={() => handleClick(index)}>
                        <Front style={{ background }}>
                            <PiShootingStar style={{ fontSize: '2em', color: '#EBFBC2' }} />
                        </Front>
                        <Back>
                            {index === flippedCardIndex ? <div>{contents[index]}</div> : <div>Back</div>}
                        </Back>
                    </Card>
                </CardContainer>
            ))}
        </BoardContainer>
    );
};

export default CardComponent;
