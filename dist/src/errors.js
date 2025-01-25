"use strict";
exports.handle404Errors = (err, req, res, next) => {
    if (err.status === 404) {
        console.log(err, 'this is the err');
        res.status(404).send({ msg: "Not Found" });
    }
    else {
        next(err);
    }
};
exports.handle400Errors = (err, req, res, next) => {
    if (err.status === 400) {
        console.log(err, 'this is the err');
        res.status(400).send({ msg: "Bad Request" });
    }
    else {
        next(err);
    }
};
exports.handle500Errors = (err, req, res, next) => {
    if (err.status === 500) {
        console.log(err, 'this is the err');
        res.status(500).send({ msg: "Internal Server Error" });
    }
    else {
        next(err);
    }
};
exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        console.log(err, 'this is the err');
        res.status(err.status).send({ msg: err.msg });
    }
    else {
        next(err);
    }
};
