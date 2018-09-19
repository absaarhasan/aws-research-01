console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-2'});

exports.handle = function (e, ctx, callback) {

    var params = {
        Key: {
            id : e.id,
            timestamp : parseInt(e.timestamp)
        },
        TableName: 'task-list-test',
        UpdateExpression: "set task = :t",
        ExpressionAttributeValues:{
            ":t": e.task.substring(0, 250)
        }
    };

    docClient.update(params, function (err, data) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, data)
        }
    })
};
