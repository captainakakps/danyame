import * as migration_20260715_140605_initial from './20260715_140605_initial';

export const migrations = [
  {
    up: migration_20260715_140605_initial.up,
    down: migration_20260715_140605_initial.down,
    name: '20260715_140605_initial'
  },
];
