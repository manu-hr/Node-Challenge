require("dotenv").config();
require("./configs/db.js").connect();
const path = require("path");
var bcrypt = require("bcryptjs");

const Student = require("./models/student");
const Admin = require("./models/admin");

const express = require("express");
const app = express();
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/login", (req, res) => {
  res.render("adminLogin");
});

app.get("/viewStudents", async (req, res) => {
  const students = await Student.find({});
  console.log(students);
  //    res.render("viewStudents",{students})
  res.send(students);
});

app.post("/new", async (req, res) => {
  console.log(req.body.name);
  const data = new Student({
    name: req.body.name,
    age: req.body.age,
    class: req.body.class,
    schoolName: req.body.sname,
    fatherName: req.body.fname,
    phone: req.body.phone,
  });

  await data.save().then((p) => {
    console.log(p);
  });
  //   res.render("home");
  res.send("Completed");
});

app.post("/loginadmin", async (req, res) => {
  const { email, pass } = req.body;

  // Validate user input
  if (!(email && pass)) {
    res.status(400).send("All input is required");
  }

  // Validate if user exist in our database
  const user = await Admin.findOne({ name: email });
  console.log(user);

  if (user && (await bcrypt.compare(pass, user.pass))) {
       res.redirect("/viewStudents");
  } else {
    res.status(400).send("Invalid Credentials");
  }
});

app.post("/addAdmin", async (req, res) => {

  try {
    const { email, pass } = req.body;

    console.log(email, pass);

    if (!(email && pass)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await Admin.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedUserPassword = await bcrypt.hash(pass, 10);

    const user = await Admin.create({
      name: email,
      pass: encryptedUserPassword,
    });

    // return new user
    res.status(201).redirect('/login');
  } catch (err) {
    console.log(err);
  }
});

// Logic goes here

module.exports = app;
