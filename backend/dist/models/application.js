"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    user: {
        type: String
    },
    postingDate: {
        type: String
    },
    status: {
        type: String
    },
    labels: {
        type: Array
    },
    toShowUser: {
        type: Number
    },
    field: {
        type: String
    },
    institution: {
        type: String
    },
    data: {
        type: Object
    }
});
exports.default = mongoose_1.default.model("Application", Application, "applications");
//# sourceMappingURL=application.js.map