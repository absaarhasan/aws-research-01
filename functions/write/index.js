console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});
const uuid = require('uuid');

exports.handle = function (e, ctx, callback) {
    var params = {
        Item: {
            id: uuid.v1(),
            timestamp: Date.now(),
            task: e.task.substring(0, 250), // free usage hack
            user: e.user.substring(0, 20) // free usage hack
        },
        TableName: 'task-list-test'
    };

    docClient.put(params, function (err, data) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, data)
        }
    })
};
