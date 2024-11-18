import jwt from 'jsonwebtoken';
const adminMiddleware = (req,res,next)=>{
    const authToken =  req.Authorization.headers
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized: No token provided or incorrect format" });
    }
    const token = authToken?.split(' ')[0];
    

    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }

    //console.log(`ADMIN TOKEN: ${token}`)
    jwt.verify(token,process.env.ADMIN_JWT_SECRET),(err,user)=>{
        if(err){
            return res.status(401).json({error: 'Invalid token'})
        }
        req.admin=user;
        next();

    }

}
export default adminMiddleware;
