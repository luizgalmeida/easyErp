import express from "express";
import users from "./src/controllers/users.js";
import cors from "cors"


let routes = express.Router();
routes.use(cors())


routes.get("/users", users.findAll);
routes.post("/authenticate", users.authenticate);
routes.post("/user", users.addUser);
routes.post("/users", users.filter);
routes.get("/user/:userId", users.findUser);
routes.put("/user/:userId", users.updateUser);
routes.delete("/user/:userId", users.deleteUser);

export { routes as default };
