var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: "3311",
  user: "root",
  password: "h1s3k117"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});

// create 'export default' class
// duplicate class methods from APIManager
// test test test
// then convert ApplicationViews to SQL database