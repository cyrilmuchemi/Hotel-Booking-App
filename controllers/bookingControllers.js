import Booking from '../models/booking';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import Moment from 'moment';
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

//Create new Booking
const newBooking = catchAsyncErrors( async(req, res) => {

    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
    } = req.body;

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt : Date.now()
    })

    res.status(200).json({
        success: true,
        booking
    })

})

//Check room booking availability
const checkRoomAvailability = catchAsyncErrors( async(req, res) => {

    let {roomId, checkInDate, checkOutDate} = req.query

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkInDate);

    const bookings = await Booking.find({
        room: roomId,
        $and: [{
            checkInDate: {
                $lte: checkOutDate
            }
        },
        {
            checkOutDate : {
                $gte: checkInDate
            }

        }]

    })

//Check if there is any room available
    let isAvailable;
    if(bookings && bookings.length == 0) {
        isAvailable = true;
    } else {
        isAvailable = false;
    }

    res.status(200).json({
        success: true,
        isAvailable
    })

})

//Check bookdate of a room
const checkBookedDatesOfRoom = catchAsyncErrors( async(req, res) => {

    const {roomId} = req.query;
    const bookings = await Booking.find({ room: roomId })
    let bookedDates = [];

    const timeDifference = moment().utcOffset / 60
    console.log(timeDifference)

    bookings.forEach(booked => {

        const checkInDate = moment(booked.checkInDate).add(timeDifference, 'hours')
        const checkOutDate = moment(booked.checkOutDate).add(timeDifference, 'hours')

        const range = moment.range(moment(checkInDate), moment(checkOutDate))

        const days = Array.from(range.by('day'));

        bookedDates = bookedDates.concat(days)

    })

    res.status(200).json({
        success: true,
        bookedDates
    })

})


//Get all bookings of current user
const myBookings = catchAsyncErrors(async (req, res) => {

    const bookings = await Booking.find({ user: req.user._id })
        .populate({
            path: 'room',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        bookings
    })
})


//Get booking details
const getBookingDetails = catchAsyncErrors( async(req, res) => {

    const booking = await Booking.findById(req.query.id)
    .populate({
        path: 'room',
        select: 'name pricePerNight images'
    })

    .populate({
        path: 'user',
        select: 'name email'
    })

    res.status(200).json({
        success: true,
        booking,
    })

})

export {
    newBooking,
    checkRoomAvailability,
    checkBookedDatesOfRoom,
    myBookings,
    getBookingDetails
}