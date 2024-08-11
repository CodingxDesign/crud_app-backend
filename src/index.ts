import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Request, Response } from 'express';

// send a test GET request to:
//  -) read all the objects that are stored in my temp db

const be_server = express();
be_server.use(express.json());
be_server.use(express.urlencoded({extended: true}));
be_server.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
    res.json({message: "hello from an express appi endpoint"});
});

app.listen(7000, () => {
    console.log("server running on localhost:7000");
});