import catchAsyncErrors from './catchAsyncErrors'
import ErrorHandler from '../utils/errorHandler'
import { getSession } from 'next-auth/react';

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    let session = await getSession({ req });

    console.log(session)

    if (!session) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }

    req.user = session.user;
    next();

})

export {
    isAuthenticatedUser
}