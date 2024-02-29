const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 회원 정보 조회 API
router.get('/profile', async (req, res) => {
  try {
    // JWT 토큰에서 사용자 정보 추출
    const token = req.headers.authorization.split(' ')[1]; // 헤더에서 토큰 추출
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const username = decodedToken.username; // 토큰에서 사용자 이름 추출
  
    // 사용자 정보 조회 (role과 termsAgreement는 제외)
    const user = await User.findOne({ username }).select('-role -termsAgreement'); // 사용자 이름으로 사용자 조회
  
    // 회원 정보 출력
    // console.log('회원 정보:', user);
  
    // 응답으로 사용자 정보 전송
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 회원 비밀번호 수정 API
router.put('/profile/password', async (req, res) => {
  try {
    // JWT 토큰에서 사용자 정보 추출
    const token = req.headers.authorization.split(' ')[1]; // 헤더에서 토큰 추출
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId; // 토큰에서 사용자 ID 추출

    // 요청에서 전달된 기존 비밀번호, 새로운 비밀번호, 그리고 새 비밀번호 확인
    const { oldPassword, newPassword, newPasswordConfirm } = req.body;

    // 사용자 조회
    const user = await User.findById(userId);

    // 사용자가 없을 경우
    if (!user) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 기존 비밀번호 일치 여부 확인
    const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    // 기존 비밀번호가 일치하지 않을 경우
    if (!oldPasswordMatch) {
      return res.status(401).json({ message: '기존 비밀번호가 일치하지 않습니다.' });
    }

    // 새로운 비밀번호와 새 비밀번호 확인이 일치하는지 확인
    if (newPassword !== newPasswordConfirm) {
      return res.status(400).json({ message: '새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.' });
    }

    // 새로운 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 비밀번호 업데이트
    user.password = hashedPassword;
    await user.save();

    // 응답으로 성공 메시지 전송
    res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 회원 정보 수정 API
router.put('/profile', async (req, res) => {
  try {
    // JWT 토큰에서 사용자 정보 추출
    const token = req.headers.authorization.split(' ')[1]; // 헤더에서 토큰 추출
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId; // 토큰에서 사용자 ID 추출

    // 요청에서 전달된 회원정보
    const { zipcode, basicAddress, detailAddress, extraAddress, email, phoneNumber, birthdate } = req.body;

    // 사용자 조회
    const user = await User.findById(userId);

    // 사용자가 없을 경우
    if (!user) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 회원정보 업데이트
    user.address.zipcode = zipcode;
    user.address.basicAddress = basicAddress;
    user.address.detailAddress = detailAddress;
    user.address.extraAddress = extraAddress;
    user.email = email;
    user.phone = phoneNumber;
    user.birthdate = birthdate;

    // 업데이트된 회원정보 저장
    await user.save();

    // 응답으로 성공 메시지 전송
    res.status(200).json({ message: '회원정보가 성공적으로 수정되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 회원 탈퇴 API
router.delete('/profile', async (req, res) => {
  try {
      // JWT 토큰에서 사용자 정보 추출
      const token = req.headers.authorization.split(' ')[1]; // 헤더에서 토큰 추출
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const username = decodedToken.username; // 토큰에서 사용자 이름 추출

      // 사용자 삭제
      await User.findOneAndDelete({ username });

      // 응답으로 성공 메시지 전송
      res.status(200).json({ message: '회원 탈퇴가 성공적으로 처리되었습니다.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
  }
});

module.exports = router;
