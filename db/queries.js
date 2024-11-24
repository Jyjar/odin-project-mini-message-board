const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}

async function insertMessage(text, user) {
    await pool.query(
        "INSERT INTO messages (text, \"user\") VALUES ($1, $2)",
        [text, user]
    );
}

async function getMessageById(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
    return rows[0];
}

module.exports = {
    getAllMessages,
    insertMessage,
    getMessageById,
};