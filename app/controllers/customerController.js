const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const AuthModel = mongoose.model('Auth');


/* Models */
const CustomerModel = mongoose.model('Customer')

let createCustomer = (req, res) => {
    return new Promise((resolve, reject) => {
        CustomerModel.findOne({ email: req.body.email })
            .exec((err, retrievedCustomerDetails) => {
                if(err) {
                    logger.error(err.message, 'customerController: createCustomer', 10)
                    let apiResponse = response.generate(true, 'Failed to create Customer', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedCustomerDetails)) {
                    console.log(req.body)
                    let newCustomer = new CustomerModel({
                        accountNumber: req.body.accountNumber,
                        ifscCode: req.body.ifscCode,
                        accountType: req.body.accountType,
                        email: req.body.email,
                        name: req.body.name,
                        mobileNumber: req.body.mobileNumber,
                        address: req.body.address,
                        createdOn: time.now()
                    })
                    newCustomer.save((err, newCustomer) => {
                        if(err) {
                            console.log(err)
                            logger.error(err.message, 'customerController: createCustomer', 10)
                            let apiResponse = response.generate(true, 'Failed to create new Customer', 500, null)
                            reject(apiResponse)
                        } else {
                            let newCustomerObj = newCustomer.toObject();
                            resolve(newCustomerObj)
                        }
                    })
                } else {
                    logger.error('Customer Cannot Be Created.Customer Already Present', 'customerController: createCustomer', 4)
                    let apiResponse = response.generate(true, 'Customer Already Present With this Email', 403, null)
                    reject(apiResponse)
                }

                let apiResponse = response.generate(false, 'Customer created', 201, resolve)
                res.status(201).send(apiResponse)
            })
    })
}

/* Get all Customer Details */
let getAllCustomer = (req, res) => {
    CustomerModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Customer Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find Customer Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Customer Found', 'Customer Controller: getAllUser')
                let apiResponse = response.generate(true, 'No Customer Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Customer Details Found', 200, result)
                res.send(apiResponse.data)
            }
        })
}// end get all cutomer


module.exports = {
    createCustomer: createCustomer,
    getAllCustomer: getAllCustomer
}
