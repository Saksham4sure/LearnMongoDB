const express = require('express');
const app = express();
const path = require('path')
const userModel = require('./models/user')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/create', async (req, res) => {
    let {name, email, imageUrl} = req.body;
    let createdUser = await userModel.create({
        name: name,
        email: email,
        imageUrl: imageUrl
    })

    res.redirect("/users")
})

app.get('/users', async (req, res) => {
    let allUsers = await userModel.find();
    res.render("users", {users: allUsers});
})

app.get('/delete/:userId', async (req,res) => {
    let deletedUser = await userModel.findOneAndDelete({
        _id : req.params.userId
    });
    res.redirect("/users");
})

app.get('/edit/:userID', async (req,res) => {
    let user = await userModel.findOne({_id: req.params.userID});
    res.render("edit", {user})
})

app.post('/update/:userID', async (req,res) => {
    let {name, email, imageUrl} = req.body;
    let updatedUser = await userModel.findOneAndUpdate({_id: req.params.userID}, {
        name: name,
        email: email,
        imageUrl: imageUrl
    });

    res.redirect("/users");
})

app.listen(3000, ()=> {
    console.log("Hello from port 3000")
})