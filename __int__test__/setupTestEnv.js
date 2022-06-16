const {build} = require("../src/app")

module.exports = function setupTestEnv() {
    const app = build ({ logger : true},{},
        { connectionString: 'postgres://postgres:postgres' })
            beforeAll(async () => {
                await app.ready()
                await app.pg.query(createTableSQL)
                await app.pg.query(clearTableSQL)
            })

            beforeEach(async =>{
                await.pg.query()
            } )
        
}