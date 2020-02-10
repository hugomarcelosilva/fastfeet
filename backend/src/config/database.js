require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.POSTGRESQL_HOST || '127.0.0.1',
  username: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASS,
  database: process.env.POSTGRESQL_NAME,
  storage: './__tests__/database.sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
