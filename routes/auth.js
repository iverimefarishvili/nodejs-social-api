const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//register
router.post("/register", async (req,res) => {
    try {
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.bodu.email,
            password: hashedPassword
        })

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json(user);
        console.log(error);
    }
});

//login
router.post("login", async (req,res) => {
    try {
        //check email
        const user = await User.findOne({email: req.body.email});
        !user ? res.status(404).json("user not found!") : '';

        //check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword ? res.status(400).json("password is wrong!") : '';

        //success and respond
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json(user);
        console.log(error);
    }
})


router.get("/", (req,res) => {
    res.send("auth route");
})
module.exports = router;