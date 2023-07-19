import express from "express";
import users from "./src/controllers/users.js";
import cors from "cors"


let routes = express.Router();
routes.use(cors())


routes.get("/users", users.findAll);
routes.post("/authenticate", users.authenticate);
routes.post("/users", users.addUser);
routes.get("/users/:userId", users.findUser);
routes.put("/users/:userId", users.updateUser);
routes.delete("/users/:userId", users.deleteUser);

export { routes as default };
