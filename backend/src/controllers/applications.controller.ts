import express from 'express';
import Application from '../models/application';

export class ApplicationsController{

    saveApplication=(req: express.Request, res: express.Response)=>{
        Application.find({},(err,applications)=>{
            if(err) console.log(err);
            else{
                let id=applications[applications.length-1].id+1;
                let app=new Application(req.body);
                app.id=id;
                app.save().then(app=>{
                    res.json({"message":"ok"});
                }).catch(err=>{
                    console.log(err);
                })
            }
        })
    }

    getAllDraftedApplications=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        Application.find({$and: [{'status': {$eq:'nedovrseno'}}, {'user': {$eq: username}}]},(err,drafts)=>{
            if(err) console.log(err);
            else{
                res.json(drafts);
            }
        })
    }

    getAllApplications=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        Application.find({$and: [{'status': {$ne: 'nedovrseno'}},{'toShowUser': {$eq: 1}}, {'user': {$eq: username}}]},(err,sentApplications)=>{
            if(err) console.log(err);
            else res.json(sentApplications);
        })
    }

    deleteDraft=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        Application.deleteOne({'id':id},(err)=>{
        if(err) console.log(err);
        else res.json({'message':'ok'})
        })
    }

    getApplicationsByIdCall=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        Application.find({$and: [{'status': {$ne: 'nedovrseno'}}, {'idCall': {$eq: id}}]},(err,applications)=>{
            if(err) console.log(err);
            else res.json(applications);
        })
    }

    acceptApplication=(req: express.Request, res: express.Response)=>{
        
        let id=req.body.id;
        
        Application.collection.updateOne({'id':id}, {$set: {'status':'prihvaceno'}});
        res.json({'message':'ok'});
    }

    declineApplication=(req: express.Request,res: express.Response)=>{
        let id=req.body.id;
        Application.collection.updateOne({'id':id}, {$set: {'status':'odbijeno'}});
        res.json({'message':'ok'});
    }

    stopShowingToUser=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        Application.collection.updateOne({'id':id}, {$set: {'toShowUser':0}});
        res.json({'message': 'ok'});

    }

    numberOfAppsPerCall=(req: express.Request, res: express.Response)=>{
        let docs = Application.aggregate([
            {
                $group: {
                  _id: '$idCall',
                  count: { $sum: 1 }
                }
            }
        ],(err,apps)=>{
            //console.log(apps);
            res.json(apps);
        })
    }
    numberOfAppsPerScienceField=(req: express.Request, res: express.Response)=>{
        let docs = Application.aggregate([
            {
                $group: {
                  _id: '$field',
                  count: { $sum: 1 }
                }
            }
        ],(err,apps)=>{
            res.json(apps);
        })
        
    }
    numberOfAppsPerInstitution=(req: express.Request, res: express.Response)=>{
        let docs = Application.aggregate([
            {
                $group: {
                  _id: '$institution',
                  count: { $sum: 1 }
                }
            }
        ],(err,apps)=>{
            res.json(apps);
        })
    }
}