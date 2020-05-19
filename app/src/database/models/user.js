import bcrypt from 'bcrypt';
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
}, {
  timestamps: true,
});

userSchema.pre('save', async function preSave(next) {
  const now = new Date();

  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  if (!this.password) {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    } catch (error) {
      next(error);
    }
  }

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
