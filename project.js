const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const link = "mongodb+srv://priya:priya@cluster0.aemiq.mongodb.net/priya?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(link)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  registerDate: String,
  name: String,
  age: Number,
  qualification: String,
  phone: String,
  address: String,
  course: String,
  remark: String,
  currentstudentnumber: Number,
  completedthecourse: Number,
  gotajob: Number,
  admissionDate: String,
  courseAmount: String,
  courseTutor: String,
});

const User = mongoose.model("AdminLogin", userSchema);

app.post("/register", async (req, res) => {
  try {
    const {
      username, password, email, role, name, phone, course, qualification, remark, age, address,
      currentstudentnumber, completedthecourse, gotajob, admissionDate, courseAmount, courseTutor
    } = req.body.formData;

    const registerDate = new Date().toISOString().split('T')[0];

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
      registerDate,
      name,
      phone,
      course,
      qualification,
      remark,
      age,
      address,
      currentstudentnumber,
      completedthecourse,
      gotajob,
      admissionDate,
      courseAmount,
      courseTutor,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log("Error in registration: ", error);
    res.status(500).json({ message: "Registration failed", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      "your_secret_key", 
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

app.get("/students/:admissionMonth/:admissionYear", async (req, res) => {
  const { admissionMonth, admissionYear } = req.params;
  
  try {
    const students = await User.find({
      admissionDate: {
        $regex: new RegExp(`^${admissionYear}-${admissionMonth}`, "i"),
      },
    });
    
    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student details", error });
  }
});

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "Access Denied, No Token Provided" });
  }

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  });
};

const port = 2000;
app.listen(port, () => console.log(`Server running on port ${port}`));

