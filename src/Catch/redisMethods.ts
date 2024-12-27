import { RedisClientType } from "redis";
import redisConnection from "../Config/redisConnection";

class RedisMethods {
    #redis: RedisClientType | null = null;

    constructor() {
        this.initializeClient();
    }

    private async initializeClient() {
        try {
            this.#redis = await redisConnection.getClient();
        } catch (error) {
            logging.error("Failed to initialize Redis client:", error);
        }
    }

    async #getClient(): Promise<RedisClientType> {
        if (!this.#redis) {
            this.#redis = await redisConnection.getClient();
        }
        return this.#redis;
    }

    async storeString(key: string, value: string): Promise<boolean> {
        try {
            const client = await this.#getClient();
            await client.set(key, value);
            return true;
        } catch (error) {
            logging.error("Failed to store string for key:", key, "with value:", value, ":", error);
            return false;
        }
    }

    async getString(key: string): Promise<string | null> {
        try {
            const client = await this.#getClient();
            return await client.get(key);
        } catch (error) {
            logging.error("Failed to get string for key:", key, ":", error);
            return null;
        }
    }

    async deleteKey(key: string): Promise<boolean> {
        try {
            const client = await this.#getClient();
            await client.del(key);
            return true;
        } catch (error) {
            logging.error("Failed to delete key:", key, ":", error);
            return false;
        }
    }

    async setObject<T>(key: string, value: T): Promise<boolean> {
        try {
            const client = await this.#getClient();
            await client.hSet(key, value as Record<string, any>);
            return true;
        } catch (error) {
            logging.error("Failed to set object for key:", key, ":", error);
            return false;
        }
    }

    async getObject<T>(key: string): Promise<T | null> {
        try {
            const client = await this.#getClient();
            const result = await client.hGetAll(key);
            return (Object.keys(result).length ? (result as T) : null);
        } catch (error) {
            logging.error("Failed to get object for key:", key, ":", error);
            return null;
        }
    }

    async storeArray(key: string, values: string[]): Promise<boolean> {
        try {
            const client = await this.#getClient();
            await client.rPush(key, values);
            return true;
        } catch (error) {
            logging.error("Failed to store array for key:", key, ":", error);
            return false;
        }
    }

    async getArrayPaginated(key: string, start: number, end: number): Promise<string[]> {
        try {
            const client = await this.#getClient();
            return await client.lRange(key, start, end);
        } catch (error) {
            logging.error("Failed to retrieve array for key:", key, ":", error);
            return [];
        }
    }
}

export default new RedisMethods();
