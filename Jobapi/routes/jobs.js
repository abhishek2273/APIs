import express from "express";
import {
    deleteAjobs,
    getAllJobs,
    getSingleJob,
    postNewJob,
    updateJobs
} from "../controller/jobs.js";
import { isAuthentication } from "../middleware/auth.js";

const jobRoutre = express.Router()

jobRoutre.get("/get/all", getAllJobs)
jobRoutre.get("/get/:id", getSingleJob)
jobRoutre.post("/new", isAuthentication, postNewJob);
jobRoutre.put("/:id", isAuthentication, updateJobs);
jobRoutre.delete("/:id", isAuthentication, deleteAjobs);

export default jobRoutre;