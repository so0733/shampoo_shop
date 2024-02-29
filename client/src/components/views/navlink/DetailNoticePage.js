import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../../common/Header';
import Footer from '../../common/Footer';

import { BsChevronUp, BsChevronDown } from "react-icons/bs";

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

const NoticeTable = styled.table`
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

const NoticeInfoContainer = styled.div`
  display: flex;
  margin: 10px 10px 10px auto;
`;

const NoticeFont = styled.h3`
  font-size: 16px;
  font-family: "pretendard";
  color: #ccc;
`;

const Content = styled.div`
  height: auto;
  margin-left: 10px;
  padding: 20px 20px;
  font-family: "pretendard";
  white-space: pre-line;  
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

const ButtonTable = styled.table`
  width: 100%;
  margin-left: 10px;
  border-collapse: collapse;
  margin-bottom: 10px;
`;

const TableHeader3 = styled.th`
  width: 100px;
  padding: 15px 0;
  font-family: "pretendard";
  font-weight: 600;
  text-align: center;
  background-color: #eee;
  border-top: 1px solid black;
  border-bottom: 1px solid #ccc;
`;

const TableHeader4 = styled.th`
  width: 100px;
  padding: 15px 0;
  font-family: "pretendard";
  font-weight: 600;
  text-align: center;
  background-color: #eee;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid black;
`;

const TableCell3 = styled.td`
  padding: 0 10px;
  font-family: "pretendard";
  text-align: start;
  border-top: 1px solid black;
  border-bottom: 1px solid #ccc;
`;

const TableCell4 = styled.td`
  padding: 0 10px;
  font-family: "pretendard";
  text-align: start;
  border-bottom: 1px solid black;
`;

const ButtonTitleFont = styled.h3`
  font-size: 16px;
  margin-top: 8px;
  font-family: "pretendard";
  color: #393e46;
`;

function DetailNoticePage() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [previousNotice, setPreviousNotice] = useState(null);
  const [nextNotice, setNextNotice] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/admin/notices/${noticeId}`);
        const data = response.data;
        setNotice(data.notice);
        
        if (data.notice) {
          fetchPreviousNotice(data.notice.noticeNo);
          fetchNextNotice(data.notice.noticeNo);
        }
      } catch (error) {
        console.error('게시글 조회 실패:', error.message);
      }
    };
    
    const fetchPreviousNotice = async (noticeNo) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/admin/notices/previous/${noticeNo}`);
        const data = response.data;
        setPreviousNotice(data.previousNotice);
      } catch (error) {
        console.error('이전 공지사항 조회 실패:', error.message);
      }
    };
  
    const fetchNextNotice = async (noticeNo) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/admin/notices/next/${noticeNo}`);
        const data = response.data;
        setNextNotice(data.nextNotice);
      } catch (error) {
        console.error('다음 공지사항 조회 실패:', error.message);
      }
    };    
  
    fetchNotice();
  }, [noticeId]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const goBack = () => {
    navigate(`/notice`);
  };

  const navigateToNotice = (noticeId, navigate) => {
    navigate(`/notice/${noticeId}`);
  };

  return (
    <div>
      <Header />

      {notice && (
        <div>
          <Container>
            <BolderFont>공지사항</BolderFont>
          </Container>

          <Container>
            <NoticeTable>
              <tbody>
                <tr>
                  <TableHeader>제목</TableHeader>
                  <TableCell>{notice.noticeTitle}</TableCell>
                </tr>
                <tr>
                  <TableHeader2>작성자</TableHeader2>
                  <TableCell2>{notice.noticeAuthor}</TableCell2>
                </tr>
              </tbody>
            </NoticeTable>
          </Container>

          <Container>
            <NoticeInfoContainer>
              <NoticeFont>작성일 {formatDate(notice.noticeDate)}</NoticeFont>
              <NoticeFont>&ensp;조회수 {notice.noticeViews}</NoticeFont>
            </NoticeInfoContainer>
          </Container>

          <Container>
            <Content dangerouslySetInnerHTML={{ __html: notice.noticeContent }} />
          </Container>

          <Container>
            <Button onClick={goBack}>목록</Button>
          </Container>

          <Container>
            <ButtonTable>
              <tbody>
                <tr>
                  <TableHeader3><BsChevronUp />&ensp;이전글 </TableHeader3>
                  <TableCell3>
                    {previousNotice && (
                      <div>
                        <ButtonTitleFont onClick={() => navigateToNotice(previousNotice.noticeId, navigate)}>
                          {previousNotice.noticeTitle}
                        </ButtonTitleFont>
                      </div>
                    )}
                  </TableCell3>
                </tr>
                <tr>
                  <TableHeader4><BsChevronDown />&ensp;다음글 </TableHeader4>
                  <TableCell4>
                    {nextNotice && (
                      <div>
                        <ButtonTitleFont onClick={() => navigateToNotice(nextNotice.noticeId, navigate)}>
                          {nextNotice.noticeTitle}
                        </ButtonTitleFont>
                      </div>
                    )}
                  </TableCell4>
                </tr>
              </tbody>
            </ButtonTable>
          </Container>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default DetailNoticePage;
