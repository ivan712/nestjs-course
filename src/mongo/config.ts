import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
  return {
    uri: getMongoString(configService),
  };
};

export const getMongoString = (configService: ConfigService, env?: string) => {
  let PREFIX = '';
  if (configService.get('NODE_ENV') === 'test') PREFIX = 'TEST_';
  return (
    'mongodb://' +
    configService.get(PREFIX + 'MONGO_HOST') +
    '/' +
    configService.get(PREFIX + 'MONGO_DB') +
    ':' +
    configService.get(PREFIX + 'MONGO_PORT')
  );
};
