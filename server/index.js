const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const reviewRoues = require('./routes/review');

require('dotenv').config({ path: './server/.env' });

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI);

// 미들웨어 설정
app.use(express.json());

// 루트 경로에 "Hello, MongoDB!" 출력
app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', orderRoutes);
app.use('/api/review', reviewRoues);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`=================================`);
  console.log(`|서버 연결에 성공하였습니다.    |`);
  console.log(`=================================`);
});
