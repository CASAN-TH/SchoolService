'use strict';
var mongoose = require('mongoose'),
    model = require('../models/model'),
    mq = require('../../core/controllers/rabbitmq'),
    School = mongoose.model('School'),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash');

var cloudinary = require("../../../config/cloudinary").cloudinary;

const multer = require('multer')

const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    // console.log(file)
    cb(null, file.originalname)
  }
})

exports.getList = function (req, res) {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {};
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    School.find({}, {}, query, function (err, datas) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: datas
            });
        };
    });
};

exports.create = function (req, res) {
    var newSchool = new School(req.body);
    newSchool.createby = req.user;
    newSchool.save(function (err, data) {
        if (err) {

            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {

            mq.publish('School', 'created', JSON.stringify(data));
            res.jsonp({
                status: 200,
                data: data
            });

            /**
             * Message Queue
             */
            // mq.publish('exchange', 'keymsg', JSON.stringify(newOrder));
        };
    });
};
exports.getByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: 400,
            message: 'Id is invalid'
        });
    }
    School.findById(id, function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.data = data ? data : {};
            next();
        };
    });
};
exports.read = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.update = function (req, res) {
    var updSchool = _.extend(req.data, req.body);
    updSchool.updated = new Date();
    updSchool.updateby = req.user;
    updSchool.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.delete = function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.photoupload = function (req, res) {
    const upload = multer({ storage }).single('filename');
    upload(req, res, function(err) {
        if (err) {
            return res.send(err)
          }
          const path = req.file.path
        cloudinary.uploader.upload(
        path,
        (result)=>{
            // console.log(result);
            res.json(result);
        });
    })
    
    
}


