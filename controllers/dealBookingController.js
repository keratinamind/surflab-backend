const { Dealbooking, Sequelize , Dealdetail } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const Op = Sequelize.Op;

const newExpireDate = new Date(new Date().getTime() + 5184000000);

function makeid(length) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function createBooking(req, res, next) {
  try {
    const { count, totalAmount, dealId, customerId } = req.body;
    const createdBooking = await Dealbooking.create({
      count,
      paymentstatus: true,
      isUsed: false,
      voucherId: "SL"+makeid(10),
      totalAmount,
      expiredate: newExpireDate,
      dealId,
      customerId,
    });
    res.status(201).send({
      msg: `deal ${createdBooking.voucherId} has been created`,
      voucher: createdBooking.voucherId,
    });
  } catch (err) {
    next(err);
  }
}
async function getBookingByuserId(req, res, next) {
  try {
    const fetchBooking = await Dealbooking.findAll({
      where: {
        customerId: req.customer.id,
        expiredate: { [Sequelize.Op.gt]: new Date() },
      },
      include: {model: Dealdetail, attributes: ["title"]}
    });
    res.status(200).json(fetchBooking);
  } catch (err) {
    next(err);
  }
}
async function getBookingBydealId(req, res, next) {
  try {
    const {id} = req.params ;
    const fetchBooking = await Dealbooking.findAll({
      where: {
        dealId: id, 
      },
    });
    res.status(200).json(fetchBooking);
  } catch (err) {
    next(err);
  }
}

async function updateBooking(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}

async function deleteBooking(req, res, next) {
  try {
    const { id } = req.params;
    await Dealbooking.destroy({ where: { id: id } });
    res.status(200).json(`Booking ${id} has been deleted`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createBooking,
  getBookingByuserId,
  getBookingBydealId,
  updateBooking,
  deleteBooking,
};
