const App = require("../model/app.model.js");

// Create and Save a new Message
// exports.create = (req, res) => {
//     const user = new App({
//         username: req.body.username,
//         email:req.body.email,
//         password:req.body.password,
//
//     });
//     user
//         .save()
//         .then((data) => {
//             res.send(data);
// console.log(data)
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 user:
//                     err.user || "Some error occurred while creating the Message.",
//             });
//         });
// };

// Retrieve all messages from the database.
exports.getAll = (req, res) => {
    App.find()
        .then((data) => {
            res.send(data);
            // console.log("data",data)
        })
        .catch((err) => {
            res.status(500).send({
                user:
                    err.user || "Some error occurred while retrieving messages.",
            });
        });
};

// Find a single message with a userId
exports.findOne = (req, res) => {
    App.findById(req.params.userId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    user: "User not found with id " + req.params.userId,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    user: "User not found with id " + req.params.userId,
                });
            }
            return res.status(500).send({
                user: "Error retrieving message with id " + req.params.userId,
            });
        });
};

// Update a message identified by the userId in the request
exports.update = (req, res) => {
    App.findByIdAndUpdate(
        req.params.userId,
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        },
        { new: true }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    user: "Message not found with id " + req.params.userId,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    user: "User not found with id " + req.params.userId,
                });
            }
            return res.status(500).send({
                user: "Error updating message with id " + req.params.userId,
            });
        });
};

// Delete a message with the specified userId in the request
exports.delete = (req, res) => {
    App.findByIdAndDelete(req.params.userId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    user: "Message not found with id " + req.params.userId,
                });
            }
            res.send({ user: "User deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    user: "User not found with id " + req.params.userId,
                });
            }
            return res.status(500).send({
                user: "Could not delete message with id " + req.params.userId,
            });
        });
};