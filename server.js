const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

const validate = [
  check("email", "Must be a valid email address")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(["0-9"])
    .withMessage("Password must contain a number")
    .matches(["A-Z"])
    .withMessage("Password must contain an uppercase character")
    .trim()
    .escape(),
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/static/login.html");
});

app.post("/login", validate, (req, res) => {
  const err = validationResult(req);
  let email = req.body.email;
  let password = req.body.password;
  res.send(`Email: ${email} Password: ${password}`);
});

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log("listening on port 8000");
});
