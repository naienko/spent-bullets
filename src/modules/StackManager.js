import APIManager from "./APIManager";

const db = "stacks";

export default Object.create(APIManager, {
    getUserStacks: {value: function () {
        return APIManager.getQuery(`userId=${parseInt(sessionStorage.getItem("credentials"))}`, db)
    }},
    getOneStack: {value: function (id) {
        return APIManager.getOneQuery(id, `userId=${parseInt(sessionStorage.getItem("credentials"))}`, db)
    }}
})