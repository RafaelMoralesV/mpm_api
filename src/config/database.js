export default {
  'development': {
    'username': process.env.DB_NAME,
    'password': process.env.DB_PASS,
    'database': process.env.DB_TABLE,
    'host': process.env.DB_HOST,
    'dialect': 'mariadb',
  },
  'test': {
    'username': process.env.DB_NAME,
    'password': process.env.DB_PASS,
    'database': process.env.DB_TABLE,
    'host': process.env.DB_HOST,
    'dialect': 'mariadb',
  },
  'production': {
    'username': process.env.DB_NAME,
    'password': process.env.DB_PASS,
    'database': process.env.DB_TABLE,
    'host': process.env.DB_HOST,
    'dialect': 'mariadb',
  },
};
