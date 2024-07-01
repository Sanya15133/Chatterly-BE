import { findUsers } from "../model/user-model";

export function getUsers(req: any, res: any, next: any) {
  return findUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      next(error);
    });
}
