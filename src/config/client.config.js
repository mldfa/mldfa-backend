import pg from 'pg';
 
const client = new pg.Client({
  host: process.env.DBHOST,
  port: 5432,
  database: process.env.DBNAME,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
})

export default client;