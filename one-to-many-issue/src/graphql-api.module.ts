import { Module } from '@nestjs/common';
import { ActionModule } from './modules/location/action.module';
import { LocationModule } from './modules/location/location.module';

// TODO: config/remove debug/playground
@Module({
  imports: [LocationModule, ActionModule],
  //controllers: [AppController],
  providers: [],
})
export class GraphQLAPIModule {}
