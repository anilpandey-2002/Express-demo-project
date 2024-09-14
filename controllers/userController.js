// Use bcrypt.hash to hash passwords when saving them to the database.
// Use bcrypt.compare to compare the plain text password with the hashed password during login.
// The saltRounds value determines how computationally difficult it is to hash a password. A typical value is 10.

import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
class userController {
  static home = (req, res) => {
    res.render("index.ejs");
  };

  static reg = (req, res) => {
    res.render("registration.ejs");
  };

  // // without hash code
  // static createUserDoc = async (req, res) => {
  //   console.log(req.body); // Add this line to debug
  //   try {
  //     const doc = new userModel({
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: req.body.password,
  //     });

  //     // save document
  //     await doc.save();
  //     res.redirect("/login");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // with hash code
  static createUserDoc = async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body); // Add this line to debug
    try {
      const doc = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // save document
      await doc.save();
      res.redirect("/login");
    } catch (e) {
      console.log(e);
    }
  };
  static log = (req, res) => {
    res.render("login.ejs");
  };
  // static verifyLogin = async (req, res) => {
  //   const hashPassword = await bcrypt.hash(req.body.password, 10);

  //   try {
  //     const { email, password } = req.body;
  //     const result = await userModel.findOne({ email: email });
  //     // console.log(result);
  //     if (result != null) {
  //       if (result.email == email && result.password == password) {
  //         res.send(`<h1>DASHBOARD-----${result} </h1>`);
  //       } else {
  //         res.send("<h1>email and password is not correct</h1>");
  //       }
  //     } else {
  //       res.send("<h1>not registered</h1>");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // with hash
  static verifyLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await userModel.findOne({ email: email });
      // console.log(result);
      if (result != null) {
        const isMatch = await bcrypt.compare(password, result.password);
        if (result.email == email && isMatch) {
          res.send(`<h1>DASHBOARD-----${result} </h1>`);
        } else {
          res.send("<h1>email and password is not correct</h1>");
        }
      } else {
        res.send("<h1>not registered</h1>");
      }
    } catch (e) {
      console.log(e);
    }
  };
}
export { userController };
