import vexpress from "./index.js";

const app = vexpress()


app.use((req, res, next) => {
  console.log("Middleware A");
  next();
});

app.get("/", (req, res) => {
  res.end("hello word")
})

app.get("/readme", (req, res) => {
  res.end("this is about me")
})

app.listen(3000)
