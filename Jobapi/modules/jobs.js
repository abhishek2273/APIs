import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    company: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "internship", "remote"],
        default: "full-time"
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    seats: {
        type: Number,
        default: 1,
    },
    location: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model("jobs", jobSchema);