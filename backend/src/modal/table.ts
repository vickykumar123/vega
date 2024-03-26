import {pool} from "./database";

export async function createTables() {
  try {
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
            type VARCHAR(50) NOT NULL CHECK (type IN ('perishable', 'non-perishable')),
            description TEXT,
            CONSTRAINT unique_item_type_description UNIQUE (type, description)
        );
      `;

    const createPricingTableQuery = `
    CREATE TABLE Pricing (
        organization_id INTEGER,
        item_id INTEGER,
        zone VARCHAR(50) NOT NULL,
        base_distance_in_km INTEGER NOT NULL DEFAULT 5,
        km_price NUMERIC(8, 2) NOT NULL,
        fix_price NUMERIC(8, 2) NOT NULL,
        PRIMARY KEY (organization_id, item_id, zone),
        FOREIGN KEY (organization_id) REFERENCES Organization(id),
        FOREIGN KEY (item_id) REFERENCES Item(id)
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

export async function dropTable() {
  try {
    const dropTablesQuery = `
      DROP TABLE IF EXISTS Organization, Item, Pricing;
    `;
    await pool.query(dropTablesQuery);
    console.log("Table dropped successfully");
  } catch (err) {
    console.log("Error in dropping table");
  } finally {
    await pool.end();
  }
}
