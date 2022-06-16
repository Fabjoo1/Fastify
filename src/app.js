const fastify = require('fastify')
const fastifySwagger = require('@fastify/swagger')

const {itemRuote}=require('./routes/items')
 

const build = (opts={})=>{
    const app= fastify(opts)
    app.register(fastifySwagger,optsSwagger)
    app.register(toMake)
    return app
}

module.exports = {build}