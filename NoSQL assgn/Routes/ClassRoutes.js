import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL } from './MongoDB.js';
import { Class } from '../Schemas/ClassSchema.js';

const router = express.Router();

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Failed to connect to MongoDB:', err.message));


//create operation
router.post("/", async (req, res) => {
    try {
        const newClass = new Class(req.body);
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
//read operation
router.get("/", async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default router;