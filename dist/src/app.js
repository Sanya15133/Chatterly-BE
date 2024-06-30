"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const connect_1 = __importDefault(require("./connect"));
const app = express();
app.use(express.json());
(0, connect_1.default)();
app.get('/api/users', (req, res, next) => {
    console.log(); // { name: 'new user', likes: ['coding'] }
    // logic for adding a new user
});
