import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { checkRoomAvailability } from '../../../controllers/bookingControllers';
import onError from '../../../middlewares/errors';

const handler = nc({onError});

dbConnect();

handler.get(checkRoomAvailability);

export default handler;