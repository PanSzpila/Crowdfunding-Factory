import { createServer } from "http";
import next from "next";
import { parse } from "url";

const app = next({
  dev: process.env.NODE_ENV !== "production",
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("ready on localhost:3000");
  });
});
