const mongoose = require('mongoose');

// 이벤트 스키마 정의
const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        unique: true,
        required: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    eventTitle: {    // 제목
        type: String,
        required: true,
    },
    eventContent: {    // 내용
        type: String,
        required: true,
    },
    eventPromotionCode: {   // 프로모션 코드
        type: String,
        required: true,
    },
    eventStartDate: {    // 이벤트 시작일
        type: Date,
        required: true,
        default: () => new Date().setUTCHours(0, 0, 0, 0)
    },
    eventEndDate: {    // 이벤트 종료일
        type: Date,
        required: true,
        default: () => new Date().setUTCHours(0, 0, 0, 0)
    },
    PreviewImageURL: {    // 미리보기 이미지 URL
        type: String,
        required: true,
    },
    ContentImageURL: {    // 내용 이미지 URL
        type: String,
        required: true,
    },
});

// 이벤트 모델 생성
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
