const express = require('express');
const router = express.Router();
const customerController = require("./../../app/controllers/customerController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/customers`;

    app.post(`${baseUrl}`, customerController.createCustomer)

    app.get(`${baseUrl}`, customerController.getAllCustomer)
}
