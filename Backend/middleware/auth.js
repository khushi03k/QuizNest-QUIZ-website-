import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

const JWT_SECRET='your_jwt_Secret_here';

export default async function authMiddleware(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({success:false,message:'Not authorized,token missing'});
}
    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        const user=await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({
                success:false,
                message:' user not found'
            });
        }
        req.user=user;
        next();
    }
    catch(error){
        console.error('JWT VERIFICATION FAILED', error);
        return res.status(401).json({
            success:false,
            message:'Invalid token'
        });
    }
}
