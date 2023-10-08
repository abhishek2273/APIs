import Jobs from "../modules/jobs.js";
import tryCatch from "../middleware/trycatch.js"
import ErrorHandler from "../utils/errorHandler.js";
import Filter from "../utils/filter.js";

export const postNewJob = tryCatch(async (req, res, next) => {
    req.body.userId = req.user.id;
    const jobs = await Jobs.create(req.body)
    res.status(201).json({
        sucess: true,
        jobs
    })
})

export const getSingleJob = tryCatch(async (req, res, next) => {
    const job = await Jobs.findById(req.params.id).populate("userId", "username");
    if (!job) { return next(new ErrorHandler("oops! this ID not exists")) }
    res.status(200).json({ sucess: true, job })
})

export const getAllJobs = tryCatch(async (req, res, next) => {
    let totalJobs = await Jobs.countDocuments();
    const filter = new Filter(Jobs.find(), req.query)
        .search()
    const jobs = await filter.query;
    res.status(200).json({ sucess: true, totalJobs, jobs })
})

export const updateJobs = tryCatch(async (req, res, next) => {
    let job = await Jobs.findById(req.params.id)
    if (!job) return next(new ErrorHandler("oops! this ID not exists", 404));
    job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })

    res.status(200).json({ sucess: true, job })
})

export const deleteAjobs = tryCatch(async (req, res, next) => {
    let job = await Jobs.findById(req.params.id);
    if (!job) return next(new ErrorHandler("oops! this ID not exists", 404));

    await job.deleteOne()
    res.status(200).json({ sucess: true, message: `JobId: ${job.id} Deleted Successfully...` })
})