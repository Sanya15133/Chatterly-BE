import { addChat, findChats, findChatsByUser } from "../model/chat-model";

export async function getChats(req: any, res: any, next: any) {
  return await findChats()
    .then((chats: any) => {
      res.status(200).send({ chats });
    })
    .catch((error) => {
      next(error);
    });
}

export async function getChatsByUser(req: any, res: any, next: any) {
  const { name } = req.params;
  return await findChatsByUser(name)
    .then((chats) => {
      res.status(200).send({ chats });
    })
    .catch((error) => {
      next(error);
    });
}

export async function insertChats(req: any, res: any, next: any) {
  const { name, message } = req.body;
  return await addChat(name, message)
    .then((chat) => {
      res.status(201).send({ chat });
    })
    .catch((error) => {
      next(error);
    });
}
