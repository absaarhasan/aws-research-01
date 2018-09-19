console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});

exports.handle = function (e, ctx, callback) {
    var params = {
        Key: {
            id : e.id,
            timestamp : parseInt(e.timestamp)
        },
        TableName: 'task-list-test'
    };

    docClient.delete(params, function (err, data) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, data)
        }
    })
};
