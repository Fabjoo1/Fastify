const fastify = require('fastify')
const fastifySwagger = require('@fastify/swagger')
const fastifyPostgres= require('@fastify/postgres')


const {toMake}=require('./routes/items')
const {toMake_v2} = require('./routes/v2/toMake')
 

const build = (opts={} , optsPostgres={}, optsSwagger={})=>{
    const app= fastify(opts, optsPostgres)
    app.register(fastifyPostgres,optsPostgres)
    app.register(fastifySwagger,optsSwagger)
    app.register(toMake , {prefix: '/v1'})
    app.register(toMake_v2, {prefix: '/v2'})
    return app
}

module.exports = {build}