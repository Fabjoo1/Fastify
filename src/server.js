const {build} = require('./app')

const app = build(
    {logger:true},
    {exposeRuote: true , ruotePrefix : "./docs" , swagger : {info: {tittle: "Fastify API" , }}}


    )    



app.listen(3000, function(err, address){
    if(err){
        app.log.error(err)
        process.exit(1)
    }
    
})
