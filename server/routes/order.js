const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 주문 생성 API
router.post('/orders', async (req, res) => {
    try {
        // 클라이언트로부터 받은 주문 정보
        const { orderInfo } = req.body;

        // 주문 번호 생성 (랜덤한 12자리 숫자)
        const orderNumber = 'SHAMPOOSHOP' + Math.floor(100000000000 + Math.random() * 900000000000).toString().substring(0, 12);

        // 상품 가격 및 수량 계산
        let totalPrice = 0;
        orderInfo.items.forEach(item => {
            totalPrice += item.price * item.quantity;
        });

        // 배송비 계산
        const shippingFee = totalPrice >= 50000 ? 0 : 3000;

        // 주문 객체 생성
        const order = new Order({
            orderNumber,
            items: orderInfo.items.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalPrice,
            shippingFee,
            username: orderInfo.username,
            customername: orderInfo.customername,
            phone: orderInfo.phone,
            email: orderInfo.email,
            deliveryAddress: orderInfo.deliveryAddress,
            deliveryMemo: orderInfo.deliveryMemo,
            paymentMethod: orderInfo.paymentMethod
        });

        // 데이터베이스에 저장
        const savedOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 주문 조회 API
router.get('/orders/user/:username', async (req, res) => {
    try {
        // URL 파라미터에서 사용자 이름 추출
        const { username } = req.params;

        // 해당 사용자의 주문을 검색
        const orders = await Order.find({ username });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
        }

        // 해당 사용자의 주문을 반환
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 주문 취소 API
router.put('/orders/:orderNumber/cancel', async (req, res) => {
    try {
        // URL 파라미터에서 주문 번호 추출
        const { orderNumber } = req.params;

        // 주문을 데이터베이스에서 찾음
        const order = await Order.findOne({ orderNumber });

        if (!order) {
            return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
        }

        // 주문 상태를 취소요청으로 변경
        order.status = '취소요청';

        // 변경된 주문 정보 저장
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 전체 주문 조회 API
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 주문 상태 변경 API
router.put('/orders/:orderNumber/status', async (req, res) => {
    try {
        // URL 파라미터에서 주문 번호 추출
        const { orderNumber } = req.params;
        // 요청 본문에서 새로운 상태 추출
        const { status } = req.body;

        // 주문을 데이터베이스에서 찾음
        const order = await Order.findOne({ orderNumber });

        if (!order) {
            return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
        }

        // 주문 상태를 요청된 상태로 변경
        order.status = status;

        // 변경된 주문 정보 저장
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
