import { findChat } from "../model/chat-model";

export function getChats(req: any, res: any, next: any) {
  return findChat()
    .then((chats) => {
      res.status(200).send({ chats });
    })
    .catch((error) => {
      next(error);
    });
}
