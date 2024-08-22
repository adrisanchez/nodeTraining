let io;

module.exports = {
  init: (httpServer) => {
    console.log("Initializing socket.io...");
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      console.log("Not io value");
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
