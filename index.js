import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config'
const app = express();
import Connection from './DB/dbconfig.js';

import ApiRoutes from './routes/userapi.js'

const PORT = 8000;

app.use(cors());
app.use(helmet());
app.use(express.json())

//Call the Connection
Connection();

app.use(express.urlencoded({extended:false}));
app.use('/api/v1',ApiRoutes)
app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})
