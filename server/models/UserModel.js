const pool = require('../dbcon');

const createUser = async (id, email, name, hashedpass, location, user_type, user_status) => {
  const query = 'INSERT INTO users(user_id, user_email, user_name, user_password, user_location, user_type, user_status) VALUES($1,$2,$3,$4,$5,$6,$7)';
  const values = [id, email, name, hashedpass, location, user_type, user_status];
  return await pool.query(query, values);
};

const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  return await pool.query(query);
}; 

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE user_email = $1';
  const values = [email];
  return await pool.query(query, values);
};

const getAllOwners = async () => {
  const query = 'SELECT * FROM users WHERE user_type = $1';
  const values = ['owner']; // Assuming 'owner' is a user type
  return await pool.query(query, values);
};

// Update user status in the database
const updateUserStatus = async (userId, status) => {
  const result = await pool.query(
    'UPDATE users SET user_status = $1 WHERE user_id = $2 RETURNING *',
    [status, userId]
  );

  return result.rows.length > 0 ? result.rows[0] : null; // Return the updated user or null if not found
};


module.exports = {
  createUser,
  findUserByEmail,
  getAllOwners,
  getAllUsers,
  updateUserStatus,
};
