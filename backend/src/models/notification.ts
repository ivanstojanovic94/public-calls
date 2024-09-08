import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let Notification = new Schema({
    id:{
        type: Number
    },
    message: {
        type: String
    },
    date: {
        type: String
    },
    publicCallName: {
        type: String
    },

    user: {

        type: String
    },
    read:{
        type: Number
    }

});

export default mongoose.model('Notification', Notification, 'notifications');