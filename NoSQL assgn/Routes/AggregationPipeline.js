import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './MongoDB.js';
import { Student } from '../Schemas/StudentSchema.js';

const router = express.Router();

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Failed to connect to MongoDB:', err.message));


//aggreagtion pipeline used to calculate the number of students in each class
router.get("/student_count", async (req, res) => {
    try {
        const result = await Student.aggregate([
            //phase 1: remove the students with no subjects
            {
                $match: {
                    subjects: { $exists: true, $ne: [] },
                },
            },

            //phase 2: create a document for each subject
            { $unwind: "$subjects" },

            //phase 3: grp by subject name and calcuate the number of students for each subject
            {
                $group: {
                    _id: "$subjects",
                    studentCount: { $sum: 1 },
                    students: {
                        $push: {
                            name: "$name",
                            email: "$email",
                            className: "$className",
                        },
                    },
                },
            },

            //phase 4: handles the way tghe op shd be displayed
            {
                $project: {
                    _id: 0,
                    subject: "$_id",
                    studentCount: 1,
                    students: 1,
                },
            },
        ]);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;