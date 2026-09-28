const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'novastore_super_secure_jwt_secret_key_2026';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Aapka frontend URL
  credentials: true
}));

// In-memory mock database (Aap MongoDB ya PostgreSQL use kar sakte hain)
const users = [];

// 1. SIGNUP ENDPOINT
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // Hash password with bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: Date.now(), name, email, password: hashedPassword };
    users.push(newUser);

    // Generate JWT Token
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1d' });

    // Set HTTP-only Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(201).json({ message: 'Account created successfully!', name: newUser.name, email: newUser.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

// 2. LOGIN ENDPOINT
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Compare password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    // Set HTTP-only Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Successfully logged in!', name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth backend running on http://localhost:${PORT}`);
});