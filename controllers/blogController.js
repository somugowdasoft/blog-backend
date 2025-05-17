const Blog = require('../models/Blog');

// GET /blogs?category=&author=
exports.getAllBlogs = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.author) filter.author = req.query.author;

        const blogs = await Blog.find(filter).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to retrieve blogs', error: err.message });
    }
};

// POST /blogs
exports.createBlog = async (req, res) => {
    try {
        const { title, category, content, image } = req.body;
        const author = req.user.name; // from token
        const userId = req.user.userId;

        const newBlog = await Blog.create({
            title, category, content, image, author, userId
        });

        res.status(201).json({ msg: 'Blog created', blog: newBlog });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to create blog', error: err.message });
    }
};

// PUT /blogs/:id
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ msg: 'Blog not found' });
        if (blog.userId.toString() !== req.user.userId)
            return res.status(403).json({ msg: 'Not authorized to update this blog' });

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ msg: 'Blog updated', blog: updatedBlog });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to update blog', error: err.message });
    }
};

// DELETE /blogs/:id
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ msg: 'Blog not found' });
        if (blog.userId.toString() !== req.user.userId)
            return res.status(403).json({ msg: 'Not authorized to delete this blog' });

        await blog.deleteOne();
        res.status(200).json({ msg: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to delete blog', error: err.message });
    }
};
