import { addChat, findChats, findChatsByUser } from "../model/chat-model";

export function getChats(req: any, res: any, next: any) {
  return findChats()
    .then((chats: any) => {
      res.status(200).send({ chats });
    })
    .catch((error) => {
      next(error);
    });
}

export function getChatsByUser(req: any, res: any, next: any) {
  const { name } = req.params;
  return findChatsByUser(name)
    .then((chats) => {
      res.status(200).send({ chats });
    })
    .catch((error) => {
      next(error);
    });
}

export function insertChats(req: any, res: any, next: any) {
  const { name, message } = req.body;
  return addChat(name, message)
    .then((chat) => {
      res.status(201).send({ chat });
    })
    .catch((error) => {
      next(error);
    });
}
