const { Customer } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const util = require("util");
const cloudinary = require("cloudinary").v2;
const uploadPromise = util.promisify(cloudinary.uploader.upload);

async function registerCustomer(req, res, next) {
  try {
    const { username, email, password, passwordconfirm } = req.body;
    if (!username || username.trim() === "") {
      return res.status(400).json({ msg: "username required" });
    }
    if (!email || email.trim() === "") {
      return res.status(400).json({ msg: "email required" });
    }
    if (!password || password.trim() === "") {
      return res.status(400).json({ msg: "password required" });
    }
    if (password !== passwordconfirm) {
      return res.status(400).json({ msg: "password did not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdCustomerAccount = await Customer.create({
      avatar:
        "http://localhost:6969/images/80944205-user-avatar-illustration-anonymous-sign-vector-white-icon-with-soft-shadow-on-transparent-background.jpg",
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).send({
      msg: `user ${createdCustomerAccount.username} has been created`,
    });
  } catch (err) {
    next(err);
  }
}

async function loginCustomer(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || email.trim() === "") {
      return res.status(400).json({ msg: "email required" });
    }
    if (!password || password.trim() === "") {
      return res.status(400).json({ msg: "password required" });
    }
    const findUser = await Customer.findOne({ where: { email } });
    let isPasswordValid = false;
    if (findUser) {
      isPasswordValid = await bcrypt.compare(password, findUser.password);
    }

    if (findUser && isPasswordValid) {
      const payload = { id: findUser.id, username: findUser.username , role: findUser.role };
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "10d" });
      return res.status(200).send({
        msg: "login success",
        token,
        userId: findUser.id,
        username: findUser.username,
        avatar: findUser.avatar,
      });
    } else {
      res.status(400).json({ msg: "email or password incorrect" });
    }
  } catch (err) {
    next(err);
  }
}
async function getCustomerById(req, res, next) {
  try {
    const fetchCustomer = await Customer.findOne({where: {id: req.user.id}, attributes: { exclude: ["password","createdAt","updatedAt"] }})
    res.status(200).json(fetchCustomer)
  } catch (error) {next(err)}
}

async function updateCustomer(req, res, next) {
  try {
    const { username, firstName, lastName, email, phoneNumber, address, age } =
      req.body;
    console.log(req.file);
    let result;
    if (req.file) {
      if (req.file?.size <= 5 * 1e6) {
        result = await uploadPromise(req.file.path);
        fs.unlinkSync(req.file.path);
      } else {
        fs.unlinkSync(req.file.path);
        throw new CustomerErr("Your image file is greater than 5MB", 400);
      }
    }

    await Customer.update(
      {
        avatar: result?.secure_url,
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        age,
      },
      { where: { id: req.user.id } }
    );

    res.status(200).send({ msg: `upload information success` });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registerCustomer,
  loginCustomer,
  updateCustomer,
  getCustomerById,
};
