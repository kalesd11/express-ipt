const RedisStore = require("connect-redis").default;
const redisClient = require("../utils/redis.utils");
const session = require("express-session");

const startSession = () => {
    session({
        store: new RedisStore({
            client: redisClient,
            prefix: "sess:", // Prefix for session keys in Redis
        }),
        name: "connect.sid", // Cookie Name
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
