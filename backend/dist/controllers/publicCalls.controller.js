"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicCallsController = void 0;
const publicCall_1 = __importDefault(require("../models/publicCall"));
const publicCall_2 = __importDefault(require("../models/publicCall"));
class PublicCallsController {
    constructor() {
        this.getPublicCallById = (req, res) => {
            let id = req.body.id;
            publicCall_2.default.findOne({ 'id': id }, (err, publicCall) => {
                if (err)
                    console.log(err);
                else
                    res.json(publicCall);
            });
        };
        this.getQuestionsOfCall = (req, res) => {
            let id = req.body.id;
            publicCall_2.default.find({ 'id': id }, { applicationDataConfig: 1, _id: 0 }, (err, puclicCall) => {
                if (err)
                    console.log(err);
                else
                    res.json(publicCall_1.default);
            });
        };
        this.getAllPublicCalls = (req, res) => {
            let userGroup = req.body.userGroup;
            publicCall_2.default.find({ 'userGroup': { $in: [userGroup, 'svi'] } }, (err, publicCalls) => {
                if (err)
                    console.log(err);
                else
                    res.json(publicCalls);
            });
        };
        this.retrievePublicCalls = (req, res) => {
            publicCall_2.default.find({}, (err, publicCalls) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json(publicCalls);
            });
        };
    }
}
exports.PublicCallsController = PublicCallsController;
//# sourceMappingURL=publicCalls.controller.js.map