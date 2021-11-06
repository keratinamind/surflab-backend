const { Dealdetail } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const util = require("util");
const cloudinary = require("cloudinary").v2;
const uploadPromise = util.promisify(cloudinary.uploader.upload);

const newExpireDate = new Date(new Date().getTime() + 15184000000);

async function createDealDetail(req, res, next) {
  try {
    console.log("createDealDetail");
    const { title, price, detail, quantity, categoryId, shopId } = req.body;
    console.log(req.body);
    let result;
    if (req.file?.size <= 5 * 1e6) {
      result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
    } else {
      fs.unlinkSync(req.file.path);
      throw new CustomerErr("Your image file is greater than 5MB", 400);
    }

    const createdDealDetail = await Dealdetail.create({
      image: result?.secure_url,
      title,
      price: +price,
      detail,
      expireDate: newExpireDate,
      quantity: +quantity,
      remain: +quantity,
      categoryId: +categoryId,
      shopId: +shopId,
    });
    res.status(201).send({
      msg: `deal ${createdDealDetail.title} has been created`,
    });
  } catch (err) {
    next(err);
  }
}
async function getDealDetail(req, res, next) {
  try {
    const { id } = req.params;
    const findDeal = await Dealdetail.findOne({ where: { id } });
    res.json({ findDeal });
  } catch (err) {
    next(err);
  }
}
async function getDealByCategory(req, res, next) {
  try {
    const { id } = req.params;
    const dealByCategory = await Dealdetail.findAll({
      where: { categoryId: id },
    });
    res.status(201).json({ dealByCategory });
  } catch (err) {
    next(err);
  }
}
async function getAllDeals(req, res, next) {
  try {
    const deals = await Dealdetail.findAll();
    res.status(201).json(deals);
  } catch (err) {
    next(err);
  }
}

async function updateDealDetail(req, res, next) {
  try {
    const { title, price, detail, quantity, remain, categoryId, shopId } =
      req.body;

    const {id} = req.params;

    let result;
    if (req.file?.size <= 5 * 1e6) {
      result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
    } else {
      fs.unlinkSync(req.file.path);
      throw new CustomerErr("Your image file is greater than 5MB", 400);
    }
    const updatedDealDetail = await Dealdetail.update(
      {
        image: result?.secure_url,
        title,
        price,
        detail,
        expireDate: newExpireDate,
        quantity,
        remain,
        categoryId,
        shopId,
      },
      { where: { id: id } }
    );
    res.status(201).send({
      msg: `deal ${updatedDealDetail.title} has been updated`,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteDealDetail(req, res, next) {
  try {
    const { id } = req.params;
    await Dealdetail.destroy({ where: { dealId: id } });
    res.status(201).json({ msg: `Deal ${id} has been deleted` });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createDealDetail,
  getAllDeals,
  getDealDetail,
  updateDealDetail,
  getDealByCategory,
  deleteDealDetail,
};
