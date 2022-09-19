import Room from '../models/room';

//Get all rooms
const allRooms = async(req, res) => {

    try {

    const rooms = await Room.find()

    res.status(200).json({
        success: true,
        count: rooms.length,
        rooms
    })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
        
    }

    
}

//Create new rooms

const newRoom = async (req, res) => {

    try {
    
    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        room
    })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.messege
        })
        
    }

}

//Get single room => /api/room/:id

const singleRoom = async (req, res) => {

    try {
    
    const room = await Room.findById(req.query.id);

    if(!room) {
    
        return   res.status(404).json({
                success: false,
                error: 'Room not found with this ID'
                })
    }

    res.status(200).json({
        success: true,
        room
    })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.messege
        })
        
    }

}

//Update single room detail

const updateRoom = async (req, res) => {

    try {
    
    let room = await Room.findById(req.query.id);

    if(!room) {
    
        return   res.status(404).json({
                success: false,
                error: 'Room not found with this ID'
                })
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
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.messege
        })
        
    }

}

//Delete a room

const deleteRoom = async (req, res) => {

    try {
    
    const room = await Room.findById(req.query.id);

    if(!room) {
    
        return   res.status(404).json({
                success: false,
                error: 'Room not found with this ID'
                })
    }

    await Room.remove()

    res.status(200).json({
        success: true,
        messege: 'Room is deleted'
    })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.messege
        })
        
    }

}




export {allRooms, newRoom, singleRoom, updateRoom, deleteRoom}