import mongoose from 'mongoose';

const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
    })

}

export default dbConnect