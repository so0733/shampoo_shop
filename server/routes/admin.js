const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Product = require('../models/product');
const Notice = require('../models/Notice');
const Event = require('../models/Event');

// 회원 목록 조회 API
router.get('/users', async (req, res) => {
  try {
    // JWT 토큰에서 사용자 정보 추출
    const token = req.headers.authorization.split(' ')[1]; // 헤더에서 토큰 추출
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // 관리자 여부 확인
    if (decodedToken.role !== 1) {
      return res.status(403).json({ message: '접근 권한이 없습니다.' });
    }
  
    // 모든 사용자 조회
    const users = await User.find().select('-role -termsAgreement');
  
    // 응답으로 사용자 목록 전송
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 회원 삭제 API
router.delete('/users', async (req, res) => {
  try {
    const { username } = req.body;

    // JWT 토큰에서 사용자 정보 추출
    const token = req.headers.authorization.split(' ')[1]; // 헤더에서 토큰 추출
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 관리자 여부 확인
    if (decodedToken.role !== 1) {
      return res.status(403).json({ message: '접근 권한이 없습니다.' });
    }

    // 회원 삭제
    await User.findOneAndDelete({ username: username });
    
    res.status(200).json({ message: '회원이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 상품 생성 API
router.post('/products', async (req, res) => {
  try {
    const { productCode, productImageURL, productName, inventoryQuantity, salesPrice } = req.body;

    // 요청 데이터 유효성 검사
    if (!productCode || !productImageURL || !productName || !inventoryQuantity || !salesPrice) {
      return res.status(400).json({ message: '요청 데이터가 올바르지 않습니다.' });
    }

    // 상품 생성 및 productId 생성
    const newProduct = new Product({
      productCode,
      productImageURL,
      productName,
      inventoryQuantity,
      salesPrice
    });
    const savedProduct = await newProduct.save();
    
    // 생성된 상품의 ID 반환
    res.status(201).json({ message: '상품이 성공적으로 생성되었습니다.', productId: savedProduct.productId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '상품 생성 중 오류가 발생했습니다.' });
  }
});

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

// 상품 수정 API
router.patch('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { productCode, productImageURL, productName, inventoryQuantity, salesPrice } = req.body;

    // 요청 데이터 유효성 검사
    if (!productCode && !productImageURL && !productName && !inventoryQuantity && !salesPrice ) {
      return res.status(400).json({ message: '수정할 데이터가 전달되지 않았습니다.' });
    }

    // 업데이트할 데이터 생성
    const updateData = {};
    if (productCode) updateData.productCode = productCode;
    if (productImageURL) updateData.productImageURL = productImageURL;
    if (productName) updateData.productName = productName;
    if (inventoryQuantity) updateData.inventoryQuantity = inventoryQuantity;
    if (salesPrice) updateData.salesPrice = salesPrice;

    // 상품 업데이트
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: productId },
      { $set: updateData },
      { new: true } // 업데이트된 문서 반환
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '상품이 성공적으로 수정되었습니다.', updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 상품 삭제 API
router.delete('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // 상품 삭제
    await Product.findOneAndDelete({ productId: productId });
    
    res.status(200).json({ message: '상품이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 공지사항 생성 API
router.post('/notices', async (req, res) => {
  try {
    const { noticeTitle, noticeAuthor, noticeContent } = req.body;

    // 요청 데이터 유효성 검사
    if (!noticeTitle || !noticeAuthor || !noticeContent) {
      return res.status(400).json({ message: '요청 데이터가 올바르지 않습니다.' });
    }

    // 현재 최대 noticeNo 조회
    const maxNotice = await Notice.findOne().sort({ noticeNo: -1 });

    // 새로운 공지사항 게시글 생성 및 noticeNo 설정
    const newNotice = new Notice({
      noticeNo: maxNotice ? maxNotice.noticeNo + 1 : 1,
      noticeTitle,
      noticeAuthor,
      noticeContent
    });

    const savedNotice = await newNotice.save();

    // 생성된 공지사항 게시글의 ID와 번호 반환
    res.status(201).json({ message: '공지사항이 성공적으로 생성되었습니다.', noticeId: savedNotice.noticeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '공지사항 생성 중 오류가 발생했습니다.' });
  }
});

// 공지사항 조회 API
router.get('/notices', async (req, res) => {
  try {
    // 공지사항 목록 조회
    const notices = await Notice.aggregate([
      {
        $project: {
          noticeId: 1,
          noticeTitle: 1,
          noticeContent: 1,
          noticeAuthor: 1,
          noticeViews: 1,
          noticeDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$noticeDate"
            }
          }
        }
      }
    ]);
    
    // 응답으로 공지사항 목록 전송
    res.status(200).json({ notices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 공지사항 수정 API
router.patch('/notices/:noticeId', async (req, res) => {
  try {
    const noticeId = req.params.noticeId;
    const { noticeTitle, noticeContent, noticeAuthor } = req.body;

    // 요청 데이터 유효성 검사
    if (!noticeTitle && !noticeContent && !noticeAuthor) {
      return res.status(400).json({ message: '수정할 데이터가 전달되지 않았습니다.' });
    }

    // 업데이트할 데이터 생성
    const updateData = {};
    if (noticeTitle) updateData.noticeTitle = noticeTitle;
    if (noticeContent) updateData.noticeContent = noticeContent;
    if (noticeAuthor) updateData.noticeAuthor = noticeAuthor;

    // 공지사항 업데이트
    const updatedNotice = await Notice.findOneAndUpdate(
      { noticeId: noticeId },
      { $set: updateData },
      { new: true } // 업데이트된 문서 반환
    );

    if (!updatedNotice) {
      return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '공지사항이 성공적으로 수정되었습니다.', updatedNotice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 공지사항 삭제 API
router.delete('/notices/:noticeId', async (req, res) => {
  try {
    const noticeId = req.params.noticeId;

    // 공지사항 삭제
    await Notice.findOneAndDelete({ noticeId: noticeId });
    
    res.status(200).json({ message: '공지사항이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 공지사항 개별 조회 API
router.get('/notices/:noticeId', async (req, res) => {
  try {
    const noticeId = req.params.noticeId;

    // 공지사항 조회
    const notice = await Notice.findOneAndUpdate(
      { noticeId: noticeId },
      { new: true } // 업데이트된 문서 반환
    );
    
    if (!notice) {
      return res.status(404).json({ message: '해당하는 공지사항이 없습니다.' });
    }

    res.status(200).json({ notice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 공지사항 조회 시 조회수 증가 엔드포인트
router.put('/notices/:noticeId/increase-views', async (req, res) => {
  try {
    const noticeId = req.params.noticeId;

    // 공지사항 조회 및 조회수 증가
    const notice = await Notice.findOneAndUpdate(
      { noticeId: noticeId },
      { $inc: { noticeViews: 1 } }, // 조회수 1 증가
      { new: true }
    );

    if (!notice) {
      return res.status(404).json({ message: '해당하는 공지사항이 없습니다.' });
    }

    res.status(200).json({ message: '조회수가 증가되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 이전 공지사항 조회 API
router.get('/notices/previous/:noticeNo', async (req, res) => {
  try {
    const noticeNo = parseInt(req.params.noticeNo);

    // 현재 공지사항의 이전 공지사항 조회
    const previousNotice = await Notice.findOne({ noticeNo: noticeNo - 1 });

    if (!previousNotice) {
      return res.status(404).json({ message: '이전 공지사항이 없습니다.' });
    }

    res.status(200).json({ previousNotice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 다음 공지사항 조회 API
router.get('/notices/next/:noticeNo', async (req, res) => {
  try {
    const noticeNo = parseInt(req.params.noticeNo);

    // 현재 공지사항의 다음 공지사항 조회
    const nextNotice = await Notice.findOne({ noticeNo: noticeNo + 1 });

    if (!nextNotice) {
      return res.status(404).json({ message: '다음 공지사항이 없습니다.' });
    }

    res.status(200).json({ nextNotice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 이벤트 생성 API
router.post('/event', async (req, res) => {
  try {
      // 클라이언트에서 전달된 데이터 추출
      const { eventTitle, eventContent, eventPromotionCode, eventStartDate, eventEndDate, PreviewImageURL, ContentImageURL } = req.body;

      // 새 이벤트 생성
      const newEvent = new Event({
          eventTitle,
          eventContent,
          eventPromotionCode,
          eventStartDate,
          eventEndDate,
          PreviewImageURL,
          ContentImageURL
      });

      // 데이터베이스에 저장
      await newEvent.save();

      res.status(201).json({ message: '이벤트가 성공적으로 생성되었습니다.', event: newEvent });
  } catch (err) {
      console.error('이벤트 생성 중 오류:', err);
      res.status(500).json({ error: '서버 오류로 인해 이벤트를 생성할 수 없습니다.' });
  }
});

// 이벤트 조회 API
router.get('/event', async (req, res) => {
  try {
    // 이벤트 목록 조회
    const event = await Event.find();
  
    // 응답으로 이벤트 목록 전송
    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 이벤트 수정 API
router.patch('/event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { eventTitle, eventContent, eventPromotionCode, eventStartDate, eventEndDate, PreviewImageURL, ContentImageURL } = req.body;

    // 요청 데이터 유효성 검사
    if (!eventTitle && !eventContent && !eventPromotionCode && !eventStartDate && !eventEndDate && !PreviewImageURL && !ContentImageURL) {
      return res.status(400).json({ message: '수정할 데이터가 전달되지 않았습니다.' });
    }

    // 업데이트할 데이터 생성
    const updateData = {};
    if (eventTitle) updateData.eventTitle = eventTitle;
    if (eventContent) updateData.eventContent = eventContent;
    if (eventPromotionCode) updateData.eventPromotionCode = eventPromotionCode;
    if (eventStartDate) updateData.eventStartDate = eventStartDate;
    if (eventEndDate) updateData.eventEndDate = eventEndDate;
    if (eventEndDate) updateData.eventEndDate = eventEndDate;
    if (PreviewImageURL) updateData.PreviewImageURL = PreviewImageURL;
    if (ContentImageURL) updateData.ContentImageURL = ContentImageURL;

    // 이벤트 업데이트
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId: eventId }, // 검색 조건 수정
      { $set: updateData },
      { new: true } // 업데이트된 문서 반환
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: '이벤트를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '이벤트가 성공적으로 수정되었습니다.', updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 이벤트 삭제 API
router.delete('/event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // 이벤트 삭제
    await Event.findOneAndDelete({ eventId: eventId }); // 검색 조건 수정

    res.status(200).json({ message: '이벤트가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 이벤트 개별 조회 API
router.get('/event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // 이벤트 조회
    const event = await Event.findOneAndUpdate(
      { eventId: eventId },
      { new: true } // 업데이트된 문서 반환
    );
    
    if (!event) {
      return res.status(404).json({ message: '해당하는 이벤트가 없습니다.' });
    }

    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 상품 수량 증가 API
router.patch('/products/:productId/increase', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { inventoryQuantity } = req.body;

    // 상품 조회
    const product = await Product.findOne({ productId: productId });

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    // 상품 수량 증가
    product.inventoryQuantity += parseInt(inventoryQuantity);
    await product.save();

    res.status(200).json({ message: '상품 수량이 성공적으로 증가되었습니다.', updatedProduct: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 상품 수량 감소 API
router.patch('/products/:productId/decrease', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { inventoryQuantity } = req.body;

    // 상품 조회
    const product = await Product.findOne({ productId: productId });

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    // 상품 수량 감소
    if (product.inventoryQuantity < parseInt(inventoryQuantity)) {
      return res.status(400).json({ message: '재고가 부족합니다.' });
    }
    product.inventoryQuantity -= parseInt(inventoryQuantity);
    await product.save();

    res.status(200).json({ message: '상품 수량이 성공적으로 감소되었습니다.', updatedProduct: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

module.exports = router;