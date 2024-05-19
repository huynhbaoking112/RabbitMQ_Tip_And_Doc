const amqplib = require("amqplib");
const amqplib_url = "amqp://user:password@localhost:5672";
const amqp = require('amqplib/callback_api');

// Kết nối đến RabbitMQ server
amqp.connect(amqplib_url, function(error0, connection) {
    if (error0) {
        throw error0;
    }

    // Tạo channel
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        // Khai báo Exchange
        const exchangeName = 'topic_exchange';
        const exchangeType = 'topic';

        channel.assertExchange(exchangeName, exchangeType, {
            durable: false
        });
        channel.assertExchange("topic_exchange2", exchangeType, {
            durable: false
        });

        // Tạo queue và bind với Exchange
        const queueName = 'order_queue';
        const bindingKey = 'order.*';

        channel.assertQueue(queueName, { durable: false, exclusive: true }, );
        channel.bindQueue(queueName, exchangeName, bindingKey);
        channel.bindQueue(queueName, "topic_exchange2", bindingKey);

        console.log(`[Consumer] Waiting for messages with binding key ${bindingKey}`);

        // Consumer nhận message từ queue
        channel.consume(queueName, function(msg) {
            console.log(`[Consumer] Received message: ${msg.content.toString()}`);
        }, {
            noAck: true
        });
    });

});