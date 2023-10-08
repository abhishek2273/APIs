export default TryCatchHandler => (req, res, next) => {
    Promise.resolve(TryCatchHandler(req, res, next))
        .catch(next)
}