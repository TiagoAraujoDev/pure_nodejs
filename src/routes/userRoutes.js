import { randomUUID as uuid } from "node:crypto";
import { Database } from "../database.js";

const database = new Database();

export const userRoutes = [
  {
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (req, res) => {
      const { name, email } = req.body;

      const id = uuid();

      const newUser = {
        id,
        name,
        email,
      };

      database.insert("users", newUser);

      return res.writeHead(201).end();
    },
  },
];
