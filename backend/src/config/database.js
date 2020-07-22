require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  dialectOptions: {
    ssl: process.env.POSTGRESQL_SSL,
    rejectUnauthorized: false,
  },
  host: process.env.POSTGRESQL_HOST || '127.0.0.1',
  username: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASS,
  database: process.env.POSTGRESQL_NAME,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
