const express = require('express');
const app = express();
const port = 5000;

const config = require('./config/key');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// 데이터베이스 연결
const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하십니까?');
});

app.post('/api/users/register', async (req, res) => {
    const user = new User(req.body);

    const result = await user.save().then(()=>{
        res.status(200).json({
          success: true
        });
    }).catch((err)=>{
        res.json({ success: false, err })
    });
});

app.post('/api/users/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.json({
      loginSuccess: false,
      message: "존재하지 않는 아이디입니다."
    });
  }

  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch)
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
        user.generateToken()
          .then(token => {
            res.cookie("x_auth", token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id });
          })
          .catch(err => {
            res.status(400).send(err);
          });
  });
});

app.get('/api/users/auth', auth, async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,

    name: req.user.name,
    mobile: req.user.mobile,
    email: req.user.email,
    gender: req.user.gender,
    role: req.user.role
  });
});

app.get('/api/users/logout', auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $unset: { token: 1 } },
      { new: true }
    ).exec();

    res.clearCookie('x_auth');
    res.status(200).send({
      success: true
    });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});