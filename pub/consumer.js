const amqplib = require("amqplib");
const amqplib_url = "amqp://user:password@localhost:5672";

const reciveQueue = async () => {
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

    //5, recive to queue
    await channel.consume(nameQueue, msg=>{
        console.log(msg.content.toString());
    },{
        noAck: true
    });

    // //6. close conn and channel
    // await channel.close();
    // await conn.close();

  } catch (error) {
    console.log(error.message);
  }
};

reciveQueue()