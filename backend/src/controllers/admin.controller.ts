import express from 'express';
import User from '../models/user';
import PublicCall from '../models/publicCall';


export class AdminController {
    
    openPublicCall = (req: express.Request, res: express.Response) => {
        PublicCall.find({}, (err, calls) => {
            if (err) console.log(err);
            else {
                let id = calls[calls.length-1].id + 1;
                let pCall = new PublicCall(req.body);
                pCall.id = id;
                pCall.save().then(pcall => {
                    res.json({ "message": "added call" })
                }).catch(err => {
                    res.json(err)
                });
            }
            })
        }

        
    }

