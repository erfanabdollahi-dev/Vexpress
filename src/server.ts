import vexpress from "./index.js";

const app = vexpress()


app.use((req, res, next) => {
  console.log("Middleware A");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware B");
  next();
});

app.listen(3000)

