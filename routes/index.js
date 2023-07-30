var express = require("express");
var router = express.Router();
var StudentModel = require("../models/student");
const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const req = require("express/lib/request");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/insert", function (req, res, next) {
  StudentModel.create(req.body)
    .then(
      (data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(data);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.get("/find", function (req, res, next) {
  StudentModel.find({})
    .then(
      (data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(data);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.get("/findfirst", function (req, res, next) {
  StudentModel.findOne({ StudentId: { $gt: 10 } })
    .then(
      (data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(data);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

//cretaing a JWT token and send to server.
router.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "Muhammad wajih",
    email: "wajih898@gmail.com",
  };
  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

router.post("/post", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      console.log("error here");
      res.sendStatus(403); //forbidden
    } else {
      res.json({
        message: "Post Created ....",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(40); //forbidden
  }
}
module.exports = router;
