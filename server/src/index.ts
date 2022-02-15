import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
//importing routes
import { userRouter } from "./routes/user.route";
import { todoRouter } from "./routes/todo.route";
const PORT = process.env.PORT || 5000;
//create express object and inject cors function and auto json
const app = express();
app.use(cors());
app.use(express.json());

const main = () => {
	createConnection()
		.then(async connection => {
			app.use("/api/v1/user", userRouter);
			app.use("/api/v1/todo", todoRouter);
			app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`))
		}).catch(error => console.log(error));
}

main();