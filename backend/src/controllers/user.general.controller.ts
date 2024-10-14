import express from 'express';
import User from '../models/user';

export class UserGeneralController{

    login = (req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;
        //let type=req.body.type;

        User.findOne({'username': username, 'password': password, 'activeAccount': 1},
        (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    changePassword=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        let newPass=req.body.newPass;
        User.collection.updateOne({'username': username}, {$set: {password: newPass}});
        res.json({message:'ok'});
    }

    deactivateAccount=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        User.collection.updateOne({'username': username}, {$set: {activeAccount: 0}});
        res.json({message: 'ok'});
    }

    register=(req: express.Request, res: express.Response)=>{
        User.find({'username':req.body.username},(err,users)=>{
            if(users.length!=0){
                res.json({'message':'usernameExists'});
            }else{
                User.find({},(err,users)=>{
                    if(err) console.log(err);
                    else{
                        let id=users[users.length-1].id+1;
                        let app=new User(req.body);
                        app.id=id;
                        app.save().then(app=>{
                            res.json({"message":"ok"});
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                })
            }
        })
    }
}