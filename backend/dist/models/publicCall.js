"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('PublicCall', PublicCall, 'publicCalls');
//# sourceMappingURL=publicCall.js.map