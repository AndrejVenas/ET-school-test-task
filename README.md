# *ET-school-test-task*

## Overview

This document serves as the project documentation for the ET School Test Task. The project consists of a front-end developed using vanilla JavaScript and a back-end implemented in Node.js using the Express framework. The estimated development time for this project is between 30 to 35 hours.

## Requirements

   - PostgreSQL version 16 or higher is required for database operations.

## Setup Instructions
1) Cloning the Project

    Navigate to your desired directory:
```
cd ~/{your_path}
git clone https://github.com/{your_repo}/ET-school-test-task
```
2) Database Setup

    Create a new PostgreSQL database:
```
CREATE DATABASE eliftech_testtask;
```
    Execute the SQL script provided in database.sql to create the necessary tables:

```
psql -U your_username -d eliftech_testtask -a -f ./database.sql
```

3) Database Configuration

    Open db.js and configure the database connection parameters:
```
const pool = new Pool({
  user: "your_username",
  password: "your_password",
  host: "your_host",
  port: your_port,
  database: "eliftech_testtask"
});
```
4) Installing Dependencies

    Install project dependencies using npm:
```
npm install
```
5) Running the Server

    Start the Express server:
```
node index.js
```
## Deployment

Currently, the project has not been deployed to a specific platform. If a deployment platform is provided, the project can be deployed accordingly.
