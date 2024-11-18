import User from '../models/UserSchema.js';
import vine from '@vinejs/vine';
import Admin from '../models/AdminSchema.js';
import { LoginSchema, registerSchema } from '../validations/userValidation.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserControllers {
    static async register(req, res) {
        try {
          const body = req.body;
          const validator = vine.compile(registerSchema);
          const { name, email, password } = await validator.validate(body);
    
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
          }
    
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
    
    
          const user = new User({ name, email, password: hashedPassword });
          await user.save();
    
          res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email }
          });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

    static async Login(req, res) {
        try {
            const body = req.body;
            const validator = vine.compile(LoginSchema);
            const { email, password } = await validator.validate(body);
      
            const user = await User.findOne({ email });
            if (!user) {
              return res.status(401).json({ message: "Invalid email or password" });
            }
      
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
              return res.status(401).json({ message: "Invalid email or password" });
            }
    
            const token = jwt.sign(
              { userId: user._id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
            );
            res.status(200).json({
              message: "Login successful",
              access_token: `Bearer ${token}`,
              user: { id: user._id, name: user.name, email: user.email }
            });
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
        }


    static async verifyUser(req, res) {
        try {
            const id = req.user
            if (!id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            return res.status(200).json({ message: 'User verified successfully' });
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
    static async logout(req,res){
      try{
        const id  = req.user
        if(!id){
          return res.status(401).json({message:'Unauthorized'})
        }
        res.status(200).json({ message: 'User logged out successfully'});

      }catch(err){
        return res.status(500).send({ message: 'Internal Server Error' });
      }
    }
    static async getAllAdmin(req,res){
      try{
          const id  = req.user;
          if(!id){
              return res.status(401).json({message:'Unauthorized'})
          }

          const getAdmin  = await Admin.find();

          res.status(200).json({ 
              status: '200',
              data:[getAdmin],
              message:'Admins retrieved successfully',
          })
      }catch(err){
          return res.status(500).send({ message: 'Internal Server Error' });
      }
  }
}

export default UserControllers;
