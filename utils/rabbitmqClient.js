const amqp = require("amqplib");

let connection;
let channel;

const connectRabbitMQ = async () => {
 if (channel) return channel;

 connection = await amqp.connect("amqp://localhost");
 channel = await connection.createChannel();

 console.log("RabbitMQ connected");

 return channel;
};

const getChannel = () => channel;

process.on("exit", async () => {
 if (channel) await channel.close();
 if (connection) await connection.close();
});

module.exports = { connectRabbitMQ, getChannel };
