var express = require("express");

var router = express.Router();

// Import the burger database into the file so we can use it
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
    burger.select(function (data) {
        res.render("index", { burgers: data })
    });
})


//Set router as api/burgers/:id so we can call on req.params and perform necessary function
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    burger.update(req.body.devoured, condition, function (data) {
        if (data.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

router.post("/api/burgers", function (req, res){
    console.log(req.body)
    burger.insert(
        req.body.burger_name, req.body.devoured, function(result){
        res.json({ id: result.id });
    })
})

module.exports = router;