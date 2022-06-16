const { default: fastify } = require("fastify")

const itemRuote_v2 = async(fastify , options , done ) => {
    fastify.post('./' , async(request , reply )=> {
        
        try {
            const client = await fastify.pg.connect();
            const {name , description} = request.body;
            const {rows} = await fastify.pg.query{"Insert INTO items (name, desc ) VALUES ($1 ,$2)  RETURNING *" , [name , description])};

        }
    })
    done();
}
module.exports = {itemRuote_v2}