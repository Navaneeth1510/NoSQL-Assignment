import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL } from './MongoDB.js';
import { Student } from '../Schemas/StudentSchema.js';

const router = express.Router();

// Connect to MongoDB
mongoose
    .connect(mongoDBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log('Failed to connect to MongoDB:', err.message));

// Create Operation
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read Operation
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read Operation 
router.get('/:email', async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.params.email });
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Operation
router.put('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { subject } = req.body;
        if (!subject)
            return res.status(400).json({ error: 'Subject is required to update' });
        const updatedStudent = await Student.findOneAndUpdate(
            { email },
            { $addToSet: { subjects: subject } },
            { new: true }
        );
        if (!updatedStudent)
            return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Operation
router.delete('/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const deletedStudent = await Student.findOneAndDelete({ email });
        if (!deletedStudent)
            return res.status(404).json({ error: 'Student not found' });

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
