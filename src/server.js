const {build} = require('./app')
const env = require('./config/env')

const app = build(
    {logger:true},
    {exposeRuote: true , 
    ruotePrefix : "/docs" , 
    swagger : {info: {tittle: "Fastify API" , version : "1.0.0" }}},
    {
        connectionString : env.POSTGRES_DB_CONNECTION_STRING
    });
    
    
app.get('/time' ,(req, reply)=>{
    app.pg.connect(onConnect)
    function onConnect (err, client, relase){
        if (err) return reply.send(err)
        
        client.query(
            'SELECT now()',
            function onResult (err, result){
                relase()
                reply.send(err|| result.row[0])
            }
        )
    }
} )


app.listen(env.WEB_APP_HOST_PORT, '0.0.0.0', function(err, address){
    if(err){
        app.log.error(err)
        process.exit(1)
    }
    
})
