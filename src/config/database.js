require('dotenv').config();

const {DB_USER, DB_PASS, DB_TABLE, DB_HOST} = process.env;

module.exports = {
  'development': {
    'username': DB_USER,
    'password': DB_PASS,
    'database': DB_TABLE,
    'host': DB_HOST,
    'dialect': 'mariadb',
  },
  'test': {
    'password': DB_PASS,
    'username': DB_USER,
    'database': 'test',
    'host': DB_HOST,
    'dialect': 'mariadb',
  },
  'production': {
    'password': DB_PASS,
    'username': DB_USER,
    'database': DB_TABLE,
    'host': DB_HOST,
    'dialect': 'mariadb',
  },
};
