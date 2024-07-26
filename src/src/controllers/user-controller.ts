import {
  findUsers,
  findUser,
  addUser,
  checkLoginUser,
} from "../model/user-model";

const jwt = require("jsonwebtoken");

export async function getUsers(req: any, res: any, next: any) {
  return await findUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      next(error);
    });
}

export async function getUserByName(req: any, res: any, next: any) {
  const { name } = req.params;
  return await findUser(name)
    .then((users) => {
      const user = users[0];
      res.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
}

export async function insertUser(req: any, res: any, next: any) {
  const { name, password, avatar } = req.body;
  return await addUser(name, password, avatar)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((error) => {
      next(error);
    });
}

export async function loginUser(req: any, res: any, next: any) {
  const { name, password } = req.body;

  return await checkLoginUser(name, password)
    .then((user) => {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).send({ token });
    })
    .catch((error) => {
      next(error);
    });
}
