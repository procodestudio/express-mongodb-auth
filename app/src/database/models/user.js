import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from '../index';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  hashedPassword: {
    type: Boolean,
    default: false,
    select: false,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function preSave(next) {
  const now = new Date();

  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  if (!this.hashedPassword) {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      this.hashedPassword = true;
    } catch (error) {
      next(error);
    }
  }

  next();
});

userSchema.methods.validatePassword = function vp(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function gt() {
  return jwt.sign({ id: this.id }, process.env.APP_SECRET);
};

const User = mongoose.model('User', userSchema);

export default User;
