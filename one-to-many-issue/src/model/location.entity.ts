import {
  CursorConnection,
  FilterableField,
  IDField,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { DEFAULT_QUERY_RESULTS } from '../config/constants';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Action } from './action.entity';

@Entity()
@ObjectType()
@QueryOptions({ defaultResultSize: DEFAULT_QUERY_RESULTS, maxResultsSize: -1 })
@CursorConnection('actions', () => Action, {
  nullable: true,
  disableRemove: false,
})
export class Location {
  @IDField(() => ID)
  @PrimaryColumn()
  id: string;

  @FilterableField({ nullable: true })
  @Column({ nullable: false })
  city?: string;

  @FilterableField({ nullable: true })
  @Column({ nullable: true })
  province?: string;

  @FilterableField({ nullable: true })
  @Column({ nullable: true })
  country!: string;

  @OneToMany(() => Action, (action) => action.location)
  actions: Action[];
}
