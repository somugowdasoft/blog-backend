const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getAllBlogs,
    getMyBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');

router.get('/blogs', authMiddleware, getAllBlogs);
router.get('/blogs/my', authMiddleware, getMyBlogs);
router.get('/blogs/:id', authMiddleware, getBlog);
router.post('/blogs', authMiddleware, createBlog);
router.put('/blogs/:id', authMiddleware, updateBlog);
router.delete('/blogs/:id', authMiddleware, deleteBlog);

module.exports = router;
