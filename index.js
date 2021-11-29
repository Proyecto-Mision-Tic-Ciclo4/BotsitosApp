require('dotenv').config()
const express = require('express');
const { makeExecutableSchema } = require('graphql-tools')
const cors = require ('cors')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require ('./GraphQL/resolvers')
const app = express();


const port = process.env.port || 3000;
const isDev = process.env.NODE_ENV !== 'produccion'

const typeDefs = readFileSync(
    join(__dirname, 'GraphQL', 'schema.graphql'),
    'utf-8'
)

const schema = makeExecutableSchema({
    typeDefs, resolvers
})

app.use(cors())

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
}))

app.listen(port, () => {
    console.log(`Servido Iniciado - http://localhost:${port}`)
})