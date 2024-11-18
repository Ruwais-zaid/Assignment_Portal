import Admin from '../models/AdminSchema.js';
import vine from '@vinejs/vine';
import { LoginSchema, registerSchema } from '../validations/userValidation.js';
import Assingment from '../models/AssingmentSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AdminController {
    static async register(req, res) {
        try {
          const body = req.body;
          const validator = vine.compile(registerSchema);
          const { name, email, password } = await validator.validate(body);
    
          const existingUser = await Admin.findOne({ email });
          if (existingUser) {
            return res.status(409).json({ message: "Admin already exists" });
          }
    
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
    
    
          const user = new Admin({ name, email, password: hashedPassword });
          await user.save();
    
          res.status(201).json({
            message: "Admin registered successfully",
            admin: { id: user._id, name: user.name, email: user.email }
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
      
    
            const user = await Admin.findOne({ email });
            if (!user) {
              return res.status(401).json({ message: "Invalid email or password" });
            }
      
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
              return res.status(401).json({ message: "Invalid email or password" });
            }
      
            const token = jwt.sign(
              { userId: user._id, email: user.email },
              process.env.ADMIN_JWT_SECRET,
              { expiresIn: '1h' }
            );
      
            res.status(200).json({
              message: "Login successful",
              access_token: `Bearer ${token}`,
              admin: { id: user._id, name: user.name, email: user.email }
            });
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
        }


    static async verifyUser(req, res) {
        try {
            const id = req.admin
            if (!id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            return res.status(200).json({ message: 'Admin verified successfully' });
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
    static async logout(req,res){
      try{
        const id  = req.admin
        if(!id){
          return res.status(401).json({message:'Unauthorized'})
        }
        res.status(200).json({ message: 'Admin logged out successfully'});

      }catch(err){
        return res.status(500).send({ message: 'Internal Server Error' });
      }
    }
    static async getAllAss(req,res){
        try{

            const {adminId} = req.params;

            const assingment = await Assingment.find({adminId:adminId}).sort({createdAt:-1})
            if(!assingment || assingment.length==0){
                return res.status(404).json({message:'No assingment found'})
            }
            res.status(200).json({assingment});

        }catch(err){
            return res.status(500).send({ message: 'Internal Server Error' });
        }

    }
    static async accept(req, res) {
        try {
          const { id } = req.params; 
          if (!id) {
            return res.status(400).json({ message: 'Assignment ID is required' });
          }
    
          const assignment = await Assingment.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true });
          if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
          }
    
          res.status(200).json({ message: 'Assignment accepted successfully', assignment });
        } catch (err) {
          res.status(500).json({ message: 'Error accepting assignment', error: err.message });
        }
      }
    
      static async reject(req, res) {
        try {
          const { id } = req.params; 
          if (!id) {
            return res.status(400).json({ message: 'Assignment ID is required' });
          }
    
          const assignment = await Assingment.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
          if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
          }
    
          res.status(200).json({ message: 'Assignment accepted successfully', assignment });
        } catch (err) {
          res.status(500).json({ message: 'Error accepting assignment', error: err.message });
        }
      }
}

export default AdminController;
