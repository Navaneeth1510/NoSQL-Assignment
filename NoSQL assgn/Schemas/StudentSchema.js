import mongoose from "mongoose"

const StudentSchema = mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        dob: { 
            type: Date, 
            required: true 
        },
        className: { 
            type: String, 
            required: true 
        }, 
        subjects: [{
            type: String 
        }], 
    }
);

export const Student = mongoose.model("Student", StudentSchema);
