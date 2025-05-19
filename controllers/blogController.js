const Blog = require('../models/Blog');

// get all blogs
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

//get owner blogs
exports.getMyBlogs = async (req, res) => {
    try {
        const userId = req.user.userId;
        const blogs = await Blog.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to retrieve your blogs', error: err.message });
    }
};

//get blog by id
exports.getBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to retrieve blog', error: err.message });
    }
};

// create blogs
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

// update blogs
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

// Delete blogs
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
