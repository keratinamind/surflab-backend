const { Shop } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createShop(req, res, next) {
    const { name } = req.body;
    const createdShop = await Shop.create({ name });
    res.status(201).json({ Shop : createdShop.name });
    try {
    } catch (err) {
      next(err);
    }
  }
async function getShop(req, res, next) {
    
    const fetchShop =  await Shop.findAll()
    res.status(201).json( fetchShop );
    try {
    } catch (err) {
      next(err);
    }
  }

async function updateShop(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const [rows] = await Shop.update({ name }, { where: { id } });
  
      if (rows === 0) {
        return res.status(400).json({ message: "fail to update shop" });
      }
  
      res.status(200).json({ message: "success update shop" });
    } catch (err) {
      next(err);
    }
  }

module.exports = { createShop, updateShop , getShop};
