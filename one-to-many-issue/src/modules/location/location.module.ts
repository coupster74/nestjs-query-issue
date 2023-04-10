import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Location } from '../../model/location.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Location])],
      resolvers: [
        {
          DTOClass: Location,
          EntityClass: Location,
          enableAggregate: true,
          enableTotalCount: true,
          delete: { many: { disabled: true } },
        },
      ],
      // describe the resolvers you want to expose
    }),
  ],
  providers: [],
})
export class LocationModule {}
