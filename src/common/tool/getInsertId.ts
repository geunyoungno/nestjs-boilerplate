import { InsertResult } from 'typeorm';

export function getInsertId(insertResult: InsertResult) {
  if ('raw' in insertResult) {
    const insertId = insertResult.raw.insertId;

    if (typeof insertId === 'string') {
      return insertId;
    }

    return `${insertId}`;
  }

  throw new Error('insert id not found');
}
