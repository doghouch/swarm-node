// deps
const pkg = require("./package.json");
var os = require("os");
const express = require("express");
const { cp } = require("fs");

// funcs

function getServerInfo() {
    var hostname = process.env.HOSTNAME || "Unknown";
    var cpuUsage = os.loadavg()[1] / os.cpus().length * 100;
    var load = "low";

    if (cpuUsage < 33) {
        load = "good";
    } else if (cpuUsage < 66) {
        load = "marginal";
    } else {
        load = "poor";  
    }

    return { "hostname": hostname, "version": pkg.version, "load": load, "loadStatus": load };
}

// start server on 3000
const app = express()
const port = process.env.PORT || 3000

// set view engine, .ejs templates in /views
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    var srvInfo = getServerInfo();
    // ipv6 isn't supported, so remove the ::ffff: prefix (shows up some times)
    // too lazy to debug
    var ip = (req.headers["CF-Connecting-IP"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress).replace("::ffff:", "");
    res.render("index", { loadStatus: srvInfo["loadStatus"].toUpperCase(), hostname: srvInfo["hostname"], version: srvInfo["version"], userIp: ip });
});

app.get("/ping", (req, res) => {
    res.send("pong");
});


app.listen(port, () => {
    console.log("Listening on " + port)
});



