const express = require("express");
const mongoose = require("mongoose");
let port = 2000;

let app = express();
app.use(express.json());

let link = "mongodb+srv://login:login@cluster0.aemiq.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(link)
    .then(() => console.log("Data connected"))
    .catch((err) => console.log("Error connecting to DB:", err));

let collection = mongoose.model("Login", {
    email: String,
    username: String,
});

app.post("/login", async (req, res) => {
    try {
        let { email, username } = req.body;
        let newUser = new collection({
            email,
            username
        });

        await newUser.save();
        res.status(200).json({ message: "Login successful", user: newUser });
    } catch (error) {
        console.log("Error in Login:", error);
        res.status(500).json({ message: "Login failed", error });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
