const Blog = require('../model/blogModel')

const blog_homepage = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 })
        res.render('index', { blogs: blogs })
    } catch (err) {
        console.log(err)
        res.status(500).send('Could not fetch blogs from the database.')
    }
}

const blog_details = async (req, res) => {
    const id = req.params.id

    try {
        const blog = await Blog.findById(id)
        res.render('details', { blog: blog })
    } catch (err) {
        console.log(err)
        res.status(404).render('404')
    }
}

const blog_create_get = (req, res) => {
    res.render('create')
}

const blog_create_post = async (req, res) => {
    const blog = new Blog({
        ...req.body,
        owner: req.user.id
    })

    try {
        await blog.save()
        res.redirect('/blogs')
    } catch (err) {
        console.log(err)
        res.status(500).send('Could not save the blog post to the database.')
    }
}

const blog_delete = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' })
        }

        if (blog.owner.toString() !== req.user.id) {
            return res.status(403).render('not-allowed')
        }

        await Blog.findByIdAndDelete(id)
        res.json({
            redirect: '/blogs',
            title: blog.title
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Could not delete the blog' })
    }
}

const blog_edit_get = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).render('404')
        }

        if (blog.owner.toString() !== req.user.id) {
            return res.status(403).render('not-allowed')
        }

        res.render('edit', { blog: blog })
    } catch (error) {
        console.log(error)
        res.status(404).render('404')
    }
}

const blog_edit_post = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).render('404')
        }

        if (blog.owner.toString() !== req.user.id) {
            return res.status(403).render('not-allowed')
        }

        await Blog.findByIdAndUpdate(id, req.body)
        res.redirect('/blogs')
    } catch (err) {
        console.log(err)
        res.status(500).render('404')
    }
}

const blog_about = (req, res) => {
    res.render('about')
}

module.exports = {
    blog_homepage,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_post,
    blog_about
}