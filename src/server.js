import http from "node:http";

import { json } from "./middlewares/json.js";
import { userRoutes } from "./routes/userRoutes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // middleware to parse json
  await json(req, res);

  const route = userRoutes.find((route) => {
    return route.method === method && route.path === url;
  })

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(8080);
