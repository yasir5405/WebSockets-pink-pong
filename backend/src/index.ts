import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  socket.on("error", (error) => {
    console.log("Error: ", error?.message);
  });

  console.log("user connected");

  // socket.on("message", (e) => {
  //   console.log(e.toLocaleString());
  // });

  // setInterval(() => {
  //   socket.send("Price of Solana is: " + Math.random());
  // }, 2000);
  socket.on("message", (e) => {
    if (e.toString() === "ping") {
      socket.send("pong");
    } else {
      socket.send("Please  send a ping");
    }
  });

  socket.on("close", (e) => {
    console.log("Disconnected.");
  });
});
