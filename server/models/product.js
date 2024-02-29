const mongoose = require('mongoose');

// 상품 스키마 정의
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  productCode: {  // 상품코드
    type: String,
    required: true
  },
  productImageURL: {    // 이미지 URL
    type: String,
    required: true,
},
  productName: {  // 상품명
    type: String,
    required: true
  },
  inventoryQuantity: {  // 재고 수량
    type: Number,
    required: true,
    min: 0
  },
  salesPrice: { // 판매가
    type: Number,
    required: true,
    min: 0
  },
  stockDate: {  // 입고일
    type: Date,
    default: () => new Date().setUTCHours(0, 0, 0, 0)
  }
});

// 상품 모델 생성
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
