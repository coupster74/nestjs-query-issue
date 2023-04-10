import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Action } from '../../model/action.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Action])],
      resolvers: [
        {
          DTOClass: Action,
          EntityClass: Action,
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
export class ActionModule {}
