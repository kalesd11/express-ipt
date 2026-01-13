const RedisStore = require("connect-redis").default;
const redisClient = require("./redis");
const session = require("express-session");

const startSession = () => {
    session({
        store: new RedisStore({
            client: redisClient,
            prefix: "sess:",
        }),
        name: "connect.sid",
        secret: "mySuperSecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, // true in HTTPS
            maxAge: 1000 * 60 * 60, // 1 hour
        },
    });
};
module.exports = startSession;
