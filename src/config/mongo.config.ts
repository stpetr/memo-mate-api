import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) => {
  const login = configService.get('DB_LOGIN');
  const password = configService.get('DB_PASSWORD');
  const host = configService.get('DB_HOST');
  const port = configService.get('DB_PORT');
  const db = configService.get('DB_NAME');

  return `mongodb://${
    login && password ? `${login}:${password}@` : ``
  }${host}:${port}/${db}`;
};

const getMongoOptions = () => ({});
