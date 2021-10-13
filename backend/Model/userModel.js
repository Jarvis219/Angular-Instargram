import mongoose from 'mongoose';
import crypto from 'crypto';
import {
  v4 as uuidv4
} from 'uuid';
const {
  ObjectId
} = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 70
  },
  avatar: {
    type: String,
    maxLength: 255
  },
  status: {
    type: ObjectId,
    ref: 'Status'
  },
  birthday: {
    type: Date,
  },
  friend: {
    type: ObjectId,
    ref: 'Friends'
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  },
  emailToken: {
    type: String,
  },
  activeStatus: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

// xử lý password truyền vào mã hóa lần 1 gán cho hashed_password
userSchema.virtual('password').set(function (password) {
  this.salt = uuidv4();
  this.hashed_password = this.encrytPassword(password);
})

// trả về password đã mã hóa 2 lớp
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encrytPassword(plainText) == this.hashed_password;
  },
  encrytPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (error) {
      return '';
    }
  }
}

module.exports = mongoose.model('User', userSchema);
