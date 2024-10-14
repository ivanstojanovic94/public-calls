import mongoose from "mongoose";

const Schema = mongoose.Schema;

let RegistrationTemplate = new Schema({
    id: {
        type: Number
    },
    data: {
        type: Array
    }
});

export default mongoose.model("RegistrationTemplate", RegistrationTemplate, "registrationTemplates");