const db = require("../config/db");
const bcrypt = require("bcryptjs");
const startTransaction = require("../utils/transaction.utils");

async function getAllUsers(req, res, next) {
    const [rows] = await db.query("SELECT * FROM users");
    res.send(rows);
}

async function createUser(req, res, next) {
    const body = req.body || {};
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    const data = await startTransaction(async (connection) => {
        if (!!connection) {
            const [rows] = connection.execute(
                "INSERT into users (username, password) VALUES (?, ?)",
                [body.username, hash]
            );

            return rows[0];
        } else {
            throw new Error("Connection error");
        }
    });

    res.json(data);
}

module.exports = { getAllUsers, createUser };
