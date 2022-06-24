import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

const ESPER_KEY_NAME = 'esper';

export const setEsper = (esper) => {
    const esperName = esper.name;

    if (!esper.name) return;

    const esperJson = JSON.stringify(esper);

    redisClient.hSet(ESPER_KEY_NAME, esperName, esperJson);
};

export const getEsper = async (esperName) => {
    if (redisClient.hExists(ESPER_KEY_NAME, esperName)) {
        const esperData = await redisClient.hGet(ESPER_KEY_NAME, esperName);
        console.log(esperData);
    }
};
