import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { singleRoom, updateRoom, deleteRoom } from '../../../controllers/roomControllers';

const handler = nc();

dbConnect();

handler.get(singleRoom);

handler.put(updateRoom);

handler.delete(deleteRoom);



export default handler;