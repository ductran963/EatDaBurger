//Import necessary files so we can get access to all the data
var orm = require("../config/orm.js");

var burger = {
    select: function(cb){
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },
    insert: function(burger_name, devoured, cb){
        orm.insertOne(burger_name, devoured, function(res){
            cb(res)
        });
    },
    update: function(devoured, condition, cb){
        orm.updateOne("burgers", devoured, condition, function(res){
            cb(res)
        })
    }
}

module.exports = burger;