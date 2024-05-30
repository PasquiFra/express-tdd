module.exports = (err, req, res, next) => {
    return res.format({
        html: () => res.status(err.status).send(`<h1>${err.message}</h1>`),
        json: () => res.status(err.status).json({ status: err.status, error: err.message })
    });
}