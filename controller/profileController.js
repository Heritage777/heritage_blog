const cloudinary = require('../utils/cloudinary')
const User = require('../model/userModel')
const fs = require('fs')

const profile_get = (req, res) => {
    res.render('profile')
}

const profile_upload_post = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        // Make sure a file was selected
        if (!req.file) {
            return res.status(400).send('Please select an image')
        }

        // Upload the new picture first
        const result = await cloudinary.uploader.upload(req.file.path)

        // Delete temporary local file
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log('Could not delete temporary file:', err)
            }
        })

        // Delete old picture only after new upload succeeds
        if (user.profilePicture && user.profilePicture.public_id) {
            await cloudinary.uploader.destroy(
                user.profilePicture.public_id,
                { invalidate: true }
            )
        }

        // Save new picture information
        user.profilePicture = {
            url: result.secure_url,
            public_id: result.public_id
        }

        await user.save()

        res.redirect('/profile')
    } catch (error) {
        console.log(error)
        res.status(500).send('Image upload failed')
    }
}

const profile_delete_post = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (user.profilePicture && user.profilePicture.public_id) {
            await cloudinary.uploader.destroy(
                user.profilePicture.public_id,
                { invalidate: true }
            )
        }

        user.profilePicture = undefined

        await user.save()

        res.redirect('/profile')
    } catch (error) {
        console.log(error)
        res.status(500).send('Image deletion failed')
    }
}

module.exports = {
    profile_get,
    profile_upload_post,
    profile_delete_post
}