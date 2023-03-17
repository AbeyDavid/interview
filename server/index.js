const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
mongoose
    .connect("mongodb+srv://abey:ZappzetaiKLxsCYZ@cluster0.sohnafn.mongodb.net/NewUMStest?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected to database...");
    });
app.use(express.json());
app.use(cors());

//-----------Model ----------------
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
});
const User = mongoose.model("User", userSchema);

//----------Registration-----------------
app.use("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = new User({
            name: name,
            email,
            email,
            password: password,
            role: role,
        });
        const result = await user.save();
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error.message);
    }
});

//---------------Login-----------

app.use("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email, password: password });
        if (user) {
            const token = jwt.sign(
                {
                    id: user._id,
                },
                "SecretKey"
            );
            res.status(200).json({ user: user, token: token });
        } else {
            res.status(200).json({ msg: "Inavlid Credentials" });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//---------------getUserData--------------

app.use("/getData", async (req, res) => {
    try {
        const users = await User.find({ role: "user" });
        console.log(users);
        if (users) {
            res.status(200).json(users)
        } else {
            res.status(200).json({msg:"No Users found"})
        }
    } catch (error) {
        console.log(error); 
    }
});

app.listen(4000, () => {
    console.log("server is Running...");
});
