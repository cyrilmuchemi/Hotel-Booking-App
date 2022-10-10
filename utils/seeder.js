const Room = require('../models/room');
const rooms = require('../data/rooms');
const mongoose  = require('mongoose');

mongoose.connect('mongodb+srv://Mtalii:kakitu2021@cluster0.qs2rbc7.mongodb.net/?retryWrites=true&w=majority', {
    UseUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const seedRooms = async () => {
    try {

        await Room.deleteMany();
        console.log('Rooms are deleted.');

        await Room.insertMany(rooms);
        console.log('All rooms are added.')
        process.exit()

        
    } catch (error) {
        console.log(error.messege)
        process.exit()
        
    }
}

seedRooms();