

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
var CryptoJS = require("crypto-js");

app.use(cors());
app.use(bodyParser.json());

let userModel = require('./user.model');
const SECURITY_KEY = "This sis the very secured key for encrypt password";

mongoose.connect('mongodb://127.0.0.1:27017/mern-bd', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

const todoRoutes = express.Router();
app.use('/user', todoRoutes);

todoRoutes.route('/').get(function(req, res) {
    userModel.find(function(err, users) {
        if (err) {
            res.status(400).send("Error ...!")
        } else {
            res.json(users);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    userModel.findById(id, function(err, user) {
        res.json(user);
    });
});

todoRoutes.route('/byUsername/:userName').post(function(req, res) {
    let userName = req.params.userName;
    userModel.findOne({userName: userName}, function(err, user) {
        if(!user){
            res.status(400).send("Error ...!")
        }
        else{
            if(req.body.password === CryptoJS.AES.decrypt(user.password, SECURITY_KEY).toString(CryptoJS.enc.Utf8)){
                res.json(user);
            }
        }
    })
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new userModel(req.body);
    todo.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new user failed');
        });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    userModel.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("No data ..!");
        else
            user.fullName = req.body.fullName;
            user.userName = req.body.userName;
            user.email = req.body.email;
            user.password = req.body.password;
            user.address = req.body.address;
            user.phoneNo = req.body.phoneNo;

            user.save().then(todo => {
                res.json('Sucessfully updated!');
            })
            .catch(err => {
                res.status(400).send("Error ...!");
            });
    });
});