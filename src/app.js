const fastify = require('fastify')
const fastifySwagger = require('@fastify/swagger')
const fastifyPostgres= require('@fastify/postgres')


const {itemRuote}=require('./routes/items')
 

const build = (opts={} , optsPostgres={}, optsSwagger={})=>{
    const app= fastify(opts, optsPostgres)
    app.register(fastifyPostgres,optsPostgres)
    app.register(fastifySwagger,optsSwagger)
    app.register(toMake)
    return app
}

module.exports = {build}