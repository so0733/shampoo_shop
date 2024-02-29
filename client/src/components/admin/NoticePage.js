import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const QuillWrapper  = styled.div`
    .ql-editor {
        width: 650px;
        height: 300px;
        margin: 10px 0;
        padding: 5px;
        border-top: 1px solid #ccc;
        border-right: none;
        border-bottom: none;
        border-left: none;
    }
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

const NoticeTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    border: 1px solid #ccc;
    padding: 8px;
    font-family: "pretendard";
    text-align: center;
    background-color: #eee;

    width: ${props => props.title ? '40%' : (props.date ? '15%' : (props.views ? '10%' : 'auto'))};
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

const ModalQuillWrapper  = styled.div`
    .ql-editor {
        width: 380px;
        height: 200px;
        margin: 10px 0;
        padding: 5px;
        border-top: 1px solid #ccc;
        border-right: none;
        border-bottom: none;
        border-left: none;
    }
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

const NoticePage = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [notices, setNotices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const [noticeData, setNoticeData] = useState({
        noticeTitle: '',
        noticeAuthor: '샴푸샵',
        noticeContent: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoticeData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleQuillChange = (content, delta, source, editor) => {
        const htmlContent = editor.getHTML(); // Quill 에디터의 HTML 내용을 가져옴
        setNoticeData(prevData => ({
            ...prevData,
            noticeContent: htmlContent // HTML 내용을 저장
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3001/api/admin/notices', noticeData);
    
            if (response.status === 201) {
                alert('공지사항이 성공적으로 생성되었습니다.');
                setNoticeData({
                    noticeTitle: '',
                    noticeContent: '',
                    noticeAuthor: '샴푸샵'
                });
            } else {
                console.error('공지사항 생성 실패:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/admin/notices');
                const data = response.data;

                setNotices(data.notices);
            } catch (error) {
                console.error('게시글 조회 실패:', error.message);
            }
        };
    
        if (activeTab === 'read') {
            fetchNotices();
        }
    }, [activeTab]); 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const handleUpdateButtonClick = (notices) => {
        setSelectedNotice(notices);
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    const handleSubmitModal = async () => {
        try {
            const response = await axios.patch(`http://localhost:3001/api/admin/notices/${selectedNotice.noticeId}`, {
                noticeTitle: noticeData.noticeTitle,
                noticeContent: noticeData.noticeContent,
                noticeAuthor: noticeData.noticeAuthor,
            });
    
            if (response.status === 200) {
                alert('공지사항이 성공적으로 수정되었습니다.');
                setShowModal(false);
                window.location.reload();
            } else {
                alert('공지사항 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('공지사항 수정 실패:', error);
            alert('공지사항 수정에 실패했습니다.');
        }
    };

    const handleDeleteButton = async (noticeId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/admin/notices/${noticeId}`);
    
            if (response.status === 200) {
                alert('공지사항이 성공적으로 삭제되었습니다.');
                window.location.reload();
            } else {
                alert('공지사항 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('공지사항 삭제 실패:', error);
            alert('공지사항 삭제에 실패했습니다.');
        }
    };
    
    return (
        <Container>
            <TabContainer>
                <Tab active={activeTab === 'create'} onClick={() => setActiveTab('create')}>공지사항 생성</Tab>
                <Tab active={activeTab === 'read'} onClick={() => setActiveTab('read')}>공지사항 조회</Tab>
            </TabContainer>
            
            {activeTab === 'create' && (
                <form onSubmit={handleSubmit}>
                    <BolderFont>공지사항 게시글 생성</BolderFont>

                    <Row>
                        <List>제목</List>
                        <Input type="text" name="noticeTitle" value={noticeData.noticeTitle} onChange={handleChange} required />
                    </Row>

                    <Row>
                        <List>내용</List>
                        <QuillWrapper>
                            <ReactQuill theme="snow" value={noticeData.noticeContent} onChange={handleQuillChange} required />
                        </QuillWrapper>
                    </Row>

                    <Row>
                        <List>작성자</List>
                        <Input type="text" name="noticeAuthor" value={noticeData.noticeAuthor} readOnly />
                    </Row>

                    <SubmitButton type="submit">게시글 생성</SubmitButton>
                </form>
            )}
            
            {activeTab === 'read' && (
                <div>
                    <BolderFont>공지사항 게시글 조회</BolderFont>

                    <NoticeTable>
                        <thead>
                            <tr>
                                <TableHeader>번호</TableHeader>
                                <TableHeader title>제목</TableHeader>
                                <TableHeader>작성자</TableHeader>
                                <TableHeader date>작성일</TableHeader>
                                <TableHeader views>조회수</TableHeader>
                                <TableHeader>비고</TableHeader>
                            </tr>
                        </thead>

                        <tbody>
                            {notices.map((notice, index) => (
                                <tr key={notice.noticeId}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{notice.noticeTitle}</TableCell>
                                    <TableCell>{notice.noticeAuthor}</TableCell>
                                    <TableCell>{formatDate(notice.noticeDate)}</TableCell>
                                    <TableCell>{notice.noticeViews}</TableCell>

                                    <TableCell>
                                        <UpdateButton onClick={() => handleUpdateButtonClick(notice)}>수정</UpdateButton>
                                        <DeleteButton onClick={() => handleDeleteButton(notice.noticeId)}>삭제</DeleteButton>
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </NoticeTable>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header>
                            <Modal.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>공지사항 수정</Modal.Title>
                        </Modal.Header>

                        <Modal.Body >
                            <ModalRow>
                                <ModalList>제목</ModalList>
                                <ModalInput type="text" name="noticeTitle" defaultValue={selectedNotice ? selectedNotice.noticeTitle : ''} onChange={handleChange} required />
                            </ModalRow>

                            <ModalRow>
                                <ModalList>내용</ModalList>
                                <ModalQuillWrapper>
                                <ReactQuill theme="snow" defaultValue={selectedNotice ? selectedNotice.noticeContent : ''} onChange={handleQuillChange} required />
                                </ModalQuillWrapper>
                            </ModalRow>

                            <ModalRow>
                                <ModalList>작성자</ModalList>
                                <ModalInput type="text" name="noticeAuthor" defaultValue={selectedNotice ? selectedNotice.noticeAuthor : ''} onChange={handleChange} readOnly />
                            </ModalRow>

                            <ModalButton type="button" onClick={handleSubmitModal}>공지사항 수정</ModalButton>
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

export default NoticePage;
