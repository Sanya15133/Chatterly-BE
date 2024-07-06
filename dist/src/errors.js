"use strict";
exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    else {
        next(err);
    }
};
exports.handle404Errors = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({ msg: "Not Found" });
    }
    else {
        next(err);
    }
};
exports.handle400Errors = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({ msg: "Bad Request" });
    }
    else {
        next(err);
    }
};
