import {pool} from "./database";

export async function createTables() {
  try {
    await pool.connect();

    // SQL commands to create tables
    const createOrganizationTableQuery = `
        CREATE TABLE IF NOT EXISTS Organization (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
      `;

    const createItemTableQuery = `
        CREATE TABLE IF NOT EXISTS Item (
            id SERIAL PRIMARY KEY,
            type VARCHAR(50) NOT NULL,
            description TEXT
        );
      `;

    const createPricingTableQuery = `
        CREATE TABLE IF NOT EXISTS Pricing (
            organization_id INTEGER REFERENCES Organization(id),
            item_id INTEGER REFERENCES Item(id),
            zone VARCHAR(50) NOT NULL,
            base_distance_in_km INTEGER NOT NULL DEFAULT 5,
            km_price NUMERIC(8, 2) NOT NULL,
            fix_price NUMERIC(8, 2) NOT NULL,
            PRIMARY KEY (organization_id, item_id, zone)
        );
      `;

    // Execute SQL commands to create tables
    await pool.query(createOrganizationTableQuery);
    await pool.query(createItemTableQuery);
    await pool.query(createPricingTableQuery);
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    // Close the PostgreSQL connection
    await pool.end();
  }
}
