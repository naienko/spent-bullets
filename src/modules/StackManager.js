import APIManager from "./APIManager";

const db = "stacks";

export default Object.create(APIManager, {
    getUserStacks: {value: function () {
        return APIManager.getQuery(`userId=${parseInt(sessionStorage.getItem("credentials"))}&_expand=brand&_expand=caliber`, db)
    }}
})