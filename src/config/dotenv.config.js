import * as dotenv from "dotenv";
dotenv.config();

let MONGO_URI;
let args = process.argv.slice(2)[0];

if (args === "PROD") {
  MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.rvl2uyz.mongodb.net/${process.env.MONGO_DB_PROD}?retryWrites=true&w=majority`;
} else {
  MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.rvl2uyz.mongodb.net/${process.env.MONGO_DB_DEV}?retryWrites=true&w=majority`;
}

export default {
  app: {
    PORT: process.env.PORT || "8080",
    NODE_ENV: process.env.NODE_ENV || "development",
    HOST: process.env.HOST || "127.0.0.1",
    LOGS: process.env.LOGS || "silly",
  },
  mongo: {
    MONGO_URL: MONGO_URI,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET,
    COOKIE: process.env.JWT_COOKIE,
  },
  nodemail: {
    NM_EMAIL: process.env.NM_EMAIL,
    NM_CODE: process.env.NM_CODE,
    NM_ADDRESSEE: process.env.NM_ADDRESSEE,
  },
  session: {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PWD: process.env.ADMIN_PWD,
  },
};
