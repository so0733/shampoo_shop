import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

const TabContainer = styled.div`
    display: flex;
    margin: 0 150px;
`;

const Tab = styled.button`
    padding: 10px 0;
    border: none;
    cursor: pointer;
    flex: 1;
    font-weight: 500;
    font-family: "pretendard";
    background-color: ${props => props.active ? '#8FB8B2' : 'initial'};
    color: ${props => props.active ? 'white' : 'initial'};
`;

const BolderFont = styled.h3`
    padding-top: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 20px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 0;
`;

const List = styled.span`
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 650px;
    height: 45px;
    margin: 10px 0;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
`;

const SubmitButton = styled.button`
    margin: 20px 310px 0;
    background-color: #c6a8b4;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #8FB8B2;
    }
`;

const EventTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    border: 1px solid #ccc;
    padding: 8px;
    font-family: "pretendard";
    text-align: center;
    background-color: #eee;
    width: ${props => props.title ? '40%' : (props.startdate ? '15%' : (props.enddate ? '15%' : 'auto'))};
`;

const TableCell = styled.td`
    border: 1px solid #ccc;
    padding: 8px;
    font-family: "pretendard";
    text-align: center;
`;

const UpdateButton = styled.button`
    width: 60px;
    height: 30px;
    margin-right: 10px;
    background-color: white;
    color: #61C0BF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #61C0BF;
        color: white;
    }
`;

const DeleteButton = styled.button`
    width: 60px;
    height: 30px;
    background-color: white;
    color: #FFB6B9;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #FFB6B9;
        color: white;
    }
`;

const ModalRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 0;
`;

const ModalList = styled.span`
    display: flex;
    width: 70px;
    margin-left: 10px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
`;

const ModalInput = styled.input`
    width: 380px;
    height: 45px;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const ModalButton = styled.button`
    width: 150px;
    height: 40px;
    margin: 0 160px;
    background-color: #61C0BF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;

    &:hover {
        background-color: #c6a8b4;
        color: white;
    }
