const {
    gettoMake,
    gettoMakes,
    posttoMake,
    updatedtoMake,
    deletetoMake,
  } = require("../controller/toMakes");
  
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
  
  const gettoMakesOpts = {
    schema: {
      response: {
        200: {
          type: "array",
          toMakes: toMake,
        },
      },
    },
    handler: gettoMakes,
  };
  
  const gettoMakeOpts = {
    schema: {
      response: {
        200: toMake,
      },
    },
    handler: gettoMake,
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
  
  const updatetoMakeOpts = {
    schema: {
      body: {
        type: "object",
        required: ["name", "description"],
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
      response: {
        200: toMake,
      },
    },
    handler: updatedtoMake,
  };
  
  const deletetoMakeOpts = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: deletetoMake,
  };
  
  const toMakeRoute = (fastify, options, done) => {
    fastify.get("/", gettoMakesOpts);
    fastify.get("/:id", gettoMakeOpts);
    fastify.post("/", posttoMakeOpts);
    fastify.put("/:id", updatetoMakeOpts);
    fastify.delete("/:id", deletetoMakeOpts);
    done();
  };
  
  module.exports = { toMakeRoute };