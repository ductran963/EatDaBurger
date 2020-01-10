var connection = require("../config/connection.js");
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
}
var orm = {
    selectAll: function (tableName, cb) {
        connection.query("select * from ??", [tableName], function (err, result) {
            if (err) throw err
            cb(result)
        });
    },
    insertOne: function (burger_name, devoured, cb) {
        var queryString = "INSERT INTO burgers";

    queryString += " (burger_name, devoured) ";
    queryString += "values(?, ?)"
        connection.query(queryString, [burger_name, devoured], function (err, result) {
            if (err) throw err
            cb(result)
        });
    },
    updateOne: function (tableName, eaten, condition, cb) {
        console.log(eaten)
        var queryString = "UPDATE " + tableName;
        queryString += " SET devoured = " + eaten;
        queryString += " WHERE ";
        queryString += condition;
        connection.query(queryString, function (err, result) {
            if (err) throw err
            cb(result)
        });
    }
};

module.exports = orm;