const mongoose = require('mongoose');

// 주문 스키마 정의
const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    shippingFee: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        ref: 'User',
        required: true
    },
    customername: {
        type: String,
        ref: 'User',
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    deliveryMemo: {
        type: String,
        default: ''
    },
    paymentMethod: {
        type: String,
        enum: ['신용카드', '휴대폰 결제', '무통장 입금'],
        required: true
    },
    status: {
        type: String,
        enum: ['주문접수', '결제완료', '배송준비중', '배송중', '배송완료', '취소요청', '취소완료'],
        default: '주문접수'
    },
    createdAt: {
        type: Date,
        default: () => new Date().setUTCHours(0, 0, 0, 0)
    }
});

// 주문 모델 생성
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
