'use strict';
var controller = require('../controllers/controller'),
    mq = require('../../core/controllers/rabbitmq'),
    policy = require('../policy/policy');
module.exports = function (app) {
    var url = '/api/schools';
    var urlWithParam = '/api/schools/:schoolId';
    app.route(url).all(policy.isAllowed)
        .get(controller.getList)
        .post(controller.create);

    app.route(urlWithParam).all(policy.isAllowed)
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.route('/api/schools/upload/logo')//.all(policy.isAllowed)
        .post(controller.photoupload);

    app.param('schoolId', controller.getByID);


    /**
     * Message Queue
     * exchange : ชื่อเครือข่ายไปรษณีย์  เช่น casan
     * qname : ชื่อสถานีย่อย สาขา
     * keymsg : ชื่อผู้รับ
     */


    // mq.consume('exchange', 'qname', 'keymsg', (msg)=>{
    //     console.log(JSON.parse(msg.content));

    // });
}