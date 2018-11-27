import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    link: process.env.DATABASE
  },
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'secrettoken',
  seedAdmin: process.env.SEEDADMIN
};

module.exports = config;
