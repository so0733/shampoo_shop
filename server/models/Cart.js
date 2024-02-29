const mongoose = require('mongoose');

// 상품 스키마 불러오기
const Product = require('./product');

// 장바구니 스키마 정의
const cartSchema = new mongoose.Schema({
  items: [{
    productId: {  // 상품 객체
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
  }],
  productName: {
    type: String,
    required: true
  },
  productImageURL: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// findByIdAndRemove 메소드 추가
cartSchema.statics.findByIdAndRemove = async function (id) {
  try {
    return await this.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

// 카트 모델 생성
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
