import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import StarRating from './StarRating';
import Hashtag from './Hashtag';

const StyledForm = styled.form`
    height: 600px;
    overflow-y: auto;
`;

const Row = styled.div`
    display: flex;
    font-size: 20px;
    font-family: "pretendard";
    color: #393e46;
`;

const LeftBox = styled.div`
    width: 200px;
    height: 45px;
    margin-right: 15px;
    padding: 5px;
    font-weight: bold;
    text-align: center;
`;

const RightBox = styled.input`
    width: 550px;
    height: 45px;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    margin-bottom: 10px;
    padding: 5px;
    border: none;
`;

const TagBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 550px;
    height: auto;
`;

const TextareaBox = styled.textarea`
    width: 550px;
    height: 150px;
    padding: 10px;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    border: 1px solid #ccc;
`;

const ProductBox = styled.textarea`
    width: 550px;
    height: 150px;
    padding: 10px;
    font-size: 16px;
    font-family: "pretendard";
    color: #393e46;
    border: none;
    white-space: pre-line;
`;

const Review = ({ show, handleClose, productInfo }) => {
    const [formData, setFormData] = useState({
        username: localStorage.getItem('username'),
        evaluation: '',
        recommendation: '',
        content: '',
        productName: '',
    });

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            productName: productInfo
        }));
    }, [productInfo]);

    const handleRatingChange = (rating) => {
        setFormData(prevState => ({
            ...prevState,
            evaluation: rating
        }));
    };

    const [selectedTags, setSelectedTags] = useState([]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
            setFormData(prevState => ({
                ...prevState,
                recommendation: prevState.recommendation.replace(tag, '')
            }));
        } else {
            setSelectedTags([...selectedTags, tag]);
            setFormData(prevState => ({
                ...prevState,
                recommendation: prevState.recommendation + ' ' + tag
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post('http://localhost:3001/api/review/reviews', formData);
            handleClose();
        } catch (error) {
            console.error('에러 : ', error);
        }
    };
    
    const hashtags = ["#강력추천", "#인기핫템", "#뽀송뽀송", "#두피건강", "#두피진정", "#두피케어", "#두피힐링", "#모발강화", "#세럼효과", "#헤어볼륨"];

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>리뷰 작성</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <StyledForm onSubmit={handleSubmit}>
                    <Row>
                        <LeftBox>사용자명</LeftBox>
                        <RightBox type="text" name="username" value={formData.username} onChange={handleChange} required/>
                    </Row>

                    <Row>
                        <LeftBox>사용자 만족도</LeftBox>
                        <StarRating name="evaluation" value={formData.evaluation} handleRating={handleRatingChange} required/>
                    </Row>

                    <Row>
                        <LeftBox>추천태그</LeftBox>
                        
                        <TagBox>
                            {hashtags.map(tag => (
                                <Hashtag
                                    key={tag}
                                    tag={tag}
                                    selected={selectedTags.includes(tag)}
                                    onClick={handleTagClick}
                                />
                            ))}
                        </TagBox>
                    </Row>

                    <Row>
                        <LeftBox>리뷰 내용</LeftBox>
                        <TextareaBox type="textarea" name="content" value={formData.content} onChange={handleChange} placeholder="리뷰 내용을 입력해주세요."/>
                    </Row>

                    <Row>
                        <LeftBox>상품정보</LeftBox>
                        <ProductBox name="productName" value={formData.productName} readOnly />
                    </Row>

                    <Row style={{ justifyContent: 'center', marginTop: '20px' }}>
                        <Button type="submit" variant="primary" style={{ fontSize: '18px', backgroundColor: '#8FB8B2', color: 'white', border: 'none', marginRight: '10px', width: '150px' }}>리뷰 등록</Button>
                        <style>
                            {`.btn-primary:hover { background-color: #007D80 !important; }`}
                        </style>
                    </Row>

                </StyledForm>
            </Modal.Body>

            <Modal.Footer style={{ justifyContent: 'center' }}>
                <Button variant="outline-light" onClick={handleClose} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 닫기 </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Review;
