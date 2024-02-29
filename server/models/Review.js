const mongoose = require('mongoose');

// 리뷰 스키마 정의
const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User',
        required: true
    },
    evaluation: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    recommendation: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    reviewDate: {
        type: Date,
        default: () => new Date().setUTCHours(0, 0, 0, 0)
    }
});

// 리뷰 모델 생성
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
