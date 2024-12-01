import express from 'express';
import mongoose from 'mongoose';
import {mongoDBURL, PORT} from "./MongoDB.js";
import StudentRoutes from './StudentRoutes.js';
import ClassRoutes from './ClassRoutes.js';
import aggregateRoutes from './AggregationPipeline.js';

import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/student',StudentRoutes);
app.use('/class',ClassRoutes);
app.use('/aggregation',aggregateRoutes);

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('app connected to mongodb');
    app.listen(PORT, ()=>{
        console.log(`App is listening to port : ${PORT}`);
    });
})
.catch((err)=>{
    console.log(err)
})