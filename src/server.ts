import vexpress from "./index.js";

const app = vexpress();
app.use(async (req, res, next) => {
  throw new Error("Async error");
});
app.use((req, res, next) => {
  throw new Error("Something went wrong");
});
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});
app.post("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(3000);