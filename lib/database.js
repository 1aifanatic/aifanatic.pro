const { Pool } = require("pg");

// Create database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Initialize database schema
async function initializeDatabase() {
  try {
    // Create leads table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        document_name VARCHAR(255) NOT NULL,
        ip_address INET,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(email, document_name)
      );
    `);

    // Create downloads table for tracking
    await pool.query(`
      CREATE TABLE IF NOT EXISTS downloads (
        id SERIAL PRIMARY KEY,
        lead_id INTEGER REFERENCES leads(id),
        document_path VARCHAR(500) NOT NULL,
        downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Function to store lead information
async function storeLead(name, email, documentName, ipAddress, userAgent) {
  try {
    const query = `
      INSERT INTO leads (name, email, document_name, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email, document_name) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        ip_address = EXCLUDED.ip_address,
        user_agent = EXCLUDED.user_agent,
        created_at = CURRENT_TIMESTAMP
      RETURNING id;
    `;

    const result = await pool.query(query, [
      name,
      email,
      documentName,
      ipAddress,
      userAgent,
    ]);
    return result.rows[0].id;
  } catch (error) {
    console.error("Error storing lead:", error);
    throw error;
  }
}

// Function to log download
async function logDownload(leadId, documentPath) {
  try {
    const query = `
      INSERT INTO downloads (lead_id, document_path)
      VALUES ($1, $2);
    `;

    await pool.query(query, [leadId, documentPath]);
  } catch (error) {
    console.error("Error logging download:", error);
    throw error;
  }
}

// Function to get leads (for admin purposes)
async function getLeads(limit = 100, offset = 0, documentName = null) {
  try {
    const params = [];
    const whereClause = documentName
      ? `WHERE l.document_name = $${params.push(documentName)}`
      : "";
    const limitParameter = `$${params.push(limit)}`;
    const offsetParameter = `$${params.push(offset)}`;
    const query = `
      SELECT l.*, COUNT(d.id) as download_count
      FROM leads l
      LEFT JOIN downloads d ON l.id = d.lead_id
      ${whereClause}
      GROUP BY l.id
      ORDER BY l.created_at DESC
      LIMIT ${limitParameter} OFFSET ${offsetParameter};
    `;

    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
}

// Initialize database on module load
if (process.env.NODE_ENV !== "test") {
  initializeDatabase().catch(console.error);
}

module.exports = {
  pool,
  initializeDatabase,
  storeLead,
  logDownload,
  getLeads,
};
