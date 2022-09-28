import User from '../models/user';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
//import APIFeatures from '../utils/apiFeatures';
import cloudinary from 'cloudinary';

//Setting up cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Register User
const registerUser = catchAsyncErrors( async(req, res) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookIt/avatars',
        width: '150',
        crop: 'scale'
    })

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });

    res.status(200).json({
        success: true,
        message: 'Account registered successfully'
    })

   
})

//Current user profile

const currentUserProfile = catchAsyncErrors( async(req, res) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })

   
})

//Update user profile

const updateProfile = catchAsyncErrors( async(req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name;
        user.email = req.body.email;

        if(req.body.password) user.password = req.body.password;
    }

    //update profile picture

    if(req.body.avatar != '') {

        const image_id = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(image_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'bookIt/avatars',
            width: '150',
            crop: 'scale'
        })

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        user
    })

   
})


export{
     registerUser,
     currentUserProfile,
     updateProfile
}