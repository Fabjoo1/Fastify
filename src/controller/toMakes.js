let toMakes = require("../toMake");

const gettoMakes = (request, reply) => {
  reply.send(toMakes);
};

const gettoMake = (request, reply) => {
  const { id } = request.params;
  const toMake = toMakes.find((toMake) => toMake.id === id);
  reply.send(toMake);
};

const posttoMake = (request, reply) => {
  const { name, description } = request.body;
  const toMake = {
    id: String(toMakes.length + 1),
    name,
    description,
  };
  toMakes.push(toMake);
  reply.code(201).send(toMake);
};

const updatedtoMake = (request, reply) => {
  const { id } = request.params;
  const { name, description } = request.body;
  const toMake = toMakes.find((toMake) => toMake.id === id);
  toMake.name = name;
  toMake.description = description;
  reply.send(toMake);
};

const deletetoMake = (request, reply) => {
  const { id } = request.params;
  toMakes = toMakes.filter((toMake) => toMake.id !== id);
  reply.send(`Item with ${id} got deleted!`);
};

module.exports = {
  gettoMakes,
  gettoMake,
  posttoMake,
  updatedtoMake,
  deletetoMake,
};