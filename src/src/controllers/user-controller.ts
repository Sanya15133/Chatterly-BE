import { findUsers, findUser, addUser } from "../model/user-model";

export function getUsers(req: any, res: any, next: any) {
  return findUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      next(error);
    });
}

export function getUserByName(req: any, res: any, next: any) {
  const { name } = req.params;
  return findUser(name)
    .then((users) => {
      const user = users[0];
      res.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
}

export function insertUser(req: any, res: any, next: any) {
  const { name, password, avatar } = req.body;
  return addUser(name, password, avatar)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
}
