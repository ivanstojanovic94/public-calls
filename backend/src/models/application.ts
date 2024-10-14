import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Application = new Schema({

    id: {
        type: Number
    },
    idCall: {
        type: Number
    },
    callName: {
        type: String
    },
    user:{
        type: String
    },
    postingDate:{
        type: String
    },
    status: {
        type: String
    },
    labels:{
        type: Array
    },
    toShowUser:{
        type: Number
    },
    field:{
        type: String
    },
    institution:{
        type: String
    },
    data: {
        type: Object
    }
});

export default mongoose.model("Application", Application, "applications");