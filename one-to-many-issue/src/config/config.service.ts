import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import 'isomorphic-fetch';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  // some quick check getters
  isProduction = this.getValue('NODE_ENV', false) !== 'DEV';
  validate = this.getValue('VALIDATE_INPUT', false) === 'true';
  migrationsRun = this.getValue('RUNMIGRATIONS') === 'true';
  // if migration then don't allow syncronization
  synchronize =
    this.getValue('SYNCHRONIZE', false) === 'true' && !this.migrationsRun;

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): DataSourceOptions {
    // paths for entities and migrations include .. because __dirname is the config subdirectory
    const results: DataSourceOptions = {
      type: 'postgres',

      host: this.getValue('DBHOST'),
      port: parseInt(this.getValue('DBPORT')),
      username: this.getValue('DBUSER'),
      password: this.getValue('DBPASS'),
      database: this.getValue('DBNAME'),

      logging: false,

      entities: [join(__dirname, '../**/*.entity.{js,ts}')],
      migrationsTableName: 'migration',
      migrations: [join(__dirname, '../migration/*.{js,ts}')],
      ssl: this.isProduction,
      synchronize: this.synchronize,
      migrationsRun: this.migrationsRun,
      // dataSourceFactory: async (options: DataSourceOptions) => {
      //   const dataSource = await new DataSource(options).initialize();
      //   return dataSource;
      // },
    };

    return results;
  }

  private getGraphQLPlugins() {
    if (this.isProduction) return [];
    else return [ApolloServerPluginLandingPageLocalDefault()];
  }

  public getGraphQlConfig(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      sortSchema: true,
      context: ({ req, connection }) =>
        connection ? { req: { headers: connection.context } } : { req },
      subscriptions: {
        'graphql-ws': true,
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DBHOST',
  'DBPORT',
  'DBUSER',
  'DBPASS',
  'DBNAME',
  'RUNMIGRATIONS',
]);

export { configService };
