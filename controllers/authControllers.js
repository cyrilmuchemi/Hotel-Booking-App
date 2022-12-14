import User from '../models/user';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import sendEmail from '../utils/sendEmail';
import cloudinary from 'cloudinary';
import absoluteUrl from 'next-absolute-url'

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


//Forgot password

const forgotPassword = catchAsyncErrors( async(req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    //Get reset token
    const resetToken = user.getPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    const { origin } = absoluteUrl(req)

    //Create reset password url
    const resetUrl = `${origin}/password/reset/${resetToken}`

    const message = `Your password reset token is: \n\n ${resetUrl} \n\n If you have not requested this email, then reach out to support`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Mtalii Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
   
})



export{
     registerUser,
     currentUserProfile,
     updateProfile,
     forgotPassword
}