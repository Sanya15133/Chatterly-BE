var express = require('express');
var app = express();
app.use(express.json());
app.post('/api/users', function (req, res, next) {
    console.log(req.body); // { name: 'new user', likes: ['coding'] }
    // logic for adding a new user
});
