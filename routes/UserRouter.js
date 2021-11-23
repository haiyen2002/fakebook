const router = require("express").Router();
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BlackListModel = require("../models/backlist");

//get
router.get("/login", async (req, res) => {
  try {
    res.render('pages/login/login')
  } catch (error) {
    console.log(error)
  }
})

//new:
router.post("/", async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  const newUser = new UserModel({
    userName: req.body.userName,
    password: req.body.password ,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({
      userName: req.body.userName,
    });
    if (checkUser) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        checkUser.password
      );
      if (checkPassword) {
        const token = jwt.sign({ id: checkUser._id }, "Auth", {
          expiresIn: "30d",
        });
        const id = jwt.verify(token, "Auth").id;
        const resultdata = await UserModel.findOne({ _id: id });
        if (resultdata) {
          res.json({ status: 200, id: token, mess: "ok", data: resultdata });
        }
      } else {
        res.json({ status: 400, mess: "sai password" });
      }
    } else {
      res.json({ status: 400, mess: "sai username" });
    }
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

router.post("/checkLogin", async (req, res) => {
  try {
    if (req.cookies.user) {
      const token = req.cookies.user;
      const checkToken = await BlackListModel.findOne({ token });
      if (checkToken) {
        res.json({ mess: "cookie bị hạn chế", status: 400 });
      } else {
        const id = jwt.verify(token, "Auth").id;
        const checkUser = await UserModel.findOne({ _id: id });
        if (checkUser) {
          return res.json({
            mess: "user da dang nhap",
            id,
            checkUser,
            status: 200,
          });
        } else {
          res.json({ mess: "cookie khong hop le", status: 400 });
        }
      }
    } else {
      res.json({ mess: "chua dang nhap", status: 400 });
    }
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

module.exports = router;

