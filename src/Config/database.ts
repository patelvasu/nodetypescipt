import mongoose from "mongoose";

class Database {
  public connection: any = null;

  constructor() {
    mongoose.connection.on("connected", () => {
      logging.info("Mongoose default connection open to " + process.env.DB_NAME);
    });

    mongoose.connection.on("disconnected", () => {
      logging.info("Mongoose default connection disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      logging.info("Mongoose default connection reconnected");
    });

    mongoose.connection.on("error", (error) => {
      logging.error("Mongoose default connection error:", (error.message as string)?error.message:error);
    });

    mongoose.connection.on("close", () => {
      logging.info("Mongoose default connection disconnected through app termination");
    });
  }

  async dbConnect() {
    try {
      if (mongoose.connection.readyState === 1 && this.connection) {
        return this.connection;
      }

      let connection_url: string = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
      if (process.env.NODE_ENV !== "localhost") {
        connection_url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
      }

      if (this.connection === null) {
        this.connection = mongoose.connect(connection_url, {
          serverSelectionTimeoutMS: 5000,
          maxPoolSize: 100,
          maxConnecting: 1000,
        }).then(() => mongoose);

        await this.connection;
      }

      return this.connection;
    } catch (error: any) {
      if (error.name === "MongooseServerSelectionError") {
        logging.error("Database connection failed: Unable to connect to MongoDB server.");
        logging.error(`Error Details: ${error.message}`);
      } else if (error.name === "MongoParseError") {
        logging.error("Database connection failed: Invalid connection string format.");
        logging.error(`Error Details: ${error.message}`);
      } else {
        logging.error("Database connection failed: An unexpected error occurred.");
        logging.error(`Error Details: ${error.message}`);
      }
      return false;
    }
  }
}

export default new Database();
