import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PublicCall = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    publishDate: {
        type: String
    },
    deadline: {
        type: String
    },
    basicInfo: {
        type: String
    },
    userGroup: {
        type: String
    },
    scienceField: {
        type: String
    },
    institution: {
        type: String
    },
    applicationDataConfig: {
        type: Array
    }
});

export default mongoose.model('PublicCall', PublicCall, 'publicCalls');
