import { InfluxDBClient } from '@influxdata/influxdb3-client';
import { EN_VIR } from './env.js';
import { logger } from './logger.js';

logger.info(`Influx host - ${EN_VIR.influxdb.host}`);
let influxClientInstance = null;

function getInfluxClient() {
	if (!influxClientInstance) {
		influxClientInstance = new InfluxDBClient({
			host: EN_VIR.influxdb.host,
			token: EN_VIR.influxdb.token,
		});
	}

	return influxClientInstance;
}
export const influxClient = getInfluxClient();
