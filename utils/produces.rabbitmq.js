const { connectRabbitMQ } = require("./connection");

const QUEUE_NAME = "task_queue";

const sendToQueue = async (message) => {
 const channel = await connectRabbitMQ();

 await channel.assertQueue(QUEUE_NAME, { durable: true });

 channel.sendToQueue(
   QUEUE_NAME,
   Buffer.from(JSON.stringify(message)),
   { persistent: true }
 );

 console.log("📤 Sent:", message);
};

module.exports = { sendToQueue };
