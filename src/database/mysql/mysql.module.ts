import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const dbConfig = config.get('database.mysql.seawaysTrace');
        return {
          type: 'mysql',
          host: dbConfig.host,
          port: +dbConfig.port,
          username: dbConfig.userName,
          password: dbConfig.password,
          database: dbConfig.dbName,
          entities: [`${__dirname}/../../**/**.entity{.ts,.js}`],
          synchronize: false,
          logging: false,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class MysqlModule {}
