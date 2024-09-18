const pool = require('../dbcon'); // Import your database connection

const getCounts = async () => {
  try {
    const ownersQuery = 'SELECT COUNT(*) FROM users WHERE user_type = \'Owner\';';
    const adminsQuery = 'SELECT COUNT(*) FROM users WHERE user_type = \'Admin\';';
    const rentersQuery = 'SELECT COUNT(*) FROM users WHERE user_type = \'Renter\';';
    const booksQuery = 'SELECT COUNT(*) FROM books;';

    const ownersResult = await pool.query(ownersQuery);
    const adminssResult = await pool.query(adminsQuery);
    const rentersResult = await pool.query(rentersQuery);
    const booksResult = await pool.query(booksQuery);

    return {
      ownersCount: ownersResult.rows[0].count,
      adminsCount: adminssResult.rows[0].count,
      rentersCount: rentersResult.rows[0].count,
      booksCount: booksResult.rows[0].count,
    };
  } catch (error) {
    console.error('Error fetching counts:', error);
    throw error; // Propagate the error to the controller
  }
};

const getBookTypesCount = async () => {
  try {
    const query = `
      SELECT catagory, SUM(total_quantity) as count 
      FROM books 
      GROUP BY catagory;
    `;

    const result = await pool.query(query);
    return result.rows; // Returns an array of book type counts
  } catch (error) {
    console.error('Error fetching book types:', error);
    throw error;
  }
};

const getEarningsByCategory = async (req, res) => {
  
    const query = `
      SELECT catagory, SUM(total_fee) as total_earnings
      FROM books
      JOIN rents ON books.book_id = rents.book_id
      GROUP BY catagory;
    `;
    
    const result = await pool.query(query);
    return result.rows;
};

const getEarningsOverTime = async () => {
  try {
    const query = `
      SELECT 
  to_char(rent_date, 'YYYY-MM') AS period,
  COALESCE(SUM(CASE WHEN catagory = 'Fiction' THEN total_fee ELSE 0 END), 0) AS fiction_earnings,
  COALESCE(SUM(CASE WHEN catagory = 'Business' THEN total_fee ELSE 0 END), 0) AS business_earnings,
  COALESCE(SUM(CASE WHEN catagory = 'Self Help' THEN total_fee ELSE 0 END), 0) AS self_help_earnings,
  COALESCE(SUM(total_fee), 0) AS total_earnings
FROM rents
JOIN books ON rents.book_id = books.book_id
GROUP BY to_char(rent_date, 'YYYY-MM')
ORDER BY period;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching earnings data:', error);
    throw error;
  }
};

const ownerEarningsOverTime = async (BookOwner) => {
  try {
    const query = `
      SELECT 
  to_char(rent_date, 'YYYY-MM') AS period,
  COALESCE(SUM(CASE WHEN catagory = 'Fiction' THEN total_fee ELSE 0 END), 0) AS fiction_earnings,
  COALESCE(SUM(CASE WHEN catagory = 'Business' THEN total_fee ELSE 0 END), 0) AS business_earnings,
  COALESCE(SUM(CASE WHEN catagory = 'Self Help' THEN total_fee ELSE 0 END), 0) AS self_help_earnings,
  COALESCE(SUM(total_fee), 0) AS total_earnings
FROM rents
JOIN books ON rents.book_id = books.book_id WHERE book_owner = $1
GROUP BY to_char(rent_date, 'YYYY-MM')
ORDER BY period;
    `;
    const result = await pool.query(query, [BookOwner]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching earnings data:', error);
    throw error;
  }
};

const ownerGetBooks = async (BookOwner) => {
  try {
    const query = `
      SELECT catagory, 
             SUM(total_quantity) as count, 
             SUM(rent_quantity) as rent_quantity 
      FROM books 
      WHERE book_owner = $1
      GROUP BY catagory;
    `;
    const result = await pool.query(query, [BookOwner]);
    return result.rows; // Returns an array with both count and rent_quantity
  } catch (error) {
    console.error('Error fetching book types:', error);
    throw error;
  }
};

const renterRentStatus = async (id) => {
  try {
    const query = `
      SELECT catagory, 
             COUNT(*) as count
      FROM rents JOIN books ON rents.book_id = books.book_id
      WHERE renter_id = $1
      GROUP BY catagory;
    `;
    const result = await pool.query(query, [id]);
    return result.rows; // Returns an array with both count and rent_quantity
  } catch (error) {
    console.error('Error fetching book types:', error);
    throw error;
  }
};

const renterFees = async (id) => {
  try {
    const query = `
      SELECT 
  to_char(rent_date, 'YYYY-MM') AS period,
  COALESCE(SUM(CASE WHEN catagory = 'Fiction' THEN total_fee ELSE 0 END), 0) AS fiction_fee,
  COALESCE(SUM(CASE WHEN catagory = 'Business' THEN total_fee ELSE 0 END), 0) AS business_fee,
  COALESCE(SUM(CASE WHEN catagory = 'Self Help' THEN total_fee ELSE 0 END), 0) AS self_help_fee,
  COALESCE(SUM(total_fee), 0) AS total_fee
FROM rents
JOIN books ON rents.book_id = books.book_id WHERE renter_id = $1
GROUP BY to_char(rent_date, 'YYYY-MM')
ORDER BY period;
    `;
    const result = await pool.query(query, [id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching fee data:', error);
    throw error;
  }
};



module.exports = { 
    getCounts, 
    getBookTypesCount, 
    getEarningsByCategory,
    getEarningsOverTime, 
    ownerGetBooks,
    ownerEarningsOverTime,
    renterRentStatus,
    renterFees,
  };



