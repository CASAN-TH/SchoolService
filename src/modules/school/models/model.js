'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
    schoolname: {
        type: String,
        unique: "School Name already exists",
        required: 'Please fill a School name',
    },
    imageUrl: {
        type: String
    },
    under: {
        type: String,
        required: 'Please fill a School under',
    },
    area: {
        type: String,
        required: 'Please fill a School area',
    },
    subdistric: {
        type: String,
        required: 'Please fill a School subdistric',
    },
    distric: {
        type: String,
        required: 'Please fill a School distric',
    },
    province: {
        type: String,
        required: 'Please fill a School province',
    },
    registrar: {
        type: String,
        required: 'Please fill a School registrar',
    },
    position: {
        type: String,
        required: 'Please fill a School position',
    },
    direction: {
        type: String,
        required: 'Please fill a School direction',
    },
    positions: {
        type: String,
        required: 'Please fill a School positions',
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("School", SchoolSchema);