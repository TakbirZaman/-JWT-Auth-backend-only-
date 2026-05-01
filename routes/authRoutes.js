const express = require('express');
const router = express.Router();
const { generateToken, logoutUser } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Route: POST /api/jwt (Login/Signup)
router.post('/jwt', generateToken);

// Route: POST /api/logout (Logout)
router.post('/logout', logoutUser);

// Route: GET /api/protected-data (Test Route for Postman)
router.get('/protected-data', verifyToken, (req, res) => {
    res.send({ 
        success: true, 
        message: 'You have successfully accessed a protected route!', 
        user: req.user 
    });
});

module.exports = router;