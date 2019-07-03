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
	},
	caliberSort: () => {
		return Database.query('SELECT * FROM `calibers` ORDER BY `caliber`')
			.then(results => results.json())
	},
	brandSort: () => {
		return Database.query('SELECT * FROM `brands` ORDER BY `brand`')
			.then(results => results.json())
	},
	loginCheck: (username, password) => {
		return Database.query(`SELECT * FROM users WHERE username = ${username} AND password = ${password}`)
			.then(results => results.json())
	},
	registerCheck: (username) => {
		return Database.query(`SELECT * FROM users WHERE username = ${username}`)
			.then(results => results.json())
	},
	getUserStacks: (userId) => {
		return Database.query(`SELECT * FROM stacks s
			JOIN calibers c ON s.caliberId = c.Id
			JOIN brands b ON s.brandId = b.Id
			WHERE s.id = ${userId}`)
			.then(results => results.json())
	},
	getOneStack: (id, userId) => {
		return Database.query(`SELECT * FROM stacks s
			JOIN calibers c ON s.caliberId = c.Id
			JOIN brands b ON s.brandId = b.Id
			WHERE s.userId = ${userId} AND s.Id = ${id}`)
			.then(results => results.json())
	}
	
	//queries appear in StackManager, ApplicationViews, Register, Login
	//shove queries into querymanager?
	//fix users db to default role to 'user'
}