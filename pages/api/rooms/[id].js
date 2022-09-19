import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { singleRoom } from '../../../controllers/roomControllers';

const handler = nc();

dbConnect();

handler.get(singleRoom);



export default handler;