import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { FaStar } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

const ReviewBox = styled.div`
    display: flex;
    height: 250px;
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
`;

const LeftBox = styled.div`
    width: 400px;
    height: 300px;
`;

const RightBox = styled.div`
    width: 800px;
    height: 300px;
`;

const PurchaseHistory = styled.div`
    display: flex;
    font-size: 18px;
    font-weight: bold;
    font-family: "pretendard";
    color: #393e46;
    padding: 15px;
    justify-content: space-around;
`;

const PurchaseHistoryDate = styled.p`
    font-size: 18px;
    font-weight: bold;
    font-family: "pretendard";
    color: #ccc;
`;

const PurchaseOptions = styled.p`
    padding-left: 70px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    line-height: 1.5em;
    max-height: 6em;
    text-overflow: ellipsis;
    font-family: "pretendard";
`;

const EvaluationBox = styled.div`
    padding-top: 15px;
`;

const HashtagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Hashtag = styled.span`
    margin: 10px 10px 10px 0;
    padding: 5px 10px;
    font-size: 18px;
    font-weight: 500;
    font-family: "pretendard";
    background-color: #8FB8B2;
    color: white;
    border-radius: 20px;
    border: 2px solid transparent;
    position: relative;
    &:hover {
        .StyledBsStars {
            opacity: 1;
        }
        .StyledBsStars2 {
            opacity: 1;
        }
    }
`;

const StyledBsStars = styled(BsStars)`
    position: absolute;
    top: 0px;
    left: -10px;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: #ffc107;
`;

const StyledBsStars2 = styled(BsStars)`
    position: absolute;
    bottom: 0px;
    left: 80px;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: #ffc107;
`;

const ContentContainer = styled.div`
    width: 700px;
    height: auto;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.6;
    font-size: 18px;
    font-family: "pretendard";
`;

function UserReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/review/reviews');
            setReviews(response.data);
          } catch (error) {
            console.error('에러 : ', error);
          }
        };
    
        fetchReviews();
      }, []);

    return (
        <div>
            {reviews.map(review => (
                <ReviewBox key={review._id}>
                    <LeftBox>
                        <PurchaseHistory>
                            {review.username.slice(0, -3) + '***'}
                            <PurchaseHistoryDate>{new Date(review.reviewDate).toISOString().split('T')[0].replace(/-/g, '.')}</PurchaseHistoryDate>
                        </PurchaseHistory>
                        
                        <PurchaseOptions>
                            <strong>구매옵션</strong><br />
                            {review.productName.split('\n').map((name, index) => (
                                <span key={index}>{name}<br /></span>
                            ))}
                        </PurchaseOptions>
                    </LeftBox>
                    
                    <RightBox>
                        <EvaluationBox>
                            {[...Array(review.evaluation)].map((_, index) => (
                                <FaStar key={index} color="#ffc107" />
                            ))}
                        </EvaluationBox>
                        
                        <HashtagContainer>
                            {review.recommendation.split(' ').filter(tag => tag !== '').map((tag, index) => (
                                <Hashtag key={index}>
                                    {tag}
                                    <StyledBsStars className="StyledBsStars" />
                                    <StyledBsStars2 className="StyledBsStars2" />
                                </Hashtag>
                            ))}
                        </HashtagContainer>
                        
                        <ContentContainer>{review.content}</ContentContainer>
                    </RightBox>
                </ReviewBox>
            ))}
        </div>
    );
};

export default UserReviews;
