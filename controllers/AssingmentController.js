import Assingment from '../models/AssingmentSchema.js';


class AssingmentController{
    static async upload(req,res){
        try{

            const id  = req.user;
            console.log(id);
            if(!id){
                return res.status(401).json({message:'Unauthorized'});
            }
            const {userId,task,adminId} =  req.body;

        

            const assingment = new Assingment({
                userId,
                task,
                adminId,
            })

            await assingment.save();
            res.status(200).json({message:'Assingment saved successfully'})


        }catch(e){
            res.status(500).json({message:'Error saving assingment'})

        }

    }
}

export default AssingmentController;