const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// 리뷰 생성 API
router.post('/reviews', async (req, res) => {
    try {
        // 클라이언트로부터 받은 리뷰 정보
        const { username, evaluation, recommendation, content, productName } = req.body;

        // 새로운 리뷰 생성
        const newReview = new Review({
            username,
            evaluation,
            recommendation,
            content,
            productName,
        });

        // 데이터베이스에 저장
        
        const savedReview = await newReview.save();

        res.status(201).json(savedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 리뷰 조회 API
router.get('/reviews', async (req, res) => {
    try {
        // 데이터베이스에서 모든 리뷰를 조회
        const reviews = await Review.find();

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
