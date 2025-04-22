const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 2000;


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('✅ MongoDB connected'));


const studentSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  registerDate: String,
  name: String,
  age: String,
  qualification: String,
  phone: String,
  address: String,
  country: String,
  city: String,
  pincode: String,
  course: String,
  courseType: String,
  remark: String,
  currentStudentNumber: String,
  completedTheCourse: String,
  admissionDate: String,
  courseAmount: String,
  courseTutor: String,
  courseDuration: String,
  selectedSubCourse: String,
  admissionMonth: Number,
  admissionYear: Number,
});
const Student = mongoose.model('Student', studentSchema);


const feedbackSchema = new mongoose.Schema({
  studentId: String,
  feedbackText: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});
const Feedback = mongoose.model('Feedback', feedbackSchema);


app.use('/certificates', express.static(path.join(__dirname, 'certificates')));


app.post('/register', async (req, res) => {
  try {
    const newStudent = new Student(req.body.formData);
    await newStudent.save();
    res.json({ message: '✅ Student registered successfully' });
  } catch (err) {
    console.error('❌ Error registering student:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Stats
app.get('/stats/:month/:year', async (req, res) => {
  const { month, year } = req.params;
  try {
    const admissionMonth = parseInt(month);
    const admissionYear = parseInt(year);

    const registeredThisMonth = await Student.countDocuments({ admissionMonth, admissionYear });
    const rejectedThisMonth = await Student.countDocuments({
      admissionMonth,
      admissionYear,
      remark: { $regex: /^rejected$/i },
    });
    const joinedThisMonth = await Student.countDocuments({
      admissionMonth,
      admissionYear,
      completedTheCourse: { $ne: '' },
    });
    const totalStudentsThisYear = await Student.countDocuments({ admissionYear });

    res.json({ registeredThisMonth, rejectedThisMonth, joinedThisMonth, totalStudentsThisYear });
  } catch (err) {
    console.error('❌ Error fetching stats:', err);
    res.status(500).json({ message: 'Error fetching student statistics' });
  }
});


app.get('/api/student-details', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ count: students.length, data: students });
  } catch (err) {
    console.error('❌ Error fetching student details:', err);
    res.status(500).json({ message: 'Error fetching student details' });
  }
});


app.get('/api/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error('❌ Error fetching student:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.put('/api/student/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: '✅ Student updated', data: updatedStudent });
  } catch (err) {
    console.error('❌ Error updating student:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.delete('/api/student/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: '🗑️ Student deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting student:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/student-search', async (req, res) => {
  const { query } = req.query;
  try {
    const students = await Student.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });
    res.json({ count: students.length, data: students });
  } catch (err) {
    console.error('❌ Error searching students:', err);
    res.status(500).json({ message: 'Search failed' });
  }
});

// Feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { studentId, feedbackText } = req.body;
    const feedback = new Feedback({ studentId, feedbackText });
    await feedback.save();
    res.status(201).json({ message: '✅ Feedback submitted successfully' });
  } catch (err) {
    console.error('❌ Error saving feedback:', err);
    res.status(500).json({ message: 'Server error while saving feedback' });
  }
});

// Download Certificate
app.get('/api/download-certificate/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'certificates', req.params.filename);

  if (!fs.existsSync(filePath)) {
    console.error('❌ Certificate not found:', filePath);
    return res.status(404).json({ message: 'Certificate not found' });
  }

  res.download(filePath, (err) => {
    if (err) {
      console.error('❌ Error sending file:', err);
      res.status(500).json({ message: 'Error downloading file' });
    }
  });
});


app.get('/api/bar-chart-data', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const monthlyData = await Promise.all(
      Array.from({ length: 12 }, async (_, i) => {
        const count = await Student.countDocuments({
          admissionMonth: i + 1,
          admissionYear: currentYear,
        });
        return {
          month: new Date(0, i).toLocaleString('default', { month: 'short' }),
          students: count,
        };
      })
    );
    res.json(monthlyData);
  } catch (err) {
    console.error('❌ Error generating chart data:', err);
    res.status(500).json({ message: 'Failed to load chart data' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
