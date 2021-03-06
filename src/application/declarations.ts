import {CloudEvent} from 'cloudevents';
import {IDomainEvent} from '../domain/IDomainEvent';

export type ApplicationErrorData = {
  code: string;
  error: Error | string;
  status: number;
};

export enum ErrorCodes {
  FORBIDDEN = 'forbidden',
  INTERNAL_ERROR = 'internal-error',
  INVALID_DATA = 'invalid-data',
  NOT_FOUND = 'not-found',
  UNAUTHORIZED = 'unauthorized',
}

export type GroupedByAggregateEvents = {
  [aggregate: string]: IDomainEvent[];
};

export type GroupedByAggregateCloudevents = {
  [aggregate: string]: CloudEvent[];
};

export type UserCreateData = {
  email: string;
  password: string;
  username?: string;
};
