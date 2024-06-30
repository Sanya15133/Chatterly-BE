import express from "express";

const app = express();
const PORT = 3000;

try {
  app
    .listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
    .on("error", (err: Error) => {
      console.error("Error in server setup:", err);
    });
} catch (err) {
  console.error("Error in server setup:", err);
}

const server = app.listen(PORT, () => {
  console.log(`IO Server is running on port ${PORT}`);
});

const io = require("socket.io")(server);
