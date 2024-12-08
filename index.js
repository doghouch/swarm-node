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
    var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    res.render("index", { hostname: hostname, version: pkg.version, userIp: ip });
  })

app.listen(port, () => {
    console.log("Listening on " + port)
})



