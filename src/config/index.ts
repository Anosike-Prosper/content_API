import dotenv from 'dotenv';

dotenv.config();

const configuration = {
  port: process.env.PORT || 8080,
  mongo_uri: process.env.MONGO_URI,
  open_api_key:process.env.OPENAI_API_KEY,
  open_org_id:process.env.OPENAI_ORG_ID
};

export default configuration;
