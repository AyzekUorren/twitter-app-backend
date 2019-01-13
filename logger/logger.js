module.exports = (req, res, next) => {
    console.log(`<= body`, req.body);
    console.log(`<= query`, req.query);
    next();
}