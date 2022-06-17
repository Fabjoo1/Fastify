const vatCalculator = require('../../utils/vatCalculator')


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
      gross_amount : {
        type: 'number'
      }
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
          gross_amount : {type: 'number'}
        },
      },
      response: {
        201: toMake,
      },
    },
  };

const toMake_v2 = async (fastify , options , done ) => {
    
    fastify.get('/', async (request , reply)=>{
        try{
            const client = await fastify.pg.connect()
            const {rows} = await fastify.pg.query("SELECT * FROM items")
            reply.send(rows)
        }
        catch(err){
            reply.send(err)
        }  
    })

    fastify.get('/:id', async(request, reply)=>{
        try {
            const {id} = request.params
            const {rows} = await fastify.pg.query("SELECT * FROM items WHERE id=$1", [id])
            reply.send(rows[0])
        } catch (err) {
            reply.send(err)
        }
    })
    
    fastify.put('/:id' , async(request, reply)=>{
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
            const {name , description, gross_amount} = request.body;
            const netAmount = vatCalculator.calculateNetAmount(gross_amount)
            const vetAmount = vatCalculator.calculateVAT(netAmount)

            const {rows} = await fastify.pg.query("Insert INTO items (name, desc , gross_amount, net_amount , vetAount) VALUES ($1 ,$2 , $3, $4, $5)  RETURNING *" , [name , description , gross_amount, netAmount, vetAmount]);
            
            reply.code(201).send(rows[0]);
        }
        catch(err){
            reply.send(err)
        }
        finally{
            client.release();
        }
    })
    
    fastify.delete('/:id', async(request, reply)=>{
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