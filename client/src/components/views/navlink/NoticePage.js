import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../../common/Header';
import Footer from '../../common/Footer';

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 600px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 0 20px;
  align-items: flex-start;
`;

const NoticeTable = styled.table`
  width: 100%;
  margin-left: 10px;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 15px 0;
  font-family: "pretendard";
  font-weight: 600;
  text-align: center;
  border-top: 1px solid black;
  border-bottom: 1px solid #ccc;
  width: ${props => props.title ? '50%' : (props.date ? '20%' : (props.views ? '10%' : 'auto'))};
`;

const TableCell = styled.td`
  padding: 15px 0;
  font-family: "pretendard";
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const PaginationContainer = styled.div`
  display: flex;
  height: 700px;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 24px;
  line-height: 24px;
`;

const CurrentPageFont = styled.h3`
  margin-top: 2px;
  text-align: center;
  font-size: 14px;
  font-family: "gmarket_2_font";
  color: #393e46;
  height: 24px;
  line-height: 24px;
  border-bottom: 1px solid black;
`;

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

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

    fetchNotices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleNoticeClick = async (noticeId) => {
    try {
      await axios.put(`http://localhost:3001/api/admin/notices/${noticeId}/increase-views`);
    } catch (error) {
      console.error('조회수 증가 실패:', error.message);
    }
  };

  const indexOfLastNotice = currentPage * perPage;
  const indexOfFirstNotice = indexOfLastNotice - perPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Header />

      <Container>
        <BolderFont>공지사항</BolderFont> 
      </Container>        

      <BodyContainer>
        <NoticeTable>
          <thead>
            <tr>
              <TableHeader>번호</TableHeader>
              <TableHeader title>제목</TableHeader>
              <TableHeader>작성자</TableHeader>
              <TableHeader date>작성일</TableHeader>
              <TableHeader views>조회수</TableHeader>
            </tr>
          </thead>
          
          <tbody>
            {currentNotices.map((notice, index) => (
              <tr key={notice.noticeId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell style={{ textAlign: 'start',cursor: 'pointer' }}>
                <Link to={`/notice/${notice.noticeId}`} onClick={() => handleNoticeClick(notice.noticeId)} style={{ textDecoration: 'none', color: 'inherit' }}>{notice.noticeTitle}</Link>
                </TableCell>
                <TableCell>{notice.noticeAuthor}</TableCell>
                <TableCell>{formatDate(notice.noticeDate)}</TableCell>
                <TableCell>{notice.noticeViews}</TableCell>
              </tr>
            ))}
          </tbody>
        </NoticeTable>
      </BodyContainer>

      <PaginationContainer>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}> <BsChevronLeft /> </PaginationButton>
          <CurrentPageFont>{currentPage}</CurrentPageFont>
        <PaginationButton onClick={nextPage} disabled={currentNotices.length < perPage}> <BsChevronRight /></PaginationButton>
      </PaginationContainer>

      <Footer />
    </div>
  );
}

export default NoticePage;
