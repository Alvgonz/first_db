const catchError = require('../utils/catchError');
const Car = require('../models/Cars');

const getAll = catchError(async(req, res) => {
  const result = await Car.findAll()

  return res.status(200).json(result)
});

const create = catchError(async (req, res) => {
  const result = await Car.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req,res) => {
  const {id} = req.params;
  const result = await Car.findByPk(id);
  if(!result) return res.sendStatus(404);
  return res.status(200).json(result);
});

const destroy = catchError(async (req, res) => {
  const {id} = req.params;
  const result = await Car.destroy({where:{ id }}); /* Cuando un valor es la misma key se puede poner solo la key {id: id} es {id} */
  if(!result) return res.status(404).json({"message": "Car not found"});
  return res.sendStatus(204);
});

/* const update = catchError(async (req, res) => {
  const {id} = req.params;

  //const result = await Car.findOne({where: {id: id}});
  const result = await Car.findByPk(id)
  if(!result) return res.status(404).json({"message": "Car not found"});

  //const {firstName} = req.body
  const  resultUpdate = await result.update(req.body);

  return res.status(200).json(resultUpdate);
}); */

const update = catchError(async (req, res) => {
  const {id} = req.params;

  //const result = await Car.findOne({where: {id: id}});
  const result = await Car.update(
    req.body,
    {where: {id}, returning: true}
  );
  if(result[0] === 0) return res.status(404).json({"message": "Car not found"});

  return res.status(200).json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}