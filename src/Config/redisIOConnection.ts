import Redis, { Redis as RedisClientType } from "ioredis";

class IORedisConnection {
  private static client: RedisClientType | null = null;

  /**
   * Get the Redis client instance. Creates a new connection if not already established.
   */
  public static async getClient(): Promise<RedisClientType> {   
    try {
        if (IORedisConnection.client) {
          // Return the existing connection if available
          return IORedisConnection.client;
        }
    
        // Create a new Redis client
        IORedisConnection.client = new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          retryStrategy: (times: number) => Math.min(times * 100, 3000),
        });
        // Attach event listeners
        IORedisConnection.setupEventListeners();  
      await IORedisConnection.pingClient();
      logging.info("[IORedisConnection] Connected to Redis successfully.");
    } catch (error: any) {
      logging.error("[IORedisConnection] Error connecting to Redis:", error);
      throw error;
    }

    return IORedisConnection.client;
  }

  /**
   * Disconnect the Redis client safely.
   */
  public static async disconnect(): Promise<void> {
    if (IORedisConnection.client) {
      await IORedisConnection.client.quit();
      logging.info("[IORedisConnection] Redis disconnected successfully.");
      IORedisConnection.client = null;
    }
  }

  /**
   * Check if the Redis client is alive by sending a PING command.
   */
  private static async pingClient(): Promise<void> {
    if (IORedisConnection.client) {
      const response = await IORedisConnection.client.ping();
      if (response !== "PONG") {
        throw new Error("[IORedisConnection] Failed Redis PING check.");
      }
    }
  }

  /**
   * Attach event listeners to the Redis client for logging and handling errors.
   */
  private static setupEventListeners(): void {
    if (!IORedisConnection.client) return;

    IORedisConnection.client.on("connect", () => {
      logging.info("[IORedisConnection] Redis connection established.");
    });

    IORedisConnection.client.on("error", (err) => {
      logging.error("[IORedisConnection] Redis connection error:", err);
    });

    IORedisConnection.client.on("reconnecting", () => {
      logging.info("[IORedisConnection] Redis is attempting to reconnect...");
    });

    IORedisConnection.client.on("close", () => {
      logging.info("[IORedisConnection] Redis connection closed.");
    });
  }
}

export default IORedisConnection;
