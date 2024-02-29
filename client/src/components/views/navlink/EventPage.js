import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../../common/Header';
import Footer from '../../common/Footer';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BolderFont = styled.h3`
  margin: 50px 0 50px 10px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  font-family: "gmarket_2_font";
  color: #393e46;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
`;

const Tab = styled.button`
  flex: 1;
  margin: 0 10px;
  padding: 10px 0;
  border: none;
  font-weight: 500;
  font-size: 18px;
  font-family: "pretendard";
  color: #393e46;
  cursor: pointer;
  background-color: ${props => props.active ? '#8FB8B2' : 'initial'};
  color: ${props => props.active ? 'white' : 'initial'};
`;

const ViewContainer = styled.div`
  display: flex;
  width: 1200px;
  margin: 20px auto 0;
  padding: 0 20px 0 20px;
  align-items: center;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  width: 360px;
  height: 500px;
  margin: 10px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
  
  img {
    width: 360px;
    height: 400px;
    object-fit: fill;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const TitleFont = styled.h3`
  margin: 20px 0 10px 0;
  text-align: center;
  font-size: 22px;  
  font-weight: 600;
  font-family: "gmarket_2_font";
  color: black;
  height: 24px;

`;

const SubTitleFont = styled.h3`
  margin: 0;
  text-align: center;
  font-size: 18px;
  font-family: "pretendard";
  color: #ccc;
  height: 24px;
`;

const DateTitleFont = styled.h3`
  text-align: center;
  font-size: 16px;
  font-weight: bold;  
  font-family: "pretendard";
  color: #ccc;
  height: 24px;
`;

const EmptyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 0 20px;
  align-items: flex-start; 
  justify-content: space-between;
`;

function EventPage() {
  const [activeTab, setActiveTab] = useState('start');
  const [event, setEvent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/event');
        const data = response.data;
      
        setEvent(data.event);
      } catch (error) {
        console.error('이벤트 조회 실패:', error.message);
      }
    };
    
    fetchNotices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Header />

      <Container>
        <BolderFont>이벤트</BolderFont>
      </Container>

      <Container>
        <TabContainer>
          <Tab active={activeTab === 'start'} onClick={() => setActiveTab('start')}>진행중인 이벤트</Tab>
          <Tab active={activeTab === 'end'} onClick={() => setActiveTab('end')}>종료된 이벤트</Tab>
        </TabContainer>
      </Container>

      {activeTab === 'start' && (
        
        <ViewContainer>
          {event.map((eventItem, index) => (
             <CardContainer key={index} onClick={() => navigate(`/event/${eventItem.eventId}`)}>
              <img src={eventItem.PreviewImageURL} alt="" />
              <TitleFont>{eventItem.eventTitle}</TitleFont>
              <SubTitleFont>
                {eventItem.eventContent}
              </SubTitleFont>
              <DateTitleFont>
                {`${formatDate(eventItem.eventStartDate)} ~ ${formatDate(eventItem.eventEndDate)}`}
              </DateTitleFont>
            </CardContainer>
          ))}
        </ViewContainer>
      )}

      {activeTab === 'end' && (
        <Container>
          <SubTitleFont>종료된 이벤트가 없습니다.</SubTitleFont>
        </Container>
      )}
      
      <EmptyContainer />
      
      <Footer />
    </div>
  );
}

export default EventPage;
