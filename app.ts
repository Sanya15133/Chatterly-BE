const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req: any, res: any, next: any) => {
  console.log(req.body) // { name: 'new user', likes: ['coding'] }
  // logic for adding a new user
})
