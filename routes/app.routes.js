module.exports = (app) => {
    const App = require("../controller/app.controller.js");
    const Users = require("../model/app.model");

    app.post("/create", async (req, res) => {
        try {
            const user = new Users(req.body);
            const save = await user.save();
            res.send("user created successfully");
        } catch (e) {
            console.log("hello", e)
        }
    });

    app.get("/get-all", App.getAll);

    app.get("/user/:userId", App.findOne);

    app.put("/user/:userId", App.update);

    app.delete("/user/:userId", App.delete);
};