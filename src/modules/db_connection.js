const mysql = require('mysql');

class Database {
	constructor() {
		this.connection = mysql.createConnection({
			//remember when going to live to insert live connection data here
			host: "localhost",
			port: "3311",
			user: "root",
			password: "h1s3k117",
			database: "spent_bullets"
		});
	}
	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
				if (err)
					return reject(err);
				resolve(rows);
			});
		});
	}
	close() {
		return new Promise((resolve, reject) => {
			this.connection.end(err => {
				if (err)
					return reject(err);
				resolve();
			});
		});
	}
}

// test test test
// then convert ApplicationViews to SQL database

export default {
	getOne: (id, db) => {
		return Database.query(`SELECT * FROM ${db} WHERE id = ${id}`)
			.then(results => results.json())
	},
	getAll: function (db) {
		return Database.query(`SELECT * FROM ${db}`)
			.then(results => results.json())
	},
	//DELETE method
	delete: (id, db) => {
		return Database.query(`DELETE FROM ${db} WHERE id = ${id}`)
	},
	//POST method
	//make this check if the table is users, then hash the password?
	add: (db, newObject) => {
		return Database.query(`INSERT INTO ${db} SET ?`, newObject)
			.then(results => results.json())
	},
	//PUT method
	update: (db, newObject, id) => {
		return Database.query(`UPDATE ${db} SET ? WHERE id = ${id}`, newObject)
			.then(results => results.json())
	}
	
	//figure out how to do the query methods
	//queries appear in StackManager, ApplicationViews, Register, Login
	//shove queries into querymanager?
	//fix users db to default role to 'user'
}