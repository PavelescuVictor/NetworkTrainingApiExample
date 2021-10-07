import express from "express";

import loginRoute from "./routes/login";
import todoList from "./routes/todoList";
import publicTodo from "./routes/publicTodo";

const app = express();
app.use(express.json());

app.use('/login', loginRoute);
app.use('/todo', todoList);
app.use('/public/todo', publicTodo);

app.listen(3000, () => {
  console.log("Server Started");
});
