import express from "express";
import routes from "./routes.js";
import db from "./src/db.js";

const app = express();

app.use(express.json());
app.use(routes);

db.sync(() => console.log(`DB Connected: ${process.env.DB_NAME}`));

app.listen(3000, () => console.log("Serverver running on 3000"));