`;

const EventPage = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [event, setEvent] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [eventData, setEventData] = useState({
        eventTitle: '',
        eventContent: '',
        eventPromotionCode: '',
        eventStartDate: '',
        eventEndDate: '',
        PreviewImageURL: '',
        ContentImageURL: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/admin/event', eventData);
            if (response.status === 201) {
                alert('이벤트가 성공적으로 생성되었습니다.');
                setEventData({
                    eventTitle: '',
                    eventContent: '',
                    eventPromotionCode: '',
                    eventStartDate: '',
                    eventEndDate: '',
                    PreviewImageURL: '',
                    ContentImageURL: ''
                });
            } else {
                console.error('이벤트 생성 실패:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/admin/event');
                const data = response.data;

                setEvent(data.event);
            } catch (error) {
                console.error('이벤트 조회 실패:', error.message);
            }
        };
    
        if (activeTab === 'read') {
            fetchEvent();
        }
    }, [activeTab]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleUpdateButtonClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmitModal = async () => {
        try {
            const response = await axios.patch(`http://localhost:3001/api/admin/event/${selectedEvent.eventId}`, {
                eventTitle: eventData.eventTitle,
                eventContent: eventData.eventContent,
                eventPromotionCode: eventData.eventPromotionCode,
                eventStartDate: eventData.eventStartDate,
                eventEndDate: eventData.eventEndDate,
                PreviewImageURL: eventData.PreviewImageURL,
                ContentImageURL: eventData.ContentImageURL,
            });
    
            if (response.status === 200) {
                alert('이벤트가 성공적으로 수정되었습니다.');
                setShowModal(false);
                window.location.reload();
            } else {
                alert('이벤트 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('이벤트 수정 실패:', error);
            alert('이벤트 수정에 실패했습니다.');
        }
    };

    const handleDeleteButton = async (eventId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/admin/event/${eventId}`);
    
            if (response.status === 200) {
                alert('이벤트가 성공적으로 삭제되었습니다.');
                window.location.reload();
            } else {
                alert('이벤트 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('이벤트 삭제 실패:', error);
            alert('이벤트 삭제에 실패했습니다.');
        }
    };
    
    return (
        <Container>
            <TabContainer>
                <Tab active={activeTab === 'create'} onClick={() => setActiveTab('create')}>이벤트 생성</Tab>
                <Tab active={activeTab === 'read'} onClick={() => setActiveTab('read')}>이벤트 조회</Tab>
            </TabContainer>
            
            {activeTab === 'create' && (
                <form onSubmit={handleSubmit}>
                    <BolderFont>이벤트 게시글 생성</BolderFont>

                    <Row>
                        <List>제목</List>
                        <Input type="text" name="eventTitle" value={eventData.eventTitle} onChange={handleChange} required />
                    </Row>

                    <Row>
                        <List>내용</List>
                        <Input type="text" name="eventContent" value={eventData.eventContent} onChange={handleChange} required />
                    </Row>

                    <Row>
                        <List>미리보기URL</List>
                        <Input type="text" name="PreviewImageURL" value={eventData.PreviewImageURL} onChange={handleChange} required />
                    </Row>

                    <Row>
                        <List>이미지URL</List>
                        <Input type="text" name="ContentImageURL" value={eventData.ContentImageURL} onChange={handleChange} required />
                    </Row>

                    <Row>
                        <List>프로모션 코드</List>
                        <Input type="text" name="eventPromotionCode" value={eventData.eventPromotionCode} onChange={handleChange} required />
                    </Row>

                    <Row>
                        <List>이벤트 시작일</List>
                        <Input type="date" name="eventStartDate" value={eventData.eventStartDate} onChange={handleChange} required />
                    </Row>

                    <Row>
                        <List>이벤트 종료일</List>
                        <Input type="date" name="eventEndDate" value={eventData.eventEndDate} onChange={handleChange} required />
                    </Row>

                    <SubmitButton type="submit">게시글 생성</SubmitButton>
                </form>
            )}
            
            {activeTab === 'read' && (
                <div>
                    <BolderFont>이벤트 게시글 조회</BolderFont>

                    <EventTable>
                        <thead>
                            <tr>
                                <TableHeader>번호</TableHeader>
                                <TableHeader title>제목</TableHeader>
                                <TableHeader startdate>시작일</TableHeader>
                                <TableHeader enddate>종료일</TableHeader>
                                <TableHeader>비고</TableHeader>
                            </tr>
                        </thead>

                        <tbody>
                            {event.map((event, index) => (
                                <tr key={event.eventId}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{event.eventTitle}</TableCell>
                                    <TableCell>{formatDate(event.eventStartDate)}</TableCell>
                                    <TableCell>{formatDate(event.eventEndDate)}</TableCell>
                                    <TableCell>
                                        <UpdateButton onClick={() => handleUpdateButtonClick(event)}>수정</UpdateButton>
                                        <DeleteButton onClick={() => handleDeleteButton(event.eventId)}>삭제</DeleteButton>
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </EventTable>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header>
                            <Modal.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>이벤트 정보 수정</Modal.Title>
                        </Modal.Header>

                        <Modal.Body >
                            <ModalRow>
                                <ModalList>제목</ModalList>
                                <ModalInput type="text" name="eventTitle" defaultValue={selectedEvent ? selectedEvent.eventTitle : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>내용</ModalList>
                                <ModalInput type="text" name="eventContent" defaultValue={selectedEvent ? selectedEvent.eventContent : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>URL1</ModalList>
                                <ModalInput type="text" name="PreviewImageURL" defaultValue={selectedEvent ? selectedEvent.PreviewImageURL : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>URL2</ModalList>
                                <ModalInput type="text" name="ContentImageURL" defaultValue={selectedEvent ? selectedEvent.ContentImageURL : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>프로모션</ModalList>
                                <ModalInput type="text" name="eventPromotionCode" defaultValue={selectedEvent ? selectedEvent.eventPromotionCode : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>시작일</ModalList>
                                <ModalInput type="date" name="eventStartDate" defaultValue={selectedEvent ? formatDate(selectedEvent.eventStartDate) : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>종료일</ModalList>
                                <ModalInput type="date" name="eventEndDate" defaultValue={selectedEvent ? formatDate(selectedEvent.eventEndDate) : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalButton type="button" onClick={handleSubmitModal}>이벤트 수정</ModalButton>
                        </Modal.Body>

                        <Modal.Footer style={{ justifyContent: 'center' }}>
                            <Button variant="outline-light" onClick={handleCloseModal} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 닫기 </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </Container>
    );
};

export default EventPage;
