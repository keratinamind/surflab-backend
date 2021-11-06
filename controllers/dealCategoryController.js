const { Dealcategory } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createCategory(req, res, next) {
  const { name } = req.body;
  const createdCategory = await Dealcategory.create({ name });
  res.status(201).json({ NewCategory: createdCategory.name });
  try {
  } catch (err) {
    next(err);
  }
}
async function getCategory(req, res, next) {
  const { id } = req.body;
  const getCategory = await Dealcategory.findOne({ where: id });
  res.status(200).json({ getCategory });
  try {
  } catch (err) {
    next(err);
  }
}

async function getAllCategory(req,res,next) {
  try {
    const getAllCategory = await Dealcategory.findAll();
    res.status(200).json({ getAllCategory });
  } catch (err) {
    next(err)
  }
}

async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [rows] = await Dealcategory.update({ name }, { where: { id } });

    if (rows === 0) {
      return res.status(400).json({ message: "fail to update list" });
    }

    res.status(200).json({ message: "success update category" });
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;

    const [rows] = await Dealcategory.destroy({ where: { id } });

    if (rows === 0) {
      return res.status(400).json({ message: "fail to update list" });
    }

    res.status(200).json({ message: "success update category" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
