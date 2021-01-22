const express = require('express')
const { graphqlHTTP } = require("express-graphql")

const app = express()

//Fire graphqlHTTP any time a request to '/graphql' comes in
app.use('/graphql', graphqlHTTP({
    //Define schema
    

}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
})