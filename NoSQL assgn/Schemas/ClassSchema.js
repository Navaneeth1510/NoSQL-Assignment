import mongoose from "mongoose"

const ClassSchema = mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true 
        },
        teacher: { 
            type: String, 
            required: true 
        },
    }
);  
export const Class = mongoose.model("Class", ClassSchema);
  