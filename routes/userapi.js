import AdminController from "../controllers/AdminController.js";
import AssingmentController from "../controllers/AssingmentController.js";
import UserControllers from "../controllers/UserControllers.js";
import authMiddleware from "../middleware/userauth.js";
import adminMiddleware from "../middleware/adminauth.js";
import { Router } from "express";
import {authorize} from "../utils/authorize.js";

const routes  = Router();

//User Api routes
//user routes
routes.post('/register',UserControllers.register);
routes.post('/login',UserControllers.Login);
routes.get('/verify',authorize(["read")],authMiddleware,UserControllers.verifyUser)
routes.get('/logout',authMiddleware,UserControllers.logout);
routes.get('/get/all/admin',authMiddleware,UserControllers.getAllAdmin);

//admin routes 
routes.post('/admin/register',AdminController.register)
routes.post('/admin/login',AdminController.Login);
routes.get('/admin/verify',adminMiddleware,authorize(["write", "delete"]),AdminController.verifyUser)
routes.get('/admin/logout',adminMiddleware,AdminController.logout);
routes.get('/admin/assingment/:adminId',adminMiddleware,AdminController.getAllAss)
routes.post('/admin/assingment/:id/accept',adminMiddleware,AdminController.accept)
routes.post('/admin/assingment/:id/reject',adminMiddleware,AdminController.reject)

//Assingment routes

routes.post('/upload',authMiddleware,AssingmentController.upload);

export default routes;
