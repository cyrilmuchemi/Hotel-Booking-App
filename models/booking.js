import  Mongoose from "mongoose";

const bookingSchema = new Mongoose.Schema({
    room: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    daysOfStay: {
        type: Number,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    },
    paidAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


export default Mongoose.models.Booking || Mongoose.model('Booking', bookingSchema)