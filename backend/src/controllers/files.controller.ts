import express from 'express';
export class FilesController{
    uploadFile=(req: express.Request, res: express.Response)=>{
        res.json({file: req.file})
    }
}