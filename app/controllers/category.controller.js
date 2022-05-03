const Category = require('../models/category.model')

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const category = new Category({
    id_category: category.id_category,
    id_parent: category.id_parent,
    id_shop_default: category.id_shop_default,
    level_depth: category.level_depth,
    active: category.active,
    name: category.name
  });
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving info."
        });
      else res.send(data);
    });
};

exports.findById = (req, res) => {
  Category.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Category with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Category.updateById(
    req.params.id,
    new Category(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Category with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Category.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Category with id " + req.params.id
        });
      }
    } else res.send({ message: `Category was deleted successfully!` });
  });
};