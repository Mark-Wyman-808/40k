const uriBase = process.env.NODE_ENV !== "production" ? (
    "http://localhost:3001"
) : (
    //change line below when using for another project
    "https://warhammer-40k.herokuapp.com"
)

const api = "/api/v1"

module.exports.uriBase = uriBase
module.exports.api = api