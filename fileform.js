// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 2000;

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect("mongodb+srv://swetha:swetha@cluster0.aemiq.mongodb.net/priya?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log("DB connection error:", err));

// const studentSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
//   role: String,
//   name: String,
//   age: Number,
//   qualification: String,
//   phone: String,
//   address: String,
//   remark: String,
//   course: String,
//   courseType: String,
//   courseAmount: String,
//   courseTutor: String,
//   courseDuration: String,
//   admissionDate: Date,
//   currentStudentNumber: String,
//   completedTheCourse: String,
//   selectedSubCourse: String,
//   admissionMonth: Number,
//   admissionYear: Number,
//   rejectionReason: { type: String, default: null }
// });

// const Student = mongoose.model("Student", studentSchema);

// app.post("/register", (req, res) => {
//   const {
//     username, email, password, role, name, age, qualification, phone, address, remark,
//     course, courseType, courseAmount, courseTutor, courseDuration, admissionDate,
//     currentStudentNumber, completedTheCourse, selectedSubCourse, admissionMonth, admissionYear, rejectionReason
//   } = req.body.formData;

//   const newStudent = new Student({
//     username, email, password, role, name, age, qualification, phone, address, remark,
//     course, courseType, courseAmount, courseTutor, courseDuration, admissionDate: new Date(admissionDate),
//     currentStudentNumber, completedTheCourse, selectedSubCourse, admissionMonth, admissionYear, rejectionReason
//   });

//   newStudent.save()
//     .then(() => res.status(200).send("Registration successful"))
//     .catch((err) => {
//       console.error("Error during registration:", err);
//       res.status(500).send("An error occurred during registration.");
//     });
// });

// app.get("/stats/:admissionMonth/:admissionYear", (req, res) => {
//   const { admissionMonth, admissionYear } = req.params;

//   Student.aggregate([
//     {
//       $match: {
//         admissionMonth: parseInt(admissionMonth),
//         admissionYear: parseInt(admissionYear),
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         registeredThisMonth: { $sum: 1 },
//         rejectedThisMonth: {
//           $sum: {
//             $cond: [{ $ne: ["$rejectionReason", null] }, 1, 0],
//           },
//         },
//         joinedThisMonth: {
//           $sum: {
//             $cond: [{ $eq: ["$completedTheCourse", "Yes"] }, 1, 0],
//           },
//         },
//         totalStudentsThisYear: { $sum: 1 },
//       },
//     },
//   ])
//     .then((stats) => {
//       res.status(200).json(stats[0] || {});
//     })
//     .catch((err) => {
//       console.error("Error fetching stats:", err);
//       res.status(500).send("An error occurred while fetching stats.");
//     });
// });

// app.get("/students/:admissionMonth/:admissionYear", (req, res) => {
//   const { admissionMonth, admissionYear } = req.params;

//   Student.find({
//     admissionMonth: parseInt(admissionMonth),
//     admissionYear: parseInt(admissionYear),
//   })
//     .then((students) => {
//       res.status(200).json({
//         count: students.length,
//         students: students.map((student) => ({
//           name: student.name,
//           email: student.email,
//           phone: student.phone,
//           admissionDate: student.admissionDate,
//           course: student.course,
//           courseType: student.courseType,
//           courseTutor: student.courseTutor,
//         })),
//       });
//     })
//     .catch((err) => {
//       console.error("Error fetching student details:", err);
//       res.status(500).send("An error occurred while fetching student details.");
//     });
// });

// app.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedStudent = await Student.findByIdAndDelete(id);
//     if (deletedStudent) {
//       res.status(200).json({ message: "Student deleted successfully." });
//     } else {
//       res.status(404).json({ message: "Student not found." });
//     }
//   } catch (error) {
//     console.error("Error deleting student:", error);
//     res.status(500).json({ message: "Error deleting student." });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 2000;

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect("mongodb+srv://swetha:swetha@cluster0.aemiq.mongodb.net/priya?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log("DB connection error:", err));

// const studentSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
//   role: String,
//   name: String,
//   age: Number,
//   qualification: String,
//   phone: String,
//   address: String,
//   remark: String,
//   course: String,
//   courseType: String,
//   courseAmount: String,
//   courseTutor: String,
//   courseDuration: String,
//   admissionDate: Date,
//   currentStudentNumber: String,
//   completedTheCourse: String,
//   selectedSubCourse: String,
//   admissionMonth: Number,
//   admissionYear: Number,
//   rejectionReason: { type: String, default: null }
// });

// const Student = mongoose.model("Student", studentSchema);

// // Registration Endpoint
// app.post("/register", (req, res) => {
//   const {
//     username, email, password, role, name, age, qualification, phone, address, remark,
//     course, courseType, courseAmount, courseTutor, courseDuration, admissionDate,
//     currentStudentNumber, completedTheCourse, selectedSubCourse, admissionMonth, admissionYear, rejectionReason
//   } = req.body.formData;

//   const newStudent = new Student({
//     username, email, password, role, name, age, qualification, phone, address, remark,
//     course, courseType, courseAmount, courseTutor, courseDuration, admissionDate: new Date(admissionDate),
//     currentStudentNumber, completedTheCourse, selectedSubCourse, admissionMonth, admissionYear, rejectionReason
//   });

//   newStudent.save()
//     .then(() => res.status(200).send("Registration successful"))
//     .catch((err) => {
//       console.error("Error during registration:", err);
//       res.status(500).send("An error occurred during registration.");
//     });
// });

// // Stats Endpoint for monthly and yearly statistics
// app.get("/stats/:admissionMonth/:admissionYear", (req, res) => {
//   const { admissionMonth, admissionYear } = req.params;

//   // Perform aggregation
//   Student.aggregate([
//     {
//       // Match students for the specific admission month and year
//       $match: {
//         admissionMonth: parseInt(admissionMonth),
//         admissionYear: parseInt(admissionYear),
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         registeredThisMonth: { $sum: 1 },
//         rejectedThisMonth: {
//           $sum: {
//             $cond: [{ $ne: ["$rejectionReason", null] }, 1, 0],
//           },
//         },
//         joinedThisMonth: {
//           $sum: {
//             $cond: [{ $eq: ["$completedTheCourse", "Yes"] }, 1, 0],
//           },
//         },
//       },
//     },
//     {
//       // Lookup total number of students for the entire admission year
//       $lookup: {
//         from: "students", // The collection name in MongoDB (should be lowercase)
//         pipeline: [
//           {
//             $match: {
//               admissionYear: parseInt(admissionYear),
//             },
//           },
//           {
//             $count: "totalStudentsThisYear", // Counts the number of students for the year
//           },
//         ],
//         as: "yearlyStats", // Put the result into the "yearlyStats" field
//       },
//     },
//     {
//       // Unwind the "yearlyStats" array to extract the total count, or set it to 0 if empty
//       $unwind: {
//         path: "$yearlyStats",
//         preserveNullAndEmptyArrays: true, // Allow for no yearly stats if there are no students
//       },
//     },
//     {
//       // Ensure totalStudentsThisYear is handled correctly (defaults to 0 if not found)
//       $project: {
//         registeredThisMonth: 1,
//         rejectedThisMonth: 1,
//         joinedThisMonth: 1,
//         totalStudentsThisYear: {
//           $ifNull: ["$yearlyStats.totalStudentsThisYear", 0],
//         },
//       },
//     },
//   ])
//     .then((stats) => {
//       res.status(200).json(stats[0] || {});
//     })
//     .catch((err) => {
//       console.error("Error fetching stats:", err);
//       res.status(500).send("An error occurred while fetching stats.");
//     });
// });

// // Endpoint to fetch students by month and year
// app.get("/students/:admissionMonth/:admissionYear", (req, res) => {
//   const { admissionMonth, admissionYear } = req.params;

//   Student.find({
//     admissionMonth: parseInt(admissionMonth),
//     admissionYear: parseInt(admissionYear),
//   })
//     .then((students) => {
//       res.status(200).json({
//         count: students.length,
//         students: students.map((student) => ({
//           name: student.name,
//           email: student.email,
//           phone: student.phone,
//           admissionDate: student.admissionDate,
//           course: student.course,
//           courseType: student.courseType,
//           courseTutor: student.courseTutor,
//         })),
//       });
//     })
//     .catch((err) => {
//       console.error("Error fetching student details:", err);
//       res.status(500).send("An error occurred while fetching student details.");
//     });
// });

// // Endpoint to delete a student by ID
// app.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedStudent = await Student.findByIdAndDelete(id);
//     if (deletedStudent) {
//       res.status(200).json({ message: "Student deleted successfully." });
//     } else {
//       res.status(404).json({ message: "Student not found." });
//     }
//   } catch (error) {
//     console.error("Error deleting student:", error);
//     res.status(500).json({ message: "Error deleting student." });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 2000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://swetha:swetha@cluster0.aemiq.mongodb.net/priya?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  name: String,
  age: Number,
  qualification: String,
  phone: String,
  address: String,
  remark: String,
  course: String,
  courseType: String,
  courseAmount: String,
  courseTutor: String,
  courseDuration: String,
  admissionDate: Date,
  currentStudentNumber: String,
  completedTheCourse: String,
  selectedSubCourse: String,
  admissionMonth: Number,
  admissionYear: Number,
  rejectionReason: { type: String, default: null }
});

