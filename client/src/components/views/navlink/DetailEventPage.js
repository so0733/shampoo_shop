import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import GamePage from '../../event/GamePage';

const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 0 20px;
    align-items: center;
`;

const BolderFont = styled.h3`
    margin: 50px 0 50px 10px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    font-family: "gmarket_2_font";
    color: #393e46;
`;

const EventTable = styled.table`
    width: 100%;
    margin-left: 10px;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    width: 100px;
    padding: 15px 0;
    font-family: "pretendard";
    font-weight: 600;
    text-align: center;
    background-color: #eee;
    border-top: 1px solid black;
    border-bottom: 1px solid #ccc;
`;

const TableHeader2 = styled.th`
    width: 100px;
    padding: 15px 0;
    font-family: "pretendard";
    font-weight: 600;
    text-align: center;
    background-color: #eee;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid black;
`;

const TableCell = styled.td`
    padding: 0 10px;
    font-family: "pretendard";
    text-align: start;
    border-top: 1px solid black;
    border-bottom: 1px solid #ccc;
`;

const TableCell2 = styled.td`
    padding: 0 10px;
    font-family: "pretendard";
    text-align: start;
    border-bottom: 1px solid black;
`;

const ViewContainer = styled.div`
    display: flex;
    margin: 0 auto;
    padding: 0 20px 0 20px;
    width: 1200px;
    align-items: center;  
    justify-content: center;
`;

const Button = styled.button`
    margin: 10px;
    padding: 12px 25px;
    border: none;
    background-color: #393e46;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
`;

function DetailEventPage() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/admin/event/${eventId}`);
                const data = response.data;
                
                setEvent(data.event);
            } catch (error) {
                console.error('이벤트 조회 실패:', error.message);
            }
        };
        fetchEvent();
    }, [eventId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const goBack = () => {
        navigate(`/event`);
    };

    return (
        <div>
            <Header />
            
            {event && (
                <div>
                    <Container>
                        <BolderFont>이벤트 상세페이지</BolderFont>
                    </Container>
                    
                    <Container>
                        <EventTable>
                            <tbody>
                                <tr>
                                    <TableHeader>제목</TableHeader>
                                    <TableCell>{event.eventTitle}</TableCell>
                                </tr>
                                <tr>
                                    <TableHeader2>이벤트 기간</TableHeader2>
                                    <TableCell2>{`${formatDate(event.eventStartDate)} ~ ${formatDate(event.eventEndDate)}`}</TableCell2>
                                </tr>
                            </tbody>
                        </EventTable>
                    </Container>

                    {eventId === '65d5d9430fb1a687b5afb5de' && <GamePage />}

                    <ViewContainer>
                        <img src={event.ContentImageURL} alt="" />
                    </ViewContainer>
                    
                    <Container>
                        <Button onClick={goBack}>목록</Button>
                    </Container>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default DetailEventPage;
