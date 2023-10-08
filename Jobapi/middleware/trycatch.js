export default tryCatchHandler => (req, res, next) => {
    Promise.resolve(tryCatchHandler(req, res, next))
        .catch(next)
}