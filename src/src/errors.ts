exports.handle404Errors = (err: any, req: any, res: any, next: any) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Not Found" });
  } else {
    next(err);
  }
};

exports.handle400Errors = (err: any, req: any, res: any, next: any) => {
  if (err.status === 400) {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handle500Errors = (err: any, req: any, res: any, next: any) => {
  if (err.status === 500) {
    res.status(500).send({ msg: "Internal Server Error" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err: any, req: any, res: any, next: any) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
