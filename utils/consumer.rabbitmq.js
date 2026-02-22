const { connectRabbitMQ } = require("./connection");

const QUEUE_NAME = "task_queue";

const startConsumer = async () => {
 const channel = await connectRabbitMQ();

 await channel.assertQueue(QUEUE_NAME, { durable: true });
 channel.prefetch(1);

 console.log("📥 Waiting for messages...");

 channel.consume(QUEUE_NAME, async (msg) => {
   if (!msg) return;

   const data = JSON.parse(msg.content.toString());
   console.log("⚙️ Processing:", data);

   // simulate work
   await new Promise((res) => setTimeout(res, 1000));

   channel.ack(msg);
 });
};

module.exports = { startConsumer };
