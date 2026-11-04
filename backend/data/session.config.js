import session from "express-session";
import mongodbStore from "connect-mongodb-session";

function createSessionStore() {
  const MongoDBStore = mongodbStore(session);

  const sessionStore = new MongoDBStore({
    uri: "mongodb://localhost:27017/",
    databaseName: "eshop",
    collection: "sessions",
  });

  return sessionStore;
}

function createSessionConfig() {
  return {
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  };
}
export { createSessionConfig };
