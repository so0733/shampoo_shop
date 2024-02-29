const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 회원가입 API
router.post('/signup', async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      address,
      email,
      phone,
      role,
      gender,
      birthdate,
      termsAgreement,
    } = req.body;

    // 새로운 사용자 생성
    const newUser = new User({
      username,
      password,
      name,
      address,
      email,
      phone,
      role,
      gender,
      birthdate,
      termsAgreement,
    });

    // 데이터베이스에 저장
    const savedUser = await newUser.save();

    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 로그인 API
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자명으로 사용자 찾기
    const user = await User.findOne({ username });

    // 사용자가 존재하는지 확인
    if (!user) {
      console.log(`사용자명이 올바르지 않습니다: ${username}`);
      return res.status(401).json({ message: '사용자명이 올바르지 않습니다.' });
    }

    // 입력된 비밀번호와 해시된 비밀번호 로깅
    // console.log('전송된 비밀번호:', password);
    // console.log('해시된 비밀번호(데이터베이스):', user.password);

    // 비밀번호 일치 여부 확인
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('비밀번호 일치 여부:', passwordMatch);

    if (!passwordMatch) {
      console.log('비밀번호가 올바르지 않습니다.');
      return res.status(401).json({ message: '비밀번호가 올바르지 않습니다.' });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ userId: user._id, username: user.username,  role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // 응답으로 토큰과 사용자 정보 전송
    res.status(200).json({ token, user: { username: user.username, role: user.role } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 회원 비밀번호 체크 API
router.post('/check-password', async (req, res) => {
  try {
    // JWT 토큰에서 사용자 정보 추출
    const token = req.headers.authorization.split(' ')[1]; // 헤더에서 토큰 추출
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId; // 토큰에서 사용자 ID 추출

    // 요청에서 전달된 비밀번호
    const { password } = req.body;

    // 사용자 조회
    const user = await User.findById(userId);

    // 사용자가 없을 경우
    if (!user) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 비밀번호 비교
    const passwordMatch = await bcrypt.compare(password, user.password);

    // 비밀번호가 일치하지 않을 경우
    if (!passwordMatch) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // 비밀번호가 일치할 경우
    res.status(200).json({ message: '비밀번호가 일치합니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});


module.exports = router;
