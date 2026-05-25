const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, level } = req.body;

  // 1. Request Validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields (username, email, password)');
  }

  // Username validation
  if (username.trim().length < 3) {
    res.status(400);
    throw new Error('Username must be at least 3 characters');
  }

  // Email format validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error('Please enter a valid email address');
  }

  // Password constraint validation (minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400);
    throw new Error(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#).'
    );
  }

  // 2. Check if user already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error('User already exists with this email');
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error('Username is already taken');
  }

  // 3. Create User
  const user = await User.create({
    username,
    email,
    password,
    level: level || 'Beginner',
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token: generateToken(user._id),
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          level: user.level,
          xp: user.xp,
          streak: user.streak,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // 'email' holds the username or email string from the client

  // 1. Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide username/email and password');
  }

  // 2. Find user by email OR username (case-insensitive)
  const identifier = email.trim();
  const user = await User.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { username: { $regex: new RegExp('^' + identifier + '$', 'i') } },
    ],
  });

  if (user && (await user.comparePassword(password))) {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token: generateToken(user._id),
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          level: user.level,
          xp: user.xp,
          streak: user.streak,
        },
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid username/email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Profile fetched successfully',
    data: {
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        level: req.user.level,
        xp: req.user.xp,
        streak: req.user.streak,
      },
    },
  });
});

// @desc    Social OAuth Login (Simulated)
// @route   POST /api/auth/social-login
// @access  Public
const socialLogin = asyncHandler(async (req, res) => {
  const { email, username, provider, providerId } = req.body;

  // 1. Validation
  if (!email || !username || !provider || !providerId) {
    res.status(400);
    throw new Error('Missing required social login parameters');
  }

  // 2. Find if user exists by email
  let user = await User.findOne({ email: email.toLowerCase() });

  if (user) {
    // User exists - log them in
    res.status(200).json({
      success: true,
      message: `Successfully logged in via ${provider}`,
      data: {
        token: generateToken(user._id),
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          level: user.level,
          xp: user.xp,
          streak: user.streak,
        },
      },
    });
  } else {
    // User does not exist - register them
    // Check if username is already taken
    let finalUsername = username.trim().replace(/\s+/g, '_');
    const usernameExists = await User.findOne({ username: finalUsername });
    if (usernameExists) {
      // Append a random 4-digit number to guarantee uniqueness
      finalUsername = `${finalUsername}_${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Generate a strong placeholder password
    const randomPassword = Math.random().toString(36).slice(-10) + 'A1!';

    user = await User.create({
      username: finalUsername,
      email: email.toLowerCase(),
      password: randomPassword,
      level: 'Beginner', // default track
    });

    res.status(201).json({
      success: true,
      message: `Successfully registered and logged in via ${provider}`,
      data: {
        token: generateToken(user._id),
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          level: user.level,
          xp: user.xp,
          streak: user.streak,
        },
      },
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  socialLogin,
};
