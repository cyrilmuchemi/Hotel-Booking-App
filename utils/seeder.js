const Room = require('../models/room');
const rooms = require('../data/rooms');
const mongoose  = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/', {
    UseUnifiedTopology: true,
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