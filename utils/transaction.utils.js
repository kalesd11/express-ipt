const pool = require("../config/db");

const startTransaction = async (operation) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await operation(connection);
        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = startTransaction;
