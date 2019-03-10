const express = require("express");
const hbs = require("hbs");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", `${now} ${req.method} ${req.url}`, err => {
    if (err) {
      console.log("error");
    }
  });
  next();
});
//app.use((req, res, next) => {
//res.render("maintenance.hbs");
//});
app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "about page",
    currentYear: new Date().getFullYear(),
    Title: "Home"
  });
});
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "about page",
    currentYear: new Date().getFullYear()
  });
});
app.get("/project", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects"
  });
});
app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
