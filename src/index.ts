import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Request, Response } from 'express';
import resourceRoutes from  './routes/resourceAPI'; 

// send a test GET request to:
//  -) read all the objects that are stored in my temp db

const be_server = express();
be_server.use(express.json());
be_server.use(express.urlencoded({extended: true}));
be_server.use(cors());

be_server.use("/resources", resourceRoutes);

app.listen(7000, () => {
    console.log("server running on localhost:7000");
});