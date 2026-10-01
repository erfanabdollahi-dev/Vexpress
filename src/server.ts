import vexpress from "./index.js";

const app = vexpress()


app.use((req, res, next) => {
  console.log("Middleware A");
  next();
});

app.get("/", (req, res) => {
  res.end("hello word")
})

app.get("/users/", (req, res) => {
  res.end("list of all usrs")
})
app.get("/users/:id", (req, res) => {
  res.end("user with the id of #")
})
app.get("/users/:id/comments", (req, res) => {
  res.end("list of the comments of the user with the id of #")
})
app.get("/users/:id/comments/:commentId", (req, res) => {
  res.end(`user id : ${req.params.id}, comment id : ${req.params.commentId } ----------- ${req.query.q}`)
})

app.listen(3000)
