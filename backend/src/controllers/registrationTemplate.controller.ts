import express from 'express';
import RegistrationTemplate from '../models/registrationTemplate';

export class RegistrationTemplateController{
    
    addNewTemplate=(req: express.Request, res: express.Response)=>{
        let newTemplate=new RegistrationTemplate(req.body);
        newTemplate.id=1;
        newTemplate.save().then(template=>{
            res.json({'message':'ok'})
           
        }).catch(err=>{
            console.log(err);
        })
    }

    deleteOldTemplate=(req: express.Request, res: express.Response)=>{
        RegistrationTemplate.deleteOne({'id':1},err=>{
            if(err) console.log(err);
            else res.json({'message':'ok'});
        })
    }

    getTemplate=(req: express.Request, res: express.Response)=>{
        RegistrationTemplate.findOne({'id' : 1}, (err,obj)=>{
            if(err) console.log(err);
            else {
                res.json(obj);
            };
        })
    }
}