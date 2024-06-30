import express from 'express';
import { createServer } from 'node:http';
import connectMongoose from "./connect";

const app = express();
const server = createServer(app);


app.use(express.json());

connectMongoose();

app.get("/api/users", (req: any, res: any, next: any) => {
  console.log(); // { name: 'new user', likes: ['coding'] }
  // logic for adding a new user
});

app.get('/', (req: any, res: any) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});