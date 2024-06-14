import { BadRequestException } from '@nestjs/common';
import * as _ from 'lodash';

export class UtilsService {
  /**
   * convert entity to dto class instance
   * @param {{new(entity: E): T}} model
   * @param {E[] | E} user
   * @returns {T[] | T}
   */
  public static toDto<T, E>(model: new (entity: E) => T, user: E): T;
  public static toDto<T, E>(model: new (entity: E) => T, user: E[]): T[];
  public static toDto<T, E>(
    model: new (entity: E) => T,
    user: E | E[] | any,
  ): T | T[] {
    if (_.isArray(user)) {
      return user.map(u => new model(u));
    }

    return new model(user);
  }

  static mongooseError(error: any, doc: any, next: any) {
    if (error.code === 11000) {
      error = Object.keys(error.keyValue)[0] + ' must be unique'
      next(error)
    }
    else if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      throw new BadRequestException(validationErrors.join(', '));
    }
    else {
      next(error);
    }
  }

}
