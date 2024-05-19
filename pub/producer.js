const amqplib = require("amqplib");
const amqplib_url = "amqp://user:password@localhost:5672";

const sendQueue = async ({ msg }) => {
  try {
    //connect
    const conn = await amqplib.connect(amqplib_url);

    //create Channel
    const channel = await conn.createChannel();

    //3 create name queue
    const nameQueue = 'q1';

    //4 create queue
    await channel.assertQueue(nameQueue, {
      durable: true
    });

    //5, send to queue
    await channel.sendToQueue(nameQueue, Buffer.from(msg), {persistent:true});

    // //6. close conn and channel
    // await channel.close();
    // await conn.close();

  } catch (error) {
    console.log(error.message);
  }
};

sendQueue({ msg: "KAFKA" });