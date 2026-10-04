import vexpress from "./index.js";

const app = vexpress();

// 1. Logger Middleware: Trace every request entering the server
app.use((req, res, next) => {
  console.log(`\n[${req.method}] Request received at: ${req.url}`);
  next(); 
});

// 2. Success Path Route
app.get("/", (req, res) => {
  console.log("-> Processing GET / route handler");
  res.json({ message: "hello" });
});

// 3. Post Route
app.post("/", (req, res) => {
  console.log("-> Processing POST / route handler");
  res.json({ message: "hello" });
});

// 4. Error Trigger Route: Test synchronous errors inside routes
app.get("/error", (req, res) => {
  console.log("-> Triggering a synchronous error inside a route...");
  throw new Error("Synchronous Route Error");
});

// 5. Async Error Trigger Route: Test promise rejection handling
app.get("/async-error", async (req, res) => {
  console.log("-> Triggering an asynchronous error inside a route...");
  throw new Error("Asynchronous Route Error");
});

// 6. First Error Middleware: Catches the error, logs it, and forwards it down the chain
app.useError((err, req, res, next) => {
  const errorMessage = err instanceof Error ? err.message : String(err);
  console.log(`[Error Handler 1] Caught error: "${errorMessage}". Forwarding via next()...`);
  
  // Pass the error down to the next error middleware
  next(); 
});

// 7. Final Error Handler: Responsible for terminating the request with a 500 status
app.useError((err, req, res, next) => {
  const errorMessage = err instanceof Error ? err.message : String(err);
  console.log(`[Error Handler 2] Terminating response for error: "${errorMessage}"`);
  
  res.writeHead(500, { "content-type": "application/json" });
  res.end(JSON.stringify({ 
    error: "Internal Server Error", 
    details: errorMessage 
  }));
});

app.listen(3000);
