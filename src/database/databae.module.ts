import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * ORM (Object Relational Mapping) es una técnica de programación que nos ayuda a manipular y consultar la información almacenada dentro de una base de datos usando programación orientada a objetos. Un ORM se encarga de la conexión y también de manejar todo con base en modelos o entidades.

Una principal característica de un ORM es que hace más transparente las conexiones a PostgreSQL y MySQL, además nos protege de algunas vulnerabilidades de SQL y facilita algunas validaciones a la información.

* Para qué sirve un ORM
Como esto es una abstracción, no vamos a tener que ejecutar código SQL directamente para hacer una búsqueda, una inserción o una actualización. La ORM va a dar métodos muy prácticos para utilizarlo dentro de nuestro código.

Un ORM nos ayuda en la extracción de código complejo SQL, sin embargo, nunca esta de mas que en verdad sepas cómo hacer tus propias consultas SQL en caso de que necesites una consulta muy potente o avanzada.

TypeORM está desarrollado con typescript, así que la integración con NestJS va a hacer buena.
 */

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, password, host, database, port } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, password, host, database, port } = configService.database;
        const client = new Client({
          user,
          password,
          host,
          database,
          port,
        });

        client.connect();
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
