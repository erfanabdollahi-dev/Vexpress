import vexpress from "./index.js";

const app = vexpress()

app.use(vexpress.static('./public'))

app.use((req, res, next) => {
  console.log("Middleware A");
  next();
});

app.get("/", (req, res) => {
  res.json({"test": "worked"})
})

app.get("/old-page",(req,res) => {
  res.redirect("/new-page")
})

app.get("/new-page", (req, res) => {
  res.json({"redirected": "true"})
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
