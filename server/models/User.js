const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;  // bcrypt에서 사용할 salt의 수

const jwt = require('jsonwebtoken');

const myPlaintextPassword = 's0/\/\P4$$w0rD';   // 예시로 사용되는 일반 텍스트 비밀번호
const someOtherPlaintextPassword = 'not_bacon'; // 예시로 사용되는 다른 일반 텍스트 비밀번호

const userSchema = mongoose.Schema({    // Mongoose의 스키마 정의

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 16,
        match: /^[a-z0-9]+$/,   // 영문 소문자와 숫자만 허용하는 정규식
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
    },
    passwordConfirmation: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value === this.password; // 비밀번호와 비밀번호 확인이 일치하는지 확인
            },
            message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        },
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],   // 'male' 또는 'female'만 허용하는 열거형(enum)
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    role: {
        type: Number,
        default: 0, // 기본값으로 0을 갖는 역할(role) 속성
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    }
});

userSchema.pre('save', function( next ) {   // 'save' 이벤트 전(pre)에 실행되는 미들웨어 함수 정의
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;   // 해시된 비밀번호로 교체
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
  
userSchema.methods.generateToken = function() {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    
    user.token = token;
    return user.save()
      .then(() => token);
};

userSchema.statics.findByToken = function(token) {
    const User = this;
  
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secretToken', (err, decoded) => {
            if (err) return reject(err);
  
            User.findOne({ _id: decoded, token: token })
                .then(user => resolve(user))
                .catch(err => reject(err));
        });
    });
};
  
const User = mongoose.model('User', userSchema); // User 모델 생성

module.exports = { User };