const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 회원 스키마 정의
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 16,
        match: /^[a-zA-Z0-9]+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
    },
    name: {
        type:String,
        required: true,
    },
    address: {
        zipcode: {
            type: String,
            required: true,
        },
        basicAddress: {
            type: String,
            required: true,
        },
        detailAddress: {
            type: String,
            required: true,
        },
        extraAddress: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
        enum: [0, 1],
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    birthdate: {
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        day: {
            type: Number,
            required: true,
        },
    },
    termsAgreement: {
        terms: {
            type: Boolean,
            required: true,
        },
        privacyPolicy: {
            type: Boolean,
            required: true,
        },
    },
});

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
});


// 유저 모델 생성
const User = mongoose.model('User', userSchema);

module.exports = User;
