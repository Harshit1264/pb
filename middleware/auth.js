require('dotenv').config(); // Ensure environment variables are loaded

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const User = require('../models/user');

function optionalAuthenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
    } else {
      req.user = decoded;
    }
    next();
  });
}

function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers['authorization'];
  console.log('Token from cookies or headers:', token);

  if (!token) {
      console.log('No token found, redirecting to login');
      return res.redirect('/account');
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
      if (err) {
          console.log('Token verification failed:', err);
          return res.redirect('/account');
      }
      console.log('Token verified, user:', user);
      req.user = user;
      next();
  });
}

function authorizeAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next(); // User is admin, proceed to the next middleware
  }
  req.flash('error_msg', 'Access denied. Admins only.');
  res.redirect('/'); // Redirect to home page if not authorized
}

module.exports = { optionalAuthenticateToken, authorizeAdmin, authenticateToken };
