// deps
const pkg = require("./package.json");
var os = require("os");
const express = require("express")

// start server on 3000
const app = express()
const port = process.env.PORT || 3000

// set view engine, .ejs templates in /views
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    var hostname = process.env.HOSTNAME || "Unknown";
    // ipv6 isn't supported, so remove the ::ffff: prefix (shows up some times)
    // too lazy to debug
    var ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress).replace("::ffff:", "");
    res.render("index", { hostname: hostname, version: pkg.version, userIp: ip });
  })

app.listen(port, () => {
    console.log("Listening on " + port)
})



