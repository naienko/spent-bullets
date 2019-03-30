const RemoteURL = `https://bullets-database.herokuapp.com`

//const RemoteURL = "http://localhost:8081"

export default {
    getOne: (id, db) => {
        return fetch(`${RemoteURL}/${db}/${id}`)
            .then(results => results.json())
    },
    getAll: function (db) {
        return fetch(`${RemoteURL}/${db}`)
            .then(results => results.json())
    },
    getQuery: (query, db) => {
        return fetch(`${RemoteURL}/${db}/?${query}`)
            .then(results => results.json())
    },
    getOneQuery: (id, query, db) => {
        return fetch(`${RemoteURL}/${db}/${id}/?${query}`)
            .then(results => results.json())
    },
    delete: (id, db) => {
        return fetch(`${RemoteURL}/${db}/${id}`, {
            method: "DELETE"
        })
    },
    add: (db, newObject) => {
        return fetch(`${RemoteURL}/${db}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        })
        .then(results => results.json())
    },
    update: (db, newObject, id) => {
        return fetch(`${RemoteURL}/${db}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        })
        .then(results => results.json())
    },
    edit: (db, newObject, id) => {
        return fetch(`${RemoteURL}/${db}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        })
        .then(results => results.json())
    }
}