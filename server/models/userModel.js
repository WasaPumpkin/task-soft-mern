// server/models/userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 8,
      validate: {
        validator: function (v) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
            v
          );
        },
        message:
          'Password must contain at least one uppercase, lowercase, number, and special character',
      },
    },
    role: {
      type: String,
      enum: ['admin', 'employee'],
      default: 'employee',
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.loginAttempts;
        delete ret.lockUntil;
        return ret;
      },
    },
  }
);

// Enhanced password comparison with unicode normalization
userSchema.methods.matchPassword = async function (candidatePassword) {
  console.log('\n=== PASSWORD COMPARISON DEBUG ===');

  // Normalize all variations of special characters
  const normalizedInput = candidatePassword.normalize('NFKC').trim();
  const storedHash = this.password;

  console.log('Normalized Input:', `"${normalizedInput}"`);
  console.log('Stored Hash:', storedHash.substring(0, 20) + '...');
  console.log('Hash Algorithm:', storedHash.substring(0, 4));

  try {
    const isMatch = await bcrypt.compare(normalizedInput, storedHash);
    console.log('Comparison Result:', isMatch);
    return isMatch;
  } catch (err) {
    console.error('Comparison Error:', err);
    return false;
  }
};

// Robust pre-save hook with duplicate hashing prevention
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  console.log('\n=== PASSWORD HASHING DEBUG ===');
  console.log('Original Password:', `"${this.password}"`);

  try {
    // Skip if already hashed (prevent double hashing)
    if (this.password.startsWith('$2a$')) {
      console.log('Password already hashed - skipping');
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('New Hashed Password:', this.password.substring(0, 20) + '...');
    next();
  } catch (err) {
    console.error('Hashing Error:', err);
    next(err);
  }
});

// Account lock status helper
userSchema.methods.isLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now();
};

export default mongoose.model('User', userSchema);