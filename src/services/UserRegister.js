const registration = require("../models/signUp");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const createUser = new registration(req.body);
    console.log("body", req.body);
    const studentCreated = await createUser.save();
    res.status(201).send(studentCreated);
  } catch (error) {
    res.status(400).send(error);
  }
};

const logIn = async (req, res) => {
  try {
    console.log("body", req.body);
    const user = await registration.find(req.body);
    if (user.length > 0) {
      console.log(user, "user1111");
      jwt.sign(
        { uesr: req.body },
        "jaskaranPreetSingh9478679211",
        (error, token) => {
          console.log("token", token);
          res.status(200).send({
            token: token,
            user: req.body,
          });
        }
      );
    } else {
      res.status(401).send();
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  signUp,
  logIn,
};
