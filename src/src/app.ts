const express = require('express');
import connectMongoose from "./connect";

const app = express();

app.use(express.json());

connectMongoose()

app.get('/api/users', (req: any, res: any, next: any) => {
  console.log() // { name: 'new user', likes: ['coding'] }
  // logic for adding a new user
})
