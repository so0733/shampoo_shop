const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const Product = require('../models/product');

// 상품 조회 API
router.get('/products', async (req, res) => {
    try {
      // 상품 목록 조회
      const products = await Product.find();
    
      // 응답으로 상품 목록 전송
      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    }
});

// 장바구니에 상품 추가 API
router.post('/add', async (req, res) => {
    try {
        // 현재 장바구니에 있는 상품 수 조회
        const currentItemCount = await Cart.countDocuments();
        
        // 현재 상품 수가 6개 이하인 경우에만 상품 추가
        if (currentItemCount < 6) {
            const { productId, productName, productImageURL, quantity, price } = req.body;

            // 상품 정보를 바탕으로 장바구니 아이템 생성
            const newCartItem = new Cart({
                productId,
                productName,
                productImageURL,
                quantity,
                price
            });

            // MongoDB에 저장
            const cartItem = await newCartItem.save();

            // 장바구니 정보 반환
            res.status(201).json(cartItem);
        } else {
            // 현재 상품 수가 6개를 초과하는 경우 상품 추가를 막음
            res.status(400).json({ message: '장바구니에 더 이상 상품을 추가할 수 없습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});


// 장바구니 조회 API
router.get('/shoppingbasket', async (req, res) => {
    try {
        // 장바구니에 있는 모든 상품 조회
        const cartItems = await Cart.find();
        
        // 응답으로 장바구니 목록 전송
        res.status(200).json({ cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 장바구니에서 상품 삭제 API
router.delete('/remove/:id', async (req, res) => {
    try {
        const itemId = req.params.id;

        // 장바구니에서 해당 상품을 찾아서 삭제
        await Cart.findByIdAndRemove(itemId);
    
        res.status(200).json({ message: '상품이 장바구니에서 삭제되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
