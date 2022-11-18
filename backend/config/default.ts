const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

export default {
  port: 3000,
  dbUri: `postgres://${dbUser}:${dbPassword}@localhost:5432/crud`
};