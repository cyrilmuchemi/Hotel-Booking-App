import Room from '../models/room';

const allRooms = async(req, res) => {

    try {

    const rooms = await Room.find()

    res.status(200).json({
        success: true,
        rooms
    })
        
    } catch (error) {
        req.status(400).json({
            success : false,
            error : error.message
        })
        
    }
}

//Create new rooms

const newRoom = async (req, res) => {

    try {

    const rooms = await Room.create(req.body);

    res.status(200).json({
        success : true,
        count : rooms.length,
        rooms
    })
        
    } catch (error) {
        res.status(400).json({
            success : false,
            error : error.message
        })   
    }

}

export {allRooms, newRoom}