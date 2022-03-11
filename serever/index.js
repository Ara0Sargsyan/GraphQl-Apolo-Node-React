const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./shcema')
const fs = require('fs')
const path = require('path')
const {json} = require("express");

let users = []
fs.readFile(path.join(__dirname, 'db.json'), (err, data) => {
    users = JSON.parse(data)
});


const app = express()

const creatUser = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id)
    },
    createUser: ({input}) => {
        const user = creatUser(input)
        users.push(user)
        fs.writeFile("db.json", JSON.stringify(users), (err) => {});
        return user
    }
}

app.use(cors())
app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
}))

app.listen(5000, () => {
    console.log("server has been started on port 5000 " );
})