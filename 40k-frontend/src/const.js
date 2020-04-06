//const uriBase = "http://localhost:3001"
//const uriBase = "https://warhammer-40k.herokuapp.com"


const uriBase = process.env.NODE_ENV !== "production" ? (
        "http://localhost:3001"
) : (
        "https://warhammer-40k.herokuapp.com"
    )

const api = "/api/v1"

module.exports.uriBase = uriBase
module.exports.api = api

