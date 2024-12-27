import { createClient, RedisClientType } from 'redis';

class RedisConnection {
  private client: RedisClientType | null = null;
  private isConnected = false;

  /**
   * Explicitly initialize the connection to Redis.
   */
  public async connect(): Promise<void> {
    if (this.isConnected && this.client) {
      logging.info('Redis is already connected.');
      return;
    }

    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        reconnectStrategy: (retries: number) => Math.min(retries * 100, 3000),
      },
    });

    // Attach event listeners
    this.setupEventListeners();

    try {
      await this.client.connect();
      this.isConnected = true;
      logging.info('Redis connected successfully.');
    } catch (error) {
      logging.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  /**
   * Set up event listeners for the Redis client.
   */
  private setupEventListeners(): void {
    if (!this.client) return;

    this.client.on('connect', () => {
      logging.info('Redis connection established.');
    });

    this.client.on('error', (err) => {
      logging.error('Redis connection error:', err);
      process.exit(1);
    });

    this.client.on('reconnecting', () => {
      logging.info('Redis is attempting to reconnect...');
    });

    this.client.on('end', () => {
      this.isConnected = false;
      logging.info('Redis connection closed.');
    });
  }

  /**
   * Get a connected Redis client. Initializes the connection if needed.
   */
  public async getClient(): Promise<RedisClientType> {
    if (!this.isConnected || !this.client) {
      await this.connect();
    }
    if (!this.client) {
      throw new Error('Redis client is not initialized.');
    }
    return this.client;
  }

  /**
   * Safely disconnect from Redis.
   */
  public async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
      logging.info('Redis disconnected successfully.');
    }
  }
}

export default new RedisConnection();
