import express from 'express';
import publicCall from '../models/publicCall';
import PublicCall from '../models/publicCall';


export class PublicCallsController{
    getPublicCallById=(req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        PublicCall.findOne({'id': id},(err,publicCall)=>{
            if(err) console.log(err);
            else res.json(publicCall);
        })

    }

    getQuestionsOfCall=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        PublicCall.find({'id': id}, {applicationDataConfig: 1, _id: 0}, (err,puclicCall)=>{
            if(err) console.log(err);
            else res.json(publicCall);

        })
    }

    getAllPublicCalls=(req: express.Request, res: express.Response)=>{
        let userGroup=req.body.userGroup;
        PublicCall.find({'userGroup': {$in: [userGroup,'svi']}},(err, publicCalls)=>{
            if(err) console.log(err);
            else res.json(publicCalls);
        })
    }

    retrievePublicCalls=(req: express.Request, res: express.Response)=>{
        PublicCall.find({},(err,publicCalls)=>{
            if(err) {console.log(err);
            
        }
            else res.json(publicCalls);
        })
    }
   
    
       


}