"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsController = void 0;
const application_1 = __importDefault(require("../models/application"));
class ApplicationsController {
    constructor() {
        this.saveApplication = (req, res) => {
            application_1.default.find({}, (err, applications) => {
                if (err)
                    console.log(err);
                else {
                    let id = applications[applications.length - 1].id + 1;
                    let app = new application_1.default(req.body);
                    app.id = id;
                    app.save().then(app => {
                        res.json({ "message": "ok" });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            });
        };
        this.getAllDraftedApplications = (req, res) => {
            let username = req.body.username;
            application_1.default.find({ $and: [{ 'status': { $eq: 'nedovrseno' } }, { 'user': { $eq: username } }] }, (err, drafts) => {
                if (err)
                    console.log(err);
                else {
                    res.json(drafts);
                }
            });
        };
        this.getAllApplications = (req, res) => {
            let username = req.body.username;
            application_1.default.find({ $and: [{ 'status': { $ne: 'nedovrseno' } }, { 'toShowUser': { $eq: 1 } }, { 'user': { $eq: username } }] }, (err, sentApplications) => {
                if (err)
                    console.log(err);
                else
                    res.json(sentApplications);
            });
        };
        this.deleteDraft = (req, res) => {
            let id = req.body.id;
            application_1.default.deleteOne({ 'id': id }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.getApplicationsByIdCall = (req, res) => {
            let id = req.body.id;
            application_1.default.find({ $and: [{ 'status': { $ne: 'nedovrseno' } }, { 'idCall': { $eq: id } }] }, (err, applications) => {
                if (err)
                    console.log(err);
                else
                    res.json(applications);
            });
        };
        this.acceptApplication = (req, res) => {
            let id = req.body.id;
            application_1.default.collection.updateOne({ 'id': id }, { $set: { 'status': 'prihvaceno' } });
            res.json({ 'message': 'ok' });
        };
        this.declineApplication = (req, res) => {
            let id = req.body.id;
            application_1.default.collection.updateOne({ 'id': id }, { $set: { 'status': 'odbijeno' } });
            res.json({ 'message': 'ok' });
        };
        this.stopShowingToUser = (req, res) => {
            let id = req.body.id;
            application_1.default.collection.updateOne({ 'id': id }, { $set: { 'toShowUser': 0 } });
            res.json({ 'message': 'ok' });
        };
        this.numberOfAppsPerCall = (req, res) => {
            let docs = application_1.default.aggregate([
                {
                    $group: {
                        _id: '$idCall',
                        count: { $sum: 1 }
                    }
                }
            ], (err, apps) => {
                //console.log(apps);
                res.json(apps);
            });
        };
        this.numberOfAppsPerScienceField = (req, res) => {
            let docs = application_1.default.aggregate([
                {
                    $group: {
                        _id: '$field',
                        count: { $sum: 1 }
                    }
                }
            ], (err, apps) => {
                res.json(apps);
            });
        };
        this.numberOfAppsPerInstitution = (req, res) => {
            let docs = application_1.default.aggregate([
                {
                    $group: {
                        _id: '$institution',
                        count: { $sum: 1 }
                    }
                }
            ], (err, apps) => {
                res.json(apps);
            });
        };
    }
}
exports.ApplicationsController = ApplicationsController;
//# sourceMappingURL=applications.controller.js.map