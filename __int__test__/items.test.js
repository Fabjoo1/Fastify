const setupTestEnv = require('./setupTestEnv')

const app = setupTestEnv();

describe("Integration test for CRUD operations connecnt to test postgres" {
    test("Should create an item via POST ruote " , async ()=> {
        const item={
            name : 'Test item 2',
            description : 'This is a test item',
            gross_ammount : 20
        }
        const response = await app.inject({
            method: "POST",
            url : "/v2/",
            payload : item
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(item)
    })
})