const Student = mongoose.model("Student", studentSchema);

// Registration Endpoint
app.post("/register", (req, res) => {
  const {
    username, email, password, role, name, age, qualification, phone, address, remark,
    course, courseType, courseAmount, courseTutor, courseDuration, admissionDate,
    currentStudentNumber, completedTheCourse, selectedSubCourse, admissionMonth, admissionYear, rejectionReason
  } = req.body.formData;

  const newStudent = new Student({
    username, email, password, role, name, age, qualification, phone, address, remark,
    course, courseType, courseAmount, courseTutor, courseDuration, admissionDate: new Date(admissionDate),
    currentStudentNumber, completedTheCourse, selectedSubCourse, admissionMonth, admissionYear, rejectionReason
  });

  newStudent.save()
    .then(() => res.status(200).send("Registration successful"))
    .catch((err) => {
      console.error("Error during registration:", err);
      res.status(500).send("An error occurred during registration.");
    });
});

// Stats Endpoint for monthly and yearly statistics
app.get("/stats/:admissionMonth/:admissionYear", (req, res) => {
  const { admissionMonth, admissionYear } = req.params;

  // Perform aggregation
  Student.aggregate([
    {
      // Match students for the specific admission month and year
      $match: {
        admissionMonth: parseInt(admissionMonth),
        admissionYear: parseInt(admissionYear),
      },
    },
    {
      $group: {
        _id: null,
        registeredThisMonth: { $sum: 1 },
        rejectedThisMonth: {
          $sum: {
            $cond: [{ $ne: ["$rejectionReason", null] }, 1, 0],
          },
        },
        joinedThisMonth: {
          $sum: {
            $cond: [{ $eq: ["$completedTheCourse", "Yes"] }, 1, 0],
          },
        },
      },
    },
    {
      // Lookup total number of students for the entire admission year
      $lookup: {
        from: "students", // The collection name in MongoDB (should be lowercase)
        pipeline: [
          {
            $match: {
              admissionYear: parseInt(admissionYear),
            },
          },
          {
            $count: "totalStudentsThisYear", // Counts the number of students for the year
          },
        ],
        as: "yearlyStats", // Put the result into the "yearlyStats" field
      },
    },
    {
      // Unwind the "yearlyStats" array to extract the total count, or set it to 0 if empty
      $unwind: {
        path: "$yearlyStats",
        preserveNullAndEmptyArrays: true, // Allow for no yearly stats if there are no students
      },
    },
    {
      // Ensure totalStudentsThisYear is handled correctly (defaults to 0 if not found)
      $project: {
        registeredThisMonth: 1,
        rejectedThisMonth: 1,
        joinedThisMonth: 1,
        totalStudentsThisYear: {
          $ifNull: ["$yearlyStats.totalStudentsThisYear", 0],
        },
      },
    },
  ])
    .then((stats) => {
      res.status(200).json(stats[0] || {});
    })
    .catch((err) => {
      console.error("Error fetching stats:", err);
      res.status(500).send("An error occurred while fetching stats.");
    });
});

// Endpoint to fetch students by month and year
app.get("/students/:admissionMonth/:admissionYear", (req, res) => {
  const { admissionMonth, admissionYear } = req.params;

  Student.find({
    admissionMonth: parseInt(admissionMonth),
    admissionYear: parseInt(admissionYear),
  })
    .then((students) => {
      res.status(200).json({
        count: students.length,
        students: students.map((student) => ({
          name: student.name,
          email: student.email,
          phone: student.phone,
          admissionDate: student.admissionDate,
          course: student.course,
          courseType: student.courseType,
          courseTutor: student.courseTutor,
        })),
      });
    })
    .catch((err) => {
      console.error("Error fetching student details:", err);
      res.status(500).send("An error occurred while fetching student details.");
    });
});

// Endpoint to delete a student by ID
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (deletedStudent) {
      res.status(200).json({ message: "Student deleted successfully." });
    } else {
      res.status(404).json({ message: "Student not found." });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
