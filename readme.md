# Food Delivery Application

This is a Food Delivery application with backend and frontend components.
## API Documentation
View the [API Documentation](https://documenter.getpostman.com/view/29588496/2sA35EZ33h#59c21593-0707-42e4-97aa-41a7990d5c3c)

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/vickykumar123/vega.git
```
### Step 2: Install Backend Dependencies
```bash
cd backend && npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend && npm install
```
### Step 4: Setup the Database

1. Create a `.env` file in the backend directory.
2. Add the environment variables as specified in the `env.example` file.

### Step 5: Setup Frontend Environment Variables

1. Copy the `.env.example` file in the frontend directory to `.env`.
2. Update the environment variables in the `.env` file as needed.

### Step 6: Create and Configure Database Tables

1. In the `backend/src/index.ts` file:
   - Uncomment `table.createTable` to create the database tables.
   - Once the tables are created, comment out `table.createTable`.
   - Optionally, uncomment `table.dropTable` to drop all tables.
  
### Step 7: Run the Application
```bash
npm run dev
```
