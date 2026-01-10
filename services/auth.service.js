const bcrypt = require("bcryptjs");
const db = require("../config/db");
const { generateToken } = require("../utils/jwt.utils");

const login = async (req, res) => {
    const { username, password } = req.body;

    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    if (users.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
        id: user.id,
        username: user.username,
    });

    res.json({
        token,
    });
};

module.exports = { login };
