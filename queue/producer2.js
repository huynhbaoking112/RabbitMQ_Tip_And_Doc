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
        const exchangeName = 'topic_exchange2';
        const exchangeType = 'topic';

        channel.assertExchange(exchangeName, exchangeType, {
            durable: false
        });

        // Producer gửi message đến Exchange
        const routingKey = 'order.new';
        const message = 'New order received from producer 2';

        channel.publish(exchangeName, routingKey, Buffer.from(message));
        console.log(`[Producer2] Sent message: ${message} with routing key ${routingKey}`);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});