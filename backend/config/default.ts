const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

export default {
  port: 3000,
  dbUri: `postgres://postgres:1234@db:5432/ngcashweb`,
};
