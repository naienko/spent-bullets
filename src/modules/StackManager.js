import APIManager from "./APIManager";

const db = "stacks";

export default Object.create(APIManager, {
    getUserStacks: {value: function () {
        return APIManager.getQuery(`userId=${this.props.activeUserId()}&_expand=brandCaliber`, db)
    }}
})