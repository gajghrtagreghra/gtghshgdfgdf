let http = require("http");

let url = require("url");

let ws = require("ws");

let config = require("../../config.js");

let server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);

  switch (pathname) {
    case "/":
      res.writeHead(200);
      res.end();
      break;
    case "/serverData.json":
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200);
      res.end(
        JSON.stringify({
          gameMode: Config.gameModeName,
          players: views.length,
        })
      );
      break;
    case "/lib/json/mockups.json":
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200);
      res.end(mockupJsonData);
      break;
    default:
      res.writeHead(200);
      res.end();
  }
});

let wsServer = new ws.WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) =>
  wsServer.handleUpgrade(req, socket, head, (ws) => sockets.connect(ws, req))
);

server.listen(config.port, () => {
  console.log("Server listening on port " + config.port);
});
