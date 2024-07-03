import { findChats } from "../model/chat-model";

export function getChats(req: any, res: any, next: any) {
  return findChats()
    .then((chats: any) => {
      res.status(200).send({ chats });
    })
    .catch((error) => {
      next(error);
    });
}
