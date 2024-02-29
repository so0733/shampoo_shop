const mongoose = require('mongoose');

// 공지사항 스키마 정의
const noticeSchema = new mongoose.Schema({
    noticeId: {
        type: String,
        unique: true,
        required: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    noticeNo: {    // 공지사항 번호
        type: Number,
        required: true,
        unique: true
    },
    noticeTitle: {    // 제목
        type: String,
        required: true,
    },
    noticeContent: {    // 내용
        type: String,
        required: true,
    },

    noticeAuthor: {   // 작성자
        type: String,
        required: true,
    },
    noticeDate: {    // 작성일
        type: Date,
        default: () => new Date().setUTCHours(0, 0, 0, 0)
    },
    noticeViews: {    // 조회수
        type: Number,
        default: 0,
    },
});

// 공지사항 모델 생성
const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
