import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import universityCourseRouter from './routes/universityCourseRoutes'

const be_server = express();
be_server.use(express.json());
be_server.use(express.urlencoded({extended: true}));
be_server.use(cors());

be_server.use("/courses", universityCourseRouter);

app.listen(7000, () => {
    console.log("server running on localhost:7000");
});