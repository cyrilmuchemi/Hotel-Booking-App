import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Please enter room name'],
        trim : true,
        maxLength: [100, 'Room name cannot exceed 100 characters']
    },

    price : {
        type : Number,
        required: [true, 'Please enter room price'],
        maxLength: [4, 'Room price cannot exceed 4 characters'],
        default : 0.0
    },

    desription : {
        type : String,
        required: [true, 'Please enter room description'],
    },

    address : {
        type : String,
        required: [true, 'Please enter room address'],
    },

    guestCapacity : {
        type : Number,
        required: [true, 'Please enter room capacity'],
    },

    numberOfBeds : {
        type : Number,
        required: [true, 'Please enter the number of beds in the room'],
    },

    internet : {
        type : Boolean,
        default : false,
    },

    breakfast : {
        type : Boolean,
        default : false,
    },

    airConditioned : {
        type : Boolean,
        default : false,
    },

    petsAllowed : {
        type : Boolean,
        default : false,
    },

    roomCleaning : {
        type : Boolean,
        default : false,
    },

    ratings : {
        type : Number,
        default : 0
    },

    numberOfReviews : {
        type : Number,
        default : 0
    },

    images : [{
        public_id : {
            type : String,
            required: true
        },

        url : {
            type : String,
            required : true
        }
    }],

    category : {
        type : String,
        required : true,
        enum : {
            values : [
                'King',
                'Single',
                'Double'
            ],

            message : 'Please select the correct category for rooms'
        }
    },

    reviews : [{
        user : {
            type : mongoose.Schema.ObjectId,
            ref : 'User',
            required : true
        },

        name : {
            type : String,
            required : true
        },

        rating : {
            type : Number,
            required : true
        },

        comment : {
            type : String,
            required : true
        }
    }],

    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },

    createdAt : {
        type : Date,
        default : Date.now
    }

})

export default mongoose.model.Room || mongoose.model('Room', roomSchema);