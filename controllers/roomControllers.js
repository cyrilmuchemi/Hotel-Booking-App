import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';
import Booking from '../models/booking';

//Get all rooms
const allRooms = catchAsyncErrors( async(req, res) => {

    const resPerPage = 2;
    const roomsCount = await Room.countDocuments()

    const apiFeatures = new APIFeatures(Room.find(), req.query)
      .search()
      .filter()

    let rooms = await apiFeatures.query;

    let filteredRoomsCount = rooms.length;

    apiFeatures.pagination(resPerPage);

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
    })
   
})

//Create new rooms

const newRoom = catchAsyncErrors( async (req, res) => {
    
    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        room
    })

})

//Get single room => /api/room/:id

const singleRoom =  catchAsyncErrors( async (req, res, next) => {
    
    const room = await Room.findById(req.query.id);

    if(!room) {
    
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        room
    })
        

})

//Update single room detail

const updateRoom =  catchAsyncErrors( async (req, res) => {
    
    let room = await Room.findById(req.query.id);

    if(!room) {
    
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        room
    })
        

})

//Delete a room

const deleteRoom =  catchAsyncErrors( async (req, res) => {
    
    const room = await Room.findById(req.query.id);

    if(!room) {
    
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    await Room.remove()

    res.status(200).json({
        success: true,
        messege: 'Room is deleted'
    })
  
})


//Create a new review

const createRoomReview =  catchAsyncErrors( async (req, res) => {

    const { rating, comment, roomId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    
    const room = await Room.findById(roomId);

    const isReviewed = room.reviews.find(
        r => r.user.toString() == req.user._id.toString()
    )

    if(isReviewed) {

        room.reviews.forEach(review => {
            if(review.user.toString() == req.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })

    } else {
        room.reviews.push(review)
        room.numOfReviews = room.reviews.length
    }

    room.ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length

    await room.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
    })
  
})


//Check Review availability

const checkReviewAvailability =  catchAsyncErrors( async (req, res) => {

    const { roomId } = req.query;

    const bookings = await Booking.find({ user: req.user._id, room: roomId })

    let isReviewAvailable = false;

    if(bookings.length) isReviewAvailable = true;

   
    res.status(200).json({
        success: true,
        isReviewAvailable
    })
  
})





export {allRooms, newRoom, singleRoom, updateRoom, deleteRoom, createRoomReview, checkReviewAvailability}