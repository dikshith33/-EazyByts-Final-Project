const config = {
    development: {
      username: "postgres",
      password: "dikshith@123",
      database: "event_management",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    test: {
      username: "postgres",
      password: "dikshith@123",
      database: "event_management_test",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    production: {
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "dikshith@123",
      database: process.env.DB_NAME || "event_management_prod",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "postgres"
    }
  };
  export default config;
  