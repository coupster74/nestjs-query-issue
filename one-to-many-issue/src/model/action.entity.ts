import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { Location } from './location.entity';
import {
  //Authorize,
  FilterableField,
  FilterableRelation,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { DEFAULT_QUERY_RESULTS } from '../config/constants';
import { PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

// fact table for the star schema
@Entity()
@ObjectType()
//@Authorize(ActionAuthorizer)
@QueryOptions({ defaultResultSize: DEFAULT_QUERY_RESULTS, maxResultsSize: -1 })
@FilterableRelation('location', () => Location, {
  nullable: true,
  disableRemove: false,
})
export class Action {
  @IDField(() => ID, { nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  date?: Date;

  @FilterableField({ nullable: true })
  @Column({ nullable: true })
  @Index({ fulltext: true })
  title?: string;

  // location related
  @ManyToOne(() => Location)
  @Index()
  location?: Location;
}
