const toMake = {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
    },
  };

  const posttoMakeOpts = {
    schema: {
      body: {
        type: "object",
        required: ["name", "description"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
        },
      },
      response: {
        201: toMake,
      },
    },
    handler: posttoMake,
  };

const toMake_v2 = async (fastify , options , done ) => {
    
    fastify.get('./', async (request , reply)=>{
        try{
            const client = await fastify.pg.connect()
            const {rows} = await fastify.pg.query("SELECT * FROM items")
            reply.send(rows)
        }
        catch(err){
            reply.send(err)
        }  
    })

    fastify.get('./:id', async(request, reply)=>{
        try {
            const {id} = request.params
            const {rows} = await fastify.pg.query("SELECT * FROM items WHERE id=$1", [id])
            reply.send(rows[0])
        } catch (err) {
            reply.send(err)
        }
    })
    
    fastify.put('./:id' , async(request, reply)=>{
        try {
            const {id} = request.params
            const {name, description}=request.body
            const {rows} = await fastify.pg.query("UPDATE items SET name=$1, description=$2 WHERE id=$3 RETURNING *", [name, description, id])
            reply.send(rows[0])
        } catch (err) {
            reply.send(err)
        }
    })
    
    fastify.post('/' , posttoMakeOpts, async (request , reply )=> {
        
        try {
            const client = await fastify.pg.connect();
            const {name , description} = request.body;
            const {rows} = await fastify.pg.query("Insert INTO items (name, desc ) VALUES ($1 ,$2)  RETURNING *" , [name , description]);
            
            reply.code(201).send(rows[0]);
        }
        catch(err){
            reply.send(err)
        }
        finally{
            client.release();
        }
    })
    
    fastify.delete('./:id', async(request, reply)=>{
        try {
            const {id} = request.params
            await fastify.pg.query("DELETE FROM items WHERE id=$1", [id])
            reply.send(`Item with id : ${id} has been deleted`)
        } catch (err) {
            reply.send(err)
        }
    })

    done();
}
module.exports = {toMake_v2}