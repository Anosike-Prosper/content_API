import dotenv from 'dotenv';

dotenv.config();

const configuration = {
  port: process.env.PORT || 8080,
  mongo_uri: process.env.MONGO_URI,
};

export default configuration;
